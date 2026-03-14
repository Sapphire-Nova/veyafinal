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

// Tarot Image Map - Wikimedia Commons URLs for 1909 Rider-Waite-Smith deck
export const TAROT_IMAGE_MAP = {
  // MAJOR ARCANA
  ar00: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_00_Fool.jpg",
  ar01: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_01_Magician.jpg",
  ar02: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
  ar03: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
  ar04: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
  ar05: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
  ar06: "https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_06_Lovers.jpg",
  ar07: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
  ar08: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
  ar09: "https://upload.wikimedia.org/wikipedia/commons/0/0c/RWS_Tarot_09_Hermit.jpg",
  ar10: "https://upload.wikimedia.org/wikipedia/commons/3/37/RWS_Tarot_10_Wheel_of_Fortune.jpg",
  ar11: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
  ar12: "https://upload.wikimedia.org/wikipedia/commons/e/eb/RWS_Tarot_12_Hanged_Man.jpg",
  ar13: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
  ar14: "https://upload.wikimedia.org/wikipedia/commons/f/fb/RWS_Tarot_14_Temperance.jpg",
  ar15: "https://upload.wikimedia.org/wikipedia/commons/6/6b/RWS_Tarot_15_Devil.jpg",
  ar16: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
  ar17: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
  ar18: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
  ar19: "https://upload.wikimedia.org/wikipedia/commons/1/1d/RWS_Tarot_19_Sun.jpg",
  ar20: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
  ar21: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
  // WANDS
  wa01: "https://upload.wikimedia.org/wikipedia/commons/2/2f/RWS_Minor_Wands_01.jpg",
  wa02: "https://upload.wikimedia.org/wikipedia/commons/8/82/RWS_Minor_Wands_02.jpg",
  wa03: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Minor_Wands_03.jpg",
  wa04: "https://upload.wikimedia.org/wikipedia/commons/0/05/RWS_Minor_Wands_04.jpg",
  wa05: "https://upload.wikimedia.org/wikipedia/commons/3/3f/RWS_Minor_Wands_05.jpg",
  wa06: "https://upload.wikimedia.org/wikipedia/commons/5/5a/RWS_Minor_Wands_06.jpg",
  wa07: "https://upload.wikimedia.org/wikipedia/commons/6/64/RWS_Minor_Wands_07.jpg",
  wa08: "https://upload.wikimedia.org/wikipedia/commons/c/c8/RWS_Minor_Wands_08.jpg",
  wa09: "https://upload.wikimedia.org/wikipedia/commons/d/d3/RWS_Minor_Wands_09.jpg",
  wa10: "https://upload.wikimedia.org/wikipedia/commons/6/68/RWS_Minor_Wands_10.jpg",
  wa11: "https://upload.wikimedia.org/wikipedia/commons/0/01/RWS_Minor_Wands_11.jpg",
  wa12: "https://upload.wikimedia.org/wikipedia/commons/0/0b/RWS_Minor_Wands_12.jpg",
  wa13: "https://upload.wikimedia.org/wikipedia/commons/6/6d/RWS_Minor_Wands_13.jpg",
  wa14: "https://upload.wikimedia.org/wikipedia/commons/5/54/RWS_Minor_Wands_14.jpg",
  // CUPS
  cu01: "https://upload.wikimedia.org/wikipedia/commons/0/02/RWS_Minor_Cups_01.jpg",
  cu02: "https://upload.wikimedia.org/wikipedia/commons/5/5d/RWS_Minor_Cups_02.jpg",
  cu03: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Minor_Cups_03.jpg",
  cu04: "https://upload.wikimedia.org/wikipedia/commons/6/6a/RWS_Minor_Cups_04.jpg",
  cu05: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Minor_Cups_05.jpg",
  cu06: "https://upload.wikimedia.org/wikipedia/commons/b/bc/RWS_Minor_Cups_06.jpg",
  cu07: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Minor_Cups_07.jpg",
  cu08: "https://upload.wikimedia.org/wikipedia/commons/6/6f/RWS_Minor_Cups_08.jpg",
  cu09: "https://upload.wikimedia.org/wikipedia/commons/2/2a/RWS_Minor_Cups_09.jpg",
  cu10: "https://upload.wikimedia.org/wikipedia/commons/1/18/RWS_Minor_Cups_10.jpg",
  cu11: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Minor_Cups_11.jpg",
  cu12: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Minor_Cups_12.jpg",
  cu13: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Minor_Cups_13.jpg",
  cu14: "https://upload.wikimedia.org/wikipedia/commons/8/85/RWS_Minor_Cups_14.jpg",
  // SWORDS
  sw01: "https://upload.wikimedia.org/wikipedia/commons/a/ab/RWS_Minor_Swords_01.jpg",
  sw02: "https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Minor_Swords_02.jpg",
  sw03: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Minor_Swords_03.jpg",
  sw04: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RWS_Minor_Swords_04.jpg",
  sw05: "https://upload.wikimedia.org/wikipedia/commons/8/8f/RWS_Minor_Swords_05.jpg",
  sw06: "https://upload.wikimedia.org/wikipedia/commons/c/c0/RWS_Minor_Swords_06.jpg",
  sw07: "https://upload.wikimedia.org/wikipedia/commons/9/9d/RWS_Minor_Swords_07.jpg",
  sw08: "https://upload.wikimedia.org/wikipedia/commons/a/a8/RWS_Minor_Swords_08.jpg",
  sw09: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Minor_Swords_09.jpg",
  sw10: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Minor_Swords_10.jpg",
  sw11: "https://upload.wikimedia.org/wikipedia/commons/5/5f/RWS_Minor_Swords_11.jpg",
  sw12: "https://upload.wikimedia.org/wikipedia/commons/2/21/RWS_Minor_Swords_12.jpg",
  sw13: "https://upload.wikimedia.org/wikipedia/commons/e/e9/RWS_Minor_Swords_13.jpg",
  sw14: "https://upload.wikimedia.org/wikipedia/commons/8/82/RWS_Minor_Swords_14.jpg",
  // PENTACLES
  pe01: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Minor_Pents_01.jpg",
  pe02: "https://upload.wikimedia.org/wikipedia/commons/8/84/RWS_Minor_Pents_02.jpg",
  pe03: "https://upload.wikimedia.org/wikipedia/commons/c/c7/RWS_Minor_Pents_03.jpg",
  pe04: "https://upload.wikimedia.org/wikipedia/commons/3/32/RWS_Minor_Pents_04.jpg",
  pe05: "https://upload.wikimedia.org/wikipedia/commons/5/5c/RWS_Minor_Pents_05.jpg",
  pe06: "https://upload.wikimedia.org/wikipedia/commons/c/c0/RWS_Minor_Pents_06.jpg",
  pe07: "https://upload.wikimedia.org/wikipedia/commons/9/92/RWS_Minor_Pents_07.jpg",
  pe08: "https://upload.wikimedia.org/wikipedia/commons/2/2e/RWS_Minor_Pents_08.jpg",
  pe09: "https://upload.wikimedia.org/wikipedia/commons/d/d1/RWS_Minor_Pents_09.jpg",
  pe10: "https://upload.wikimedia.org/wikipedia/commons/3/36/RWS_Minor_Pents_10.jpg",
  pe11: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Minor_Pents_11.jpg",
  pe12: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Minor_Pents_12.jpg",
  pe13: "https://upload.wikimedia.org/wikipedia/commons/7/73/RWS_Minor_Pents_13.jpg",
  pe14: "https://upload.wikimedia.org/wikipedia/commons/b/b5/RWS_Minor_Pents_14.jpg"
};

export const FALLBACK_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/2/24/RWS_Tarot_card_back.jpg";

export function getCardImageUrl(cardCode) {
  return TAROT_IMAGE_MAP[cardCode] || FALLBACK_IMAGE;
}