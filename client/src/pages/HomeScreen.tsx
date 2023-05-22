import { Link } from "react-router-dom";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/Card";
import { HiUser, HiUserGroup } from "react-icons/hi";

export default function HomeScreen() {
	return (
		<main className="h-screen flex-1 flex flex-col justify-center items-center p-4 lg:p-32">
			<h1 className="text-6xl font-mono font-extrabold">Survival Game</h1>
			<span className="text-xl lg:text-2xl font-serif tracking-widest">
				The Game
			</span>
			<div className="mt-16 grid grid-cols-3 gap-4">
				<Link to="/game">
					<Card>
						<CardHeader className="flex flex-col items-start gap-2">
							<HiUser className="text-6xl text-blue-500" />
							<CardTitle className="font-mono">
								Play Solo
							</CardTitle>
							<CardDescription>
								Jump into your own singleplayer world
							</CardDescription>
						</CardHeader>
					</Card>
				</Link>
				<button>
					<Card>
						<CardHeader className="flex flex-col items-start gap-2">
							<HiUserGroup className="text-6xl text-blue-500" />
							<CardTitle className="font-mono">
								Join server
							</CardTitle>
							<CardDescription>
								Join a server with your friends
							</CardDescription>
						</CardHeader>
					</Card>
				</button>
				<button>
					<Card>
						<CardHeader className="flex flex-col items-start gap-2">
							<HiUserGroup className="text-6xl text-blue-500" />
							<CardTitle className="font-mono">
								Create server
							</CardTitle>
							<CardDescription>
								Create a server to play with your friends
							</CardDescription>
						</CardHeader>
					</Card>
				</button>
			</div>
		</main>
	);
}
