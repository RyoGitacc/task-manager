import TaskForm from './TaskForm'
import '../App.css'
import { Task } from '../Task'
import { v4 } from 'uuid';
import TaskList from './TaskList';

import useLocalStorage from '../hook/useLocalStorage';

export default function App() {
  const [tasks,setTasks]=useLocalStorage<Task[]>('tasks',[]);

  const handleAddTask=(taskData:Omit<Task,'id'>):void=>{
    const id = v4();
    const newTask:Task= {...taskData , id}
    setTasks(curr =>[...curr, newTask]);
  }

  const handleDeleteTask=(id:string):void=>{
    const newTasks = tasks.filter(t=>t.id !== id);
    setTasks(newTasks)
  }


  return (
    <div className='main'>
    <TaskForm handleAddTask={handleAddTask}/>
    <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask}/>
    </div>
  )
}
