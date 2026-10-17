"use client";

const departments = [
  { id: 1, title: "Business Development & Expansion", image: "/images/career/jobs/Bisiness-Development-&-Expansion.png", alt: "Business Development" },
  { id: 2, title: "Human Resource & Development", image: "/images/career/jobs/Human-Resource-&-Development.png", alt: "Human Resource" },
  { id: 3, title: "Marketing", image: "/images/career/jobs/Marketing.png", alt: "Marketing" },
  { id: 4, title: "Management Team", image: "/images/career/jobs/Management-Team.png", alt: "Management Team" },
  { id: 5, title: "Operations & Service", image: "/images/career/jobs/Operations-&-Service.png", alt: "Operations and Service" },
  { id: 6, title: "Product & Technology", image: "/images/career/jobs/Product-&-Techchnology.png", alt: "Product and Technology" },
  { id: 7, title: "Projects", image: "/images/career/jobs/Projects.png", alt: "Projects" },
  { id: 8, title: "Revenue Management & Billings", image: "/images/career/jobs/Revenue-Management-&-Billings.png", alt: "Revenue Management" },
  { id: 9, title: "Sales & Growth", image: "/images/career/jobs/Sales-&-Growth.png", alt: "Sales and Growth" },
  { id: 10, title: "Support", image: "/images/career/jobs/Support.png", alt: "Support" },
];

const perks = [
  "Achievement Award",
  "Flexible Work Environment",
  "Health Insurance",
  "Indoor Games",
  "Office Events & Outings",
  "On the Job Growth",
];

