export const OK = 200;
export const CREATED = 201;
export const ACCEPTED = 202;
export const NO_CONTENT = 204;
export const PARTIAL_CONTENT = 206;
export const MULTIPLE_CHOICES = 300;
export const MOVED_PERMANENTLY = 301;
export const FOUND = 302;
export const SEE_OTHER = 303;
export const NOT_MODIFIED = 304;
export const TEMPORARY_REDIRECT = 307;
export const PERMANENT_REDIRECT = 308;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const METHOD_NOT_ALLOWED = 405;
export const NOT_ACCEPTABLE = 406;
export const REQUEST_TIMEOUT = 408;
export const CONFLICT = 409;
export const GONE = 410;
export const LENGTH_REQUIRED = 411;
export const PRECONDITION_FAILED = 412;
export const PAYLOAD_TOO_LARGE = 413;
export const URI_TOO_LONG = 414;
export const UNSUPPORTED_MEDIA_TYPE = 415;
export const RANGE_NOT_SATISFIABLE = 416;
export const EXPECTATION_FAILED = 417;
export const IM_A_TEAPOT = 418;
export const UNPROCESSABLE_ENTITY = 422;
export const TOO_MANY_REQUESTS = 429;
export const INTERNAL_SERVER_ERROR = 500;
export const NOT_IMPLEMENTED = 501;
export const BAD_GATEWAY = 502;
export const SERVICE_UNAVAILABLE = 503;
export const GATEWAY_TIMEOUT = 504;
export const HTTP_VERSION_NOT_SUPPORTED = 505;

export type HttpStatusCode =
  | typeof OK
  | typeof CREATED
  | typeof ACCEPTED
  | typeof NO_CONTENT
  | typeof PARTIAL_CONTENT
  | typeof MULTIPLE_CHOICES
  | typeof MOVED_PERMANENTLY
  | typeof FOUND
  | typeof SEE_OTHER
  | typeof NOT_MODIFIED
  | typeof TEMPORARY_REDIRECT
  | typeof PERMANENT_REDIRECT
  | typeof BAD_REQUEST
  | typeof UNAUTHORIZED
  | typeof FORBIDDEN
  | typeof NOT_FOUND
  | typeof METHOD_NOT_ALLOWED
  | typeof NOT_ACCEPTABLE
  | typeof REQUEST_TIMEOUT
  | typeof CONFLICT
  | typeof GONE
  | typeof LENGTH_REQUIRED
  | typeof PRECONDITION_FAILED
  | typeof PAYLOAD_TOO_LARGE
  | typeof URI_TOO_LONG
  | typeof UNSUPPORTED_MEDIA_TYPE
  | typeof RANGE_NOT_SATISFIABLE
  | typeof EXPECTATION_FAILED
  | typeof IM_A_TEAPOT
  | typeof UNPROCESSABLE_ENTITY
  | typeof TOO_MANY_REQUESTS
  | typeof INTERNAL_SERVER_ERROR
  | typeof NOT_IMPLEMENTED
  | typeof BAD_GATEWAY
  | typeof SERVICE_UNAVAILABLE
  | typeof GATEWAY_TIMEOUT
  | typeof HTTP_VERSION_NOT_SUPPORTED;
