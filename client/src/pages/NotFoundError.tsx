import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundError.css";

function NotFound() {
	function handleGoBack() {
		window.location.replace("/");
	}

	const pathName = new URL(window.location.toString()).pathname;

	return (
		<>
			<div id="nopagefound">
				<h1>404</h1>
				<p>
					<span style={{ fontWeight: "bold" }}>{pathName} </span>
					could not be found
				</p>
				<button onClick={handleGoBack}>Go back</button>
			</div>
		</>
	);
}

export default NotFound;
