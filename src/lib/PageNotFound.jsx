import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#d4af37] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
          404
        </h1>
        <p className="text-[#c4b5fd] text-lg mb-8">The page you're looking for doesn't exist.</p>
        <Link to={createPageUrl("Home")}>
          <Button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Tarot Image Base URL - Ishtar Collective CDN
export const TAROT_BASE_URL = "https://ishtarcollective.blob.core.windows.net/rider-waite-tarot/";

// Card filename mapping from card codes
const CARD_FILENAME_MAP = {
  // MAJOR ARCANA (0-21)
  ar00: "major-0.jpg",
  ar01: "major-1.jpg",
  ar02: "major-2.jpg",
  ar03: "major-3.jpg",
  ar04: "major-4.jpg",
  ar05: "major-5.jpg",
  ar06: "major-6.jpg",
  ar07: "major-7.jpg",
  ar08: "major-8.jpg",
  ar09: "major-9.jpg",
  ar10: "major-10.jpg",
  ar11: "major-11.jpg",
  ar12: "major-12.jpg",
  ar13: "major-13.jpg",
  ar14: "major-14.jpg",
  ar15: "major-15.jpg",
  ar16: "major-16.jpg",
  ar17: "major-17.jpg",
  ar18: "major-18.jpg",
  ar19: "major-19.jpg",
  ar20: "major-20.jpg",
  ar21: "major-21.jpg",
  // WANDS (1-14)
  wa01: "wands-1.jpg",
  wa02: "wands-2.jpg",
  wa03: "wands-3.jpg",
  wa04: "wands-4.jpg",
  wa05: "wands-5.jpg",
  wa06: "wands-6.jpg",
  wa07: "wands-7.jpg",
  wa08: "wands-8.jpg",
  wa09: "wands-9.jpg",
  wa10: "wands-10.jpg",
  wa11: "wands-11.jpg",
  wa12: "wands-12.jpg",
  wa13: "wands-13.jpg",
  wa14: "wands-14.jpg",
  // CUPS (1-14)
  cu01: "cups-1.jpg",
  cu02: "cups-2.jpg",
  cu03: "cups-3.jpg",
  cu04: "cups-4.jpg",
  cu05: "cups-5.jpg",
  cu06: "cups-6.jpg",
  cu07: "cups-7.jpg",
  cu08: "cups-8.jpg",
  cu09: "cups-9.jpg",
  cu10: "cups-10.jpg",
  cu11: "cups-11.jpg",
  cu12: "cups-12.jpg",
  cu13: "cups-13.jpg",
  cu14: "cups-14.jpg",
  // SWORDS (1-14)
  sw01: "swords-1.jpg",
  sw02: "swords-2.jpg",
  sw03: "swords-3.jpg",
  sw04: "swords-4.jpg",
  sw05: "swords-5.jpg",
  sw06: "swords-6.jpg",
  sw07: "swords-7.jpg",
  sw08: "swords-8.jpg",
  sw09: "swords-9.jpg",
  sw10: "swords-10.jpg",
  sw11: "swords-11.jpg",
  sw12: "swords-12.jpg",
  sw13: "swords-13.jpg",
  sw14: "swords-14.jpg",
  // PENTACLES (1-14)
  pe01: "pentacles-1.jpg",
  pe02: "pentacles-2.jpg",
  pe03: "pentacles-3.jpg",
  pe04: "pentacles-4.jpg",
  pe05: "pentacles-5.jpg",
  pe06: "pentacles-6.jpg",
  pe07: "pentacles-7.jpg",
  pe08: "pentacles-8.jpg",
  pe09: "pentacles-9.jpg",
  pe10: "pentacles-10.jpg",
  pe11: "pentacles-11.jpg",
  pe12: "pentacles-12.jpg",
  pe13: "pentacles-13.jpg",
  pe14: "pentacles-14.jpg"
};

export function getCardImageUrl(cardCode) {
  const filename = CARD_FILENAME_MAP[cardCode];
  return filename ? TAROT_BASE_URL + filename : TAROT_BASE_URL + "major-0.jpg";
}