"use client";

import { useState } from "react";

const testimonialImages = [
  { src: "/images/reviews/Gunjan-519x678.jpg", alt: "Gunjan_Colive" },
  { src: "/images/reviews/Hariharan-519x678.jpg", alt: "Hariharan_Colive" },
  { src: "/images/reviews/Karthik-519x678.jpg", alt: "Karthik_Colive" },
  { src: "/images/reviews/Kushal-519x678.jpg", alt: "Kushal_Colive" },
  { src: "/images/reviews/Vipul-519x678.jpg", alt: "Vipul_Colive" },
];

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com/Lets_Colive", icon: "fa-brands fa-twitter" },
  { label: "Facebook", href: "https://www.facebook.com/colive.in/", icon: "fa-brands fa-facebook" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/coliveyourway", icon: "fa-brands fa-linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/colive.in ", icon: "fa-brands fa-instagram" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC97k6haFp6RU_0puYWvlJuw", icon: "fa-brands fa-youtube" },
];

export default function ReviewsPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <main className="w-full">
      <section className="reviewwrap homepage-wrap mt-12">
        <section className="members mt-[5%] py-[7%] max-[767px]:pt-[20%]">
          <div className="container-fluid w-full px-3">
            <div className="member-wrap">
              <div className="row flex flex-wrap items-stretch">
                <div className="TestimonialLeftContain col flex w-full items-center justify-center pl-4 md:w-7/12 md:pl-20">
                  <div className="TestimonialLeftSec w-full">
                    <div className="TestimonialContent">
                      <h1 className="Heading_blog text-[30px] font-bold leading-[45px] text-[#112950] md:text-[62px] md:leading-[70px]">
                        WHAT FELLOW COLIVERS HAVE<br />TO SAY.
                      </h1>
                      <div className="TestimonialSocialIcons">
                        <div className="TestMOnialDiv">
                          <ul className="TestimonialSocialULList flex list-none flex-wrap items-center p-0">
                            {socialLinks.map((link) => (
                              <li key={link.label} value={link.label.toLowerCase()}>
                                <a href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}
                                  className={`${link.icon} mx-[6px] inline-block py-[15px] text-[20px] text-[#324b72]`} />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="FindSomeSocialCommunites">
                          <p>Find us on the Social Communities</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="TestimonialRightSec col w-full md:w-5/12 lg:w-1/3">
                  <div className="relative">
                    <div className="overflow-hidden">
                      <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                      >
                        {testimonialImages.map((image) => (
                          <div className="w-full shrink-0" key={image.alt}>
                            <img src={image.src} alt={image.alt} className="h-auto w-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Previous testimonial"
                      onClick={() =>
                        setActiveTestimonial(
                          (activeTestimonial - 1 + testimonialImages.length) %
                            testimonialImages.length
                        )
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-xl shadow"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Next testimonial"
                      onClick={() =>
                        setActiveTestimonial(
                          (activeTestimonial + 1) % testimonialImages.length
                        )
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-xl shadow"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div className="m-hide col hidden w-0 lg:block lg:w-1/12" />
              </div>
            </div>
          </div>
        </section>
      </section>

      <div className="modal" id="video-modal">
        <div className="modal-background" />
        <div className="modal-content">
          <div className="container" id="divLocationMenus">
            <div className="CityList" id="CityList" />
          </div>
          <button className="modal-close is-large" id="btnClose" aria-label="close" type="button">
            <svg version="1.1" className="svgClose" id="closeLoc" style={{ transform: "rotate(270deg)" }}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.49 31.49" xmlSpace="preserve">
              <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
