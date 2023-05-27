import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

// Connect to the server
/*
const socket = io("http://localhost:3001");
socket.on("connect", () => {
	console.log(`Connected to server with id ${socket.id}`);
});
*/

// Functions
export function JoinServer(uuid: string) {
	socket.emit("joinServer", uuid, (res: any) => {
		console.warn(res);
		window.location.replace("/game");
		console.log(window.location);
	});
}

export async function CreateServer(uuid: string) {
	socket.emit("createServer", uuid, (res: any) => {
		if (res == true) {
			JoinServer(uuid);
		}
	});

	// FOR TESTING
	const serverList = await GetServerList();
	console.log(serverList);
}

export function GetServerList() {
	return new Promise((resolve) => {
		socket.emit("getServerList", (serverList: any) => {
			resolve(serverList);
		});
	});
}
