const escalationFields = [
  { name: "name", type: "text", placeholder: "Name", autoComplete: "name" },
  { name: "Contactnumber", type: "tel", placeholder: "Contact Number", autoComplete: "tel", pattern: "[6789][0-9]{9}" },
  { name: "email", type: "email", placeholder: "Email", autoComplete: "email", pattern: "[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-zA-Z]{2,4}" },
  { name: "serviceticket", type: "text", placeholder: "Service Request Number" },
] as const;

export default function EscalationPage() {
  return (
    <main className="overflow-x-hidden bg-white font-['Inter-Regular']">
      <div className="ceomessage container mx-auto px-4">
        <h1 className="mt-[9%] mb-[25px] text-center text-[30px] font-bold text-[#2B001F] max-[767px]:mt-[40%] max-[767px]:text-[26px]">
          Welcome to the virtual escalation room
        </h1>
      </div>

      <section>
        <div className="ceomessage container mx-auto px-4">
          <div className="messageblock my-[2%] grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="w-full">
              <div className="ceonote">
                <video className="h-full w-full max-h-[450px]" autoPlay controls>
                  <source src="https://www.colive.com/utility/media/Escalation.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="ceomessagecontent py-[7%] max-[767px]:py-[3%]">
                <p className="text-[19px] font-medium leading-[28px] text-black max-[767px]:text-[18px]">
                  Drop a message &amp; we&apos;ll revert soon. We are live on Zoom every day from 5 PM to 6 PM, and you can talk to our senior management (CEO/CXOs) on Wednesdays.
                </p>
              </div>
            </div>

            <div className="escalation w-full text-center">
              <div className="escalationwrap mx-auto w-[85%] max-[767px]:w-full">
                <form action="#" method="post" id="frmEscalation" noValidate className="w-full">
                  <div id="form-content">
                    {escalationFields.map((field) => (
                      <div className="relative mb-4 w-full" key={field.name}>
                        <input
                          className="w-full rounded-[20px] border border-transparent bg-[#e0e0e0] py-3 pl-[8%] pr-4 text-[15px] text-black placeholder:font-bold focus:border-dotted focus:border-2 focus:border-[#e62e92] focus:outline-none"
                          type={field.type}
                          name={field.name}
                          id={field.name}
                          placeholder={field.placeholder}
                          autoComplete={"autoComplete" in field ? field.autoComplete : undefined}
                          pattern={"pattern" in field ? field.pattern : undefined}
                        />
                      </div>
                    ))}

                    <div className="relative mb-4 w-full">
                      <textarea
                        className="w-full rounded-[20px] border border-transparent bg-[#e0e0e0] py-3 pl-[8%] pr-4 text-[15px] text-black placeholder:font-bold focus:border-dotted focus:border-2 focus:border-[#e62e92] focus:outline-none"
                        name="message"
                        id="message"
                        rows={5}
                        cols={30}
                        dir="ltr"
                        placeholder="Brief description of your problem"
                        required
                      />
                    </div>

                    <div className="btnwrap flex justify-center gap-5">
                      <button className="rounded-[20px] border border-[#2B001F] bg-[#2B001F] px-5 py-[5px] text-white" type="button">
                        Join Zoom Call
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="thanyoumsg hidden text-center">
                <img className="mx-auto w-[60px]" src="/assets/images/message-to-ceo/marked.png" alt="thank-you" />
                <p className="mt-4 text-[20px] font-medium leading-6 text-black">
                  Thank you. Your escalation is noted. To escalate in person, please join our Daily Zoom Call between
                  5&nbsp;PM to 6 PM every day.
                </p>
                <div className="form-group mt-4 text-center">
                  <a href="https://us02web.zoom.us/j/87583523142?pwd=MGdadldLSVRyYkNPVFB2SnlwNk1vZz09#success" target="_blank" rel="noreferrer">
                    <button className="rounded-[20px] border border-[#2B001F] bg-[#2B001F] px-5 py-[5px] text-white" type="button">
                      Join Zoom Call
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="serviceblock bg-[gainsboro] py-[5%]">
          <div className="container mx-auto px-4">
            <div className="servicehead flex items-center">
              <img className="w-[45px] shrink-0" src="/images/escalation/sucess-magenta.png" alt="app-service" />
              <h3 className="ml-[2%] text-[26px] font-bold text-[#6a6e77] max-[767px]:text-[20px]">
                The fastest way to resolution is an <span className="text-[#2B001F]">in-app service request</span>
              </h3>
            </div>
            <div className="servicemessage mt-[3%]">
              <p className="text-[19px] font-medium leading-[26px] text-black max-[767px]:text-[16px] max-[767px]:leading-[22px]">
                The staff &amp; management at Colive work round-the-clock to ensure that all in-app service requests are processed in a timely fashion. If you haven&apos;t already,
                please raise a service request for your issue today.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
