export default function PropertyLoader() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-1 overflow-hidden bg-[#2B001F]/10"
      role="status"
      aria-label="Loading properties"
    >
      <div className="h-full w-1/3 animate-pulse bg-[#2B001F]" />
    </div>
  );
}
