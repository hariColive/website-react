const asset = "/images/clubcolive/clubcolive_icons/";

const coworkingHubs = [
  ["Colive St Paul", "Bellandur", "http://bit.ly/colivestpaul"],
  ["Colive Glory", "Bellandur", "http://bit.ly/coliveglory"],
  ["Colive Clanton", "Bellandur", "https://bit.ly/coliveclanton"],
  ["Colive Signature Towers", "Marathahalli", "http://bit.ly/colivesignaturetowers"],
  ["Colive Drava", "Marathahalli", "https://bit.ly/colivedravamap"],
  ["Colive Richfield", "HSR Layout", "http://bit.ly/coliverichfield"],
  ["Colive Athens", "Whitefield", "https://bit.ly/coliveathens"],
  ["Colive Sunrise", "Marathahalli", "http://bit.ly/colivesunrise"],
  ["Colive Rio Grande", "AECS Layout", "https://bit.ly/coliveriogrande"],
  ["Colive Lotus Park", "Marathahalli", "https://bit.ly/colivelotusparkmap"],
];

const fitnessHubs = [
  ["Colive St Paul", "Bellandur", "http://bit.ly/colivestpaul"],
  ["Colive Palmer", "Bellandur", "https://bit.ly/colivepalmer"],
  ["Colive Riga", "BTM Layout", "http://bit.ly/coliveriga"],
  ["Colive Signature Towers", "Marathahalli", "http://bit.ly/colivesignaturetowers"],
  ["Colive Cleveland", "Marathahalli", "https://bit.ly/coliveclevelandmap"],
  ["Colive Gardenia", "HSR Layout", "https://bit.ly/colivegardenia"],
  ["Colive Highland", "Koramangala", "https://bit.ly/colivehighland"],
  ["Colive Sunrise", "Marathahalli", "http://bit.ly/colivesunrise"],
  ["Colive Morgan Hill", "Marathahalli", "https://bit.ly/colivemorganhill"],
  ["Colive Athens", "Marathahalli", "https://bit.ly/coliveathens"],
];

const entertainmentHubs = [
  ["Colive St Paul", "Bellandur", "http://bit.ly/colivestpaul"],
  ["Colive Glory", "Bellandur", "http://bit.ly/coliveglory"],
  ["Colive Palmer", "Bellandur", "https://bit.ly/colivepalmer"],
  ["Colive Signature Towers", "Marathahalli", "http://bit.ly/colivesignaturetowers"],
  ["Colive Athens", "Whitefield", "https://bit.ly/coliveathens"],
  ["Colive Highland", "Koramangala", "https://bit.ly/colivehighland"],
  ["Colive Sunrise", "Marathahalli", "http://bit.ly/colivesunrise"],
];

function HubCards({ hubs }: { hubs: string[][] }) {
  return (
    <div className="mx-auto flex max-w-[900px] flex-row flex-wrap justify-between gap-3 pt-[5%] max-[768px]:justify-around">
      {hubs.map(([name, area, href]) => (
        <a
          key={`${name}-${area}`}
          href={href}
          className="min-h-[141px] w-[16%] cursor-pointer rounded-[10px] border-[3px] border-[#f8049c] text-center text-white transition-colors hover:bg-[#f8049c] max-[768px]:w-[44%]"
        >
          <h4 className="px-1 pt-5 pb-3 text-base font-semibold">{name.replace("Colive ", "Colive\n")}</h4>
          <p className="text-sm font-semibold">{area}</p>
        </a>
      ))}
    </div>
  );
}

