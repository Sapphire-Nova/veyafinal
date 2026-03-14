import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const body = await req.json();
  const { data } = body;

  const resourceState = data?._provider_meta?.['x-goog-resource-state'];

  // Skip sync notifications
  if (resourceState === 'sync') {
    return Response.json({ ok: true, skipped: 'sync' });
  }

  try {
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlecalendar');

    // Load stored syncToken
    const tokenRecords = await base44.asServiceRole.entities.CalendarEvent.filter({ sync_token: { $exists: true } });
    // We store sync token as a special sentinel record
    const tokenRecord = tokenRecords.find(r => r.google_event_id === '__sync_token__');
    const syncToken = tokenRecord?.description || null;

    let eventsUrl;
    if (syncToken) {
      eventsUrl = `https://www.googleapis.com/calendar/v3/calendars/primary/events?syncToken=${encodeURIComponent(syncToken)}&singleEvents=true`;
    } else {
      // Initial full sync — get events from now onwards
      const timeMin = new Date().toISOString();
      eventsUrl = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&singleEvents=true&orderBy=startTime&maxResults=250`;
    }

    const res = await fetch(eventsUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      const err = await res.text();
      // syncToken expired — clear it and do a full sync next time
      if (res.status === 410) {
        if (tokenRecord) {
          await base44.asServiceRole.entities.CalendarEvent.update(tokenRecord.id, { description: null });
        }
        return Response.json({ ok: true, note: 'syncToken expired, reset for next sync' });
      }
      console.error('Google Calendar API error:', err);
      return Response.json({ error: err }, { status: 500 });
    }

    const json = await res.json();
    const events = json.items || [];
    const nextSyncToken = json.nextSyncToken;

    // Process each changed event
    for (const event of events) {
      const eventId = event.id;
      const title = event.summary || 'Untitled';
      const description = event.description || '';
      const startTime = event.start?.dateTime || event.start?.date || '';
      const endTime = event.end?.dateTime || event.end?.date || '';
      const location = event.location || '';
      const status = event.status || 'confirmed';
      const meetLink = event.hangoutLink || event.conferenceData?.entryPoints?.[0]?.uri || '';
      const attendees = (event.attendees || []).map(a => a.email).filter(Boolean);

      // Detect event type from title keywords
      let eventType = 'other';
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes('reading') || lowerTitle.includes('tarot') || lowerTitle.includes('psychic')) eventType = 'reading';
      else if (lowerTitle.includes('meditation') || lowerTitle.includes('meditate')) eventType = 'meditation';
      else if (lowerTitle.includes('ritual') || lowerTitle.includes('spell') || lowerTitle.includes('ceremony')) eventType = 'ritual';
      else if (lowerTitle.includes('reiki') || lowerTitle.includes('energy')) eventType = 'reiki';
      else if (lowerTitle.includes('circle') || lowerTitle.includes('moon')) eventType = 'circle';

      // Find existing record
      const existing = await base44.asServiceRole.entities.CalendarEvent.filter({ google_event_id: eventId });
      const record = existing?.[0];

      if (status === 'cancelled') {
        if (record) {
          await base44.asServiceRole.entities.CalendarEvent.update(record.id, { status: 'cancelled' });
        }
      } else if (record) {
        await base44.asServiceRole.entities.CalendarEvent.update(record.id, {
          title, description, start_time: startTime, end_time: endTime,
          location, status, event_type: eventType, meet_link: meetLink, attendees,
        });
      } else {
        await base44.asServiceRole.entities.CalendarEvent.create({
          google_event_id: eventId, title, description,
          start_time: startTime, end_time: endTime,
          location, status, event_type: eventType, meet_link: meetLink, attendees,
        });
      }
    }

    // Save new syncToken in sentinel record
    if (nextSyncToken) {
      if (tokenRecord) {
        await base44.asServiceRole.entities.CalendarEvent.update(tokenRecord.id, { description: nextSyncToken });
      } else {
        await base44.asServiceRole.entities.CalendarEvent.create({
          google_event_id: '__sync_token__',
          title: '__sync_token__',
          start_time: new Date().toISOString(),
          description: nextSyncToken,
        });
      }
    }

    console.log(`Synced ${events.length} calendar events`);
    return Response.json({ ok: true, synced: events.length });

  } catch (error) {
    console.error('calendarWebhook error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});