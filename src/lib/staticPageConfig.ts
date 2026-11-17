import type { ComponentType } from "react";

import AwardsAndRecognition from "@/components/staticpages/aboutus/AwardsAndRecognition";
import OurTeam from "@/components/staticpages/aboutus/OurTeam";
import People from "@/components/staticpages/aboutus/People";
import ContactUs from "@/components/staticpages/contactus/ContactUs";
import Community from "@/components/staticpages/ColiveCommunity/Community";
import ReviewsPage from "@/components/staticpages/ColiveCommunity/ReviewsPage";
import MessageToCEOPage from "@/components/staticpages/ColiveCommunity/MessageToCEOPage";
import EscalationPage from "@/components/staticpages/ColiveCommunity/EscalationPage";
import ExperienceManagerPage from "@/components/staticpages/ColiveCommunity/ExperienceManagerPage";
import ClubColiveHubPage from "@/components/staticpages/ColiveCommunity/ClubColivePage";
import CoupleSpecialsPage from "@/components/staticpages/ColiveCommunity/CoupleSpecialsPage";
import VasPage from "@/components/staticpages/ColiveCommunity/VasPage";
import HIPPage from "@/components/staticpages/ColiveCommunity/HIPPage";
import Offers from "@/components/staticpages/offer/Offers";
import BSTPage from "@/components/staticpages/ColiveCommunity/BSTPage";
import EducityPage from "@/components/staticpages/ColiveCommunity/EducityPage";


const staticPageConfig: Record<string, ComponentType> = {
  contactus: ContactUs,
  "contact-us": ContactUs,
  "aboutus/our-team": OurTeam,
  "aboutus/awards-and-recognition": AwardsAndRecognition,
  "aboutus/people": People,
  community: Community,
  reviews: ReviewsPage,
  ceo:MessageToCEOPage,
  escalation:EscalationPage,
  experience:ExperienceManagerPage,
  club:ClubColiveHubPage,
  "cuddle/packages":CoupleSpecialsPage,
  vas:VasPage,
  hip:HIPPage,
  educity:EducityPage,
  bst:BSTPage,
};

export default staticPageConfig;