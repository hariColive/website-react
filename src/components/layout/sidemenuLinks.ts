// TODO: replace each "#" with the real route once the page is built.
export type SidemenuLink = { label: string; href: string; external?: boolean };

export type SidemenuSection = {
  id: string;
  title: string;
  icon: string;
  links: SidemenuLink[];
};

const placeholder = (labels: string[]): SidemenuLink[] =>
  labels.map((label) => ({ label, href: "#" }));

export const sidemenuSections: SidemenuSection[] = [
  {
    id: "activities",
    title: "My Activities & Payments",
    icon: "/images/sidemenu/activities.png",
    links: placeholder(["Bookings", "Bookings Upgrade", "Co-tenant", "Dues", "My Schedules", "My Events"]),
  },
  {
    id: "money",
    title: "Money Matters",
    icon: "/images/sidemenu/money.png",
    links: placeholder(["My Passbook", "Deals & Offers", "Refer & Earn", "My Bidding", "Citil", "Pay"]),
  },
  {
    id: "community",
    title: "Colive community",
    icon: "/images/sidemenu/community.png",
    links: placeholder([
      "Community",
      "Reviews",
      "We are Social",
      "Promises",
      "Message To Ceo",
      "Virtual Escalation",
      "Reels",
      "Experience",
      "Club Colive",
      "Cuddle Packages",
      "Value Added Services",
      "Hybrid Integrated Pods",
      "C-Suites",
      "Educity",
      "Bharath Skill Tech",
    ]),
  },
  {
    id: "about",
    title: "About Us",
    icon: "/images/sidemenu/about.png",
    links: placeholder(["Our Team", "Awards & Recognition", "Our Partners", "Press", "People"]),
  },
];

export const appStoreLinks = [
  {
    label: "Get it on Google Play",
    href: "https://play.google.com/store/apps/details?id=com.colivecustomerapp.android",
    image: "/images/sidemenu/google-play.png",
  },
  {
    label: "Download on the App Store",
    href: "https://apps.apple.com/in/app/colive/id1341694959",
    image: "/images/sidemenu/app-store.png",
  },
];
