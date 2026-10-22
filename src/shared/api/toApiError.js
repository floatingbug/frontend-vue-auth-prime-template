// Converts an axios error into a plain Error with a user-friendly message.
// The backend sends { message } in the response body; fall back to the
// generic error message if it is missing (e.g. network error).
export function toApiError(error) {
  const message =
    error?.response?.data?.message ?? error?.message ?? "Something went wrong";

  const apiError = new Error(message);
  apiError.status = error?.response?.status ?? null;
  return apiError;
}
