import * as fs from "fs"
import * as path from "path"
import { v4 as uuidv4 } from "uuid"

const workspace = path.join(import.meta.url, "..", "..").replace("file:\\C", "c") // weird replacement of __dirname

function get(category, name) {
	try {
		const pathToFile = path.join(workspace, "storage", category, name)
		const content = fs.readFileSync(pathToFile, "utf-8")
		if (!content) return
		return JSON.parse(content)
	} catch (err) {
		console.warn(`Getting ${name} from ${category} failed: ${err.toString()}`)
	}
}
function write(category, name, data) {
	try {
		const pathToFile = path.join(workspace, "storage", category, name)
		const json = JSON.stringify(data)
		if (!json) return
		fs.writeSync(pathToFile, json, "utf-8")
		return true
	} catch (err) {
		console.warn(`Writing ${uuid} in ${category} failed: ${err.toString()}`)
	}
	return false
}

// User API
export function GetUserData(uuid) {
	return get("users", uuid)
}
export function WriteUserData(uuid, data) {
	return write("users", uuid, data)
}

// World API
export function GetWorldData(uuid) {
	return get("worlds", uuid)
}

export function WriteWorldData(uuid, data) {
	return write("worlds", uuid, data)
}

// Utilities
export function GenerateUUID() {
	return uuidv4()
}
