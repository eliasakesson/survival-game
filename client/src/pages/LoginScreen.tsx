import { Input } from "../components";
import Button from "../components/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/Card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginScreen() {
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
					<Tabs defaultValue="signin">
						<TabsList className="w-full mb-4">
							<TabsTrigger value="signin" className="flex-1">
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

export default LoginScreen;

const LoginTab = () => {
	const [error, setError] = useState("");

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setError("Invalid email or password");
	}

	return (
		<TabContent
			value="signin"
			title="Sign in"
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
					name="email"
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
					name="password"
					placeholder="Password"
					className={error ? "border-red-500" : ""}
				/>
			</div>
		</TabContent>
	);
};

const SignupTab = () => {
	const [error, setError] = useState("");

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setError("Invalid email or password");
	}

	return (
		<TabContent
			value="signup"
			title="Sign up"
			description="Enter your email and password to create an account"
			onSubmit={handleSubmit}
			errorMessage={error}>
			<div className="space-y-1">
				<label htmlFor="email" className="text-sm text-zinc-500">
					Email Address
				</label>
				<Input
					id="email"
					type="email"
					name="email"
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
					name="password"
					placeholder="Password"
					className={error ? "border-red-500" : ""}
				/>
			</div>
			<div className="space-y-1">
				<label htmlFor="password2" className="text-sm text-zinc-500">
					Repeat Password
				</label>
				<Input
					id="password2"
					type="password"
					name="password2"
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
