import react, { createContext, useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Game, GameType } from "../game/Game";

const GameContext = createContext({} as any);
export function useGame() {
	return useContext(GameContext);
}
export function GameProvider({ children }) {
	const [instance, setInstance] = useState<GameType>(null);
	const [socket, setSocket] = useState<Socket>(null);

	// Connect socket
	useEffect(() => {
		const newSocket = io("http://localhost:3001");
		newSocket.on("connect", () => {
			console.log(`Connected to server with id ${newSocket.id}`);
		});
		setSocket(newSocket);
	}, []);

	// Functions
	function JoinServer(uuid: string) {
		console.log("joining server " + uuid);
		socket.emit("joinServer", uuid, (res: any) => {
			window.location.replace("/game");
		});
	}

	function CreateServer(uuid: string) {
		socket.emit("createServer", uuid, (res: any) => {
			if (res == true) {
				JoinServer(uuid);
			}
		});
	}

	function GetServerList() {
		return new Promise((resolve) => {
			socket.emit("getServerList", (serverList: any) => {
				resolve(serverList);
			});
		});
	}

	/* prettier-ignore */
	return (
		<GameContext.Provider value={{JoinServer, CreateServer, GetServerList}}>
			{children}
		</GameContext.Provider>
	);
}
