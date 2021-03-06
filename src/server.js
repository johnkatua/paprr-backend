import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";

import { baseConfig } from "./config";
import { connect } from "./utils/db";
import facultyRouter from "./resources/faculty/faculty.router";
import courseRouter from "./resources/course/course.router";
import paperRouter from "./resources/paper/paper.router";
import userRouter from "./resources/user/user.router";

export const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/faculty", facultyRouter);
app.use("/api/course", courseRouter);
app.use("/api/paper", paperRouter);
app.use("/api", userRouter);

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
