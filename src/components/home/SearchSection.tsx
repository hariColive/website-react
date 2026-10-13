import SearchBox from "./SearchBox";

export default function SearchSection() {
  return (
    <section className="bg-white px-2 py-16 text-center md:px-10 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3.5 font-serif text-[13px] tracking-[0.3em] text-gray-400">Search Colive</p>

        <h2 className="mb-2.5 font-head text-4xl leading-none tracking-[-0.025em] text-[#111] sm:text-[clamp(1.5rem,6vw,4.5rem)] md:mb-5 md:text-[clamp(2.5rem,6vw,4.5rem)]">
          Find a 6-Star Home
        </h2>

        <p className="mx-auto mb-10 max-w-140 text-[17px] leading-[1.6] text-gray-500">
          Type a locality, a property, a room type or an amenity — we will narrow it down to homes that fit you.
        </p>

        <SearchBox />
      </div>
    </section>
  );
}
