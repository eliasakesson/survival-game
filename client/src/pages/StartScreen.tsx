import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function StartScreen() {
	const navigate = useNavigate();

	useEffect(() => {
		const timeout = setTimeout(() => {
			document.addEventListener("keydown", () => {
				navigate("/signin");
			});
		}, 2000);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<main className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
			<motion.h1
				className="text-4xl lg:text-8xl font-mono font-extrabold"
				initial={{ translateY: "100vh", opacity: 0 }}
				animate={{ translateY: 0, opacity: 1 }}
				transition={{ delay: 0.5, type: "spring", stiffness: 50 }}>
				Survival Game
			</motion.h1>
			<motion.span
				className="text-xl lg:text-3xl font-serif tracking-widest"
				initial={{ translateY: "100vh", opacity: 0 }}
				animate={{ translateY: 0, opacity: 1 }}
				transition={{ delay: 1, type: "spring", stiffness: 30 }}>
				The Game
			</motion.span>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 2.5, duration: 1 }}
				className="mt-[40vh]">
				<Link
					to="/signin"
					className="text-xl lg:text-3xl font-serif text-muted text-zinc-700">
					Press any key to continue
				</Link>
			</motion.div>
		</main>
	);
}

export default StartScreen;
