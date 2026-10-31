import React from "react";

const stats = [
  { image: "Properties.png", value: "150+", label: "Properties" },
  { image: "Managedbeds.png", value: "20,000+", label: "Managed Beds" },
  { image: "PlatinumBed.png", value: "20,000+", label: "Platinum Beds pipeline" },
  { image: "Team.png", value: "300+", label: "Team" },
];

const coreTeam = [
  { name: "Harsha", image: "Harsha.png", company: "Harsha_c.png", alt: "Harsha" },
  { name: "Cariappa", image: "Cariappa.png", company: "Cariappa_c.png", alt: "Cariappa" },
  { name: "Sourav", image: "Saurav.png", company: "Saurav_c.png", alt: "Sourav" },
  { name: "Vaibhav", image: "Vaibhav.png", company: "Vaibhav_c.png", alt: "Vaibhav" },
  { name: "Sundari", image: "Sundari.png", company: "Sundari_c.png", alt: "Sundari" },
];

const features = [
  {
    image: "Pitchperfect.png",
    text: "Pitch perfect Team DNA comprising real-estate street smarts alongside platform-tech pedigree.",
  },
  {
    image: "Centralized.png",
    text: "Centralized Ops & less on ground ensuing consistency& lower cost",
  },
  {
    image: "Frugal.png",
    text: "Frugal & cost-conscious operational culture that delivers consistently delightful hospitality without hurting profitability",
  },
  {
    image: "Techoriented.png",
    text: "Tech Oriented Safety",
  },
  {
    image: "Bestclass.png",
    text: "Best-in-class holistic technology stack that provides an integrated community living experience",
  },
  {
    image: "automated.png",
    text: "Fully-automated check-ins, invoicing, collections & servicing",
  },
  {
    image: "profit.png",
    text: "Focus on Profitability",
  },
];

