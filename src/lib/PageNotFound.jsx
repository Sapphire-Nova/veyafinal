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

// Tarot Image Base URL - GitHub raw content
export const TAROT_BASE_URL = "https://raw.githubusercontent.com/Sapphire-Nova/veyafinal/fdc264e4ccc7b042384b139a4dd31a7f5c9afa5c/";

// Card filename mapping from card codes
const CARD_FILENAME_MAP = {
  // MAJOR ARCANA (0-21)
  ar00: "00-TheFool.jpg",
  ar01: "01-TheMagician.jpg",
  ar02: "02-TheHighPriestess.jpg",
  ar03: "03-TheEmpress.jpg",
  ar04: "04-TheEmperor.jpg",
  ar05: "05-TheHierophant.jpg",
  ar06: "06-TheLovers.jpg",
  ar07: "07-TheChariot.jpg",
  ar08: "08-Strength.jpg",
  ar09: "09-TheHermit.jpg",
  ar10: "10-WheelOfFortune.jpg",
  ar11: "11-Justice.jpg",
  ar12: "12-TheHangedMan.jpg",
  ar13: "13-Death.jpg",
  ar14: "14-Temperance.jpg",
  ar15: "15-TheDevil.jpg",
  ar16: "16-TheTower.jpg",
  ar17: "17-TheStar.jpg",
  ar18: "18-TheMoon.jpg",
  ar19: "19-TheSun.jpg",
  ar20: "20-Judgement.jpg",
  ar21: "21-TheWorld.jpg",
  // WANDS (1-14)
  wa01: "22-AceOfWands.jpg",
  wa02: "23-TwoOfWands.jpg",
  wa03: "24-ThreeOfWands.jpg",
  wa04: "25-FourOfWands.jpg",
  wa05: "26-FiveOfWands.jpg",
  wa06: "27-SixOfWands.jpg",
  wa07: "28-SevenOfWands.jpg",
  wa08: "29-EightOfWands.jpg",
  wa09: "30-NineOfWands.jpg",
  wa10: "31-TenOfWands.jpg",
  wa11: "32-PageOfWands.jpg",
  wa12: "33-KnightOfWands.jpg",
  wa13: "34-QueenOfWands.jpg",
  wa14: "35-KingOfWands.jpg",
  // CUPS (1-14)
  cu01: "36-AceOfCups.jpg",
  cu02: "37-TwoOfCups.jpg",
  cu03: "38-ThreeOfCups.jpg",
  cu04: "39-FourOfCups.jpg",
  cu05: "40-FiveOfCups.jpg",
  cu06: "41-SixOfCups.jpg",
  cu07: "42-SevenOfCups.jpg",
  cu08: "43-EightOfCups.jpg",
  cu09: "44-NineOfCups.jpg",
  cu10: "45-TenOfCups.jpg",
  cu11: "46-PageOfCups.jpg",
  cu12: "47-KnightOfCups.jpg",
  cu13: "48-QueenOfCups.jpg",
  cu14: "49-KingOfCups.jpg",
  // SWORDS (1-14)
  sw01: "50-AceOfSwords.jpg",
  sw02: "51-TwoOfSwords.jpg",
  sw03: "52-ThreeOfSwords.jpg",
  sw04: "53-FourOfSwords.jpg",
  sw05: "54-FiveOfSwords.jpg",
  sw06: "55-SixOfSwords.jpg",
  sw07: "56-SevenOfSwords.jpg",
  sw08: "57-EightOfSwords.jpg",
  sw09: "58-NineOfSwords.jpg",
  sw10: "59-TenOfSwords.jpg",
  sw11: "60-PageOfSwords.jpg",
  sw12: "61-KnightOfSwords.jpg",
  sw13: "62-QueenOfSwords.jpg",
  sw14: "63-KingOfSwords.jpg",
  // PENTACLES (1-14)
  pe01: "64-AceOfPentacles.jpg",
  pe02: "65-TwoOfPentacles.jpg",
  pe03: "66-ThreeOfPentacles.jpg",
  pe04: "67-FourOfPentacles.jpg",
  pe05: "68-FiveOfPentacles.jpg",
  pe06: "69-SixOfPentacles.jpg",
  pe07: "70-SevenOfPentacles.jpg",
  pe08: "71-EightOfPentacles.jpg",
  pe09: "72-NineOfPentacles.jpg",
  pe10: "73-TenOfPentacles.jpg",
  pe11: "74-PageOfPentacles.jpg",
  pe12: "75-KnightOfPentacles.jpg",
  pe13: "76-QueenOfPentacles.jpg",
  pe14: "77-KingOfPentacles.jpg"
};

export function getCardImageUrl(cardCode) {
  const filename = CARD_FILENAME_MAP[cardCode];
  return filename ? TAROT_BASE_URL + filename : TAROT_BASE_URL + "00-TheFool.jpg";
}