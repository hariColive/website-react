"use client";

import { useState } from "react";

const People = () => {
  const team = [
    {
      image: "SRK.png",
      alt: "SRK",
      name: "SRK",
      role: "Founder & CEO",
      description: "The one person in the company who reads every email",
    },
    {
      image: "SS.png",
      alt: "SS",
      name: "Ess Ess",
      role: "Chief Business Officer",
      description: "Always gets the yes. Hence leader of business",
    },
    {
      image: "CFO.png",
      alt: "Harsha Shetty",
      name: "Happiness",
      role: "CFO",
      description: "Money cannot buy him, but he spreads joy in all math",
    },
    {
      image: "VV.png",
      alt: "VV",
      name: "Vee Vee",
      role: "Chief Growth Officer",
      description: "Responsible for big victories and overall brand growth",
    },
    {
      image: "Rishi.png",
      alt: "Carry",
      name: "Monk",
      role: "Chief Operating Officer",
      description:
        "Ensures that we are customer-centric, bold & disruptive at the same time",
    },
    {
      image: "carry.png",
      alt: "Carry",
      name: "Carry",
      role: "BD Lead",
      description: "Carries the entire weight of supply acquisition",
    },
    {
      image: "Sundari.png",
      alt: "Queen",
      name: "Queen",
      role: "Quality & Ops",
      description:
        "She keeps the ship sailing smooth & ensures that Brand Colive lives up to its 6-Star promise.",
    },
    {
      image: "Adarsha.png",
      alt: "Ideals",
      name: "Ideals",
      role: "Head of Revenue",
      description:
        "He brings the moolah in, so that Colive can continue to be a world-class experience for residents & employees.",
    },
  ];

  const anchors = ["1.png", "2.png", "3.png"];
  const [activeIndex, setActiveIndex] = useState(0);



  return (
    <>
      {/* Hero */}
      <section className="!bg-black !bg-[url('/images/peopleimg/Hero.png')] !bg-cover !bg-[position:center_10%] !bg-no-repeat">
        <div className="!relative !z-[2] !p-[10%] !pt-[20%] !text-center !text-white max-[575px]:!pt-[40px] min-[710px]:max-[750px]:!pt-[125px] min-[768px]:max-[1024px]:!pt-[150px]">
          <div className="!pt-[5%]">
            <h1 className="!m-0 !min-h-[144px] !text-[60px] !font-bold !leading-normal !text-[#42d966] ![text-shadow:5px_3px_4px_#000000] max-[575px]:!min-h-[65px] max-[575px]:!pt-[12%] max-[575px]:!text-[20px] max-[575px]:!leading-[1.3] min-[576px]:max-[767px]:!text-[42px] min-[768px]:max-[1023px]:!text-[50px] min-[1024px]:max-[1280px]:!text-[54px] min-[710px]:max-[750px]:!min-h-[104px]">
              Meet the{" "}
              <span className="!text-white ![text-shadow:2px_2px_4px_#000000]">
                People
              </span>
              <br />
              behind the magic
            </h1>

            <p className="!mt-[3%] !text-white ![text-shadow:2px_2px_4px_#000000] max-[575px]:!px-5 max-[575px]:!text-[12px]">
              A cultural taskforce that works 24x7 to ensure that
              <br className="max-[575px]:!hidden" />
              Colive residents live the life they deserve.
            </p>
          </div>
        </div>
      </section>

      <main>
        {/* 6-Star Superstars */}
        <section className="!bg-black !pt-[18%] max-[1366px]:!pt-0 min-[1440px]:!pt-[1%] max-[575px]:!pt-[12%] max-[575px]:!pb-[10%] min-[1024px]:max-[1140px]:!pt-[12%] min-[710px]:max-[750px]:!pt-[5%]">
          <div className="!mx-auto !w-full !px-3">
            <div className="!px-0 !py-[5%] !text-center">
              <h2 className="!m-0 !font-bold !text-white">
                <span className="!text-[#42d966]">Our 6-Star</span> Superstars
              </h2>

              <p className="!mt-[3%] !text-white max-[575px]:!text-[12px]">
                Top performers of the month
              </p>
            </div>

            <div
              id="teamCorousel"
              className="team-carousel !flex !flex-wrap !justify-center !gap-[30px]"
            >
              {/* Add superstar cards here when their data is available. */}
            </div>
          </div>
        </section>

        {/* Recognizing Org Anchors */}
        <section className="!bg-black !px-0 !pt-[80px] !text-center max-[575px]:!pt-0">
          <div className="!mx-auto !w-full !max-w-[800px] !px-3">
            <h2 className="!m-0 !text-[34px] !font-bold !text-[#00e38c] max-[575px]:!text-[28px]">
              Recognizing Org Anchors
            </h2>

            <p className="!mb-[50px] !mt-0 !text-[#cfcfcf] max-[575px]:!mb-5">
              Rewards &amp; Recognition on Colive’s 10th Anniversary
            </p>
<div className="relative mx-auto w-full max-w-[800px]">
  <div className="overflow-hidden">
    <div className="flex items-center justify-center">
      <img
        src={`/images/peopleimg/${anchors[activeIndex]}`}
        alt={`Colive anniversary event ${activeIndex + 1}`}
        className="block h-auto w-full object-cover"
      />
    </div>
  </div>

  <button
    type="button"
    onClick={() =>
      setActiveIndex((prev) =>
        prev === 0 ? anchors.length - 1 : prev - 1
      )
    }
    aria-label="Previous image"
    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-[#00e38c] px-3 py-2 text-xl text-black"
  >
    &#10094;
  </button>

  <button
    type="button"
    onClick={() =>
      setActiveIndex((prev) =>
        prev === anchors.length - 1 ? 0 : prev + 1
      )
    }
    aria-label="Next image"
    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#00e38c] px-3 py-2 text-xl text-black"
  >
    &#10095;
  </button>
</div>
          </div>
        </section>

        {/* YouTube */}
        <section className="!bg-black !px-0 !pb-[80px] !text-white max-[575px]:!pb-[30px]">
          <div className="!mx-auto !w-full !px-3">
            <div className="!text-center">
              <h2 className="!m-0 !font-bold !text-white">
                <span className="!text-[#00e38c]">Colive</span> on YouTube
              </h2>

              <p className="!mt-[3%] !text-white max-[575px]:!text-[12px]">
                Watch highlights from our 10th Anniversary Celebration
              </p>
            </div>

            <div className="!mx-auto !mt-6 !w-full lg:!w-2/3">
              <div className="!relative !h-0 !overflow-hidden !rounded-md !pb-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/s8qLkOW7Py8?autoplay=1&mute=1&loop=1&playlist=s8qLkOW7Py8&controls=0&modestbranding=1&rel=0"
                  title="Colive 10th Anniversary Celebration"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="!absolute !left-0 !top-0 !h-full !w-full !border-0 !rounded-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* The Ship's Engine */}
        <section className="!bg-black !py-[80px] !text-white max-[575px]:!py-10">
          <div className="!mx-auto !w-full !px-3">
            <div className="!text-center">
              <h2 className="!m-0 !font-bold !text-white">
                <span className="!text-[#42d966]">The Ship’s</span> Engine
              </h2>
            </div>

            <div className="!grid !grid-cols-2 !justify-center !gap-x-6 !gap-y-8 md:!grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="!mt-4 !text-center md:!mt-5"
                >
                  <img
                    src={`/images/peopleimg/${member.image}`}
                    loading="lazy"
                    alt={member.alt}
                    className="!mx-auto !mb-[15px] !h-[200px] !w-[200px] !rounded-full !object-cover max-[575px]:!h-[100px] max-[575px]:!w-[100px]"
                  />

                  <h6 className="!mb-[2px] !text-[20px] !font-normal !text-[#00ff9c]">
                    {member.name}
                  </h6>

                  <small className="!mb-[10px] !block !text-base !font-semibold !text-white max-[575px]:!text-[14px]">
                    {member.role}
                  </small>

                  <p className="!mx-auto !max-w-[220px] !text-[0.85rem] !leading-[1.5] !text-white">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer image */}
        <section>
          <div className="pageFooter">
            <img
              src="/images/peopleimg/Footer.png"
              loading="lazy"
              className="!block !h-auto !w-full !max-w-full"
              alt="Colive footer"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default People;