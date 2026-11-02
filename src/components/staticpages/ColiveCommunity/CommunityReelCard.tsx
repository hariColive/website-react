type CommunityReelCardProps = {
  id?: string | number;
  title?: string;
  thumbnail?: string;
  videoUrl?: string;
  propertyName?: string;
  bidUrl?: string;
};

export default function CommunityReelCard({
  title,
  thumbnail,
  videoUrl,
  propertyName,
  bidUrl,
}: CommunityReelCardProps) {
  const reelTitle = title || propertyName || "Colive reel";
  const targetUrl = videoUrl || "#";
  const bidLink = bidUrl || "#";

  return (
    <>
      <style>{`
        @keyframes community-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-30%); }
        }
      `}</style>

      <article className="relative overflow-hidden rounded-[20px]">
        <a
          href={targetUrl}
          target={targetUrl.startsWith("http") ? "_blank" : undefined}
          rel={targetUrl.startsWith("http") ? "noreferrer" : undefined}
          data-fancybox="community-reels"
          className="group relative block"
        >
          <img
            src={thumbnail || "/assets/images/party/PartyBannerImage-Web.webp"}
            alt={reelTitle}
            loading="lazy"
            className="h-[400px] w-full rounded-[20px] object-cover md:h-[450px]"
          />

          <span className="absolute inset-0 rounded-[20px] bg-black/10" aria-hidden="true" />

          <i
            className="fa fa-play-circle absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[50px] text-white"
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 bottom-0 flex h-[30px] items-center justify-between gap-2 rounded-b-[10px] bg-[#00000059] px-3 text-white">
            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
              <i className="fa fa-user text-[12px]" aria-hidden="true" />
              <div className="min-w-0 flex-1 overflow-hidden">
                <span
                  className="block whitespace-nowrap text-[12px] font-semibold"
                  style={{
                    animation: "community-marquee 8s linear infinite",
                  }}
                  title={reelTitle}
                >
                  {reelTitle}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (bidLink && bidLink !== "#") {
                  window.open(bidLink, "_blank", "noopener,noreferrer");
                }
              }}
              className="rounded-[0px] bg-[#e91e63] px-[6px] py-[1px] text-[10px] font-medium text-white transition-colors hover:bg-[#d81b60]"
            >
              Bid Now
            </button>
          </div>
        </a>
      </article>
    </>
  );
}