const CareersPage = () => {
  const getJobsByDepartment = (id: number) => {
    if (typeof window !== "undefined") {
      (window as Window & { GetJobsbyDepartment?: (departmentId: number) => void }).GetJobsbyDepartment?.(id);
    }
  };

  const searchJobs = () => {
    if (typeof window !== "undefined") {
      (window as Window & { GetJobsFromSearch?: () => void }).GetJobsFromSearch?.();
    }
  };

  return (
    <section id="career_page" className="career-wrap w-full text-[#324B72]">
      {/* Intro and job search */}
      <div className="see-opening-wrap bg-white py-12.5 md:py-20">
        <div className="mx-auto w-full max-w-285 px-3.75">
          <div id="CareerWrap_sec" className="relative flex items-center justify-center text-center sm:text-left">
            <form
              id="career_searchform"
              action=""
              className="career-wrap_search absolute right-0 top-0 hidden items-center sm:flex"
            >
              <input
                type="text"
                name="search"
                id="career_Search"
                placeholder="Search For a Job"
                className="border-2 border-[#e6e6e6] px-2.5 py-1.25text-sm outline-none focus:border-[#2B001F]"
              />
              <button
                id="search_CareerBtn"
                name="go"
                type="button"
                className="cursor-pointer border-2 border-[#2B001F] bg-[#2B001F] px-4 py-1.25text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2B001F]"
              >
                Go
              </button>
            </form>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <p className="mb-4 text-sm font-bold leading-6 text-[#324B72]">Explore career opportunities now</p>
              <form id="exploreCareerOpp" noValidate className="space-y-3">
                <fieldset className="space-y-3">
                  <div className="relative">
                    <select
                      id="ddlCareerlocation"
                      name="selectloction"
                      aria-label="Select location"
                      defaultValue=""
                      className="my-3.75 w-full appearance-none border-2 border-[#E0E6ED] bg-white px-3.75 py-3 pr-12 text-sm font-medium text-[#324B72] outline-none focus:border-[#2B001F]"
                    >
                      <option value="" disabled>Select location</option>
                    </select>
                    <span className="pointer-events-none absolute right-6.25 top-1/2 -translate-y-1/2 text-[30px] text-[#bec9d6]">⌄</span>
                  </div>
                  <div className="relative">
                    <select
                      id="ddlcareerdepartment"
                      name="selectdepartment"
                      aria-label="Select department"
                      defaultValue=""
                      className="my-3.75 w-full appearance-none border-2 border-[#E0E6ED] bg-white px-3.75 py-3 pr-12 text-sm font-medium text-[#324B72] outline-none focus:border-[#2B001F]"
                    >
                      <option value="" disabled>Select department</option>
                    </select>
                    <span className="pointer-events-none absolute right-6.25 top-1/2 -translate-y-1/2 text-[30px] text-[#bec9d6]">⌄</span>
                  </div>
                  <div className="relative hidden">
                    <select id="ddlcareerjobTitle" name="selectdejobTitle" aria-label="Select job title" defaultValue="" className="w-full border-2 border-[#E0E6ED] px-4 py-3 text-sm">
                      <option value="" disabled>Select job title</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    id="CareerSearch"
                    onClick={searchJobs}
                    className="w-full cursor-pointer border-2 border-[#2B001F] bg-[#2B001F] px-5 py-3 text-[15px] font-bold leading-4.5 text-white transition-colors hover:bg-white hover:text-[#2B001F]"
                  >
                    Search
                  </button>
                </fieldset>
              </form>
            </div>

            <div className="md:col-span-7">
              <h1 className="mb-4 text-center text-2xl font-medium leading-normal text-[#112950] sm:text-left md:text-4xl">Careers at Colive</h1>
              <p className="text-base font-normal leading-normal tracking-[-0.16px] text-[#324B72]">
                Our leadership takes pride in attracting, developing and engaging an unconventional mix of talent that enables us to think for progress, act for progress and deliver progress.
              </p>
              <p className="mt-4 text-base font-normal leading-normal tracking-[-0.16px] text-[#324B72]">
                <strong>Are you ready to change the way people live?</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Teams */}
      <div className="py-7.5 pb-5">
        <div className="mx-auto w-full max-w-285 px-3.75">
          <h2 className="w-full text-[22px] font-semibold leading-13.5 text-[#112950]">Find Jobs by Teams</h2>
          <div className="mt-0 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <button
                key={department.id}
                type="button"
                onClick={() => getJobsByDepartment(department.id)}
                className="group relative my-5 block w-full cursor-pointer overflow-hidden text-left transition-all duration-300 ease-in-out hover:-translate-y-1.75 hover:shadow-[0_20px_50px_0_rgba(0,0,0,0.4)] focus:outline-none focus-visible:-translate-y-1.75 focus-visible:shadow-[0_20px_50px_0_rgba(0,0,0,0.4)]"
                aria-label={`View jobs in ${department.title}`}
              >
                <img
                  src={department.image}
                  alt={department.alt}
                  className="block max-h-50 min-h-50 w-full object-cover backface-hidden"
                />
                <div className="pointer-events-none absolute inset-x-0 top-full z-2 h-1/2 bg-[linear-gradient(to_bottom,rgba(43,0,31,0.09)_0%,rgb(43,0,31)_100%)] opacity-0 transition-all duration-300 group-hover:top-1/2 group-hover:opacity-100 group-focus-visible:top-1/2 group-focus-visible:opacity-100" />
                <div className="pointer-events-none absolute bottom-0 left-0 z-3 w-full text-base text-white">
                  <span className="relative top-6.5 block bg-white px-3.75 py-2.5 text-sm font-semibold leading-none text-[#2B001F] opacity-100 transition-all duration-300 group-hover:top-0 group-hover:bg-transparent group-hover:text-white group-focus-visible:top-0 group-focus-visible:bg-transparent group-focus-visible:text-white">
                    {department.title}
                  </span>
                  <span className="relative top-5 block px-3.75 pb-5 pt-0 text-xs leading-[1.2] opacity-0 transition-all duration-300 group-hover:top-0 group-hover:opacity-100 group-hover:delay-200 group-focus-visible:top-0 group-focus-visible:opacity-100">
                    View &amp; Apply
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Open positions: populated by the existing job-listing script */}
      <div id="JobListingSection" className="hidden py-7.5 pb-5">
        <div className="mx-auto w-full max-w-285 px-3.75">
          <h2 className="mb-6 text-[22px] font-semibold leading-13.5 text-[#112950]">Open Positions</h2>
          <div id="dvJoblisting" className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" />
        </div>
      </div>

      {/* Perks: text cards only, preserving the original spacing and colors */}
      <div className="py-2.5 md:py-12.5">
        <div className="mx-auto w-full max-w-285 px-3.75">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-10">
            <div className="md:col-span-2">
              <h2 className="text-[26px] font-normal leading-normal text-[#112950] md:text-[32px]">Unlimited Perks</h2>
              <p className="mt-5 mb-7.5 text-sm font-normal leading-normal text-[#324B72] md:text-base md:leading-7">
                At <a href="/" className="cursor-pointer text-black">Colive</a>, we have a modern and motivating work culture which will not only push you towards personal goals but will also make sure you make unforgettable memories along the way.
              </p>
            </div>
            <div className="grid grid-cols-2 items-center justify-around gap-4 sm:grid-cols-3 md:col-span-3">
              {perks.map((perk) => (
                <div key={perk} className="mb-7.5 flex h-32.5 w-full items-center justify-center border-[5px] border-[#112950]/8 p-4 text-center md:h-40">
                  <p className="m-0 h-auto text-[17px] font-normal leading-5 text-[#112950] md:text-[15px] md:leading-6">{perk}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-[#F4F8FB] py-6.25 md:py-12.5">
        <div className="mx-auto w-full max-w-285 px-3.75">
          <div className="mt-7.5 bg-[#7ac7e5]/31 p-7.5">
            <p className="text-xl font-normal leading-6 text-[#112950] sm:text-2xl sm:leading-7">Can’t find what you’re looking for? Contact us on</p>
            <a href="mailto:crew@colive.com" className="mt-1.25 inline-block text-xl font-normal leading-6 text-[#3085FF] hover:underline sm:text-2xl sm:leading-7">crew@colive.com</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersPage;
