export type FormApiName = "contact";

export type FormApiResponse = {
  success: boolean;
  message?: string;
  data?: unknown;
};

const FALLBACK_ERROR = "Unable to submit your message. Please try again.";

export async function submitFormApi(
  formName: FormApiName,
  values: object,
  signal?: AbortSignal
): Promise<FormApiResponse> {
  const response = await fetch(`/api/forms/${formName}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    cache: "no-store",
    signal,
  });

  let result: Partial<FormApiResponse> | null = null;

  try {
    result = (await response.json()) as Partial<FormApiResponse>;
  } catch {
    result = null;
  }

  if (
    !response.ok ||
    result?.success !== true
  ) {
    throw new Error(
      typeof result?.message === "string" && result.message
        ? result.message
        : FALLBACK_ERROR
    );
  }

  return result as FormApiResponse;
}

export function submitContactForm(values: {
  name: string;
  mobile: string;
  email: string;
  select: string;
  message: string;
}): Promise<FormApiResponse> {
  return submitFormApi("contact", values);
}
