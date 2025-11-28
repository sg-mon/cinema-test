export type APIError = {
  data: {
    message: string;
  };
};
export function isAPIError(error: unknown): error is APIError {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as any).data?.message === "string"
  );
}
