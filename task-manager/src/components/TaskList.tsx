import { Task } from '../Task'


interface TaskListPropsType{
    tasks:Task[]
    handleDeleteTask:(id:string)=>void
}

export default function TaskList({tasks,handleDeleteTask}:TaskListPropsType) {

  
  return (
     <table>
      <thead>
        <tr>
            <th>Title</th>
            <th>Due date</th>
            <th>Category</th>
            <th>button</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((t,index)=>(
            <tr key={index}>
            <td>{t.title}</td>
            <td>{t.dueDate}</td>
            <td>{t.category}</td>
            <td><button onClick={()=>handleDeleteTask(t.id)}>Delete</button></td>
         </tr>   
        ))}
      </tbody>
     </table>
     
  )
}
