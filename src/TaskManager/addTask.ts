 import { jsonPath, Task, formattedDate, taskJsonDb } from '../index.ts';
 import fs from "fs";

export default function addTask(task: string| undefined): void {

    const tasks_db: Task[] = taskJsonDb();

    let count: number = 0;

    let taskExist: boolean = false;

    while (count < tasks_db.length) {
        if (tasks_db[count].description === task) {
            console.log(`Task already exist with id:${count + 1}`);
            taskExist = true;
            break;
        }
        count++
    }

    if (!taskExist && task) {
        const taskItem: Task = {
            id: Number(tasks_db.length + 1),
            description: task,
            status: "todo",
            createdAt: formattedDate,
            updatedAt: formattedDate
        }
        tasks_db.push(taskItem);
        fs.writeFileSync(jsonPath, JSON.stringify(tasks_db));
        console.log(`Task added successfully (ID: ${taskItem.id})`);
    }
}

