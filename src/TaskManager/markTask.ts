import fs from "fs";
import { jsonPath, Task, taskJsonDb } from "../index.ts";

export default function mark(id: number | null, markTask: string | undefined): void {

    const tasks_db: Task[] = taskJsonDb();

    if (typeof id === 'number' && markTask) {

        tasks_db.map((taskElement, task_id) => {

            if (task_id === (id - 1)) {
                
                if (markTask === "mark-in-progress") {
                    taskElement.status = "in-progress";
                } else {
                    taskElement.status = "done";
                }
            }

        });
        fs.writeFileSync(jsonPath, JSON.stringify(tasks_db));

    }
}