// Styles the HTML copy from src/content/search-seo (headings, lists, tables, links)
export const richTextClass = [
  "text-[15px] leading-[1.75] text-[#222]",
  "[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-normal [&_h2]:tracking-tight [&_h2]:text-[#111] [&_h2:first-child]:mt-0",
  "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:text-[#111]",
  "[&_h4]:mt-5 [&_h4]:mb-2 [&_h4]:text-lg [&_h5]:mt-4 [&_h5]:mb-2 [&_h5]:font-medium [&_h6]:mt-4 [&_h6]:mb-2 [&_h6]:font-medium",
  "[&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1",
  "[&_a]:text-[#111] [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-gray-600",
  "[&_hr]:my-6 [&_hr]:border-gray-200",
  "[&_table]:mb-4 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:text-sm",
  "[&_td]:border [&_td]:border-gray-200 [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left",
].join(" ");
