import HeroSection from "@/components/home/HeroSection";
import SearchSection from "@/components/home/SearchSection";
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900">
          Why Choose Colive?
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Comfortable Living",
              description:
                "Discover spaces designed for convenient everyday living.",
            },
            {
              title: "Multiple Locations",
              description:
                "Explore accommodation options in your preferred city.",
            },
            {
              title: "Easy Search",
              description:
                "Find suitable properties based on your requirements.",
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-gray-200 p-6"
            >
              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 leading-6 text-gray-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
