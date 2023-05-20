import { Input } from "../components";
import Button from "../components/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/Card";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginScreen() {
	return (
		<main className="h-screen flex">
			<motion.div
				className="flex-1 flex flex-col justify-center items-center lg:items-end p-4 lg:p-32 min-w-fit"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}>
				<div className="flex flex-col gap-4">
					<h1 className="text-4xl font-mono font-extrabold">
						Welcome
					</h1>
					<p>Enter your email below to login to your account</p>
					<br />
					<Tabs defaultValue="login">
						<TabsList className="w-full mb-4">
							<TabsTrigger value="login" className="flex-1">
								Sign In
							</TabsTrigger>
							<TabsTrigger value="signup" className="flex-1">
								Sign Up
							</TabsTrigger>
						</TabsList>
						<LoginTab />
						<SignupTab />
					</Tabs>
					<Link to="/" className="text-zinc-500">
						Go back
					</Link>
				</div>
			</motion.div>
			<motion.div
				className="bg-slate-600 justify-self-end max-lg:hidden"
				initial={{ width: 0 }}
				animate={{ width: "50%" }}
				transition={{
					type: "tween",
					duration: 1,
					ease: "circOut",
				}}></motion.div>
		</main>
	);
}

const LoginTab = () => {
	const [input, setInput] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	const navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		await fetch("http://localhost:8080/v1/login", {
			method: "POST",
			body: JSON.stringify(input),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) =>
				response
					.json()
					.then((data) => {
						if (data.status === "success") {
							navigate("/home");
						} else {
							setError(data.message);
						}
					})
					.catch((err) => {
						setError(err.message);
					})
			)
			.catch((err) => {
				setError(err.message);
			});
	}

	return (
		<TabContent
			value="login"
			title="Log in"
			description="Enter your email and password to login"
			onSubmit={handleSubmit}
			errorMessage={error}>
			<div className="space-y-1">
				<label htmlFor="email" className="text-sm text-zinc-500">
					Email Address
				</label>
				<Input
					id="email"
					type="email"
					value={input.email}
					onChange={(e) =>
						setInput({ ...input, email: e.target.value })
					}
					placeholder="Email Address"
					className={error ? "border-red-500" : ""}
				/>
			</div>
			<div className="space-y-1">
				<label htmlFor="password" className="text-sm text-zinc-500">
					Password
				</label>
				<Input
					id="password"
					type="password"
					value={input.password}
					onChange={(e) =>
						setInput({ ...input, password: e.target.value })
					}
					placeholder="Password"
					className={error ? "border-red-500" : ""}
				/>
			</div>
		</TabContent>
	);
};

const SignupTab = () => {
	const [input, setInput] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	const navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		await fetch("http://localhost:8080/v1/users", {
			method: "POST",
			body: JSON.stringify(input),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) =>
				response
					.json()
					.then((data) => {
						if (data.status === "success") {
							navigate("/home");
						} else {
							setError(data.message);
						}
					})
					.catch((err) => {
						setError(err.message);
					})
			)
			.catch((err) => {
				setError(err.message);
			});
	}

	return (
		<TabContent
			value="signup"
			title="Sign up"
			description="Enter your email and password to create an account"
			onSubmit={handleSubmit}
			errorMessage={error}>
			<div className="space-y-1">
				<label htmlFor="username" className="text-sm text-zinc-500">
					Username
				</label>
				<Input
					id="username"
					type="username"
					value={input.username}
					onChange={(e) =>
						setInput({ ...input, username: e.target.value })
					}
					placeholder="Username"
					className={error ? "border-red-500" : ""}
				/>
			</div>
			<div className="space-y-1">
				<label htmlFor="email" className="text-sm text-zinc-500">
					Email Address
				</label>
				<Input
					id="email"
					type="email"
					value={input.email}
					onChange={(e) =>
						setInput({ ...input, email: e.target.value })
					}
					placeholder="Email Address"
					className={error ? "border-red-500" : ""}
				/>
			</div>
			<div className="space-y-1">
				<label htmlFor="password" className="text-sm text-zinc-500">
					Password
				</label>
				<Input
					id="password"
					type="password"
					value={input.password}
					onChange={(e) =>
						setInput({ ...input, password: e.target.value })
					}
					placeholder="Password"
					className={error ? "border-red-500" : ""}
				/>
			</div>
		</TabContent>
	);
};

interface TabContentProps {
	value: string;
	title: string;
	description: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	errorMessage: string;
	children?: React.ReactNode;
}

const TabContent = ({
	value,
	title,
	description,
	onSubmit,
	errorMessage,
	children,
}: TabContentProps) => {
	return (
		<TabsContent value={value} className="flex flex-col gap-4">
			<Card>
				<CardHeader>
					<CardTitle className="font-mono">{title}</CardTitle>
					<CardDescription className="max-w-[30ch]">
						{description}
					</CardDescription>
				</CardHeader>
				{errorMessage && (
					<div className="bg-red-200 text-red-500 px-4 py-2 rounded-md mx-6 mb-4 border">
						{errorMessage}
					</div>
				)}
				<form
					onSubmit={onSubmit}
					className="p-6 pt-0 flex flex-col gap-4">
					{children}
					<Button
						className="w-full mt-4"
						variant="default"
						type="submit">
						Login
					</Button>
				</form>
			</Card>
		</TabsContent>
	);
};
