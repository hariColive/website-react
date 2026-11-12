 "use client";

import { useEffect } from "react";

declare global {
  interface Window {
    SourceTypeId?: number;
  }
}

export default function SmartPromisePage() {
  useEffect(() => {
    const loadScript = (src: string, integrity?: string) =>
      new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = false;

        if (integrity) {
          script.integrity = integrity;
          script.crossOrigin = "anonymous";
        }

        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });

    let cancelled = false;

    const initialize = async () => {
      try {
        await loadScript(
          "https://code.jquery.com/jquery-3.4.1.min.js",
          "sha256-CSXorVxZC Tkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=".replace(" ", "")
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
          "sha384-ApNbgh9b+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        );
        await loadScript("/assets/js/bootstrap.min.js");
        await loadScript("/assets/js/custom.js?d=20191105");

        if (cancelled) return;

        if (window.SourceTypeId === 2 || window.SourceTypeId === 3) {
          const wrapper = document.querySelector<HTMLElement>(
            "#our6s_combo_Page .Our6s_Content_wrapper"
          );
          if (wrapper) wrapper.style.marginTop = "0";
        }
      } catch (error) {
        console.error("Unable to initialize legacy Colive scripts:", error);
      }
    };

    void initialize();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main id="our6s_combo_Page" className="w-full">
      <section
        id="Our6s_Safety_Wrapper"
        className="Our6s_Content_wrapper Our6s_Smart_Wrapper mt-[10%] flex h-full w-full items-center px-10 py-[50px] pb-10 max-md:mt-12 max-md:block max-md:px-[18px] max-md:py-[18px]"
      >
        <div className="w-full">
          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-8">
              <div className="Our6S_Heading mb-2 text-right text-[52px] font-semibold text-[#ef0075] max-md:text-left max-md:text-[36px]">
                <h1 className="mb-2 text-[52px] font-semibold text-[#ef0075] max-md:text-[36px]">
                  Smart
                  <span className="Our6s_Heading_Tag pl-[10px] text-[20px] max-md:text-[18px]">
                    Stay
                  </span>
                </h1>
              </div>

              <div className="Our6s_Tag_Heading mb-4 text-2xl font-medium text-black max-md:text-[20px] max-md:leading-[1.3]">
                Stay smart at Colive with modern features and upgrade your lifestyle to the millennium &amp; next generation experiance.
              </div>

              <div className="Our6s_Content mb-[15px]">
                <div className="Our6s_Heading1 mb-2 text-lg font-medium text-black">
                  Digital door locks
                </div>
                <ul className="list-disc pl-[22px] text-sm font-normal text-[#222]">
                  <li>
                    <a href="/" className="cursor-pointer text-black">
                      Colive
                    </a>{" "}
                    assists you with SHONA (Smart Home Operations &amp; Networking Assistance) for any sales and service queries and provide immediate assistance or clarifications to its residents &amp; customers.
                  </li>
                  <li>
                    All the Bestow properties at Colive are installed with the digital smart locks for the easy usage &amp; effective security within the premises.
                  </li>
                </ul>
              </div>

              <div className="Our6s_Content mb-[15px]">
                <div className="Our6s_Heading1 mb-2 text-lg font-medium text-black">
                  High Speed internet
                </div>
                <ul className="list-disc pl-[22px] text-sm font-normal text-[#222]">
                  <li>
                    Internet is very much essential in our day lives! At Colive every property is provided with high speed internet for the residents for an uninterrupted networking.
                  </li>
                  <li>
                    Colive Apps is one stop solution, from searching for an accommodation to raising the service request for any issues.
                  </li>
                </ul>
              </div>

              <div className="Our6s_Content mb-[15px]">
                <div className="Our6s_Heading1 mb-2 text-lg font-medium text-black">
                  Urban co-working space
                </div>
                <ul className="list-disc pl-[22px] text-sm font-normal text-[#222]">
                  <li>
                    Co-working Spaces &amp; Meeting rooms are available to enable a comfortable work from home experience.
                  </li>
                  <li>
                    Big Basket Instant is installed at all our properties for the quick need.
                  </li>
                </ul>
              </div>

              <div className="TabSecExplore my-0 mb-12">
                <button
                  type="button"
                  className="scheduleFreeVissit mt-[5px] mb-[15px] cursor-pointer rounded-[5px] border-[1.5px] border-[#ef0075] bg-transparent px-[22px] py-[6px] font-medium text-[#ef0075]"
                  id="btnExplore6S"
                  name="btnExplore6S"
                >
                  Schedule a Visit
                </button>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-4">
              <div className="Image_Wrapper_Our6s flex h-full items-center justify-center">
                <img
                  src="/assets/images/homepage/ourfeatures/Smart.jpg"
                  alt="Smart Stay"
                  className="h-auto max-w-full max-md:w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
