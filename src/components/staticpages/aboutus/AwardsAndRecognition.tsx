import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
const AwardsAndRecognition = () => {
  const achievements = [
    "Rated among the ‘5 Indian Start-ups that helped millennials to go smarter in 2020’ - Asian Age",
    "Rated among the ‘5 most popular apps among millennials’ - Hans India",
    "‘Transforming the rental industry with the buy-to-let model‘ – Deccan Herald",
    "‘A Platform that can make everyday life efficient for the tech savvy’ – Deccan Chronicle",
    "Colive App among the ‘Mobile apps that are hot with Millennials’ – The Financial Express",
    "Ranked among the ‘From teen to adulthood these 5 Apps will become your saviour’ – T3F5",
  ];

  return (
    <>
      <section
        id="index-banner"
        className="!relative !w-full !bg-[url('/images/awards/homepage_banner.png')] !bg-cover !bg-no-repeat !p-0"
      >
        <div className="!pt-[100px] !pb-[34px] max-[767px]:!mt-0 max-[767px]:!mb-[24px] max-[767px]:!pt-[78px] max-[767px]:!pb-[14px]">
          <div className="!mx-auto !w-full !px-3">
            <div className="!flex !flex-wrap">
              <div className="!w-full sm:!w-1/4">
                <div className="!flex !h-full !items-center !justify-center">
                  <img
                    src="/images/awards/ETI-logo.png"
                    alt="colive pg in bangalore"
                    className="!h-auto !max-w-full !pt-5 sm:!pt-0 sm:!w-full max-[767px]:!w-[70%] max-[576px]:!w-[30%]"
                  />
                </div>
              </div>

              <div className="!flex !w-full !items-center sm:!w-3/4">
                <div className="!w-full">
                  <div className="!mx-auto !w-full sm:!w-2/3">
                    <div className="!text-center">
                      <h1 className="!mb-[7px] !text-center !text-[34px] !font-medium !leading-[1.5] !text-white max-[767px]:!mt-3 max-[767px]:!p-[5px] max-[767px]:!text-[20px]">
                        Awards &amp; Recognition
                      </h1>

                      <div className="!text-[18px] !leading-[1.5] !text-[#ffffffb3]">
                        <div>
                          Colive Community is warm, embracing and an inclusive
                          group of fun &amp; young people
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="!p-0">
        <div className="!relative !mx-auto !w-full !px-3 !pt-[50px]">
          <div className="!flex !flex-wrap">
            <div className="!w-full">
              <div className="!flex !flex-wrap">
                {achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="!w-full !px-3 sm:!w-1/3"
                  >
                    <div className="!relative !my-[15px] !flex !h-[130px] !max-h-[130px] !items-center !justify-center !border !border-[#eee] !p-[15px] !shadow-[0_0_5px_0_#dadada]">
                    <span
                    className="bi bi-trophy-fill !absolute !-top-[18px] !left-[18px] !border-2 !border-[#ef0073] !bg-white !px-[10px] !py-[9px] !text-[20px] !text-[#ef0073] !shadow-[0_0_5px_0_#dadada]"
                    aria-hidden="true"
                    />
                      <p className="!m-0 !text-center !text-[14px] !font-normal !leading-[23px] !text-[#324B72]">
                        {achievement}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AwardsAndRecognition;