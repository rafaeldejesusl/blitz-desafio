interface ErrorHandler {
  status?: number;
  name?: string;
  message: string;
  stack?: string;
}

export default ErrorHandler;