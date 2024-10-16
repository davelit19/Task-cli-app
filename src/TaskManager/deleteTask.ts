import fs from "fs";
import { jsonPath, Task, taskJsonDb } from "../index.ts";

export default function deleteTask(id: number | null): void {

    const tasks_db: Task[] = taskJsonDb();

    if (typeof id === "number") {

        tasks_db.map((_, task_id) => {
            if (task_id === id - 1) {
                tasks_db.splice(task_id, 1);
            }

        });
        
        fs.writeFileSync(jsonPath, JSON.stringify(tasks_db));
    }
}
