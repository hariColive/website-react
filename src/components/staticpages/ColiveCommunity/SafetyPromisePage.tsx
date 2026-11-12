"use client";

import { useEffect } from "react";

export default function SafetyPromisePage() {
  useEffect(() => {
    const scriptSources = [
      "https://code.jquery.com/jquery-3.4.1.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
      "/assets/js/bootstrap.min.js",
      "/assets/js/custom.js?d=20191105",
    ];

    let cancelled = false;

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>(
          `script[src="${src}"]`
        );

        if (existing) {
          if (existing.dataset.loaded === "true") resolve();
          else {
            existing.addEventListener("load", () => resolve(), { once: true });
            existing.addEventListener(
              "error",
              () => reject(new Error(`Unable to load ${src}`)),
              { once: true }
            );
          }
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = () => {
          script.dataset.loaded = "true";
          resolve();
        };
        script.onerror = () => reject(new Error(`Unable to load ${src}`));
        document.body.appendChild(script);
      });

    (async () => {
      try {
        for (const src of scriptSources) {
          await loadScript(src);
          if (cancelled) return;
        }

        const $ = (window as any).jQuery || (window as any).$;
        if ($) {
          const getQueryStringValues = (window as any).getQueryStringValues;
          if (typeof getQueryStringValues === "function") {
            const sourceTypeId = parseInt(getQueryStringValues()["source"], 10);
            if (sourceTypeId === 2 || sourceTypeId === 3) {
              $("#our6s_combo_Page .Our6s_Content_wrapper").css(
                "margin-top",
                "0"
              );
            }
          }
        }
      } catch (error) {
        console.error("Safety page scripts could not be loaded:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main
      id="our6s_combo_Page"
      className="w-full overflow-x-hidden bg-white text-black"
    >
      <section
        id="Our6s_Safety_Wrapper"
        className="Our6s_Content_wrapper Our6s_Safety_Wrapper mt-[10%] flex h-full items-center px-10 py-[50px] pb-10 max-md:mt-12 max-md:block max-md:p-[18px]"
      >
        <div className="container-fluid mx-auto w-full">
          <div className="grid grid-cols-1 items-center md:grid-cols-12">
            <div className="col-span-1 md:col-span-8">
              <div className="Our6S_Heading mb-2 text-right text-[52px] font-semibold text-[#ef0075] max-md:text-left max-md:text-[36px]">
                <h1 className="text-[52px] font-semibold leading-tight text-[#ef0075] max-md:text-[36px]">
                  Safety
                  <span className="Our6s_Heading_Tag pl-[10px] text-[20px] max-md:text-[18px]">
                    first
                  </span>
                </h1>
              </div>

              <div className="Our6s_Tag_Heading mb-4 text-[24px] font-medium text-black max-md:text-[20px] max-md:leading-[1.3]">
                Colive cares and provides the maximum security to ensure the
                safety for each &amp; every residents at the property.
              </div>

              <div className="Our6s_Content mb-[15px]">
                <div className="Our6s_Heading1 mb-2 text-[18px] font-medium text-black">
                  Facial Recognition Access Management Engine
                </div>
                <ul className="list-disc pl-[22px] text-[14px] font-normal text-[#222]">
                  <li>
                    <a href="/" className="cursor-pointer text-black">
                      Colive
                    </a>{" "}
                    has a Frame (Facial Recognition Access Management Engine)
                    across all the properties to shield its residents from
                    non-residents, it protects from or unlikely to cause danger,
                    risk incident
                  </li>
                </ul>
              </div>

              <div className="Our6s_Content mb-[15px]">
                <div className="Our6s_Heading1 mb-2 text-[18px] font-medium text-black">
                  Emergency Response Team
                </div>
                <ul className="list-disc pl-[22px] text-[14px] font-normal text-[#222]">
                  <li>
                    ERT (Emergency Response Team) is available 24/7 to its
                    residents in case of any emergency; the team shall response
                    immediately to any incident raised at the doorstep.
                  </li>
                </ul>
              </div>

              <div className="Our6s_Content mb-[15px]">
                <div className="Our6s_Heading1 mb-2 text-[18px] font-medium text-black">
                  CCTV &amp; Video Surveillance
                </div>
                <ul className="list-disc pl-[22px] text-[14px] font-normal text-[#222]">
                  <li>
                    Colive properties are well-equipped with CCTV &amp; Video
                    Surveillance. The CSM team (Central Security Monitoring
                    Team) will be monitoring all the events happening across
                    the locations and report any untoward incidents to the
                    security to act on the situation immediately.
                  </li>
                </ul>
              </div>

              <div className="TabSecExplore m-0">
                <button
                  type="button"
                  className="scheduleFreeVissit mb-[15px] mt-[5px] cursor-pointer rounded-[5px] border-[1.5px] border-[#ef0075] bg-transparent px-[22px] py-[6px] font-medium text-[#ef0075]"
                  id="btnExplore6S"
                  name="btnExplore6S"
                >
                  Schedule a Visit
                </button>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4">
              <div className="Image_Wrapper_Our6s flex h-full items-center justify-center">
                <img
                  src="/assets/images/homepage/ourfeatures/Safety.jpg"
                  className="h-auto w-full max-w-full"
                  alt="pg in Bangalore"
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
            >
              <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
