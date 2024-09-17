import express from "express";
import {config} from "./config/envs";
import index from "./routes/index";
import { connectMongoDB } from "./config/mongoDBConfig";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
connectMongoDB();

// Routes
app.use("/api", index);

app.listen(config.PORT, () => {
    console.log(`Port ${config.PORT} listening correctly}`)
});