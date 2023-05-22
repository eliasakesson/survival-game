import { NavigateFunction } from "react-router-dom";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

export class SocketClient {
    private socket: Socket;
    private navigator: NavigateFunction;

    constructor(navigator: NavigateFunction) {
        this.socket = io("http://localhost:3001");
        this.navigator = navigator;

        this.socket.on("connect", () => {
            console.log(`Connected to server with id ${this.socket.id}`);
        });

        this.socket.on("onRoomJoined", (data: any) => {
            const { name, worldSettings } = data;
            console.log(`Joined room ${name} with world settings:`, worldSettings);
            this.navigator(`/game?${name}`);
        });
    }

    public SendMessage(message: string) {
        this.socket.emit("message", message);
    }

    public JoinRoom(roomName: string) {
        this.socket.emit("joinRoom", roomName);
    }
}