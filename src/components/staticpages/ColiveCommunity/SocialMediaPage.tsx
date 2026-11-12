"use client";

import { useEffect } from "react";

export default function SocialMediaPage() {
  useEffect(() => {
    let cancelled = false;

    const loadScript = (src: string, integrity?: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
        if (existing) {
          if (existing.dataset.loaded === "true") resolve();
          else {
            existing.addEventListener("load", () => resolve(), { once: true });
            existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
          }
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        if (integrity) {
          script.integrity = integrity;
          script.crossOrigin = "anonymous";
        }
        script.onload = () => {
          script.dataset.loaded = "true";
          resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });

    const initialize = async () => {
      try {
        await loadScript(
          "https://code.jquery.com/jquery-3.4.1.min.js",
          "sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
          "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        );
        await loadScript("/assets/js/bootstrap.min.js");
        await loadScript("/assets/js/custom.js?d=20190919");

        if (cancelled) return;

        const $ = (window as any).jQuery;
        if (!$) return;

        $(document).ready(function () {
          if (typeof (window as any).BindSocialMediaPosts === "function") {
            (window as any).BindSocialMediaPosts();
          }

          const queryValues =
            typeof (window as any).getQueryStringValues === "function"
              ? (window as any).getQueryStringValues()
              : {};
          const sourceTypeId = parseInt(queryValues?.source ?? "", 10);
          (window as any).SourceTypeId = sourceTypeId;

          if (sourceTypeId === 2 || sourceTypeId === 3) {
            $(".banner").css("padding-top", "50px");
          }
        });

        $(window).off("scroll.socialMediaPage").on("scroll.socialMediaPage", function () {
          const scroll = $(window).scrollTop();
          if (scroll <= 10) {
            $("#navbar").removeClass("box-shadow");
          } else {
            $("#navbar").addClass("box-shadow");
          }
        });
      } catch (error) {
        console.error("Social media page scripts could not be initialized:", error);
      }
    };

    void initialize();

    return () => {
      cancelled = true;
      const $ = (window as any).jQuery;
      if ($) $(window).off("scroll.socialMediaPage");
    };
  }, []);

  return (
    <main id="social_page_wrapper" className="w-full">
      <div id="site_homepage">
        <section id="index-banner" className="homepage-wrap mt-[10%] bg-[url('/images/socialmedia/socialmedia-banner.png')] bg-cover bg-no-repeat p-0">
          <div className="banner pt-[100px] pb-0">
            <div className="mx-auto w-full max-w-[1140px] px-3">
              <div className="row flex flex-wrap pb-5">
                <div className="col w-full sm:w-1/4">
                  <div className="banner_img flex h-full items-center justify-center">
                    <img
                      src="/images/awards/ETI-logo.png"
                      alt="colive pg in bangalore"
                      className="h-auto max-w-full"
                    />
                  </div>
                </div>
                <div className="col flex w-full items-center justify-center sm:w-3/4">
                  <div className="Banner_text">
                    <h1 className="Main_headertext mb-[7px] mt-0 text-left text-[44px] font-medium text-white">
                      Social Media Posts
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="social_page">
        <div className="social_media_Slider pt-[50px]">
          <div className="mx-auto w-full max-w-[1140px] px-3">
            <div className="row flex flex-wrap">
              <div className="col w-full sm:w-1/4">
                <div className="SocialProfile">
                  <div className="SocialMediaBtnGroup bg-white p-[15px] shadow-[0_0_6px_2px_#efefef]">
                    <div className="social_heading">
                      <h2 className="mt-[15px] mb-1 text-center text-[20px] font-semibold text-[#324b72]">
                        Social Media
                      </h2>
                      <h2 className="mb-4 mt-[15px] text-center text-base font-normal leading-[1.5] text-[#989898]">
                        Gallery
                      </h2>
                    </div>
                    <div className="socialBtnSec">
                      <div className="social-effect" id="social-Buttons" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col w-full sm:w-3/4">
                <div className="SocialGrids">
                  <div className="row SocialView min-h-[256px]" id="SocialMediaImages" />
                  <div
                    className="row SocialView hidden min-h-[50vh] items-center justify-center"
                    id="SocialMediaNoposts"
                  >
                    <div className="flex min-h-[50vh] w-full items-center justify-center">
                      <h6>No Posts Available !</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location/menu modal retained for the existing legacy scripts. */}
      <div className="modal" id="video-modal">
        <div className="modal-background" />
        <div className="modal-content">
          <div className="container" id="divLocationMenus">
            <div className="CityList" id="CityList" />
          </div>
          <button className="modal-close is-large" id="btnClose" aria-label="close" type="button">
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

      <div className="CssLoaderStyles" id="AjaxLoader" style={{ display: "none" }}>
        <div className="CssLoaderAlign">
          <div className="Logo-loader" />
          <div className="logoloader" />
        </div>
      </div>
      <input type="hidden" id="hdnJsonImages" value="" readOnly />
    </main>
  );
}
