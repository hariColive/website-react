import SearchHeroSection from "@/components/common/searchsection/SearchHeroSection";
import SearchListing from "@/app/search/SearchListing";

export default function BangaloreRentalsPage() {
  return (
    <>
      <SearchHeroSection location="Bangalore" />
      <SearchListing location="Bangalore" />
    </>
  );
}
