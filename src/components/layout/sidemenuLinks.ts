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
    links: [
      { label: "Community", href: "/community" },
      { label: "Reviews", href: "/reviews" },
      { label: "Message To Ceo", href: "/ceo" },
      { label: "Virtual Escalation", href: "/escalation" },
      { label: "Experience", href: "/experience" },
      { label: "Club Colive", href: "/club" },
      { label: "Cuddle Packages", href: "/cuddle/packages" },
      { label: "Value Added Services", href: "/vas" },
      ...placeholder([
        "We are Social",
        "Promises",
        "Reels",
        "Hybrid Integrated Pods",
        "C-Suites",
        "Educity",
        "Bharath Skill Tech",
      ]),
    ],
  },
  {
    id: "about",
    title: "About Us",
    icon: "/images/sidemenu/about.png",
    links: [
      { label: "Our Team", href: "/aboutus/our-team" },
      { label: "Awards & Recognition", href: "/aboutus/awards-and-recognition" },
      { label: "Our Partners", href: "#" },
      { label: "Press", href: "#" },
      { label: "People", href: "/aboutus/people" },
    ],
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
