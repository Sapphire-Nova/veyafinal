import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Fetch live moon phase data from API
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=a2bb7b95f9a94e5dbb921055242803&q=auto:ip&aqi=no');
    const data = await response.json();
    
    // Calculate moon phase based on current date
    const today = new Date();
    const knownNewMoon = new Date(2000, 0, 6); // A known new moon date
    const lunarCycle = 29.53; // days in lunar cycle
    
    const daysSinceNewMoon = (today - knownNewMoon) / (1000 * 60 * 60 * 24);
    const lunarPhaseIndex = daysSinceNewMoon % lunarCycle;
    const lunarPercentage = (lunarPhaseIndex / lunarCycle) * 100;
    
    // Determine phase name
    let phaseName = '';
    let phaseEmoji = '';
    
    if (lunarPhaseIndex < 1.84) {
      phaseName = 'New Moon';
      phaseEmoji = '🌑';
    } else if (lunarPhaseIndex < 7.38) {
      phaseName = 'Waxing Crescent';
      phaseEmoji = '🌒';
    } else if (lunarPhaseIndex < 9.23) {
      phaseName = 'First Quarter';
      phaseEmoji = '🌓';
    } else if (lunarPhaseIndex < 14.77) {
      phaseName = 'Waxing Gibbous';
      phaseEmoji = '🌔';
    } else if (lunarPhaseIndex < 16.61) {
      phaseName = 'Full Moon';
      phaseEmoji = '🌕';
    } else if (lunarPhaseIndex < 22.15) {
      phaseName = 'Waning Gibbous';
      phaseEmoji = '🌖';
    } else if (lunarPhaseIndex < 23.99) {
      phaseName = 'Last Quarter';
      phaseEmoji = '🌗';
    } else {
      phaseName = 'Waning Crescent';
      phaseEmoji = '🌘';
    }
    
    // Get zodiac season
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    let zodiacSign = '';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiacSign = 'Aries';
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiacSign = 'Taurus';
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiacSign = 'Gemini';
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiacSign = 'Cancer';
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiacSign = 'Leo';
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiacSign = 'Virgo';
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiacSign = 'Libra';
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiacSign = 'Scorpio';
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiacSign = 'Sagittarius';
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiacSign = 'Capricorn';
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiacSign = 'Aquarius';
    else zodiacSign = 'Pisces';
    
    return Response.json({
      phase: phaseName,
      emoji: phaseEmoji,
      percentage: Math.round(lunarPercentage),
      zodiacSign,
      timestamp: today.toISOString()
    });
  } catch (error) {
    console.error('Moon phase fetch error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});