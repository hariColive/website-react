import HeroSection from "@/components/home/HeroSection";
import CityLinksSection from "@/components/home/CityLinksSection";
import ColivingSection from "@/components/home/ColivingSection";
import CommunitySection from "@/components/home/CommunitySection";
import CorporateSection from "@/components/home/CorporateSection";
import EventSlider from "@/components/home/EventSlider";
import GatewaySection from "@/components/home/GatewaySection";
import HotspotSlider from "@/components/home/HotspotSlider";
import LocationsSection from "@/components/home/LocationsSection";
import PromiseSection from "@/components/home/PromiseSection";
import SearchSection from "@/components/home/SearchSection";
import VibesTV from "@/components/home/VibesTV";
import WalkthroughSection from "@/components/home/WalkthroughSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <ColivingSection />
      <EventSlider />
      <PromiseSection />
      <VibesTV />
      <CommunitySection />
      <CorporateSection />
      <HotspotSlider />
      <GatewaySection />
      <LocationsSection />
      <WalkthroughSection />
      <CityLinksSection />
    </>
  );
}
