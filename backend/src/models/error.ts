class ApiError implements Error {
    constructor(message: string) {
      this.name = "ApiError";
      this.message = message;
    }
    name: string;
    message: string;
    stack?: string;
  }
  
  const apiSessionTimeoutError = new ApiError("Session Timeout.");
  const apiInternalServerError = new ApiError("Internal Server Error.");
  
  export { ApiError, apiSessionTimeoutError, apiInternalServerError };