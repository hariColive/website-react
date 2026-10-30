// Standard Colive rent terms, as on colive.com's rent-summary/summary-content fragment.
const CHARGE_GROUPS = [
  {
    title: "Add-On",
    items: [
      { label: "Common Area Maintenance", note: 1, value: "₹345" },
      { label: "Payment Handling Charges", note: 2, value: "₹199" },
    ],
  },
  {
    title: "Reimbursement",
    items: [
      { label: "Electricity Bill", value: "At actuals" },
      { label: "Repairs", value: "At actuals" },
    ],
  },
  {
    title: "One Time",
    items: [
      { label: "Refundable Security & Utility Deposit", note: 3, value: "1 Month + ₹2,000", detail: "Payable in 2 installments" },
      { label: "Onboarding Charges/ Customer", value: "₹1,500" },
    ],
  },
  {
    title: "Others",
    items: [
      { label: "Increment", note: 4, value: "2.25%" },
      { label: "Separation", note: 5, suffix: "/ Breakage Penalty", suffixNote: 6, value: "10 Days/ 15 Days" },
    ],
  },
];

const FOOTNOTES = [
  "₹495 for Solo, Couple & 1BHK",
  "₹279 if invoice amount is greater than ₹10,000 Payment Gateway charges as applicable",
  "₹3,000/ bed for air-conditioned rooms Deposit delay penalty of Rs 1,500/month shall be applied if any deposit is overdue",
  "Quarterly increment is waived for 12 months (Upfront Payment)",
  "10 days for Studio Rooms & 15 days for 1BHK",
  "In case of contract violation on account of lock-in & notice period, a penalty of 15 days each shall be adjusted against deposit and reflected in the refund settlement statement.",
];

export default function RentSummary() {
  return (
    <section>
      <h2 className="mb-2 text-3xl font-medium tracking-tight text-[#111]">Rent Summary</h2>

      <div className="mb-6 rounded-md border border-[#111] px-4 py-3 text-sm font-semibold text-[#111]">
        <h3 className="mb-1 text-2xl">Rent Break Up</h3>
        <p>Residential Rent (collected on behalf of Owner)</p>
        <p>F&amp;B Water (Incl GST)</p>
        <p>Services (Incl GST)</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {CHARGE_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 inline-block border-b-2 border-[#111] pb-2 text-2xl font-medium text-[#111]">{group.title}</h3>
            <dl className="divide-y divide-gray-300 rounded-xl border border-[#111] bg-gray-50 px-5">
              {group.items.map((item) => (
                <div key={item.label} className="py-4">
                  <dt className="mb-2 font-semibold text-[#111]">
                    {item.label}
                    {"note" in item && <sup>{item.note}</sup>}
                    {"suffix" in item && (
                      <>
                        {item.suffix}
                        <sup>{item.suffixNote}</sup>
                      </>
                    )}
                  </dt>
                  <dd className="font-semibold text-gray-500">{item.value}</dd>
                  {"detail" in item && <dd className="text-sm text-[#111]">{item.detail}</dd>}
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <ol className="mt-6 grid gap-x-6 gap-y-2 border-t border-gray-100 pt-5 text-sm text-[#111] sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-[repeat(3,auto)]">
        {FOOTNOTES.map((note, index) => (
          <li key={note} className="flex gap-2">
            <span className="font-semibold">{index + 1}</span>
            {note}
          </li>
        ))}
      </ol>
      <p className="mt-6 text-center text-xs text-[#111]">* Calendar Monthly Payment with Auto Renewal</p>
    </section>
  );
}
