interface AppErrorResponse {
  errorId: string;
  message: string;
}

class AppError extends Error {
  public errorId: string;
  public message: string;

  constructor({ errorId, message }: { errorId: string; message: string }) {
    super(message);
    Object.assign(this, { errorId, message });
  }

  public toResponse(): AppErrorResponse {
    return {
      errorId: this.errorId,
      message: this.message,
    };
  }
}

export { AppError, AppErrorResponse };
