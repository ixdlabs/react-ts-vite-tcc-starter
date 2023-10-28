/* eslint-disable @typescript-eslint/no-empty-function */
import axios from "axios";

const axiosInstance = axios.create({ validateStatus: status => status < 500 });

type IFormData<T> = {
  [K in keyof T]?: string | number | boolean | Blob;
};

interface ApiCallOptions<T, D> {
  /*
   * HTTP method to use for the request.
   */
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /*
   * URL to send the request to.
   */
  url: string;
  /*
   * Authorization token to send with the request.
   * Authorization Header: Authorization: Bearer <token>
   */
  token?: string;
  /*
   * JSON data to send with the request.
   */
  json?: D;
  /*
   * Form data to send with the request.
   */
  formData?: IFormData<D>;
  /*
   * Callback to call with the response data.
   * when the response status >=200 || < 300.
   */
  onSuccess?: (data: T) => void;
  /*
   * Callback to call with the error.
   * when the response is not successful.
   */
  onFail?: (data: unknown) => void;
}

/*
 * Helper function to make API calls.
 */
export async function apiCall<T = unknown, D = unknown>({
  method = "POST",
  url,
  token,
  json,
  formData,
  onSuccess = () => {},
  onFail = () => {},
}: ApiCallOptions<T, D>): Promise<T> {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  let data: D | FormData | undefined;
  if (json) data = json;
  if (formData) data = getFormData(formData);
  if (json && formData) throw new Error("Cannot send both json and formData");

  const res = await axiosInstance({ url, method, headers, data });
  if (res.status >= 200 && res.status < 300) {
    const out: T = res.data;
    onSuccess(out);
    return out;
  }

  if (res.status === 400) {
    const data = res.data;
    if (!data) throw new Error("Something went wrong!");

    if (data.non_field_errors && data.non_field_errors.length > 0) {
      throw new Error(data.non_field_errors.join("\n"));
    }

    if (typeof data === "string") {
      throw new Error(data);
    }

    const errors: string[] = [];
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[key])) errors.push(...data[key]);
      else errors.push(data[key]);
    });
    throw new Error(errors.join("\n"));
  }

  onFail(res);
  throw res;
}

/*
 * Helper function to convert object to FormData
 */
export function getFormData<T extends IFormData<T>>(
  form: T,
  allowEmpty = false,
): FormData {
  const formData = new FormData();
  Object.keys(form).forEach(key => {
    const value = form[key as keyof T];
    if (typeof value === "number" || typeof value === "boolean") {
      formData.append(key, value.toString());
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    } else if (allowEmpty) {
      formData.append(key, "");
    }
  });
  return formData;
}
