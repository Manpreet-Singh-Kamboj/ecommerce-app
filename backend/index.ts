import express from "express";
import { loadEnv } from "./utils/dotenv.ts";
import authRouter from "./routes/auth.routes.ts";
import connectToDatabase from "./config/database.ts";
loadEnv();
const PORT = process.env.PORT || 5000;
connectToDatabase();
const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
