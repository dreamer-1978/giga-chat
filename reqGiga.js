import axios from "axios";
import https from "https";
import { getToken } from "./getToken.js";

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export async function reqGiga(content = "") {
  if (!content) return;

  const token = await getToken();

  const messages = [];

  const data = JSON.stringify({
    model: "GigaChat",
    messages: messages.concat([
      {
        role: "user",
        content,
      },
    ]),
    temperature: 1,
    top_p: 1,
    n: 1,
    stream: false,
    max_tokens: 512,
    repetition_penalty: 1,
    update_interval: 0,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    data,
  };

  try {
    const response = await axiosInstance(config);
    const message = response.data.choices[0].message;
    return message.content;
  } catch (error) {
    console.log(error);
  }
}
