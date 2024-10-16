#!/usr/bin/env ts-node

// The above line is called a shebang. It specifies that the script should be executed with `ts-node`,
// which allows you to run TypeScript directly without needing to compile it first.

import fs from "fs";
import path from "path";
import addTask from "./TaskManager/addTask.ts";
import updateTask from "./TaskManager/updateTask.ts";
import deleteTask from "./TaskManager/deleteTask.ts";
import mark from "./TaskManager/markTask.ts";
import list from "./TaskManager/listTask.ts";

// Define the path for the JSON database where tasks are stored.
// The __dirname is a special variable and also a global variable in node.js that refers to the current directory of the executing script.
export const jsonPath: string = path.join(__dirname, "task-db.json");

// If the task database file doesn't exist, create it and initialize it with an empty array.
if (!fs.existsSync(jsonPath)) {
  fs.writeFileSync(jsonPath, JSON.stringify([]));
}

export interface Task {
  id: number;
  description: string;
  status: "in-progress" | "todo" | "done";
  createdAt: string;
  updatedAt: string;
}

// Define a formatted date string using the current date and time.
// The padStart() method ensures that the day, month, hours, minutes, and seconds are formatted with two digits.
const now = new Date();
export const formattedDate = `DATE: ${now.getFullYear()}-${(now.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} TIME: ${now
  .getHours()
  .toString()
  .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
  .getSeconds()
  .toString()
  .padStart(2, "0")}`;

// A function fetches data from the json database.
export function taskJsonDb(): Task[] {
  const tasks_db: Task[] = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  return tasks_db;
}

// Get the array of arguments passed via the CLI (command-line interface).
// process.argv contains the command-line arguments: [node path, script path, command, ...other args]
const cliArr: string[] = process.argv;
let command: string = cliArr[2]; //Extract the task command from the arguments.
const task: string | undefined = cliArr.length > 3 ? cliArr[cliArr.length - 1] : undefined; //Extract the ID if provided (for update, delete, etc.)
const id: number | null = cliArr.length > 3 ? Number(cliArr[3]) : null;
let markCommand: string | undefined; // Will store 'mark-in-progress' or 'mark-done' command if applicable.

if (command === "mark-in-progress" || command === "mark-done") {
  markCommand = command;
  command = "mark";
}

switch (command) {
  case "add":
    addTask(task);
    break;
  case "update":
    updateTask(id, task);
    break;
  case "delete":
    deleteTask(id);
    break;
  case "mark":
    mark(id, markCommand);
    break;
  case "list":
    list(task);
    break;
  default:
    console.log("Incorrect command entered!!!");
}
