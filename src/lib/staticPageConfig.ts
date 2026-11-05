import type { ComponentType } from "react";

import AwardsAndRecognition from "@/components/staticpages/aboutus/AwardsAndRecognition";
import OurTeam from "@/components/staticpages/aboutus/OurTeam";
import People from "@/components/staticpages/aboutus/People";
import ContactUs from "@/components/staticpages/contactus/ContactUs";

const staticPageConfig: Record<string, ComponentType> = {
  contactus: ContactUs,
  "contact-us": ContactUs,
  "aboutus/our-team": OurTeam,
  "aboutus/awards-and-recognition": AwardsAndRecognition,
  "aboutus/people": People,
};

export default staticPageConfig;