import react from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const RouteEnum = {
	HasUser: 1,
	NoUser: 2,
	IsConnected: 3,
};

type Props = {
	requires: number;
	fallback?: string;
	children: any;
};

export function Protected(props: Props) {
	const { user } = useAuth();

	var hasAccess = true;
	if (props.requires == RouteEnum.HasUser) {
		if (!user) {
			hasAccess = false;
		}
	}
	if (props.requires == RouteEnum.NoUser) {
		if (user) {
			hasAccess = false;
		}
	}
	if (props.requires == RouteEnum.IsConnected) {
		// TODO
	}

	if (!hasAccess) {
		return <Navigate to={props.fallback || "/"} />;
	}

	return props.children;
}
