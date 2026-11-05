import { FaUser, FaUserFriends, FaUsers } from "react-icons/fa";

import type { RoomPlan } from "@/lib/propertyDetails";
import { formatRupees } from "@/lib/searchFilters";

import SectionHeading from "./SectionHeading";

// Solo: one person, couple/twin: two, triple and larger shares: a group
const RoomIcon = ({ roomTypeId }: { roomTypeId: number }) => {
  if (roomTypeId === 1 || roomTypeId === 12) return <FaUser aria-hidden="true" />;
  if (roomTypeId === 2 || roomTypeId === 11) return <FaUserFriends aria-hidden="true" />;
  return <FaUsers aria-hidden="true" />;
};

export default function BookingPlans({ rooms }: { rooms: RoomPlan[] }) {
  if (rooms.length === 0) return null;

  return (
    <section>
      <SectionHeading eyebrow="Choose your stay" title="Rooms & booking plans." />
      <p className="mb-8 text-center text-sm text-gray-600">Explore sharing type &amp; saving plans.</p>

      <ul className="flex flex-col gap-5">
        {rooms.map((room) => (
          <li key={room.key}className="grid gap-3 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-6">
            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200/80 px-4 py-5 text-center">
              <span className="mb-2 text-2xl text-[#111]">
                <RoomIcon roomTypeId={room.roomTypeId} />
              </span>
              <p className="text-base text-[#111]">{room.label}</p>
              {room.subType && <p className="text-xs text-gray-600">{room.subType}</p>}
              <p className="text-[11px] tracking-[0.2em] text-gray-600 uppercase">{room.occupancy}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {room.plans.map((plan) => (
                <div key={plan.name} className="rounded-lg border border-gray-200 px-3 py-4 text-center">
                  <p className="mb-2 text-[11px] tracking-[0.2em] text-gray-600 uppercase">{plan.name}</p>
                  <p className="text-2xl text-[#111]">{formatRupees(plan.amount)}</p>
                  <p className="mt-1 text-xs text-gray-600">Monthly Rent</p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
