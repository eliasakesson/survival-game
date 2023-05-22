import { Server, Socket } from "socket.io";

export interface Room {
    name: string;
    clients: Set<Socket>;
    worldSettings: { seed: number }
}

export class SocketHandler {
    private io: Server;
    private rooms: Room[] = [];

    constructor(io: Server) {
        this.io = io;

        this.io.on("connection", (socket: Socket) => {
            console.log(`Client ${socket.id} connected`);

            socket.on("joinRoom", (roomName: string) => {
                console.log(`Client ${socket.id} joined room ${roomName}`);

                // Find the room with the given name
                let room = this.rooms.find((r) => r.name === roomName);

                // If the room doesn't exist, create it
                if (!room) {
                    const seed = Math.floor(Math.random() * 1000000);
                    room = { name: roomName, clients: new Set(), worldSettings: { seed } };
                    this.rooms.push(room);
                }

                // Add the client to the room
                room.clients.add(socket);

                // Join the room
                socket.join(roomName);

                // Send the room settings to the client
                socket.emit("onRoomJoined", room)
            });

            socket.on("leaveRoom", (roomName: string) => {
                console.log(`Client ${socket.id} left room ${roomName}`);

                // Find the room with the given name
                const room = this.rooms.find((r) => r.name === roomName);

                // If the room exists, remove the client from it
                if (room) {
                    room.clients.delete(socket);

                    // If the room is now empty, remove it
                    if (room.clients.size === 0) {
                        this.rooms = this.rooms.filter((r) => r !== room);
                    }
                }

                // Leave the room
                socket.leave(roomName);
            });

            socket.on("disconnect", () => {
                console.log(`Client ${socket.id} disconnected`);

                // Remove the client from all rooms
                for (const room of this.rooms) {
                    if (room.clients.has(socket)) {
                        room.clients.delete(socket);

                        // If the room is now empty, remove it
                        if (room.clients.size === 0) {
                            this.rooms = this.rooms.filter((r) => r !== room);
                        }

                        // Leave the room
                        socket.leave(room.name);
                    }
                }
            });
        });
    }
}