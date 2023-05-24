import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/Card";
import { HiUser, HiUserGroup } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { JoinRoom } from "../classes/SocketClient";
import * as ClientManager from "../game/ClientManager";

export default function HomeScreen() {
	return (
		<main className="h-screen flex-1 flex flex-col justify-center items-center p-4 lg:p-32">
			<h1 className="text-6xl font-mono font-extrabold">Survival Game</h1>
			<span className="text-xl lg:text-2xl font-serif tracking-widest">The Game</span>
			<div className="mt-16 grid grid-cols-3 gap-4">
				<Link to="/game">
					<Card>
						<CardHeader className="flex flex-col items-start gap-2">
							<HiUser className="text-6xl text-blue-500" />
							<CardTitle className="font-mono">Play Solo</CardTitle>
							<CardDescription>Jump into your own singleplayer world</CardDescription>
						</CardHeader>
					</Card>
				</Link>
				<ServerList />
				<button onClick={() => ClientManager.CreateServer("server-uuid")}>
					<Card>
						<CardHeader className="flex flex-col items-start gap-2">
							<HiUserGroup className="text-6xl text-blue-500" />
							<CardTitle className="font-mono">Create server</CardTitle>
							<CardDescription>Create a server to play with your friends</CardDescription>
						</CardHeader>
					</Card>
				</button>
			</div>
		</main>
	);
}

const ServerList = () => {
	const [serverListOpen, setServerListOpen] = useState<boolean>(false);

	return (
		<>
			<button onClick={() => setServerListOpen((open) => !open)}>
				<Card>
					<CardHeader className="flex flex-col items-start gap-2">
						<HiUserGroup className="text-6xl text-blue-500" />
						<CardTitle className="font-mono">Join server</CardTitle>
						<CardDescription>Join a server with your friends</CardDescription>
					</CardHeader>
				</Card>
			</button>
			{serverListOpen && <ServerListModal closeModal={() => setServerListOpen(false)} />}
		</>
	);
};

const ServerListModal = ({ closeModal }: { closeModal: () => void }) => {
	return (
		<Card className="max-w-[80vw] w-[50vh] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
			<CardHeader>
				<div className="flex justify-between">
					<CardTitle>Server List</CardTitle>
					<button onClick={closeModal}>
						<RxCross2 className="text-2xl" />
					</button>
				</div>
			</CardHeader>
			<CardContent>
				<ul className="">
					<ServerListItem name="sup" playerCount={10} />
				</ul>
			</CardContent>
		</Card>
	);
};

const ServerListItem = ({ name, playerCount }: { name: string; playerCount: number }) => {
	return (
		<li>
			<button
				onClick={() => ClientManager.JoinServer(name)}
				className="w-full flex justify-between items-center border border-gray-300 px-8 py-4 rounded"
			>
				<h4 className="font-semibold">{name}</h4>
				<p>{playerCount} / 10 players</p>
			</button>
		</li>
	);
};
