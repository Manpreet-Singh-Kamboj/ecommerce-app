import express from "express";
import { loadEnv } from "./utils/dotenv";
import authRouter from "./routes/auth.routes";
import connectToDatabase from "./config/database";
loadEnv();
const PORT = process.env.PORT || 5000;
connectToDatabase();
const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

export default app;
