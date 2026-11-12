 "use client";

import { useEffect } from "react";

declare global {
  interface Window {
    getQueryStringValues?: () => Record<string, string | undefined>;
    SourceTypeId?: number;
    jQuery?: any;
    $?: any;
  }
}

export default function SavingsPromisePage() {
  useEffect(() => {
    const loadScript = (src: string, integrity?: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
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
          "sha256-CSXorXvZC Tkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
            .replace(" ", "")
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
          "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        );
        await loadScript("/assets/js/bootstrap.min.js");
        await loadScript("/assets/js/custom.js?d=20191105");

        if (cancelled) return;

        const sourceValues = window.getQueryStringValues?.();
        const sourceTypeId = Number.parseInt(sourceValues?.source ?? "", 10);
        window.SourceTypeId = sourceTypeId;

        if (sourceTypeId === 2 || sourceTypeId === 3) {
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
        className="Our6s_Content_wrapper Our6s_Savings_Wrapper mt-[10%] flex h-full w-full items-center px-10 py-[50px] pb-10 max-md:mt-12 max-md:block max-md:px-[18px] max-md:py-[18px]"
      >
        <div className="w-full">
          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-8">
              <div className="Our6S_Heading mb-2 text-right text-[52px] font-semibold text-[#ef0075] max-md:text-left max-md:text-[36px]">
                <h1 className="mb-2 text-[52px] font-semibold text-[#ef0075] max-md:text-[36px]">
                  Savings
                  <span className="Our6s_Heading_Tag pl-[10px] text-[20px] max-md:text-[18px]">
                    with our stay
                  </span>
                </h1>
              </div>

              <div className="Our6s_Tag_Heading mb-4 text-2xl font-medium text-black max-md:text-[20px] max-md:leading-[1.3]">
                Colive also cares about your money and gives you the best service which is economical, with pocket friendly value rental which includes your basic services.
              </div>

              <div className="Our6s_Content mb-[15px]">
                <div className="Our6s_Heading1 mb-2 text-lg font-medium text-black">
                  2 months deposit
                </div>
                <ul className="list-disc pl-[22px] text-sm font-normal text-[#222]">
                  <li>
                    At{" "}
                    <a href="/" className="cursor-pointer text-black">
                      Colive
                    </a>{" "}
                    the Security Deposit it as low as that of 2 months rent which again is completely refundable
                  </li>
                </ul>
              </div>

              <div className="Our6s_Content mb-[15px]">
                <div className="Our6s_Heading1 mb-2 text-lg font-medium text-black">
                  Pocket friendly value rentals
                </div>
                <ul className="list-disc space-y-0 pl-[22px] text-sm font-normal text-[#222]">
                  <li>
                    Great Savings on buying / renting of home appliances or any other necessary equipment, Colive provides all the necessities to its residents.
                  </li>
                  <li>
                    Colive also provides the option of Deposit Funding to the residents.
                  </li>
                  <li>
                    Colive residents can enjoy hassle-free move-in to any other location within Colive without any added charges.
                  </li>
                  <li>
                    Save up the time wasted in commuting to workplace &amp; beat the traffic chaos by opting to stay within walking distance from your workplace.
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
                  src="/assets/images/homepage/ourfeatures/Savings.jpg"
                  alt="Savings with our stay"
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
