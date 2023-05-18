import express from "express"
import http from "http"
import { Server } from "socket.io"
import * as Database from "./Database.js"
import * as path from "path"
import cors from "cors"

//const app = express()
//const server = http.createServer(app)
//const io = new Server(server)

// Setup app
//app.use(express.static("client"))

// Listen to port

const app = express()
const port = 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get(`/`, cors(), (req, res) => {
	res.send("Server is working")
})

app.post("/post_name", (req, res) => {
	console.log(req.body)
})

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})

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

import { Gravity } from "../client/common/Constants.js"
console.log("Server: " + Gravity)
*/
