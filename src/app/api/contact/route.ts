import { submitForm } from "@/lib/server/submitForm";

export async function POST(request: Request) {
  return submitForm(request, "contact");
}
