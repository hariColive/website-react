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
      { label: "Community", href: "/club" },
      { label: "Reviews", href: "/reviews" },
      { label: "We are Social", href: "/social" },
      { label: "Promises", href: "/promises" },
      { label: "Message To Ceo", href: "/message-to-ceo" },
      { label: "Virtual Escalation", href: "/virtual-escalation" },
      { label: "Reels", href: "/reels" },
      { label: "Experience", href: "/experience" },
      { label: "Club Colive", href: "/club-colive" },
      { label: "Cuddle Packages", href: "/cuddle-packages" },
      { label: "Value Added Services", href: "/promises/service" },
      { label: "Hybrid Integrated Pods", href: "/hip" },
      { label: "C-Suites", href: "/csuites" },
      { label: "Educity", href: "/educity" },
      { label: "HIP", href: "/hip" },
      { label: "Bharat Skill Tech (BST)", href: "/bst" },
    ],
  },
  {
    id: "about",
    title: "About Us",
    icon: "/images/sidemenu/about.png",
    links: [
      { label: "Our Team", href: "/aboutus" },
      { label: "Awards & Recognition", href: "/aboutus/awards-and-recognition" },
      ...placeholder(["Our Partners", "Press"]),
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
