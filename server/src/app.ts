import express from "express";
import { Server } from "socket.io";
//import * as Database from "./Database"
import * as path from "path";
import cors from "cors";
import * as ServerManager from "./serverManager";

//import { Gravity } from "../../shared/Constants"
//console.log(Gravity)

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get(`/`, (req, res) => {
	res.send(`Server running on port ${port}`);
});

app.post("/post_name", (req, res) => {
	console.log(req.body);
});

const httpServer = app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

ServerManager.start(io);
