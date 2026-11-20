
import React from "react";
import { fetchColive } from "@/lib/server/coliveFetch";

type PressCoverageItem = {
  Id: number;
  Headline: string;
  Description: string;
  Logo: string;
  NewsLink: string;
  LogoLink: string;
  NewsDate: string;
};

type PressCoverageResponse = {
  Status?: string;
  Message?: string;
  Data?: PressCoverageItem[];
};

async function getPressCoverage(): Promise<PressCoverageItem[]> {
  try {
    const response = await fetchColive("GetPressCoverage", {
      body: JSON.stringify({}),
    });

    if (!response.ok) return [];

    const result: PressCoverageResponse = await response.json();

    return result.Status?.toLowerCase() === "success" &&
      Array.isArray(result.Data)
      ? result.Data
      : [];
  } catch (error) {
    console.error("GetPressCoverage error:", error);
    return [];
  }
}


const isImageUrl = (url: string) =>
  /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(url);

const PressPage = async () => {
  const pressItems = await getPressCoverage();

  return (
    <div className="news-wrap">

      {/* News Header */}
      <div className="page-header pt-[100px] pb-[50px]">
        <div className="container mx-auto w-full max-w-[1320px] px-3">
          <div className="flex flex-wrap">

            <div className="w-full md:w-1/2">
              <h1 className="m-0 grid text-left text-[30px] leading-[52px] font-bold text-[#112950] min-[769px]:text-[53px]">
                News and Press Release
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="m-0 text-[20px] leading-[31px] font-normal tracking-[-0.16px] text-[#324b72] min-[769px]:text-[26px]">
                COLIVE IN THE NEWS
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Press Coverage */}
      <div className="bg-[#f4f8fb]">
        <div className="container mx-auto w-full max-w-[1320px] px-3">

          <div id="PressCoverageCard" className="flex flex-wrap">

            {pressItems.map((item) => (
              <div
                key={item.Id}
                className="w-full px-3 md:w-1/2"
              >
                <div className="my-[20px] mb-[10px] flex h-[248px] min-h-[201px] flex-col overflow-hidden border border-[#d3d3d3] bg-white p-4 shadow-[0_2px_14px_0_rgba(0,0,0,0.06)]">

                  {/* Publisher Logo */}
                  <div className="mb-[15px] flex h-[65px] w-full shrink-0 items-center overflow-hidden">
                    {item.LogoLink && isImageUrl(item.LogoLink) ? (
                      <img
                        src={item.LogoLink}
                        alt={item.Logo || "News publisher"}
                        className="h-[65px] max-w-full object-contain object-left"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-[#324b72]">
                        {item.Logo}
                      </span>
                    )}
                  </div>

                  {/* News Headline */}
                  <p className="m-0 line-clamp-2 text-left text-[14px] leading-[20px] font-light text-[#112950]">
                    {item.Headline}
                  </p>

                  {/* Date and Read More */}
                  <div className="mt-auto flex items-center justify-between pb-[25px]">

                    <span className="px-[5px] text-left text-[14px] leading-[17px] font-normal text-[#324b72] opacity-50">
                      {item.NewsDate}
                    </span>

                    {item.NewsLink && (
                      <a
                        href={item.NewsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pr-1 text-left text-[16px] leading-[19px] font-semibold text-[#3085ff] underline opacity-[0.6]"
                      >
                        Read More
                      </a>
                    )}

                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

    </div>
  );
};

export default PressPage;

