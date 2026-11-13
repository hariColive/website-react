import Link from "next/link";

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full px-3 min-[576px]:max-w-[540px] min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1320px] ${className}`}>
      {children}
    </div>
  );
}

function ExperienceImage({
  src,
  alt,
  className = "",
  imageClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={className}>
      <img src={src} alt={alt} className={`h-auto max-w-full ${imageClassName}`} />
    </div>
  );
}

export default function ExperienceManagerPage() {
  return (
    <main className="overflow-x-hidden bg-white font-['Inter-Regular',Arial,sans-serif] text-black">

      {/* Section 1: #ColiveCares */}
      <section className="section1 bg-[#F6F6F6] px-[5%] py-[6%] max-[1200px]:px-[5%] max-[1200px]:pt-[10%] max-[1200px]:pb-[5%] max-[991px]:px-[5%] max-[991px]:pt-[7%] max-[991px]:pb-[8%] max-[767px]:!px-[3%] max-[767px]:!pt-[14%] max-[767px]:!pb-[8%]">
        <Container>
          <div className="-mx-3 grid grid-cols-12">
            <div className="Colivecares relative col-span-12 px-3 md:col-span-7">
              <div className="Colivecares-left absolute left-0 top-1/2 -translate-y-1/2 max-[767px]:relative max-[767px]:top-1/2 max-[767px]:translate-y-[-50%]">
                <div>
                  <h5 className="mb-2">
                    <span className="care text-[25px] font-medium text-[#f8049c] max-[991px]:text-[22px] max-[767px]:text-[15px]">
                      #ColiveCares
                    </span>
                  </h5>
                </div>
                <div className="Coliving mt-4">
                  <h1 className="mb-2 text-[50px] font-semibold leading-[60px] text-black max-[991px]:text-[32px] max-[991px]:leading-[40px] max-[767px]:text-[20px] max-[767px]:leading-[24px]">
                    Your co-living experience gets better than ever.
                  </h1>
                </div>
                <div className="ColiveExp mt-4">
                  <p className="mb-4 pr-0 text-[25px] font-normal leading-[33px] text-black max-[991px]:text-[20px] max-[991px]:leading-[30px] max-[767px]:text-[14px] max-[767px]:leading-[20px]">
                    Your <Link href="/" className="text-black">Colive</Link> Revenue &amp; Experience Managers will be your friend, philosopher &amp; guide during your stay at colive.
                  </p>
                </div>
              </div>
            </div>

            <div className="Image1 col-span-12 px-3 md:col-span-5 max-[767px]:flex max-[767px]:justify-center">
              <ExperienceImage
                src="/images/experience/colivecare.png"
                alt="colivecare"
                className="Image w-full max-[767px]:mt-[8%] max-[767px]:text-center"
                imageClassName="relative right-0 h-auto w-[95%] max-[767px]:w-[90%]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Section 2: Meet your Experience Managers */}
      <section className="section2 bg-white px-[5%] pt-[5%] pb-[6%] max-[1200px]:px-[5%] max-[1200px]:pt-0 max-[1200px]:pb-[17%] max-[991px]:px-[5%] max-[991px]:py-[14%] max-[767px]:!px-[3%] max-[767px]:!py-[8%]">
        <Container>
          <div className="-mx-3 grid grid-cols-12">
            <div className="Image1 order-2 col-span-12 px-3 md:order-1 md:col-span-6 max-[767px]:flex max-[767px]:justify-center">
              <ExperienceImage
                src="/images/experience/meetexperience.png"
                alt="Meet your experience"
                className="Image w-full max-[767px]:mt-[8%] max-[767px]:text-center"
                imageClassName="relative right-0 h-auto w-[95%] max-[767px]:w-[90%]"
              />
            </div>

            <div className="Aboutmeetyour relative order-1 col-span-12 px-3 md:order-2 md:col-span-6">
              <div className="abouttext-right max-[991px]:absolute max-[991px]:top-1/2 max-[991px]:-translate-y-1/2 max-[767px]:relative max-[767px]:top-1/2 max-[767px]:-translate-y-1/2">
                <div className="abouttext pr-0 max-[1200px]:pr-[30%] max-[991px]:pr-0">
                  <h2 className="mb-2 text-[50px] font-semibold leading-[60px] text-black max-[991px]:text-[32px] max-[991px]:leading-[40px] max-[767px]:text-[20px] max-[767px]:leading-[24px]">
                    Meet your Colive Revenue &amp; Experience Managers every day* between 3:00 PM to 5:00 PM
                  </h2>
                </div>
                <div className="mt-4">
                  <h5 className="mb-2">
                    <span className="abouttext-care text-[25px] font-semibold text-[#f8049c] max-[991px]:text-[20px] max-[767px]:text-[15px] max-[767px]:font-medium">
                      *Except Sundays
                    </span>
                  </h5>
                </div>
                <div className="abouttext2 mt-4 p-0">
                  <p className="mb-4 pr-0 text-[25px] font-normal leading-[33px] text-black max-[991px]:text-[22px] max-[991px]:leading-[30px] max-[767px]:text-[14px] max-[767px]:leading-[20px]">
                    Receive instant support on all your check-in, billing &amp; safety queries &amp; get updates on your active service tickets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 3: Not everything is about you */}
      <section className="section3 bg-[rgba(242,0,108,0.10)] px-[5%] py-[5%] pb-[6%] max-[1200px]:px-[5%] max-[991px]:py-[10%] max-[991px]:pb-[12%] max-[767px]:!px-[3%] max-[767px]:!py-[8%] max-[767px]:!pb-[10%]">
        <Container>
          <div className="-mx-3 grid grid-cols-12">
            <div className="Noteverythingtext relative col-span-12 px-3 md:col-span-6">
              <div className="Noteverything-left absolute left-0 top-1/2 -translate-y-1/2 max-[767px]:relative max-[767px]:top-1/2 max-[767px]:-translate-y-1/2">
                <div className="Noteverything mt-0 md:mt-4">
                  <h2 className="mb-2 text-[50px] font-semibold leading-[60px] text-black max-[991px]:text-[32px] max-[991px]:leading-[40px] max-[767px]:text-[20px] max-[767px]:leading-[24px]">
                    Not everything is about you, but this team totally is.
                  </h2>
                </div>
                <div className="Noteverythingpara mt-4">
                  <p className="mb-4 pr-[15px] text-[25px] font-normal leading-[33px] text-black max-[991px]:pr-0 max-[991px]:text-[22px] max-[991px]:leading-[30px] max-[767px]:text-[14px] max-[767px]:leading-[20px]">
                    Colive Revenue &amp; Experience Managers are trained &amp; equipped to help you at every stage of stays booked through the Colive platform
                  </p>
                </div>
              </div>
            </div>

            <div className="Noteverythingimage col-span-12 px-3 md:col-span-6 max-[767px]:mt-[3%]">
              <div className="Noteverything-right text-center">
                <img
                  src="/images/experience/noteverythinig.png"
                  alt="Not Everythinig"
                  className="relative right-0 h-auto w-[85%] max-[767px]:w-[90%]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 4: Start video call */}
      <section className="section4 bg-white px-[5%] pt-[6%] pb-[7%] max-[991px]:px-[5%] max-[991px]:py-[20%] max-[767px]:!px-[3%] max-[767px]:!py-[8%] max-[767px]:!pb-[10%]">
        <Container>
          <div className="-mx-3 grid grid-cols-12">
            <div className="Startvideoimage order-2 col-span-12 px-3 md:order-1 md:col-span-6 max-[767px]:mt-[8%]">
              <div className="Startvideo-left max-[767px]:text-center">
                <img
                  src="/images/experience/startvideo.png"
                  alt="Start Video Call"
                  className="relative right-0 h-auto w-[85%] max-[767px]:w-[90%]"
                />
              </div>
            </div>

            <div className="Startvideotext relative order-1 col-span-12 px-3 md:order-2 md:col-span-6">
              <div className="Startvideo-right max-[991px]:absolute max-[991px]:top-1/2 max-[991px]:-translate-y-1/2 max-[767px]:relative max-[767px]:top-1/2 max-[767px]:-translate-y-1/2">
                <div className="Startvideo">
                  <h2 className="mb-2 text-[50px] font-semibold leading-[60px] text-black max-[991px]:text-[32px] max-[991px]:leading-[40px] max-[767px]:text-[20px] max-[767px]:leading-[24px]">
                    Start Video Call with the Colive Revenue &amp; Experience Managers
                  </h2>
                </div>
                <div className="Startvideopara mt-4">
                  <p className="mb-4 pr-0 text-[21px] font-normal leading-[33px] text-black max-[991px]:text-[22px] max-[991px]:leading-[30px] max-[767px]:text-[14px] max-[767px]:leading-[20px]">
                    Each Club Colive Cluster has a dedicated Colive Revenue &amp; Experience Managers, to handle move-in queries, technical issues &amp; escalations. All our experience managers will be available from 3:00 PM to 5:00 PM daily, on a Google Meet video call.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 5: Select your property */}
      <section className="section5 relative bg-[#F6F6F6] px-[5%] py-[6%] max-[1200px]:px-[5%] max-[1200px]:py-[13%] max-[991px]:px-[5%] max-[991px]:py-[10%] max-[767px]:!px-[3%] max-[767px]:!py-[8%] max-[767px]:!pb-[10%]">
        <Container>
          <div className="-mx-3 grid grid-cols-12">
            <div className="relative col-span-12 px-3 md:col-span-6">
              <div className="Coexperience-left absolute left-0 top-1/2 -translate-y-1/2 max-[767px]:relative max-[767px]:top-1/2 max-[767px]:-translate-y-1/2">
                <div className="speak">
                  <h2 className="mb-2 text-[50px] font-semibold leading-[60px] text-black max-[991px]:text-[32px] max-[991px]:leading-[40px] max-[767px]:text-[20px] max-[767px]:leading-[24px]">
                    Select your property to meet your <span className="text-[#f8049c]">Colive Revenue &amp; Experience Managers</span>
                  </h2>
                </div>

                <div className="dropdown dropdownselect relative mt-6 w-[70%] md:mt-12 max-[767px]:w-full">
                  <select
                    id="ddlCEMMappingProperty"
                    className="selectpicker w-full cursor-pointer rounded-[30px] border-2 border-black bg-[#f6f6f6] px-[4%] py-[1.5%] text-[20px] font-semibold text-black focus-visible:border-2 focus-visible:border-black focus-visible:outline-none max-[767px]:!px-[6%] max-[767px]:!py-[2%]"
                    defaultValue=""
                  >
                    <option value="">Search by property</option>
                  </select>
                  <img
                    src="/images/experience/search-symbol.png"
                    alt="Search"
                    className="pointer-events-none absolute right-5 top-[10px] max-[767px]:top-3"
                  />
                </div>
              </div>
            </div>

            <div id="dvCEMLink" className="coexperienceimg col-span-12 px-3 text-center md:col-span-6 max-[767px]:mt-[10%]">
              <a id="CEMLink" href="" target="_blank" rel="noreferrer">
                <img
                  src="/images/experience/clicktojoin.png"
                  alt="Click to Join"
                  className="mx-auto h-auto w-[80%] max-[767px]:w-[90%]"
                />
                <div className="click-to-join mx-auto mt-6 w-[80%] rounded-full bg-[#F2006C] max-[767px]:w-[90%]">
                  <p className="btn-click-join mb-4 w-full border-0 bg-transparent px-5 py-[14px] text-[18px] font-medium text-white">
                    <img
                      src="/images/experience/Videoicon.png"
                      alt="Click to Join"
                      className="mr-[5px] mt-[-4px] inline-block w-[26px] align-middle"
                    />
                    Click to join
                  </p>
                </div>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 6: Emergency response team */}
      <section
        className="section6 w-full bg-[url('/images/experience/emergback.png')] bg-cover pt-[5%] max-[991px]:pt-[10%] max-[767px]:!px-[5%] max-[767px]:!pt-[8%] max-[767px]:!pb-[7%]"
      >
        <div className="w-full">
          <h2 className="emerg px-[23%] text-center text-[48px] font-bold max-[1200px]:px-[20%] max-[991px]:px-[12%] max-[991px]:text-[40px] max-[767px]:px-[10%] max-[576px]:px-[9%] max-[425px]:px-[3%] max-[425px]:text-[2rem]">
            Our <span className="text-[#f8049c]">emergency response team*</span> is available 24x7 <br />
            at <span className="text-[#f8049c]">7676 000 500 (Press 9)</span>
          </h2>

          <div className="btext mx-auto w-1/2 px-0 pt-[3%] text-center max-[991px]:w-[70%] max-[767px]:w-full">
            <p className="mb-4 pr-0 text-[1.5rem] font-medium leading-[2rem] max-[767px]:text-[14px] max-[767px]:leading-[1.8rem]">
              *Available for extremely serious emergencies
              only. For all general /support issues, please
              meet your Revenue &amp; Experience Managers.
            </p>
          </div>

          <div className="-mx-3 grid grid-cols-12 pt-[6%]">
            <div className="emergimg col-span-12 px-3 flex justify-center md:col-span-7 md:justify-end">
              <img
                src="/images/experience/emerg.png"
                alt="number"
                className="h-auto w-auto max-[991px]:w-[75%] max-[767px]:w-[80%]"
              />
            </div>

            <div className="med col-span-12 px-3 mt-[5%] md:col-span-5 max-[767px]:mt-[8%]">
              {[
                <>fire<br /> hazards</>,
                <>health<br /> hazards</>,
                <>theft/ serious<br /> emergencies</>,
              ].map((label, index) => (
                <div
                  className="medical relative right-[7%] mb-5 flex max-[767px]:left-[35%] max-[576px]:left-[30%]"
                  key={index}
                >
                  <img
                    className="righttick h-[60px] w-[60px] max-[576px]:h-[40px] max-[576px]:w-[40px]"
                    src="/images/experience/right.png"
                    alt="colive marathahalli"
                  />
                  <h5 className="rtext relative left-[13px] mb-2 text-[1.5rem] font-bold">
                    for <span className="text-[#f8049c]">{label}</span>
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Our promises */}
      <section className="section7 px-[5%] py-[6%] pb-[6%] max-[1200px]:px-[5%] max-[1200px]:pt-0 max-[1200px]:pb-[6%] max-[1200px]:pl-[10%] max-[991px]:px-[5%] max-[991px]:py-[10%] max-[767px]:!px-[5%] max-[767px]:!pt-0 max-[767px]:!pb-[6%]">
        <Container>
          <div className="-mx-3 grid grid-cols-12">
            <div className="promisetext col-span-12 px-3 pt-0 md:col-span-2 max-[767px]:pt-[5%] max-[767px]:pl-[2%]">
              <h2 className="relative top-[15%] mb-2 inline font-bold [writing-mode:vertical-lr] rotate-180 text-[56px] tracking-[-2px] max-[991px]:top-[8%] max-[767px]:right-[3%] max-[767px]:[writing-mode:horizontal-tb] max-[767px]:rotate-0 max-[767px]:text-[2rem] max-[767px]:tracking-normal">
                Our <span className="text-[#f8049c]">promises</span>
              </h2>
            </div>

            <div className="promisetext2 col-span-12 px-3 md:col-span-10 md:pr-[5%] max-[1200px]:pt-[5%] max-[991px]:p-0">
              <p className="mb-[6%] ml-[5%] text-[1.3rem] font-medium max-[767px]:relative max-[767px]:ml-0 max-[767px]:mt-[3%] max-[767px]:mb-[6%] max-[767px]:p-0 max-[767px]:text-[14px] max-[767px]:leading-[1.5em]">
                Colive goes the extra mile to ensure that all registered
                platform users get the best of our extended support umbrella.
              </p>

              <div className="style max-[767px]:mr-[-23%] max-[576px]:mr-0">
                <div className="-mx-3 grid grid-cols-12">
                  {[
                    ["style.png", "style", "pg near bellandur"],
                    ["smart.png", "smart", "pg rooms in bangalore"],
                    ["savings.png", "savings", "pg in sarjapur"],
                  ].map(([image, label, alt]) => (
                    <div key={label} className="col-span-4 px-3 text-center min-[576px]:col-span-3 md:col-span-4">
                      <div className="circle text-center">
                        <img
                          src={`/images/experience/${image}`}
                          alt={alt}
                          className="mx-auto h-auto max-w-full max-[425px]:w-[100px]"
                        />
                        <div className="overlay">
                          <h5 className="mb-2 font-bold max-[425px]:mt-[5%] max-[425px]:ml-[15%]">
                            <span className="capitalize text-[#f8049c]">{label}</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-[6%] -mx-3 grid grid-cols-12">
                  {[
                    ["safety.png", "safety", "pg near hsr layout bangalore"],
                    ["service.png", "service", "pg in hsr layout"],
                    ["social.png", "social", "pg in jayanagar"],
                  ].map(([image, label, alt]) => (
                    <div key={label} className="col-span-4 px-3 text-center min-[576px]:col-span-3 md:col-span-4">
                      <div className="circle text-center">
                        <img
                          src={`/images/experience/${image}`}
                          alt={alt}
                          className="mx-auto h-auto max-w-full max-[425px]:w-[100px]"
                        />
                        <div className="overlay">
                          <h5 className="mb-2 font-bold max-[425px]:mt-[5%] max-[425px]:ml-[15%]">
                            <span className="capitalize text-[#f8049c]">{label}</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}
