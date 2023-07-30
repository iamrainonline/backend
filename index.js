import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import getUsers from "./routes/users.js";
import userRoutes from "./routes/users.js";
import deleteUser from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = process.env.PORT || 8800;
const app = express();
app.use(express.json());
app.use(cookieParser());

const corsConfig = {
   origin: [
      "https://frontend-83nm.vercel.app",
      "https://frontend-83nm.vercel.app/",
      "http://localhost:3000",
   ],
   credentials: true,
   methods: "GET,HEAD,OPTIONS,PUT,POST,DELETE,PATCH",
};
app.use(cors(corsConfig));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", getUsers);
app.use("/api/users/", deleteUser);

app.listen(PORT, () => {
   console.log("Connected to port", PORT);
});
