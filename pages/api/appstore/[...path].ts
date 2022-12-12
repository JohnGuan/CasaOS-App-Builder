import type { NextApiRequest, NextApiResponse } from "next";
import { omit } from "lodash";

const baseURL = process.env.APP_STORE_BASE_URL || "http://192.168.2.11:8091";

async function getToken(): Promise<string> {
  var token;
  await fetch(new URL("/token", baseURL).href, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      token = data.data;
    });

  console.log("token", token);
  
  return token || "";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken();
  const url = new URL(req.query.path?.join("/"),baseURL).href;
  console.log("url:", url);
  const searchParams = new URLSearchParams(omit(req.query, "path")).toString();
  console.log("searchParams:", searchParams);
  const requestOptions = {
    method: req.method,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: req.method === "POST" ? req.body : undefined,
  };
  console.log("requestOptions:", requestOptions);
  
  const response = await fetch([url,searchParams].join("?"), requestOptions);
  res.status(response.status).send(await response.text());
}
