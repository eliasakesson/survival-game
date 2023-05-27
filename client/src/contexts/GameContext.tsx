import react, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

const GameContext = createContext({} as any);

export function useGame() {
	return useContext(GameContext);
}

export function GameProvider({ children }) {
	const [instance, setInstance] = useState(null);
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		// Connect socket
		const newSocket = io("http://localhost:3001");
		newSocket.on("connect", () => {
			console.log(`Connected to server with id ${newSocket.id}`);
			setSocket(newSocket);
		});
	}, []);

	function createServer() {}
	function joinServer() {}
	function leaveServer() {}

	return (
		/* prettier-ignore */
		<GameContext.Provider value={{socket, instance}}>
			{children}
		</GameContext.Provider>
	);
}
