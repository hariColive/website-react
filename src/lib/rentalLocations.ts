export const RENTAL_LOCATIONS: Record<string, string> = {
  "bangalore/pg-in-marathahalli": "Marathahalli",
  "bangalore/pg-in-whitefield": "Whitefield",
  "bangalore/pg-in-koramangala": "Koramangala",
  "pg-in-bangalore": "Bangalore",
  "pg-in-hyderabad": "Hyderabad",
  "pg-in-pune": "Pune",
  "pg-in-mumbai": "Mumbai",
  "pg-in-chennai": "Chennai",
  "pg-in-coimbatore": "Coimbatore",
  "pg-in-vellore": "Vellore",
};

const RENTAL_PATHS_BY_LOCATION = new Map(
  Object.entries(RENTAL_LOCATIONS).map(([path, location]) => [
    location.toLowerCase(),
    `/${path}`,
  ])
);

export function getRentalLocationPath(location: string): string | undefined {
  return RENTAL_PATHS_BY_LOCATION.get(location.trim().toLowerCase());
}
