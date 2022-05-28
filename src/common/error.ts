interface AppErrorResponse {
  errorId?: string;
  message: string;
}

class AppError extends Error {
  public errorId: string;
  public message: string;

  constructor({ errorId = '001', message }: { errorId?: string; message: string }) {
    super(message);
    Object.assign(this, { errorId, message });
  }

  public toResponse(): AppErrorResponse {
    return {
      message: this.message,
    };
  }
}

export { AppError, AppErrorResponse };
