import uuid4 from "uuid4";
import axios from 'axios';
import https from "https";
import "dotenv/config";


const id = uuid4();
const Authorization = process.env.AUTHORIZATION_KEY;


const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export async function getToken() {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      RqUID: id,
      Authorization: `Basic ${Authorization}`,
    },
    data: `scope=${encodeURIComponent("GIGACHAT_API_PERS")}`,
  };

  try {
    const response = await axiosInstance(config);
    const { access_token: accessToken, expires_at: expiresAt } = response.data;
    return { accessToken, expiresAt };
  } catch (error) {
    console.error(error);
  }
}
