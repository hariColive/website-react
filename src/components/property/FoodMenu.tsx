import SectionHeading from "./SectionHeading";

// Meal timings are the same across Colive kitchens (colive.com hard-codes them too)
const MEALS = [
  { name: "Breakfast", time: "07:30 — 09:30" },
  { name: "Mid Morning", time: "11:00 — 12:00" },
  { name: "Lunch", time: "13:30 — 15:00" },
  { name: "Snacks", time: "16:30 — 17:00" },
  { name: "Dinner", time: "19:30 — 21:30" },
];

export default function FoodMenu() {
  return (
    <section>
      <SectionHeading eyebrow="Food menu" title="Five meals. Served daily in the common dining." />

      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {MEALS.map((meal, index) => (
          <li key={meal.name} className="rounded-xl border border-gray-200 px-5 py-6">
            <p className="mb-4 text-[11px] tracking-[0.2em] text-gray-600 uppercase">Meal {String(index + 1).padStart(2, "0")}</p>
            <p className="mb-4 text-lg text-[#111]">{meal.name}</p>
            <p className="text-sm text-gray-600">{meal.time}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-gray-600">*Food is available on subscription.</p>
    </section>
  );
}