export default function ClubColiveHubPage() {

  return (
    <main className="hubwrap w-full overflow-x-hidden bg-white text-black">
      <section className="access_card w-full max-[768px]:[margin-top:12%]">
        <img src="/images/hub/accesscard.webp" alt="pg in whitefield" className="h-auto w-full" />
      </section>

      <section className="signup_colive px-0 pt-[6%] text-center max-[768px]:pt-[10%] [padding:6%_0_0_0] max-[768px]:[padding:10%_0_0_0]">
        <div className="signup_colive_memberheading">
          <h1 className="text-[3.5rem] font-bold text-black max-[768px]:text-[23px]">
            What do you get as a<br />Club Colive Member?
          </h1>
          <div className="mx-auto w-full max-w-[1140px] px-3">
            <div className="row flex flex-wrap">
              <div className="col w-full md:w-1/3">
                <p className="py-12 text-2xl font-bold leading-none text-[#F8049C] max-[768px]:py-8 max-[768px]:text-lg">VIP Value <br />Adds</p>
                <a href="#sectionExploreMemberBenefits" className="signup_colive_pink_box block cursor-pointer">
                  <ul className="signup_colive_pink_list mx-4 columns-2 list-none rounded-[20px] bg-[#F200FF] pt-10 pb-8 text-white [background-color:#F200FF] [border-radius:20px] [list-style-type:none] [column-count:2] [margin:0_1rem] [cursor:pointer]">
                    {[
                      ["cowork.png", "Coworking", "pg near wipro sarjapur bangalore"],
                      ["entertainment.png", "Entertainment\nLounges", "pg near marathahalli"],
                      ["fitness.png", "Fitness Rooms", "ladies pg near manyata tech park"],
                      ["parties.png", "Parties\n& Events", "pg in koramangala for female"],
                    ].map(([image, label, alt]) => (
                      <li key={image} className="mb-9 text-sm font-semibold leading-tight tracking-wide">
                        <figure className="mb-2"><img src={asset + image} alt={alt} loading="lazy" className="mx-auto w-[110px]" /></figure>
                        <span className="whitespace-pre-line">{label}</span>
                      </li>
                    ))}
                  </ul>
                </a>
              </div>

              <div className="col w-full md:w-1/3">
                <p className="py-12 text-2xl font-bold leading-none text-[#F8049C] max-[768px]:py-8 max-[768px]:text-lg">Safety <br />&amp; Support</p>
                <ul className="signup_colive_yellow_list mx-4 list-none rounded-[20px] bg-[#FFD51E] pt-10 pb-8 [background-color:#FFD51E] [border-radius:20px] [list-style-type:none] [margin:0_1rem]">
                  <li className="grid grid-cols-2 items-center">
                    <a href="/escalation" className="contents">
                      <figure><img src={asset + "escalation.png"} alt="luxury pg in bangalore" loading="lazy" className="mx-auto w-[146px] pb-8" /></figure>
                      <p className="py-12 text-left text-lg leading-tight text-[#333]">Virtual <br />Escalations</p>
                    </a>
                  </li>
                  <li className="grid grid-cols-2 items-center">
                    <a href="/experience" className="contents">
                      <figure><img src={asset + "emergency.png"} alt="marathahalli pg for gents" loading="lazy" className="mx-auto w-[146px] pb-8" /></figure>
                      <p className="py-12 text-left text-lg leading-tight text-[#333]">Emergency <br />Response Team</p>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col w-full md:w-1/3">
                <p className="py-12 text-2xl font-bold leading-none text-[#F8049C] max-[768px]:py-8 max-[768px]:text-lg">Convenient <br />Financing</p>
                <ul className="signup_colive_blue_list mx-4 list-none rounded-[20px] bg-[#4900BF] pt-10 pb-8 [background-color:#4900BF] [border-radius:20px] [list-style-type:none] [margin:0_1rem]">
                  <li>
                    <a href="http://www.citil.in/" className="block">
                      <figure className="mb-2"><img src={asset + "citil.png"} alt="pg in chennai" loading="lazy" className="mx-auto w-[170px]" /></figure>
                      <p className="my-5 text-center text-lg leading-tight text-[#FFD51E]">CITIL <br /><span className="text-sm font-thin leading-none text-white">Credit Information of Tenants in<br /> Leased-acco</span></p>
                    </a>
                  </li>
                  <li>
                    <a className="block">
                      <figure className="mb-2"><img className="snpl_clubcolive mx-auto w-[60px]" src={asset + "snpl.png"} alt="pg in indiranagar for gents" loading="lazy" /></figure>
                      <p className="my-5 text-center text-lg leading-tight text-[#FFD51E]">SNPL <br />on Rent Pay <br /><span className="text-sm font-thin leading-none text-white">Stay Now, Pay Later (EMI Options)</span></p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="get_free_stay_colive">
        <div className="get_free_stay_colive_heading relative pt-[12%] text-center max-[768px]:pt-[26%] [padding:12%_0_0_0] max-[768px]:[padding:26%_0_0_0]">
          <figure className="plus_circle_figure absolute z-[1] mt-[-75px] w-full max-[768px]:mt-[-50px]">
            <img className="plus_circle_icon mx-auto w-[150px] max-[768px]:w-[100px]" src={asset + "plus_circle.png"} alt="pg in indiranagar for female" loading="lazy" />
          </figure>
          <div className="container-fluid w-full p-0">
            <div className="row flex flex-wrap">
              <div className="col w-full p-0 md:w-1/2">
                <div className="get_free_stay_colive_pink bg-[#FFE2F4] px-12 py-12 pl-20 max-[768px]:px-8 [background-color:#FFE2F4] [padding:3rem_0rem_3rem_5rem] max-[768px]:[padding:5rem_2rem_3rem_2rem]">
                  <figure className="text-left"><img className="job_loss_now w-[350px] max-[768px]:mx-auto max-[768px]:w-[300px]" src={asset + "jobless_title.png"} alt="pg in indiranagar for male" loading="lazy" /></figure>
                  <div className="row flex flex-wrap">
                    <div className="col order-2 w-full md:order-1 md:w-1/2">
                      <div className="get_free_stay_colive_left py-10">
                        <h6 className="ml-6 text-left text-xl font-semibold">Enrol &amp; Get Free Stay of</h6>
                        <h2 className="ml-6 text-left text-[70px] font-bold max-[1024px]:text-[44px]">30 <span className="text-[54px] font-medium text-[#F200FF] max-[1024px]:text-2xl">Days</span></h2>
                        <p className="ml-6 text-left text-lg font-medium">Upon Job Loss*</p>
                      </div>
                    </div>
                    <div className="col order-1 w-1/2 md:order-2 md:w-1/2">
                      <figure><img className="apply_now_img w-[200px] max-[768px]:mx-auto" src={asset + "jobloss.png"} alt="pg rooms in bangalore" loading="lazy" /></figure>
                    </div>
                  </div>
                  <div className="apply-now-button relative w-[78%] max-[768px]:w-full [position:absolute] [background-position:50%_50%] [width:78%] max-[768px]:[position:relative] max-[768px]:[background-position:50%_50%] max-[768px]:[width:100%]">
                    <a target="_blank" href="/pinkslip" className="mt-5 inline-block rounded-full bg-[#4900BF] px-11 py-[18px] text-2xl tracking-wider text-white">Enrol Now</a>
                  </div>
                </div>
              </div>
              <div className="col w-full p-0 md:w-1/2">
                <div className="get_free_stay_colive_blue bg-[#F3E4FF] px-12 py-12 pl-20 max-[768px]:px-8 [background-color:#F3E4FF] [padding:3rem_0rem_3rem_5rem] max-[768px]:[padding:3rem_2rem_3rem_2rem]">
                  <figure className="text-left"><img className="job_loss_now w-[350px] max-[768px]:mx-auto max-[768px]:w-[300px]" src={asset + "scholarship_title.png"} alt="pg in btm layout bangalore" loading="lazy" /></figure>
                  <div className="row flex flex-wrap">
                    <div className="col order-2 w-full md:order-1 md:w-1/2">
                      <div className="get_free_stay_colive_right py-10">
                        <h6 className="ml-2 text-left text-xl font-semibold">Apply &amp; Get Free Stay of</h6>
                        <h2 className="ml-2 text-left text-[70px] font-bold max-[1024px]:text-[44px]">30 <span className="text-[54px] font-medium text-[#F200FF] max-[1024px]:text-2xl">Days</span></h2>
                        <p className="ml-2 text-left text-lg font-medium">Upon Selection*</p>
                      </div>
                    </div>
                    <div className="col order-1 w-1/2 md:order-2 md:w-1/2">
                      <figure><img className="apply_now_img w-[220px] max-[768px]:ml-12 max-[768px]:w-[270px]" src={asset + "scholarships.png"} alt="couple pg in bangalore" loading="lazy" /></figure>
                    </div>
                  </div>
                  <div className="apply-now-button relative w-[78%] max-[768px]:w-full [position:absolute] [background-position:50%_50%] [width:78%] max-[768px]:[position:relative] max-[768px]:[background-position:50%_50%] max-[768px]:[width:100%]">
                    <a target="_blank" href="/scholarship" className="mt-5 inline-block rounded-full bg-[#4900BF] px-11 py-[18px] text-2xl tracking-wider text-white">Apply Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="signup_yellow_colive bg-[#FFD51E] [background-color:#FFD51E]">
        <div id="dvGetstarted" className="signup_yellow_colive_heading hidden py-[5%] text-center [padding:5%_0_3%_0] max-[768px]:[padding:12%_0_10%_0]">
          <div className="mx-auto max-w-[1140px] px-3">
            <h2 className="text-[3.5rem] font-bold text-black max-[768px]:text-[23px]">Signup/ Signin to Club Colive</h2>
            <div className="get-started-button py-12 [padding:3rem_0] max-[768px]:[padding:2rem_0]">
              <a href="/login?src=ClubColive&redirect=/club" className="rounded-full bg-black px-11 py-[18px] text-2xl tracking-wider text-white">Get Started</a>
            </div>
            <p className="text-xl text-black"><i>You will be redirected to the <a href="/login?src=ClubColive&redirect=/club">Colive.com</a> sign-in window briefly</i></p>
          </div>
        </div>
        <div id="dvGetstarted1" className="signup_yellow_colive_heading hidden py-[5%] text-center [padding:5%_0_3%_0] max-[768px]:[padding:12%_0_10%_0]">
          <div className="mx-auto max-w-[1140px] px-3">
            <h2 className="signin_message_heading text-[3.5rem] font-bold text-black max-[768px]:text-[23px]">Welcome to Club Colive</h2>
            <p className="signin_message_title pt-4 pb-2"><i>Hi <span id="spnCusNameClubColive" />,</i></p>
            <p className="signin_message"><i>You can use this portal to navigate through all available Club Colive Hubs and explore your membership benefits. Don't forget to invite your best friends to the next Club Colive Party!</i></p>
          </div>
        </div>
      </section>

      <section className="clubcolive_memeber py-[6%] pb-[7%] [padding:6%_0_7%_0] max-[576px]:[padding:6%_2%_7%_2%]" id="sectionExploreMemberBenefits">
        <div className="clubcolive_memberheading text-center">
          <h2 className="text-[3.5rem] font-bold text-black max-[768px]:text-[23px]">Explore member-only benefits</h2>
          <p className="mx-auto w-[46rem] max-w-full py-[3%] text-xl font-medium max-[768px]:px-4 max-[768px]:text-sm">All Club Colive Members are allowed to access a fantastic set of amenities, spread around the city in Colive's premium co-living hubs.</p>
        </div>
        <div className="clubcolive_facility row mx-auto flex flex-wrap px-[12%] max-[576px]:px-[3%] [padding:0_12%] max-[576px]:[padding:0_3%]">
          {[
            ["10", <>Coworking<br />Spaces</>],
            ["10", <>Fitness<br />Rooms</>],
            ["7", <>Entertainment<br />Lounges</>],
            ["8", <>Parties<br />Every Month</>],
          ].map(([number, label], index) => (
            <div className="col w-1/2 md:w-1/2 lg:w-1/4" key={index}>
              <div className="circle cowork_space mx-auto flex h-[200px] w-[200px] items-center justify-center rounded-full border-2 border-[#7C2AE8] bg-[#7C2AE8] max-[576px]:h-[130px] max-[576px]:w-[130px] [border:2px_solid_#7C2AE8] [border-radius:50%] [height:200px] [width:200px] [display:flex] [justify-content:center] [align-items:center] [margin:auto] [background-color:#7C2AE8] max-[576px]:[height:130px] max-[576px]:[width:130px]">
                <p className="text-[50px] font-semibold text-white">{number}</p>
              </div>
              <div className="fitness mt-5 flex justify-center text-center">
                <p className="text-[23px] font-semibold leading-[1.1] max-[576px]:text-base">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <article>
        <div className="sectionone colive-hub mx-auto max-w-[900px] py-[6%] [padding:6%_0] [max-width:900px] [margin:0_auto]">
          <div className="row flex flex-wrap">
            {[
              ["coworking.png", "Coworking", "#coworking", "cowork"],
              ["fitness.png", "Fitness", "#fitness-room", "fitness"],
              ["Entertainment.png", "Entertainment", "#entertainment", "entertainment"],
              ["weeekend-party.png", "Weekend-Party", "#sectionfive", "partys"],
            ].map(([image, label, href, cls]) => (
              <div className={`col w-1/2 text-center md:w-1/4 ${cls}`} key={label}>
                <a className="hub_btn" href={href}>
                  <img src={`/images/hub/${image}`} alt={label} className="mx-auto h-auto w-[160px] max-w-full max-[768px]:mb-5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article>
        <section className="sectiontwo bg-black pb-[7%] [background-color:#000] [padding-bottom:7%]">
          <div className="coworkspace_image"><img src="/images/hub/coworkspace1.png" alt="cowork" className="w-full" /></div>
          <div className="co-space mx-auto max-w-[900px] pt-[3%] [max-width:900px] [margin:0_auto] [padding-top:3%]" id="coworking">
            <h2 className="py-[5%] text-center text-[3.5rem] font-bold text-white max-[768px]:text-[28px]">Click to navigate to a<br />coworking space</h2>
            <p className="pb-[5%] text-center text-xl text-white max-[768px]:pb-0 max-[768px]:text-sm">Work from the largest distributed<br /> network of coworking seats</p>
            <HubCards hubs={coworkingHubs} />
          </div>
          <div className="access_time text-center"><p className="pt-[6%] text-lg font-medium text-white">Access Timings : 11 AM to 9 PM</p></div>
        </section>
      </article>

      <article>
        <section className="sectionthree bg-[#5A20CB] pb-[7%] [background-color:#5A20CB] [padding-bottom:7%]">
          <div className="coworkspace_image"><img src="/images/hub/fitnessroom1.png" alt="cowork" className="w-full" /></div>
          <div className="fitness-wrap mx-auto max-w-[900px] pt-[3%] [max-width:900px] [margin:0_auto] [padding-top:3%]" id="fitness-room">
            <h2 className="py-[5%] text-center text-[3.5rem] font-bold text-white max-[768px]:text-[28px]">Click to navigate to a<br />fitness room</h2>
            <p className="text-center text-xl text-white max-[768px]:text-sm">Workout at any of Colive's premium</p>
            <p className="text-center text-xl text-white max-[768px]:text-sm">fitness rooms in the city</p>
            <HubCards hubs={fitnessHubs} />
          </div>
          <div className="access_time text-center"><p className="pt-[6%] text-lg font-medium text-white">Access Timings : 11 AM to 9 PM</p></div>
        </section>
      </article>

      <article>
        <section className="sectionfour bg-[#f5f6fa] pb-[7%] [background-color:#f5f6fa] [padding-bottom:7%]" id="entertainment">
          <div className="coworkspace_image"><img src="/images/hub/entertainment1.png" alt="cowork" className="w-full" /></div>
          <div className="entertainment-wrap mx-auto max-w-[900px] pt-[3%] [max-width:900px] [margin:0_auto] [padding-top:3%]">
            <h2 className="py-[5%] text-center text-[3.5rem] font-bold text-black max-[768px]:px-5 max-[768px]:text-[26px]">Click to navigate to an<br />entertainment lounge</h2>
            <p className="text-center text-xl text-black max-[768px]:text-sm">Stream your favourite movie or match in the</p>
            <p className="text-center text-xl text-black max-[768px]:text-sm"> comfort of a private audio-visual lounge</p>
            <div className="entertainment-wrap1 mt-[5%] flex flex-row flex-wrap justify-center gap-3 pt-[5%] [display:flex] [justify-content:center] [flex-flow:row_wrap] [padding-top:5%] max-[768px]:[margin-top:5%]">
              {entertainmentHubs.slice(0, 4).map(([name, area, href]) => (
                <a href={href} key={name} className="co-space-box min-h-[141px] w-[16%] rounded-[10px] border-[3px] border-[#f8049c] text-center hover:bg-[#f8049c] max-[768px]:w-[44%] [width:16%] [margin:10px] [border:3px_solid_#f8049c] [border-radius:10px] [cursor:pointer] [min-height:141px] max-[768px]:[width:44%]">
                  <h4 className="px-1 pt-5 pb-3 text-base font-semibold text-black">{name}</h4><p className="text-sm font-semibold text-black">{area}</p>
                </a>
              ))}
            </div>
            <div className="entertainment-wrap2 mt-[4%] flex flex-row flex-wrap justify-center gap-3 [display:flex] [justify-content:center] [margin-top:4%] [flex-flow:row_wrap]">
              {entertainmentHubs.slice(4).map(([name, area, href]) => (
                <a href={href} key={name} className="co-space-box min-h-[141px] w-[16%] rounded-[10px] border-[3px] border-[#f8049c] text-center hover:bg-[#f8049c] max-[768px]:w-[44%] [width:16%] [margin:10px] [border:3px_solid_#f8049c] [border-radius:10px] [cursor:pointer] [min-height:141px] max-[768px]:[width:44%]">
                  <h4 className="px-1 pt-5 pb-3 text-base font-semibold text-black">{name}</h4><p className="text-sm font-semibold text-black">{area}</p>
                </a>
              ))}
            </div>
          </div>
          <div className="access_time text-center" id="access_time"><p className="pt-[6%] text-lg font-medium text-black">Access Timings : 11 AM to 9 PM</p></div>
        </section>
      </article>

      <section className="sectionfive bg-[#010031] py-[5%] pb-[6%] [background-color:#010031] [padding:5%_0_6%_0]" id="sectionfive">
        <div className="party text-center">
          <h2 className="mb-[3%] text-[3.5rem] font-bold text-white max-[768px]:mb-[5%] max-[768px]:text-[23px]">Parties at Colive</h2>
          <a href="/party" target="_blank" className="my-[8%] border border-[#F8049C] bg-[#F8049C] p-[7px] text-lg font-medium text-white max-[576px]:p-[5px] max-[576px]:text-[15px]">Check out our parties</a>
        </div>
        <div className="party_image my-[5%] max-[576px]:my-[10%]"><img src="/images/hub/Party-image.png" alt="party" className="w-full" /></div>
        <div className="row partyat_colive mx-auto flex flex-wrap px-[10%] max-[576px]:px-[3%]">
          <div className="col party_inform w-full md:w-7/12">
            <p className="w-[28rem] max-w-full text-base font-medium text-white">We party every weekend at our flagship Club Colive Hubs! Join us to meet, dance, date &amp; network in your Colive community</p>
          </div>
          <div className="col w-full md:w-5/12">
            <div className="row amet flex flex-wrap max-[768px]:mt-[30px]">
              {[[ "4132+", "Singles" ], [ "189+", "Couples" ], [ "70+", "Lawyers+" ], [ "500+", "Techies" ]].map(([count, label]) => (
                <div className="col w-1/4" key={label}>
                  <p className="text-lg font-semibold text-white">{count}</p>
                  <p className="text-lg font-semibold text-[#F8049C] max-[576px]:text-base">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sectionsix py-[5%] pb-[6%] [padding:5%_0_6%_0]">
        <div className="video_msg text-center">
          <h2 className="text-[3.5rem] font-bold text-black max-[768px]:text-[23px]">"Be Like Aryan"</h2>
          <p className="my-[2%] mb-[4%] text-xl leading-[1.33] max-[576px]:text-sm">Share the video message with your friends<br />who are moving into Bangalore soon</p>
          <div className="videomsg_video">
            <iframe className="clubcolivevideoFrame w-[560px] max-w-full p-0 max-[768px]:w-full max-[768px]:p-[5%] max-[768px]:[width:100%] max-[768px]:[padding:5%]" width="560" height="315" src="https://www.youtube.com/embed/UXfmL11cJcg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      </section>
    </main>
  );
}
