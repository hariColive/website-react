import "server-only";

import { getBaseUrl } from "@/lib/server/apiConfig";
import { FORM_APIS, isFormApiName } from "./formApis";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error && error.name === "TimeoutError"
    ? "The submission took too long. Please try again."
    : "Unable to submit your message right now. Please try again later.";
}

export async function submitForm(request: Request, formName: string) {
  if (!isFormApiName(formName)) {
    return Response.json(
      { success: false, message: "Unknown form API." },
      { status: 404 }
    );
  }

  let input: unknown;

  try {
    input = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid request payload." },
      { status: 400 }
    );
  }

  if (!isRecord(input)) {
    return Response.json(
      { success: false, message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const formApi = FORM_APIS[formName];
  const result = formApi.createPayload(input);

  if (result.error) {
    return Response.json(
      { success: false, message: result.error },
      { status: 400 }
    );
  }

  let websiteApiUrl: string;

  try {
    const websiteApiBase = getBaseUrl("web");
    websiteApiUrl = new URL(formApi.path, websiteApiBase).toString();

    const upstream = await fetch(websiteApiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Origin: new URL(websiteApiBase).origin,
      },
      body: JSON.stringify(result.payload),
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });

    const upstreamText = await upstream.text();
    let upstreamJson: unknown = null;

    if (upstreamText) {
      try {
        upstreamJson = JSON.parse(upstreamText);
      } catch {
        upstreamJson = null;
      }
    }

    if (!upstream.ok) {
      console.error("Colive form API call failed", {
        formName,
        status: upstream.status,
      });

      return Response.json(
        {
          success: false,
          message:
            "Unable to submit your message right now. Please try again later.",
        },
        { status: upstream.status >= 500 ? 502 : 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: formApi.successMessage,
        data: upstreamJson ?? result.payload,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Colive form submission failed", { formName, error });

    return Response.json(
      { success: false, message: getErrorMessage(error) },
      { status: 502 }
    );
  }
}
