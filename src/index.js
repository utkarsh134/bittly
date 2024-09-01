// require('dotenv').config({path: './env'})
import dotenv from "dotenv";

import express from "express";
import { connectDB } from "./db/index.js";
import urlRoute from "./routes/url.route.js";
import { URL } from "./models/url.model.js";

dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = 8000;
connectDB();

app.use(express.json());
app.use("/url", urlRoute);
app.use("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
