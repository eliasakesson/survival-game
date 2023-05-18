import { motion } from "framer-motion";

function StartScreen() {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
			<motion.h1
				className="text-8xl font-mono font-extrabold"
				initial={{ translateY: "100vh" }}
				animate={{ translateY: 0 }}
				transition={{ type: "spring", stiffness: 50 }}>
				Survival Game
			</motion.h1>
			<motion.span
				className="text-3xl font-serif tracking-widest"
				initial={{ translateY: "100vh" }}
				animate={{ translateY: 0 }}
				transition={{ delay: 1, type: "spring", stiffness: 30 }}>
				The Game
			</motion.span>
			<a href="/signin" className="text-4xl font-serif mt-64">
				Start Now
			</a>
		</main>
	);
}

export default StartScreen;
