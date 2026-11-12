import { submitForm } from "@/lib/server/submitForm";

type RouteContext = {
  params: Promise<{ form: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { form } = await context.params;
  return submitForm(request, form);
}
