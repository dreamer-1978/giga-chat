import express from "express";
import cors from "cors";
import {reqGiga} from './reqGiga.js'


const app = express();
app.use(cors());
const PORT = 3000;


app.get("/data", async (req, res) => {
  const request = req.query.content
  try {
    const gigaResponse = await reqGiga(request) 
    res.json({message: gigaResponse});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
