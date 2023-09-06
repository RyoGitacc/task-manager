import {z} from 'zod';
import CATEGORIES from '../category';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '../Task';

function isValidDate(dueDate:string):boolean{
    const date = new Date(dueDate)
    return date instanceof Date && !isNaN(date.getTime());
}

function isValidCategory(category:string):boolean{
    if(CATEGORIES.find(c=>c === category) !== undefined) return true;
    else return false;
}

const TaskFormSchema = z.object({
    title:z.string().min(
        3,{ message : 'tilte must be more than 3 charactors'})
        .max(50, {message :'tilte must be less than 50 charactors'}),
    dueDate:z.string().refine(isValidDate,{message:'Invalid date'}),
    category:z.string().refine(isValidCategory, {message:'Invalid category'})
})

export type TaskFormDataType = z.infer<typeof TaskFormSchema>

type TaskFormPropsType={
   handleAddTask:(task:Omit<Task,"id">)=>void
}


export default function TaskForm({handleAddTask}:TaskFormPropsType) {
  const {register,handleSubmit,reset,formState:{errors}}=useForm<TaskFormDataType>(
    {resolver:zodResolver(TaskFormSchema)}
  )
  
  const submitForm=(data:TaskFormDataType):void=>{
    handleAddTask(data)
    reset();
  }

  

  return (
   <form className='form' onSubmit={handleSubmit(submitForm)}>
     <h3>Simple Task manager</h3>
     <div>
      <label htmlFor="title" className="form-label">Title</label>
      <input type="text" className="form-control" id="title" placeholder="title" {...register('title')}/>
      {errors.title && errors.title.message}
     </div>
     <div>
      <label htmlFor="dueDate" className="form-label">Due date</label>
      <input type="date" className="form-control" id="dueDate" placeholder="Due date" {...register('dueDate')}/>
      {errors.dueDate?.message}
     </div>
     <div>
     <label  className="form-label">Category</label>
     <select className="form-select" aria-label="Default select example"  {...register('category')} >
      <option value="">Open this select menu</option>
        {CATEGORIES.map(c=>(
           <option key={c} value={c}>{c}</option>
         ))}
      </select>
     {errors.category?.message}
     </div>
     <button type='submit' className='btn btn-primary'>Submit</button>
   </form>
  )

}
