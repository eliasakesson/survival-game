export default function PerlinNoise(x, y) {
	// Generate a random unit gradient vector for each grid cell
	function randomGradient(ix, iy) {
		// Pseudo-random number generator
		let random =
			2920 *
			Math.sin(ix * 21942 + iy * 171324 + 8912) *
			Math.cos(ix * 23157 * iy * 217832 + 9758);
		return {
			x: Math.cos(random),
			y: Math.sin(random),
		};
	}

	// Interpolation function (smoothstep)
	function interpolate(a, b, t) {
		return (1 - Math.cos(t * Math.PI)) * 0.5 * (b - a) + a;
	}

	// Grid cell coordinates
	let x0 = Math.floor(x);
	let x1 = x0 + 1;
	let y0 = Math.floor(y);
	let y1 = y0 + 1;

	// Random gradient vectors
	let gradient00 = randomGradient(x0, y0);
	let gradient01 = randomGradient(x0, y1);
	let gradient10 = randomGradient(x1, y0);
	let gradient11 = randomGradient(x1, y1);

	// Distance vectors
	let dx0 = x - x0;
	let dx1 = x - x1;
	let dy0 = y - y0;
	let dy1 = y - y1;

	// Dot products
	let dot00 = gradient00.x * dx0 + gradient00.y * dy0;
	let dot01 = gradient01.x * dx0 + gradient01.y * dy1;
	let dot10 = gradient10.x * dx1 + gradient10.y * dy0;
	let dot11 = gradient11.x * dx1 + gradient11.y * dy1;

	// Interpolation weights
	let weightX = interpolate(dot00, dot10, dx0);
	let weightY = interpolate(dot01, dot11, dx0);

	// Interpolate along y-axis
	return interpolate(weightX, weightY, dy0);
}
