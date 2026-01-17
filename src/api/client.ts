import ky from "ky";
import { auth } from "@/lib/auth";
import type { ApiErrorResponse, ApiResponse } from "./types";

export class ApiError extends Error {
  public message: string;
  public status: number;
  public errors?: ApiErrorResponse["errors"];

  constructor(message: string, status: number, errors?: ApiErrorResponse["errors"]) {
    super(message);
    this.name = "ApiError";
    this.message = message;
    this.status = status;
    this.errors = errors;
  }
}

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL || "/api",
  retry: 0,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = auth.getToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          auth.clearToken();

          // redirect
        }

        let parsedBody: ApiResponse<unknown>;
        try {
          parsedBody = await response.json();
        } catch (_err) {
          if (!response.ok) {
            throw new ApiError(response.statusText, response.status);
          }
          return;
        }

        if (!response.ok || parsedBody.success === false) {
          const errorBody = parsedBody as ApiErrorResponse;

          throw new ApiError(
            errorBody.message || "An unknown error occurred",
            response.status,
            errorBody.errors,
          );
        }

        const data = parsedBody.data;

        const responseData = data !== undefined ? data : parsedBody;

        return new Response(JSON.stringify(responseData), {
          status: response.status,
          headers: response.headers,
        });
      },
    ],
  },
});
