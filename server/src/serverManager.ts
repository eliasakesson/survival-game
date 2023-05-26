import { Server as SocketServer, Socket } from "socket.io";
import { GameServer, Server } from "./classes/GameServer";

const servers: Server[] = [];

export function start(io: SocketServer) {
	io.on("connection", (socket: Socket) => {
		console.log(`Client ${socket.id} connected`);

		socket.on("createServer", (uuid: string, callback) => {
			const existingServer = servers.find((s) => s.uuid === uuid);
			if (existingServer) {
				callback(`Server already running.`);
				return;
			}

			const server = new GameServer(uuid);
			servers.push(server);

			callback(true);
			return;
		});

		socket.on("joinServer", (uuid: string, callback) => {
			const server: Server = servers.find((s) => s.uuid === uuid);

			if (!server) {
				callback(`Invalid Server`);
				return;
			}

			server.addPlayer("Bob", "this-is-not-random", socket);

			callback(true);
			return;
		});

		socket.on("getServerList", (callback) => {
			const serverList = [];

			for (const server of servers) {
				serverList.push({
					name: server.name,
					uuid: server.uuid,
					playerCount: server.players.length,
				});
			}

			callback(serverList);
			return;
		});

		socket.on("disconnect", () => {
			console.log(`Client ${socket.id} disconnected`);

			// Remove the client from all rooms
			for (const server of servers) {
				const player = server.players.find((p) => p.socket.id == socket.id);
				if (player) {
					server.removePlayer(player.uuid);
				}
			}
		});
	});
}

function tickServers() {
	const timeNow = new Date().getTime();
	servers.forEach((server) => {
		const timePassed = timeNow - server.lastTick;
		if (timePassed > 1 / 20) {
			server.lastTick = timeNow;
			server.tick(timePassed);
		}
	});
}
setInterval(tickServers, 1);
