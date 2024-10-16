import { Task, taskJsonDb } from '../index.ts';

export default function list(task: string | undefined): void {

    const tasks_db: Task[] = taskJsonDb();

    if (task) {

        switch (task) {
            case "todo":
                listOption(tasks_db, "todo");
                break;
            case "in-progress":
                listOption(tasks_db, "in-progress");
                break;
            case "done":
                listOption(tasks_db, "done");
                break;
        }

    } else {
        console.log(tasks_db);
    }

}

function listOption(arr: Task[], taskStatus: string): void {

    const filteredArr: Task[] = arr.filter((taskElement) => {

        if (taskStatus === taskElement.status) {
            return taskElement;
        }

    });

    if (filteredArr.length > 0) {

        console.log(`Tasks with status "${taskStatus}":`, filteredArr);

    } else {
        
        console.log(`No tasks found with status "${taskStatus}"`);
    }
}