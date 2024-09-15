// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv"
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { connectToMongoDB } from "./db/index.js";
import { checkForAuthentication, restrictTo } from "./middlewares/auth.js";
import URL from "./models/url.js";

dotenv.config({
  path: "./.env",
});

import urlRoute from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";

const app = express();
const PORT = 8000;

connectToMongoDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false})) ;
app.use(cookieParser())
app.use(checkForAuthentication); // It checks everytime


// Routes
app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);


app.use("/url/:shortId", async (req, res) => {
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
  res.redirect(entry?.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
