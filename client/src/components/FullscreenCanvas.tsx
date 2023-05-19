import React, { useEffect, useState } from "react";

interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

const FullscreenCanvas = React.forwardRef(
	(props: CanvasProps, ref: React.Ref<HTMLCanvasElement>) => {
		const [windowSize, setWindowSize] = useState({
			width: window.innerWidth,
			height: window.innerHeight,
		});

		useEffect(() => {
			function handleResize() {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			}

			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, []);

		return (
			<canvas
				{...props}
				ref={ref}
				id="canvas"
				width={windowSize.width}
				height={windowSize.height}></canvas>
		);
	}
);

export default FullscreenCanvas;
