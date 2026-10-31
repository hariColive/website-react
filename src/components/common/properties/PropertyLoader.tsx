export default function PropertyLoader() {
  return (
    <div
      className="fixed top-0 left-0 z-[10000000] m-auto flex h-full w-full items-center justify-center bg-[#ffffffba]"
      id="AjaxLoader"
      role="status"
      aria-label="Loading properties"
    >
      <div className="relative flex h-[100px] w-[100px] content-center items-center justify-center">
        <div className="relative flex h-[35px] w-[35px] justify-center rounded-full border-[6px] border-solid border-[#2B001F] border-t-transparent after:relative after:top-[-2px] after:h-0 after:w-[15px] after:rotate-90 after:border-[3.5px] after:border-solid after:border-[#fff0] after:bg-[#2B001F] after:content-['']" />
        <div
          aria-hidden="true"
          className="absolute h-[55px] w-[55px] animate-[spin_2s_linear_infinite] rounded-full border-[6px] border-solid border-[#2B001F] border-t-transparent"
        />
      </div>
    </div>
  );
}
