import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";

import { baseConfig } from "./config";
import { connect } from "./utils/db";

export const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

export const start = async () => {
  try {
    await connect();
    app.listen(baseConfig.port, () => {
      console.log(
        `Server is running on http://localhost:${baseConfig.port}/api`
      );
    });
  } catch (error) {
    console.error(error);
  }
};
