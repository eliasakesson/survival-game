import React, { useRef, useEffect, useState } from "react";
import FullscreenCanvas from "../components/FullscreenCanvas";
import WorldGenerator from "../../../shared/WorldGenerator";

function GameScreen() {
	const [world, setWorld] = useState(new WorldGenerator());

	useEffect(() => {
		const unsub = requestAnimationFrame(Update);
		Start();

		return () => cancelAnimationFrame(unsub);
	}, []);

	function Start() {
		const canvas = document.getElementById("canvas") as HTMLCanvasElement;
		const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		world.Start(ctx);
	}

	const lastTimeRef = useRef<number>(0);
	function Update(time: number) {
		const deltaTime = time - lastTimeRef.current;
		lastTimeRef.current = time;

		requestAnimationFrame(Update);
	}

	return <FullscreenCanvas></FullscreenCanvas>;
}

export default GameScreen;
