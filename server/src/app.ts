import express from "express";
import { Server } from "socket.io";
//import * as Database from "./Database"
import * as path from "path";
import cors from "cors";

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

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

/* Socket
io.on("connection", (socket) => {
	console.log("A user connected")

	socket.on("message", (data) => {
		console.log("Received message:", data)
		io.emit("message", data) // Broadcast the message to all connected clients
	})

	socket.on("disconnect", () => {
		console.log("A user disconnected")
	})
})

console.warn(`Random UUID: ${Database.GenerateUUID()}`)
console.log(Database.GetUserData("EHGMQU"))
*/
