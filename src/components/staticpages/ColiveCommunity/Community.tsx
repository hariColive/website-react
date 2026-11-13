
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import CommunityEventCard from "@/components/staticpages/ColiveCommunity/CommunityEventCard";
import CommunityReelCard from "@/components/staticpages/ColiveCommunity/CommunityReelCard";
import { getEventsDetails, getReelsDetails } from "@/lib/coliveApi";

type PartyEvent = {
  id: string | number;
  title: string;
  description?: string;
  image: string;
  date?: string;
  time?: string;
  link?: string;
};

type PartyReel = {
  id: string | number;
  thumbnail: string;
  videoUrl: string;
  title?: string;
};

type PartyPageProps = {
  upcomingEvents?: PartyEvent[];
  completedEvents?: PartyEvent[];
  reels?: PartyReel[];
};

const partyImages = [
  "/images/party/partyImages/party1.png",
  "/images/party/partyImages/party2.png",
  "/images/party/partyImages/party3.png",
  "/images/party/partyImages/party4.png",
];

const testimonials = [
  {
    review:
      "Very simple and easy to use. Colive has given one of the best experience of living in a single room with free kind of environment",
    name: "Abhishek Kumar",
    property: "Signature Towers",
  },
  {
    review:
      "Awesome place! Awesome people! Didn’t think renting a place in Bangalore will be so easy and painless 1 month deposit. I couldn’t believe until I booked and that was the biggest reason for me to go for colive",
    name: "Anoop Chauwdry",
    property: "Colive Sunrise",
  },
];

