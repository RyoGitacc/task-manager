import { useEffect, useState } from 'react'




export default function useLocalStorage<T>(key:string,initialValue:T){
 const [tasks,setTasks]=useState<T>(()=>{
    const jsonValue = localStorage.getItem(key);
    if(jsonValue !== null) return JSON.parse(jsonValue);

    else{
        return initialValue as T
    }

})


useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(tasks))
},[tasks,key])

return [tasks,setTasks] as [typeof tasks, typeof setTasks]
  
}
