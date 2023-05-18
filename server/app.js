import express from "express"
import http from "http"
import { Server } from "socket.io"
import * as Database from "./Database.js"

console.warn(`Random UUID: ${Database.GenerateUUID()}`)
console.log(Database.GetUserData("EHGMQU"))

import { Gravity } from "../client/common/Constants.js"
console.log("Server: " + Gravity)

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("client"))

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

server.listen(3000, () => {
	console.log("Server listening on port 3000")
})
console.log("Server activated!")