function EventList({
  events,
  type,
}: {
  events: PartyEvent[];
  type: "upcoming" | "completed";
}) {
  const [showAll, setShowAll] = useState(false);

  const visibleEvents = showAll ? events : events.slice(0, 3);

  return (
    <div>
      {events.length === 0 ? (
        type === "upcoming" ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <h4 className="mb-3 text-[20px] font-semibold md:text-[40px]">
              Oh Oh!
            </h4>
            <p className="mb-5 text-[16px] text-[#555555] md:text-[25px]">
              No Upcoming Events Currently
            </p>
          </div>
        ) : (
          <div className="py-10 text-center text-gray-500">
            No Completed Events Currently
          </div>
        )
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {visibleEvents.map((event) => (
              <CommunityEventCard
                key={event.id}
                id={event.id}
                title={event.title}
                image={event.image}
                address={event.description}
                date={event.date}
                time={event.time}
                detailsUrl={event.link}
              />
            ))}
          </div>

          {events.length > 3 && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="mt-5 h-10 w-[140px] rounded-[5px] border border-[#F2006C] bg-[#F2006C] text-[16px] text-white transition hover:bg-white hover:text-[#F2006C] md:text-[18px]"
              >
                {showAll ? "View less" : "View more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function PartyPage({
  upcomingEvents = [],
  completedEvents = [],
  reels = [],
}: PartyPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [eventTab, setEventTab] = useState<"upcoming" | "completed">(
    "upcoming"
  );

  const [galleryTab, setGalleryTab] = useState<"images" | "reels">("images");
  const [fetchedReels, setFetchedReels] = useState<PartyReel[]>([]);
  const [fetchedUpcomingEvents, setFetchedUpcomingEvents] = useState<PartyEvent[]>([]);
  const [fetchedCompletedEvents, setFetchedCompletedEvents] = useState<PartyEvent[]>([]);
  const reelItems = (reels.length > 0 ? reels : fetchedReels).slice(0, 4);
  const resolvedUpcomingEvents =
    upcomingEvents.length > 0 ? upcomingEvents : fetchedUpcomingEvents;
  const resolvedCompletedEvents =
    completedEvents.length > 0 ? completedEvents : fetchedCompletedEvents;

  useEffect(() => {
    const showReelsFromHash = () => {
      if (pathname !== "/reels" && window.location.hash !== "#reels") return;
      setGalleryTab("reels");
      window.requestAnimationFrame(() => {
        document.getElementById("reels")?.scrollIntoView();
      });
    };

    showReelsFromHash();
    window.addEventListener("hashchange", showReelsFromHash);
    return () => window.removeEventListener("hashchange", showReelsFromHash);
  }, [pathname]);

  useEffect(() => {
    if (reels.length > 0) return;

    const controller = new AbortController();

    getReelsDetails(0, controller.signal)
      .then((items) => {
        if (controller.signal.aborted) return;
        setFetchedReels(
          items.map((item, index) => ({
            id: item.ReelsId ?? `${item.LocationLink ?? "reel"}-${index}`,
            thumbnail:
              item.Image ||
              item.ReelsFile ||
              "/images/party/partyImages/party1.png",
            videoUrl: item.ReelsFile || "#",
            title: item.FileName || item.LocationName || "Colive reel",
          }))
        );
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          console.error("Failed to load reels:", error);
          setFetchedReels([]);
        }
      });

    return () => controller.abort();
  }, [reels.length]);

  useEffect(() => {
    if (upcomingEvents.length > 0 || completedEvents.length > 0) return;

    const controller = new AbortController();

    getEventsDetails("", controller.signal)
      .then((allEvents) => {
        if (controller.signal.aborted) return;

        const mapped = allEvents.map((event, index) => ({
          id: event.EventId ?? event.EventCode ?? `${event.Title ?? "event"}-${index}`,
          title: event.EventName || event.Title || "Colive event",
          description: event.Description || event.EventDescription || undefined,
          image:
            event.Image ||
            event.EventImage ||
            "/images/party/partyImages/party1.png",
          date: event.EventDate || event.Date || event.StartDate || undefined,
          time: event.EventTime || event.Time || undefined,
          link: event.Link || event.EventUrl || undefined,
        }));

        const today = new Date();
        const upcoming = mapped.filter((event) => {
          if (!event.date) return true;
          const eventDate = new Date(event.date);
          return Number.isFinite(eventDate.getTime())
            ? eventDate >= today
            : true;
        });
        const completed = mapped.filter((event) => !upcoming.includes(event));

        setFetchedUpcomingEvents(upcoming);
        setFetchedCompletedEvents(completed);
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          console.error("Failed to load events:", error);
          setFetchedUpcomingEvents([]);
          setFetchedCompletedEvents([]);
        }
      });

    return () => controller.abort();
  }, [completedEvents.length, upcomingEvents.length]);

  return (
    <main className="overflow-hidden font-[Inter-Regular,Inter,sans-serif]">

      {/* 1. PARTIES AT COLIVE */}

      <section
        onClick={() => router.push("/hubs")}
        className="mt-[20px] h-[600px] cursor-pointer bg-[url('/images/party/PartyBannerImage-Web.webp')] bg-cover bg-no-repeat md:h-[620px] max-md:bg-[url('/images/party/PartyBannerImage-Mob.webp')] max-md:bg-bottom"
      >
        <div className="mx-auto w-[calc(100%-50px)] max-w-none lg:w-[calc(100%-100px)]">
          <div className="pt-[60px] md:pt-[100px]">
            <h1 className="text-[25px] font-semibold text-white md:text-[60px]">
              Parties at Colive
            </h1>

            <p className="py-5 text-[14px] font-normal leading-[21px] text-white md:text-[23px] md:leading-[38px]">
              We party every weekend at our flagship Club Colive Hubs! Join us
              <br className="max-md:hidden" /> to meet, dance, date &amp; network
              in your Colive community
            </p>

            <div className="flex w-[320px] items-center max-md:mx-auto md:w-[455px]">
              <div className="w-1/3">
                <h6 className="text-[20px] font-semibold text-[#F2006C] md:text-[35px]">
                  4132+
                </h6>
                <label className="mt-2 block text-[16px] text-white md:mt-[10px] md:text-[23px]">
                  Singles
                </label>
              </div>

              <div className="flex w-1/3 justify-center">
                <div className="h-0 w-[50px] rotate-90 border-t border-dashed border-white md:w-[75px]" />
              </div>

              <div className="w-1/3">
                <h6 className="text-[20px] font-semibold text-[#F2006C] md:text-[35px]">
                  189+
                </h6>
                <label className="mt-2 block text-[16px] text-white md:mt-[10px] md:text-[23px]">
                  Couples
                </label>
              </div>
            </div>

            <div className="mt-7 flex justify-center md:mt-[35px] md:justify-start">
              <a
                href="/hubs"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-[160px] items-center justify-center rounded-[5px] bg-[#F2006C] text-[16px] font-medium text-white transition hover:bg-[#d90060] md:h-[50px] md:w-[200px] md:text-[20px]"
              >
                View Party Hubs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLUB COLIVE PARTIES */}

      <section className="py-[7%] md:py-[5%]">
        <div className="mx-auto w-[calc(100%-50px)] lg:w-[calc(100%-100px)]">
          <h2 className="text-center text-[20px] font-semibold text-black md:text-[40px]">
            Club Colive Parties
          </h2>

          <p className="py-[15px] text-center text-[12px] font-normal text-black md:text-[20px]">
            Check this calendar on Mondays so that you don’t forget the venue
            by the time
            <br className="max-md:hidden" /> you hit the road on the weekend!
          </p>

          <div className="mt-1">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setEventTab("upcoming")}
                className={`flex h-10 w-[150px] items-center justify-center rounded-l-full border text-[14px] font-normal transition md:h-[45px] md:w-[200px] md:text-[18px] ${
                  eventTab === "upcoming"
                    ? "border-[#F2006C] bg-[#F2006C]/10 text-[#F2006C]"
                    : "border-black text-black"
                }`}
              >
                Upcoming Events
              </button>

              <button
                type="button"
                onClick={() => setEventTab("completed")}
                className={`flex h-10 w-[150px] items-center justify-center rounded-r-full border text-[14px] font-normal transition md:h-[45px] md:w-[200px] md:text-[18px] ${
                  eventTab === "completed"
                    ? "border-[#F2006C] bg-[#F2006C]/10 text-[#F2006C]"
                    : "border-black text-black"
                }`}
              >
                Completed Events
              </button>
            </div>

            <div className="mt-[30px] md:mt-[45px]">
              {eventTab === "upcoming" ? (
                <EventList events={resolvedUpcomingEvents} type="upcoming" />
              ) : (
                <EventList events={resolvedCompletedEvents} type="completed" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOME AWAY FROM HOME */}

      <section id="reels" className="scroll-mt-24 py-[5%] md:pb-[4%] md:pt-0">
        <div className="mx-auto w-[calc(100%-50px)] lg:w-[calc(100%-100px)]">
          <h2 className="mb-5 text-center text-[20px] font-semibold text-black md:mb-[30px] md:text-[35px]">
            Home Away From Home
          </h2>

          <div className="relative">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setGalleryTab("images")}
                className={`flex h-10 w-[95px] items-center justify-center rounded-l-full border text-[14px] transition md:h-[45px] md:w-[200px] md:text-[18px] ${
                  galleryTab === "images"
                    ? "border-[#F2006C] bg-[#F2006C]/10 text-[#F2006C]"
                    : "border-black text-black"
                }`}
              >
                Images
              </button>

              <button
                type="button"
                onClick={() => setGalleryTab("reels")}
                className={`flex h-10 w-[95px] items-center justify-center rounded-r-full border text-[14px] transition md:h-[45px] md:w-[200px] md:text-[18px] ${
                  galleryTab === "reels"
                    ? "border-[#F2006C] bg-[#F2006C]/10 text-[#F2006C]"
                    : "border-black text-black"
                }`}
              >
                Reels
              </button>
            </div>

            {galleryTab === "images" ? (
              <>
                <div className="mt-[30px] grid grid-cols-1 gap-4 md:grid-cols-4">
                  {partyImages.map((image, index) => (
                    <a
                      key={image}
                      href={image}
                      target="_blank"
                      rel="noreferrer"
                      data-fancybox="gallery"
                      className={index > 0 ? "hidden md:block" : "block"}
                    >
                      <div className="overflow-hidden rounded-[5px]">
                        <img
                          src={image}
                          alt={`Colive party ${index + 1}`}
                          loading="lazy"
                          className="h-auto w-full rounded-[5px] object-cover transition duration-300 hover:scale-105"
                        />
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-5 flex justify-center md:absolute md:right-0 md:top-[15px] md:mt-0">
                  <a
                    href="/images/party/partyImages/party6.png"
                    data-fancybox="gallery"
                    className="flex items-center gap-[15px] text-[14px] font-normal text-[#F31175] md:text-[18px]"
                  >
                    View All
                    <span className="md:hidden">→</span>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div
                  id="reelslist"
                  className="mt-[30px] overflow-x-auto"
                >
                  <div className="flex gap-5 md:flex-row">
                    {reelItems.map((reel) => (
                      <div key={reel.id} className="min-w-[280px] flex-1 md:min-w-[330px]">
                        <CommunityReelCard
                          id={reel.id}
                          title={reel.title}
                          thumbnail={reel.thumbnail}
                          videoUrl={reel.videoUrl}
                          propertyName={reel.title}
                          bidUrl={reel.videoUrl}
                        />
                      </div>
                    ))}
                  </div>

                  {reelItems.length === 0 && (
                    <p className="py-10 text-center text-gray-500">
                      No reels available currently.
                    </p>
                  )}
                </div>

                <div className="mt-5 flex justify-center md:absolute md:right-0 md:top-[15px] md:mt-0">
                  <a
                    href="/reels"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-[15px] text-[14px] text-[#F31175] md:text-[18px]"
                  >
                    View All <span className="md:hidden">→</span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 4. PARTY SUGGESTIONS */}

      <section className="py-[5%] md:py-0">
        <div className="mx-auto w-[calc(100%-50px)] lg:w-[calc(100%-100px)]">
          <a
            href="mailto:marketing@colive.com"
            className="hidden md:block"
          >
            <img
              src="/images/party/suggestionsBanner-Web.webp"
              alt="Party suggestions"
              className="h-auto w-full"
              loading="lazy"
            />
          </a>

          <a
            href="mailto:marketing@colive.com"
            className="block md:hidden"
          >
            <img
              src="/images/party/suggestionsBanner-Mob.webp"
              alt="Party suggestions"
              className="h-auto w-full"
              loading="lazy"
            />
          </a>
        </div>
      </section>

      {/* 5. JOIN US */}

      <section className="mt-[5%] h-[500px] bg-[url('/images/party/joinUsImageMob.webp')] bg-cover bg-center bg-no-repeat px-5 py-[8.5%] md:h-[525px] md:bg-[url('/images/party/joinUsImageWeb.webp')] md:px-0 md:py-[3.5%]">
        <div className="mx-auto w-full lg:w-[calc(100%-100px)]">
          <div className="mb-5 md:mb-[25px]">
            <h6 className="mb-[3px] flex items-center gap-[15px] text-[14px] font-medium text-[#F2006C] md:text-[18px]">
              Weekly Premium Parties:
              <img
                src="/images/party/PremiumParties.png"
                alt="Premium parties"
                className="relative top-[-5px] w-[25px] md:w-auto"
              />
            </h6>
            <p className="text-[12px] font-normal leading-5 text-white md:text-[16px] md:leading-[30px]">
              Enjoy weekend parties at our top locations with complimentary
              snacks.
            </p>
          </div>

          <div className="mb-5 md:mb-[25px]">
            <h6 className="mb-[3px] flex items-center gap-[15px] text-[14px] font-medium text-[#F2006C] md:text-[18px]">
              Dynamic Atmosphere:
              <img
                src="/images/party/DynamicAtmo.png"
                alt="Dynamic atmosphere"
                className="relative top-[-5px] w-[25px] md:w-auto"
              />
            </h6>
            <p className="text-[12px] font-normal leading-5 text-white md:text-[16px] md:leading-[30px]">
              Dance floor follows the crowd, featuring Live Barbecue, Beer
              Pong, Stand-Up Comedy,
              <br className="hidden md:block" /> Costume Parties, and more.
            </p>
          </div>

          <div className="mb-5 md:mb-[25px]">
            <h6 className="mb-[3px] flex items-center gap-[15px] text-[14px] font-medium text-[#F2006C] md:text-[18px]">
              Community Connection:
              <img
                src="/images/party/CommunityConnection.png"
                alt="Community connection"
                className="relative top-[-5px] w-[25px] md:w-auto"
              />
            </h6>
            <p className="text-[12px] font-normal leading-5 text-white md:text-[16px] md:leading-[30px]">
              Connect with fellow members, fostering friendships, romance,
              camaraderie, and trust
            </p>
          </div>

          <div className="mb-5 md:mb-[25px]">
            <h6 className="mb-[3px] flex items-center gap-[15px] text-[14px] font-medium text-[#F2006C] md:text-[18px]">
              Join Us This Weekend:
              <img
                src="/images/party/cheers.png"
                alt="Cheers"
                className="relative top-[-5px] w-[25px] md:w-auto"
              />
            </h6>
            <p className="text-[12px] font-normal leading-5 text-white md:text-[16px] md:leading-[30px]">
              Don&apos;t miss the chance to hang out and have fun with us!
            </p>
          </div>

          <Link
            href="/club#sectionfive"
            className="mt-5 flex h-10 w-[125px] items-center justify-center rounded-[5px] border border-[#F2006C] text-[14px] font-medium text-[#F2006C] transition hover:bg-[#F2006C] hover:text-white md:mt-10 md:h-[45px] md:w-[190px] md:text-[18px]"
          >
            Join Us
          </Link>
        </div>
      </section>

      {/* 6. REACH OUT US */}

      <section className="bg-[url('/images/party/reachoutBanner-Mob.png')] bg-cover bg-no-repeat px-5 py-[7%] md:bg-[url('/images/party/reachoutBanner-Web.png')] md:px-0 md:py-[5%]">
        <div className="mx-auto w-full lg:w-[calc(100%-100px)]">
          <h2 className="text-center text-[20px] font-medium text-black md:text-[35px]">
            To know more details about Colive properties,{" "}
            <span className="text-[#F2006C]">you can reach out to us</span>
          </h2>

          <div className="mt-[30px] flex flex-wrap justify-center gap-4 md:gap-[25px]">
            <a
              href="http://wa.me/918050003274?text=Hi%20Colive!%20I%27m%20looking%20for%20a%20rental%20home"
              target="_blank"
              rel="noreferrer"
              className="flex h-[45px] w-[170px] items-center justify-center gap-[10px] rounded-[5px] border-2 border-[#2BAD2F] bg-[#2BAD2F] text-[14px] font-medium text-white transition hover:opacity-90 md:h-[50px] md:w-[190px] md:text-[18px]"
            >
              <img
                src="/images/party/whatsappImg.png"
                alt="WhatsApp"
                className="w-5"
              />
              Whatsapp now
            </a>

            <a
              href="tel:+917676000500"
              className="flex h-[45px] w-[170px] items-center justify-center gap-[10px] rounded-[5px] border-2 border-black text-[14px] font-medium text-black transition hover:bg-black hover:text-white md:h-[50px] md:w-[190px] md:text-[18px]"
            >
              <img
                src="/images/party/callNowImg.png"
                alt="Call"
                className="w-[23px]"
              />
              Call now
            </a>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}

      <section className="bg-[rgba(170,170,170,0.1)] px-5 pb-[1%] pt-[8%] md:px-0 md:pb-[1%] md:pt-[5%]">
        <div className="mx-auto w-full lg:w-[calc(100%-100px)]">
          <h2 className="mb-[30px] text-[20px] font-semibold text-black md:text-[35px]">
            Our customers are saying
          </h2>

          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="relative h-[365px] min-w-full snap-start p-0 md:h-[400px] md:min-w-[33.333%] md:p-5"
              >
                <div className="relative h-full min-h-[350px] rounded-[5px] bg-white p-5 shadow-sm md:min-w-[350px]">
                  <div className="mb-3 h-20 w-20 bg-[url('/public/images/home/category-icon.png')] bg-[-1050px_-560px] bg-no-repeat" />

                  <img
                    src="/images/party/ratingImage.png"
                    alt="Customer rating"
                    className="w-[115px] md:w-[140px]"
                  />

                  <p className="py-5 text-[14px] leading-[22px] text-black md:text-[17px] md:leading-[25px]">
                    {testimonial.review}
                  </p>

                  <div className="absolute bottom-5">
                    <p className="text-[18px] font-medium text-black md:text-[20px]">
                      {testimonial.name}
                    </p>
                    <label className="text-[14px] font-normal text-black md:text-[16px]">
                      {testimonial.property}
                    </label>
                  </div>
                </div>
              </div>
            ))}

            <div className="h-[365px] min-w-full snap-start md:h-[400px] md:min-w-[33.333%] md:p-5">
              <a
                href="https://www.youtube.com/embed/Be9L_dBH_yM?rel=0"
                target="_blank"
                rel="noreferrer"
                className="block h-full"
              >
                <img
                  src="/images/party/videoTestimonial1.png"
                  alt="Video testimonial"
                  className="h-full w-full rounded-[5px] object-cover"
                />
              </a>
            </div>

            <div className="h-[365px] min-w-full snap-start md:h-[400px] md:min-w-[33.333%] md:p-5">
              <a
                href="https://www.youtube.com/embed/Cg7F5TNCYPI?rel=0"
                target="_blank"
                rel="noreferrer"
                className="block h-full"
              >
                <img
                  src="/images/party/videoTestimonial2.png"
                  alt="Video testimonial"
                  className="h-full w-full rounded-[5px] object-cover"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
