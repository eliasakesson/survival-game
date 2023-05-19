import * as React from "react";

const variants = {
	default: "bg-blue-500 text-white",
	destructive:
		"bg-destructive text-destructive-foreground hover:bg-destructive/90",
	outline: "border border-input hover:bg-accent hover:text-accent-foreground",
	secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
	ghost: "hover:bg-accent hover:text-accent-foreground",
	link: "underline-offset-4 hover:underline text-primary",
};

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	className?: string;
}

const Button = (props: ButtonProps) => {
	const { variant, className } = props as ButtonProps;

	return (
		<button
			{...props}
			className={
				(variant ? variants[variant] : "") +
				" py-2 px-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background " +
				className
			}
		/>
	);
};

export default Button;