const OurTeam = () => {
  const pinkText = "!text-[#2B001F]";
  return (
    <>
      <section className="!w-full">
        <div className="!min-h-0 !bg-[url('/images/about/Banner.png')] !bg-[length:100%_100%] !bg-[position:center_bottom] !bg-no-repeat max-[767px]:!bg-[length:100%] max-[767px]:!bg-[position:center_top]">
          <div className="!mx-auto !w-[calc(100%-100px)] max-[767px]:!w-[calc(100%-20px)]">
            <h1 className="!py-[17%] !text-[60px] !font-bold !leading-tight !text-[#2B001F] min-[768px]:max-[992px]:!text-[50px] max-[767px]:!py-[18%] max-[767px]:!text-[18px]">
              <span className="!text-black">Building the largest</span> <br />
              Co-living &amp; PropTech <br /> platform
            </h1>
          </div>
        </div>
      </section>

      <section className="!w-full">
        <div className="!mx-auto !w-[calc(100%-100px)] !py-[3%] max-[767px]:!w-[calc(100%-40px)]">
          <h2 className="!text-[60px] !font-semibold min-[768px]:max-[992px]:!text-[50px] max-[767px]:!text-base">Overview</h2>
          <p className="!py-[2%] !pb-[3%] !text-justify !text-[20px] max-[767px]:!text-[12px]">
            As Bangalore&apos;s largest &amp; India&apos;s leading Coliving player, Colive with a vision of being the &quot;Future of Living&quot; is reshaping the way working professionals &amp; students live in urban cities. Colive offers smart, furnished &amp; managed flexible homes closer to work places &amp; colleges to the urban migrant population. Colive homes are built on the principles of 6S - Style, Safety, Smart, Service, Savings &amp; Social.
          </p>
          <div className="">
<div className="!flex !flex-wrap !items-center !py-[1%] max-[767px]:!py-0">
  {stats.map((stat) => (
    <div
      key={stat.label}
      className="!w-1/2 !px-[15px] !py-2 lg:!w-1/4 max-[767px]:!py-[5%]"
    >
      <div className="!flex !items-center">
        <img
          src={`/images/about/${stat.image}`}
          className="!h-[30px] !w-[30px] max-[767px]:!h-5 max-[767px]:!w-5"
          alt={stat.label}
        />
        <h3 className="!ml-[3%] !text-[40px] !font-semibold max-[767px]:!text-[18px]">
          {stat.value}
        </h3>
      </div>

      <p className="!ml-[14%] !text-[22px] max-[767px]:!text-[12px]">
        {stat.label}
      </p>
    </div>
  ))}
</div>
          </div>
        </div>
      </section>

      <section className="!bg-[#F4ECF0] !py-[3%] max-[767px]:!py-[7%]">
        <div className="!mx-auto !w-[calc(100%-100px)] max-[767px]:!w-[calc(100%-40px)]">
          <div className="!grid !grid-cols-1 !items-center !gap-6 lg:!grid-cols-12">
            <div className="lg:!col-span-4"><img src="/images/about/Indialives.png" className="!h-auto !max-w-full" alt="Colive homes" /></div>
            <div className="lg:!col-span-8">
              <div className="!my-auto lg:!ml-[10%]">
                <h2 className="!pr-[10%] !text-[60px] !font-bold !leading-tight min-[768px]:max-[992px]:!text-[50px] max-[767px]:!text-[25px]">We changed the way <br className="min-[768px]:max-[992px]:!hidden" />India <span className={pinkText}>lives</span></h2>
                <p className="!my-[2%] !mr-[15%] !text-justify !text-[20px] max-[767px]:!mr-0 max-[767px]:!text-[12px]">With 1 million+ users &amp; 400,000+ units on our platform, we&apos;ve taught India how to expect more from the essentials of living, be it the 6S of Colive or the benefits we provide within Club Colive.</p>
                <a href="/club/" className="!text-[#2B001F] !inline-flex !items-center">Read more</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="!pb-[3%] !pt-[3%] max-[767px]:!pb-[8%] max-[767px]:!pt-[7%]">
        <div className="!mx-auto !w-[calc(100%-100px)] max-[767px]:!w-[calc(100%-40px)]">
          <div className="!grid !grid-cols-1 !items-center !gap-6 lg:!grid-cols-12">
            <div className="!order-2 lg:!col-span-8 lg:!order-1">
              <div className="!my-auto lg:!ml-[10%]">
                <h2 className="!text-[60px] !font-bold !leading-tight min-[768px]:max-[992px]:!text-[50px] max-[767px]:!pt-[5%] max-[767px]:!text-[25px]">We changed the way <br className="min-[768px]:max-[992px]:!hidden" />India <span className={pinkText}>lists</span></h2>
                <p className="!my-[2%] !mr-[10%] !text-justify !text-[20px] max-[767px]:!mr-0 max-[767px]:!text-[12px]">India&apos;s first rental solution for property owners, which includes a powerful property &amp; inventory management suite, a single dashboard to manage tenants, payments, eKYC &amp; much more. RXP now comes with a rental guarantee - we will either rent property in 100 days or pay the rent ourselves!</p>
              </div>
            </div>
            <div className="!order-1 !text-center lg:!col-span-4 lg:!order-2"><img src="/images/about/rxp.png" className="!mx-auto !h-auto !max-h-[300px] !max-w-full" alt="Rental experience platform" /></div>
          </div>
        </div>
      </section>

      <section className="!bg-[#F4ECF0] !py-[3%] max-[767px]:!py-[7%]">
        <div className="!mx-auto !w-[calc(100%-100px)] max-[767px]:!w-[calc(100%-40px)]">
          <div className="!grid !grid-cols-1 !items-center !gap-6 lg:!grid-cols-12">
            <div className="!text-center lg:!col-span-4"><img src="/images/about/rents.png" className="!mx-auto !h-auto !max-h-[300px] !max-w-full" alt="Rental homes" /></div>
            <div className="lg:!col-span-8"><div className="!my-auto lg:!ml-[10%]">
              <h2 className="!pr-[10%] !text-[60px] !font-bold !leading-tight min-[768px]:max-[992px]:!text-[50px] max-[767px]:!text-[25px]">We changed the way <br className="min-[768px]:max-[992px]:!hidden" />India <span className={pinkText}>rents</span></h2>
              <p className="!my-[2%] !mr-[15%] !text-justify !text-[20px] max-[767px]:!mr-0 max-[767px]:!text-[12px]">We&apos;ve built an AI-enabled engine that simplifies rentals &amp; allows potential tenants to bid directly on the homes they like, with budgets they&apos;re comfortable paying.</p>
              <a href="/rentx/" className="!text-[#2B001F] !inline-flex !items-center">Read more</a>
            </div></div>
          </div>
        </div>
      </section>

      <section className="!py-[3%]">
        <div className="!mx-auto !w-[calc(100%-100px)] max-[767px]:!w-[calc(100%-40px)]">
          <div className="!grid !grid-cols-1 !items-center lg:!grid-cols-12">
            <div className="!my-auto !text-center lg:!col-span-5 lg:!text-left lg:!pl-[5%]">
              <h2 className="!text-[60px] !font-bold !leading-tight min-[768px]:max-[992px]:!text-[50px] max-[767px]:!text-2xl">Top 200+ <br className="max-[767px]:!hidden" />colive homes <br className="max-[767px]:!hidden" /><span className={pinkText}>in&nbsp;Bengaluru</span></h2>
              <p className="!font-semibold max-[767px]:!text-sm max-[767px]:!font-normal">No one covers Bengaluru like colive</p>
            </div>
            <div className="lg:!col-span-7"><img src="/images/about/Map.png" className="!h-auto !max-w-full" alt="Map of Colive homes in Bengaluru" /></div>
          </div>
        </div>
      </section>

      <section className="!bg-[#F4F4F4]">
        <div className="!mx-auto !w-[calc(100%-100px)] !pb-[2%] max-[767px]:!w-[calc(100%-40px)] max-[767px]:!pt-[5%]">
          <div className="!pb-[5%]">
            <h2 className="!py-[3%] !text-center !text-[60px] !font-semibold min-[768px]:max-[992px]:!text-[50px] max-[767px]:!pb-[7%] max-[767px]:!text-[25px]">Founder &amp; <span className={pinkText}>Team</span></h2>
            <div className="!grid !grid-cols-1 !items-center !gap-6 lg:!grid-cols-12">
              <div className="!order-2 lg:!col-span-8 lg:!order-1 lg:!pl-[5%]">
                <h3 className="!py-[3%] !text-center !text-[45px] !font-semibold max-[767px]:!text-[18px]">Suresh Rangarajan Kidambi</h3>
                <p className="!my-[2%] !text-justify !text-[22px] max-[767px]:!text-[12px]">Suresh Rangarajan Kidambi (SRK) exudes the image of an absolute trendsetter, leveraging his unique combination of internet, financial services &amp; real estate experience, to create intelligent &amp; disruptive products in the asset-rental spaces</p>
                <a href="/founder/" className={pinkText}>Read more</a>
              </div>
              <div className="!order-1 lg:!col-span-4 lg:!order-2"><img src="/images/about/SRK.png" className="!mx-auto !h-auto !max-w-full" alt="Suresh Rangarajan Kidambi" /></div>
            </div>
          </div>
<div className="!mx-auto !flex !w-full !justify-evenly !gap-4 !overflow-x-auto !overflow-y-hidden !pb-4 !scroll-smooth">
  {coreTeam.map((member) => (
    <div
      key={member.name}
      className="!w-[65%] !min-w-[65%] !shrink-0 sm:!w-[170px] sm:!min-w-[170px]"
    >
      <img
        src={`/images/about/${member.image}`}
        className="!mx-auto !h-auto !max-w-full"
        alt={member.alt}
      />

      <p className="!ml-[7%] !py-[3%] !text-lg !font-semibold max-[767px]:!ml-0">
        {member.name}
      </p>

      <img
        src={`/images/about/${member.company}`}
        className="!ml-[7%] !w-[140px] max-[767px]:!ml-0"
        alt={`${member.name} company`}
      />
    </div>
  ))}
</div>
        </div>
      </section>
      <section className="!bg-[#F4ECF0]">
        <div className="!mx-auto !w-[calc(100%-100px)] !pb-[5%] max-[767px]:!w-[calc(100%-40px)]">
          <h2 className="!pb-[2%] !pt-[4%] !text-center !text-[60px] !font-semibold min-[768px]:max-[992px]:!text-[50px] max-[767px]:!pb-[6%] max-[767px]:!pt-[10%] max-[767px]:!text-[23px]">How did we ace competition?<br className="min-[768px]:max-[992px]:!hidden" /><span className={pinkText}>The Secret Sauce</span></h2>
          <div className="!grid !grid-cols-1 !gap-x-8 md:!grid-cols-2">
            {features.map((feature) => (
              <div key={feature.text} className="!py-[7%] max-[767px]:!py-[5%]">
                <div className="!flex !items-center">
                  <div className="!w-1/6 !shrink-0 !text-right max-[767px]:!p-[10px]">
                    <img
                      src={`/images/about/${feature.image}`}
                      className="!inline-block !w-[60px] !max-w-full"
                      alt="ladies pg in koramangala"
                    />
                  </div>
                  <p className="!w-5/6 !text-justify !text-[22px] max-[767px]:!text-sm">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="!py-[3%] !text-center">
          <h2 className="!text-[60px] !font-bold min-[768px]:max-[992px]:!text-[50px] max-[767px]:!pt-[5%] max-[767px]:!text-[25px]">Working at <span className={pinkText}>Colive</span></h2>
          <p className="!py-[1.5%] !pb-[3.5%] !text-[22px] max-[767px]:!px-[1%] max-[767px]:!pb-[10%] max-[767px]:!text-sm">An inspired team that&apos;s changing the dynamics of the Indian<br className="max-[767px]:!hidden" /> rental ecosystem every day.</p>
<picture>
  <img
    loading="lazy"
    src="/images/about/workatcolive.png"
    alt="Colive workspace"
    className="!my-[10px] !mx-auto !h-auto !max-w-full"
  />
</picture>
        </div>
      </section>
    </>
  );
};

export default OurTeam;
