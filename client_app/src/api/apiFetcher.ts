import axios from "axios";

export const apiURI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
  timeout: 1000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

export const fetcher = (url: string) => {
    return apiURI.get(url).then((res) => {
      if (!res.data) {
        throw Error(res.data.message);
      }
      return res.data;
    });
};
