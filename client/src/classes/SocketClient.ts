import { NavigateFunction } from "react-router-dom";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

let socket: Socket;
let navigator: NavigateFunction;

socket = io("http://localhost:3001");

socket.on("connect", () => {
	console.log(`Connected to server with id ${socket.id}`);
});

socket.on("onRoomJoined", (data: any) => {
	const { name, worldSettings } = data;
	console.log(`Joined room ${name} with world settings:`, worldSettings);
	navigator(`/game?${name}`);
});

export function JoinRoom(navi: NavigateFunction, roomName: string) {
	navigator = navi;
	socket.emit("joinRoom", roomName);
}
