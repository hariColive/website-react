"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    CreateEscalation?: () => void;
    jQuery?: any;
    $?: any;
  }
}

const scriptSources = [
  "https://code.jquery.com/jquery-3.4.1.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/jquery.validate.min.js",
  "/assets/js/bootstrap.min.js",
  "/assets/js/custom.js?d=20210809",
];

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") resolve();
      else {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error(`Unable to load ${src}`)), { once: true });
      }
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => { script.dataset.loaded = "true"; resolve(); };
    script.onerror = () => reject(new Error(`Unable to load ${src}`));
    document.body.appendChild(script);
  });
}

export default function EscalationPage() {
  const [showThankYou] = useState(false);
  const [scriptsReady, setScriptsReady] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        for (const src of scriptSources) await loadScript(src);
        if (!active) return;
        const $ = window.jQuery || window.$;
        if ($ && $.fn?.validate) {
          $("#frmEscalation").validate({
            rules: {
              name: { required: true, normalizer: (value: string) => $.trim(value) },
              Contactnumber: { required: true, number: true, maxlength: 10, minlength: 10 },
              email: { required: true, email: true },
              message: "required",
            },
            messages: {
              name: "Please enter your Name",
              Contactnumber: "Please enter valid number",
              email: "Please enter valid email",
              message: "Please enter your message",
            },
          });
        }
        setScriptsReady(true);
      } catch (error) {
        console.error("Escalation page scripts could not be loaded:", error);
      }
    })();
    return () => { active = false; };
  }, []);

  const handleJoinZoomCall = () => {
    const $ = window.jQuery || window.$;
    if ($ && $("#frmEscalation").length && !$("#frmEscalation").valid()) return;
    if (typeof window.CreateEscalation === "function") window.CreateEscalation();
    else console.error("CreateEscalation() was not found in the loaded legacy scripts.");
  };

  return (
    <main className="w-full overflow-x-hidden bg-white text-black">
      <div className="container mx-auto px-4">
        <h1 className="mt-[9%] mb-[25px] text-center text-[30px] font-bold text-[#2B001F] max-md:mt-[40%] max-md:text-[26px]">
          Welcome to the virtual escalation room
        </h1>
      </div>

      <section className="w-full">
        <div className="container mx-auto px-4">
          <div className="my-[2%] grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="w-full">
              <div>
                <video className="mx-auto h-full max-h-[450px] w-full" autoPlay controls>
                  <source src="https://www.colive.com/utility/media/Escalation.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="py-[7%] max-md:py-[3%]">
                <p className="text-[19px] font-medium leading-[28px] text-black max-md:text-[18px]">
                  Drop a message &amp; we'll revert soon. We are live on Zoom every day from 5 PM to 6 PM, and you can talk to our senior management (CEO/CXOs) on Wednesdays.
                </p>
              </div>
            </div>

            <div className="w-full text-center">
              {!showThankYou ? (
                <div id="dvForm" className="mx-auto w-[85%] max-md:w-full">
                  <form action="" method="post" id="frmEscalation" noValidate>
                    <div id="form-content">
                      <div className="relative mb-4">
                        <input className="w-full rounded-[20px] border border-transparent bg-[#e0e0e0] py-2 pl-[8%] pr-4 text-[15px] placeholder:font-bold focus:border-2 focus:border-dotted focus:border-[#e62e92] focus:outline-none" type="text" name="name" id="name" placeholder="Name" />
                      </div>
                      <div className="relative mb-4">
                        <input className="w-full rounded-[20px] border border-transparent bg-[#e0e0e0] py-2 pl-[8%] pr-4 text-[15px] placeholder:font-bold focus:border-2 focus:border-dotted focus:border-[#e62e92] focus:outline-none" type="tel" name="Contactnumber" id="Contactnumber" pattern="[6789][0-9]{9}" placeholder="Contact Number" />
                      </div>
                      <div className="relative mb-4">
                        <input className="w-full rounded-[20px] border border-transparent bg-[#e0e0e0] py-2 pl-[8%] pr-4 text-[15px] placeholder:font-bold focus:border-2 focus:border-dotted focus:border-[#e62e92] focus:outline-none" type="email" name="email" id="email" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}" placeholder="Email" />
                      </div>
                      <div className="relative mb-4">
                        <input className="w-full rounded-[20px] border border-transparent bg-[#e0e0e0] py-2 pl-[8%] pr-4 text-[15px] placeholder:font-bold focus:border-2 focus:border-dotted focus:border-[#e62e92] focus:outline-none" type="text" name="serviceticket" id="serviceticket" placeholder="Service Request Number" />
                      </div>
                      <div className="relative mb-4">
                        <textarea className="w-full rounded-[20px] border border-transparent bg-[#e0e0e0] px-[8%] py-3 text-[15px] placeholder:font-bold focus:border-2 focus:border-dotted focus:border-[#e62e92] focus:outline-none" name="message" id="message" rows={5} cols={30} dir="ltr" placeholder="Brief description of your problem" required />
                      </div>
                      <div className="flex justify-center gap-5 text-center">
                        <input className="cursor-pointer rounded-[20px] border border-[#2B001F] bg-[#2B001F] px-5 py-[5px] text-white disabled:opacity-60" type="button" value="Join Zoom Call" name="submit" onClick={handleJoinZoomCall} disabled={!scriptsReady} />
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div id="dvThankYou" className="text-center">
                  <img className="mx-auto w-[60px]" src="/images/message-to-ceo/marked.png" alt="thank-you" />
                  <p className="mt-4 text-[20px] font-medium leading-6 text-black">
                    Thank you. Your escalation is noted. To escalate in person, please join our Daily Zoom Call between 5&nbsp;PM to 6 PM every day.
                  </p>
                  <div className="mt-4 text-center">
                    <a href="https://us02web.zoom.us/j/87583523142?pwd=MGdadldLSVRyYkNPVFB2SnlwNk1vZz09#success" target="_blank" rel="noreferrer">
                      <input className="cursor-pointer rounded-[20px] border border-[#2B001F] bg-[#2B001F] px-5 py-[5px] text-white" type="button" value="Join Zoom Call" name="submit" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#dcdcdc] py-[5%]">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              <img className="w-[45px]" src="/images/message-to-ceo/sucess-magenta.png" alt="app-service" />
              <h3 className="ml-[2%] text-[26px] font-bold text-[#6a6e77] max-md:text-[20px]">
                The fastest way to resolution is an <span className="text-[#2B001F]">in-app service request</span>
              </h3>
            </div>
            <div className="mt-[3%]">
              <p className="text-[19px] font-medium leading-[26px] text-black max-md:text-[16px] max-md:leading-[22px]">
                The staff &amp; management at Colive work round-the-clock to ensure that all in-app service requests are processed in a timely fashion. If you haven't already,
                please raise a service request for your issue today.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="modal" id="video-modal">
        <div className="modal-background" />
        <div className="modal-content">
          <div className="container" id="divLocationMenus"><div className="CityList" id="CityList" /></div>
          <button className="modal-close is-large" id="btnClose" aria-label="close" type="button">
            <svg version="1.1" className="svgClose" id="closeLoc" style={{ transform: "rotate(270deg)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.49 31.49">
              <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z" />
            </svg>
          </button>
        </div>
      </div>

      <input type="hidden" id="hdnCityID" />
      <input type="hidden" id="hdnURL" />
      <input type="hidden" id="hdnSearchToken" value="" />
    </main>
  );
}
