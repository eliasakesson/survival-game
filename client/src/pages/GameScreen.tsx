import React, { useRef, useEffect, useState } from "react";
import FullscreenCanvas from "../components/FullscreenCanvas";
import Game from "../../../shared/Game";

function GameScreen() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [game, setGame] = useState<Game | null>(null);
	const gameStarted = useRef(false);

	useEffect(() => {
		if (canvasRef.current && !gameStarted.current) {
			const ctx = canvasRef.current.getContext("2d");
			if (ctx) {
				gameStarted.current = true;
				setGame(new Game(ctx));
			}
		}
	}, [canvasRef.current]);

	return <FullscreenCanvas ref={canvasRef}></FullscreenCanvas>;
}

export default GameScreen;
