export default function PropertySkeleton() {
  return (
    <div className="mx-auto max-w-360 animate-pulse px-4 pt-8 pb-16 sm:px-8" aria-busy="true" aria-label="Loading property">
      <div className="mb-4 h-3 w-60 rounded bg-gray-100" />
      <div className="mb-4 h-12 w-2/3 rounded bg-gray-100" />
      <div className="mb-8 h-5 w-1/2 rounded bg-gray-100" />

      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="aspect-3/2 bg-gray-100" />
        <div className="hidden grid-cols-2 gap-4 md:grid">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="aspect-3/2 bg-gray-100" />
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_436px] lg:gap-6">
        <div className="flex flex-col gap-3">
          <div className="mb-3 h-9 w-3/4 rounded bg-gray-100" />
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="h-4 rounded bg-gray-100" />
          ))}
        </div>
        <div className="h-96 border border-gray-200 bg-gray-50" />
      </div>
    </div>
  );
}
