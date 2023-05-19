import React, { useRef, useEffect, useState } from "react";
import FullscreenCanvas from "../components/FullscreenCanvas";

function GameScreen() {
	useEffect(() => {
		const unsub = requestAnimationFrame(Update);

		return () => cancelAnimationFrame(unsub);
	}, []);

	const lastTimeRef = useRef<number>(0);
	function Update(time: number) {
		const deltaTime = time - lastTimeRef.current;
		lastTimeRef.current = time;
		console.log(deltaTime);

		requestAnimationFrame(Update);
	}

	return <FullscreenCanvas></FullscreenCanvas>;
}

export default GameScreen;
