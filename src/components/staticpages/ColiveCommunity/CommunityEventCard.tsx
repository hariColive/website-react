type CommunityEventCardProps = {
  id?: string | number;
  title?: string;
  image?: string;
  location?: string;
  address?: string;
  date?: string;
  time?: string;
  detailsUrl?: string;
};

export default function CommunityEventCard({
  title,
  image,
  location,
  address,
  date,
  time,
  detailsUrl,
}: CommunityEventCardProps) {
  const eventTitle = title || "Colive event";
  const eventAddress = address || location || "Location details available soon.";

  return (
    <article className="h-full overflow-hidden rounded-[5px] border border-[#E0E0E0] bg-white shadow-[0px_4px_40px_0px_rgba(0,0,0,0.1)]">
      <img
        src={image || "/images/party/partyImages/party1.png"}
        alt={eventTitle}
        loading="lazy"
        className="h-[339px] w-full rounded-t-[5px] object-cover"
      />

      <div className="px-4 pb-8 pt-4">
        <h5 className="text-[20px] font-semibold leading-[1.2] text-black">
          {eventTitle}
        </h5>

        <p
          title={eventAddress}
          className="mt-[10px] h-[55px] overflow-hidden text-[14px] leading-[22px] text-[#555555]"
        >
          {eventAddress}
        </p>

        <div className="mt-4 flex items-center gap-[10px] text-[14px] text-black">
          <div className="flex items-center gap-[10px]">
            <svg
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 10h18" />
            </svg>
            <p className="leading-[22px]">{date || "Date TBD"}</p>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-[10px] text-[14px] text-black">
          <div className="flex items-center gap-[10px]">
            <svg
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <p className="leading-[22px]">{time || "Time TBD"}</p>
          </div>
        </div>

        <a
          href={detailsUrl || "#"}
          className="mt-[10px] inline-flex h-10 w-[120px] items-center justify-center rounded-[5px] border border-[#F2006C] bg-white text-[16px] text-[#F2006C] transition-colors duration-200 hover:bg-[#F2006C] hover:text-white"
        >
          Know More
        </a>
      </div>
    </article>
  );
}
