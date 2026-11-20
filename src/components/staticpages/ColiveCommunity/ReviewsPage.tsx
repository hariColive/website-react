
"use client";

import { useState } from "react";

const testimonialImages = [
  {
    src: "/images/testimonials/Gunjan-519x678.jpg",
    alt: "Gunjan_Colive",
  },
  {
    src: "/images/testimonials/Hariharan-519x678.jpg",
    alt: "Hariharan_Colive",
  },
  {
    src: "/images/testimonials/Karthik-519x678.jpg",
    alt: "Karthik_Colive",
  },
  {
    src: "/images/testimonials/Kushal-519x678.jpg",
    alt: "Kushal_Colive",
  },
  {
    src: "/images/testimonials/Vipul-519x678.jpg",
    alt: "Vipul_Colive",
  },
];

const socialLinks = [
  {
    label: "Twitter",
    href: "https://twitter.com/Lets_Colive",
    icon: "bi bi-twitter-x",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/colive.in/",
    icon: "bi bi-facebook",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/coliveyourway",
    icon: "bi bi-linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/colive.in",
    icon: "bi bi-instagram",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC97k6haFp6RU_0puYWvlJuw",
    icon: "bi bi-youtube",
  },
];

export default function ReviewsPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const previousTestimonial = () => {
    setActiveTestimonial(
      (activeTestimonial - 1 + testimonialImages.length) %
        testimonialImages.length
    );
  };

  const nextTestimonial = () => {
    setActiveTestimonial(
      (activeTestimonial + 1) % testimonialImages.length
    );
  };

  return (
    <main className="-mt-[7%] w-full">
      <section className="reviewwrap homepage-wrap mt-12">
        <section className="members mt-[5%] pt-[7%] pb-[7%] max-[767px]:pt-[20%]">
          <div className="container-fluid w-full px-[10px]">
            <div className="member-wrap">
              <div className="row flex flex-wrap items-center">

                {/* Left Section */}
                <div className="TestimonialLeftContain flex w-full items-center justify-center pl-4 md:w-7/12 md:pl-20 max-[767px]:pl-4">
                  <div className="TestimonialLeftSec w-full">
                    <div className="TestimonialContent">

                      <h1 className="Heading_blog mb-0 text-[30px] leading-[45px] font-bold text-[#112950] md:text-[62px] md:leading-[70px]">
                        WHAT FELLOW COLIVERS HAVE
                        <br />
                        TO SAY.
                      </h1>

                      {/* Social Media */}
                      <div className="TestimonialSocialIcons mt-[45px]">
                        <div className="TestMOnialDiv">
                          <ul className="TestimonialSocialULList m-0 flex list-none flex-wrap items-center gap-[18px] p-0">
                            {socialLinks.map((link) => (
                              <li key={link.label}>
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label={link.label}
                                  className="flex size-[55px] items-center justify-center rounded-full border-[3px] border-[#ef0073] text-[25px] text-[#ef0073] no-underline transition-colors duration-200 hover:bg-[#ef0073] hover:text-white"
                                >
                                  <i className={link.icon} />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="FindSomeSocialCommunites mt-[18px] max-w-[415px] border-t-2 border-[#ef0073] pt-[15px]">
                          <p className="m-0 ml-[4px] text-[18px] leading-6 font-normal text-black">
                            Find us on the Social Communities
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Right Section - Testimonial Carousel */}
                <div className="TestimonialRightSec w-full px-0 md:w-5/12 lg:w-1/3">
                  <div className="carouesl-wrap relative mx-auto w-full max-w-[454px]">

                    <div
                      className="owl-carousel owl-theme overflow-hidden border-[5px] border-[#ef0073]"
                      id="carousel-comment"
                    >
                      <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                          transform: `translateX(-${activeTestimonial * 100}%)`,
                        }}
                      >
                        {testimonialImages.map((image) => (
                          <div
                            className="item w-full shrink-0"
                            key={image.alt}
                          >
                            <div className="testimonial_image">
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="block h-auto w-full"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Previous Button */}
                    <button
                      type="button"
                      onClick={previousTestimonial}
                      aria-label="Previous testimonial"
                      className="absolute top-1/2 left-0 z-10 flex h-[50px] w-[52px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-[5px] border-0 bg-[#ef0073] text-[38px] leading-none text-white"
                    >
                      ‹
                    </button>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={nextTestimonial}
                      aria-label="Next testimonial"
                      className="absolute top-1/2 right-0 z-10 flex h-[50px] w-[52px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-l-[5px] border-0 bg-[#ef0073] text-[38px] leading-none text-white"
                    >
                      ›
                    </button>

                  </div>
                </div>

                {/* Empty Right Column */}
                <div className="m-hide hidden w-0 lg:block lg:w-1/12" />

              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Video Modal */}
      <div className="modal" id="video-modal">
        <div className="modal-background" />

        <div className="modal-content">
          <div className="container" id="divLocationMenus">
            <div className="CityList" id="CityList" />
          </div>

          <button
            className="modal-close is-large"
            id="btnClose"
            aria-label="close"
            type="button"
          >
            <svg
              version="1.1"
              className="svgClose"
              id="closeLoc"
              style={{ transform: "rotate(270deg)" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 31.49 31.49"
              xmlSpace="preserve"
            >
              <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
