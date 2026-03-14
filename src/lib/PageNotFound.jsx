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

// Tarot Image Base URL
export const TAROT_BASE_URL = "https://raw.githubusercontent.com/searge/tarot/master/img/";

// Card filename mapping from card codes
const CARD_FILENAME_MAP = {
  // MAJOR ARCANA (0-21)
  ar00: "0.jpg",
  ar01: "1.jpg",
  ar02: "2.jpg",
  ar03: "3.jpg",
  ar04: "4.jpg",
  ar05: "5.jpg",
  ar06: "6.jpg",
  ar07: "7.jpg",
  ar08: "8.jpg",
  ar09: "9.jpg",
  ar10: "10.jpg",
  ar11: "11.jpg",
  ar12: "12.jpg",
  ar13: "13.jpg",
  ar14: "14.jpg",
  ar15: "15.jpg",
  ar16: "16.jpg",
  ar17: "17.jpg",
  ar18: "18.jpg",
  ar19: "19.jpg",
  ar20: "20.jpg",
  ar21: "21.jpg",
  // WANDS (22-35)
  wa01: "22.jpg",
  wa02: "23.jpg",
  wa03: "24.jpg",
  wa04: "25.jpg",
  wa05: "26.jpg",
  wa06: "27.jpg",
  wa07: "28.jpg",
  wa08: "29.jpg",
  wa09: "30.jpg",
  wa10: "31.jpg",
  wa11: "32.jpg",
  wa12: "33.jpg",
  wa13: "34.jpg",
  wa14: "35.jpg",
  // CUPS (36-49)
  cu01: "36.jpg",
  cu02: "37.jpg",
  cu03: "38.jpg",
  cu04: "39.jpg",
  cu05: "40.jpg",
  cu06: "41.jpg",
  cu07: "42.jpg",
  cu08: "43.jpg",
  cu09: "44.jpg",
  cu10: "45.jpg",
  cu11: "46.jpg",
  cu12: "47.jpg",
  cu13: "48.jpg",
  cu14: "49.jpg",
  // SWORDS (50-63)
  sw01: "50.jpg",
  sw02: "51.jpg",
  sw03: "52.jpg",
  sw04: "53.jpg",
  sw05: "54.jpg",
  sw06: "55.jpg",
  sw07: "56.jpg",
  sw08: "57.jpg",
  sw09: "58.jpg",
  sw10: "59.jpg",
  sw11: "60.jpg",
  sw12: "61.jpg",
  sw13: "62.jpg",
  sw14: "63.jpg",
  // PENTACLES (64-77)
  pe01: "64.jpg",
  pe02: "65.jpg",
  pe03: "66.jpg",
  pe04: "67.jpg",
  pe05: "68.jpg",
  pe06: "69.jpg",
  pe07: "70.jpg",
  pe08: "71.jpg",
  pe09: "72.jpg",
  pe10: "73.jpg",
  pe11: "74.jpg",
  pe12: "75.jpg",
  pe13: "76.jpg",
  pe14: "77.jpg"
};

export function getCardImageUrl(cardCode) {
  const filename = CARD_FILENAME_MAP[cardCode];
  return filename ? TAROT_BASE_URL + filename : TAROT_BASE_URL + "0.jpg";
}