/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import AskPriestess from './pages/AskPriestess';
import Bookings from './pages/Bookings';
import Calendar from './pages/Calendar';
import ChakraHub from './pages/ChakraHub';
import Dashboard from './pages/Dashboard';
import DreamInterpreter from './pages/DreamInterpreter';
import FullMoonCircles from './pages/FullMoonCircles';
import Home from './pages/Home';
import IntentionBuilder from './pages/IntentionBuilder';
import Library from './pages/Library';
import LiveReading from './pages/LiveReading';
import LunaCredits from './pages/LunaCredits';
import ShadowJournal from './pages/ShadowJournal';
import VioletAdmin from './pages/VioletAdmin';
import TarotLearning from './pages/TarotLearning';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AskPriestess": AskPriestess,
    "Bookings": Bookings,
    "Calendar": Calendar,
    "ChakraHub": ChakraHub,
    "Dashboard": Dashboard,
    "DreamInterpreter": DreamInterpreter,
    "FullMoonCircles": FullMoonCircles,
    "Home": Home,
    "IntentionBuilder": IntentionBuilder,
    "Library": Library,
    "LiveReading": LiveReading,
    "LunaCredits": LunaCredits,
    "ShadowJournal": ShadowJournal,
    "VioletAdmin": VioletAdmin,
    "TarotLearning": TarotLearning,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};