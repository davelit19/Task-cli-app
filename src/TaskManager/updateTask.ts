import fs from 'fs';
import { jsonPath, Task, taskJsonDb, formattedDate} from '../index.ts';

export default function updateTask(id: number|null, task: string|undefined): void{

    const tasks_db: Task[] = taskJsonDb(); 

   if(typeof id === 'number' && task) {

         tasks_db.map((taskElement, task_id) => {

            if(task_id === (id - 1)) {
                taskElement.description = task;
                taskElement.updatedAt = formattedDate;
            }

         })
         
       fs.writeFileSync(jsonPath, JSON.stringify(tasks_db));
   }

}
