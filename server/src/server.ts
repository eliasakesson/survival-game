import express from "express"
import http from "http"
import { Server, Socket } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on("connection", (socket: Socket) => {
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

type Session = {
	uuid: string
}
const Sessions: Session[] = []
