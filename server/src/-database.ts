import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

//const workspace = path.join(import.meta.url, "..", "..").replace("file:\\C", "c") // weird replacement of __dirname
const workspace = "";

function get(category: "worlds" | "users", name: string) {
	try {
		const pathToFile = path.join(workspace, "storage", category, name);
		const content = fs.readFileSync(pathToFile, "utf-8");
		if (!content) return;
		return JSON.parse(content);
	} catch (err) {
		console.warn(`Getting ${name} from ${category} failed: ${err.toString()}`);
	}
}
function write(category: "worlds" | "users", name: string, data: any) {
	try {
		const pathToFile = path.join(workspace, "storage", category, name);
		const json = JSON.stringify(data);
		if (!json) return;
		fs.writeFileSync(pathToFile, json, "utf-8");
		return true;
	} catch (err) {
		console.warn(`Writing ${name} in ${category} failed: ${err.toString()}`);
	}
	return false;
}

// User API
export function GetUserData(uuid: string) {
	return get("users", uuid + ".json");
}
export function WriteUserData(uuid: string, data: any) {
	return write("users", uuid + ".json", data);
}

// World API
export function GetWorldData(uuid: string) {
	return get("worlds", uuid + ".json");
}

export function WriteWorldData(uuid: string, data: any) {
	return write("worlds", uuid + ".json", data);
}

// Utilities
export function GenerateUUID() {
	return uuidv4();
}
