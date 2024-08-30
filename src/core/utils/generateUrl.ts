import { BASE_URL } from "../constants/baseURL";

export function generateUrl(url: string) {
  return `${BASE_URL}/resources${url}`;
}
