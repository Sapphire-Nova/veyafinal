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

// Tarot Image Base URL - GitHub main repo
export const TAROT_BASE_URL = "https://raw.githubusercontent.com/Sapphire-Nova/veyafinal/main/tarotcards/";

// Card filename mapping from card codes
const CARD_FILENAME_MAP = {
  // MAJOR ARCANA (0-21)
  ar00: "01-TheFool.jpg",
  ar01: "02-TheMagician.jpg",
  ar02: "03-TheHighPriestess.jpg",
  ar03: "04-TheEmpress.jpg",
  ar04: "05-TheEmperor.jpg",
  ar05: "06-TheHierophant.jpg",
  ar06: "07-TheLovers.jpg",
  ar07: "08-TheChariot.jpg",
  ar08: "09-Strength.jpg",
  ar09: "10-TheHermit.jpg",
  ar10: "11-WheelOfFortune.jpg",
  ar11: "12-Justice.jpg",
  ar12: "13-TheHangedMan.jpg",
  ar13: "14-Death.jpg",
  ar14: "15-Temperance.jpg",
  ar15: "16-TheDevil.jpg",
  ar16: "17-TheTower.jpg",
  ar17: "18-TheStar.jpg",
  ar18: "19-TheMoon.jpg",
  ar19: "20-TheSun.jpg",
  ar20: "21-Judgement.jpg",
  ar21: "22-TheWorld.jpg",
  // WANDS (1-14)
  wa01: "23-AceOfWands.jpg",
  wa02: "24-TwoOfWands.jpg",
  wa03: "25-ThreeOfWands.jpg",
  wa04: "26-FourOfWands.jpg",
  wa05: "27-FiveOfWands.jpg",
  wa06: "28-SixOfWands.jpg",
  wa07: "29-SevenOfWands.jpg",
  wa08: "30-EightOfWands.jpg",
  wa09: "31-NineOfWands.jpg",
  wa10: "32-TenOfWands.jpg",
  wa11: "33-PageOfWands.jpg",
  wa12: "34-KnightOfWands.jpg",
  wa13: "35-QueenOfWands.jpg",
  wa14: "36-KingOfWands.jpg",
  // CUPS (1-14)
  cu01: "37-AceOfCups.jpg",
  cu02: "38-TwoOfCups.jpg",
  cu03: "39-ThreeOfCups.jpg",
  cu04: "40-FourOfCups.jpg",
  cu05: "41-FiveOfCups.jpg",
  cu06: "42-SixOfCups.jpg",
  cu07: "43-SevenOfCups.jpg",
  cu08: "44-EightOfCups.jpg",
  cu09: "45-NineOfCups.jpg",
  cu10: "46-TenOfCups.jpg",
  cu11: "47-PageOfCups.jpg",
  cu12: "48-KnightOfCups.jpg",
  cu13: "49-QueenOfCups.jpg",
  cu14: "50-KingOfCups.jpg",
  // SWORDS (1-14)
  sw01: "51-AceOfSwords.jpg",
  sw02: "52-TwoOfSwords.jpg",
  sw03: "53-ThreeOfSwords.jpg",
  sw04: "54-FourOfSwords.jpg",
  sw05: "55-FiveOfSwords.jpg",
  sw06: "56-SixOfSwords.jpg",
  sw07: "57-SevenOfSwords.jpg",
  sw08: "58-EightOfSwords.jpg",
  sw09: "59-NineOfSwords.jpg",
  sw10: "60-TenOfSwords.jpg",
  sw11: "61-PageOfSwords.jpg",
  sw12: "62-KnightOfSwords.jpg",
  sw13: "63-QueenOfSwords.jpg",
  sw14: "64-KingOfSwords.jpg",
  // PENTACLES (1-14)
  pe01: "65-AceOfPentacles.jpg",
  pe02: "66-TwoOfPentacles.jpg",
  pe03: "67-ThreeOfPentacles.jpg",
  pe04: "68-FourOfPentacles.jpg",
  pe05: "69-FiveOfPentacles.jpg",
  pe06: "70-SixOfPentacles.jpg",
  pe07: "71-SevenOfPentacles.jpg",
  pe08: "72-EightOfPentacles.jpg",
  pe09: "73-NineOfPentacles.jpg",
  pe10: "74-TenOfPentacles.jpg",
  pe11: "75-PageOfPentacles.jpg",
  pe12: "76-KnightOfPentacles.jpg",
  pe13: "77-QueenOfPentacles.jpg",
  pe14: "78-KingOfPentacles.jpg"
};

export function getCardImageUrl(cardCode) {
  const filename = CARD_FILENAME_MAP[cardCode];
  return filename ? TAROT_BASE_URL + filename : TAROT_BASE_URL + "01-TheFool.jpg";
}