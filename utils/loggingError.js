const HttpErrorCode = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  METHOD_NOT_ALLOWED: 405,
};

export const handleRequestError = (error) => {
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case HttpErrorCode.NOT_FOUND:
        console.error('HTTP 404: The requested resource was not found.');
        break;
      case HttpErrorCode.BAD_REQUEST:
        console.error('HTTP 400: The server could not understand the request due to invalid syntax.');
        break;
      case HttpErrorCode.INTERNAL_SERVER:
        console.error('HTTP 500: The server encountered an unexpected condition that prevented it from fulfilling the request.');
        break;
      case HttpErrorCode.UNAUTHORIZED:
        console.error('HTTP 401: You are not authorized to access this resource.');
        break;
      case HttpErrorCode.FORBIDDEN:
        console.error('HTTP 403: Access to this resource is forbidden.');
        break;
      case HttpErrorCode.METHOD_NOT_ALLOWED:
        console.error('HTTP 405: The request method is not allowed for the requested resource.');
        break;
      default:
        console.error(`HTTP ${status}: Unknown error occurred.`);
        break;
    }
  } else if (error.request) {
    console.error('Network error: A network error occurred while trying to connect to the server. Please check your internet connection and try again.');
  } else {
    console.error('Unexpected error occurred');
  }
};