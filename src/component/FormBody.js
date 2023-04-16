import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

const FormBody = () => {
 //to get the values from localstorage
 const getLocalhost=()=>{
  let list =localStorage.getItem("task");
  if(list){
    return JSON.parse(list)
  }
  else{
    return []
  }
}
//get values from input
  const [value,setValue]=useState("")
  //put values in array and save them in localstorage
  const [todos,setTodos]=useState(getLocalhost())
  // add the task 
  const addTask=()=>{
    if(value ==''){
     
    }
    else{
      setTodos([...todos,value])
      setValue("")
    }
}
  //delete the task with using sweetalert
  const deleteTask=(item)=>{


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure you want to delete this task?',
      text: "Be careful",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteItem = JSON.parse(localStorage.getItem("task")).filter((e,i)=> e != item);
        setTodos(deleteItem )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your task is safe '
          
        )
      }
    })
    
  }
  // put line through the task if complete
  const completeTask=(e)=>{
      e.target.classList.toggle("complete")
  }

  //to set the values in array in localstorage
  useEffect(()=>{
    localStorage.setItem("task",JSON.stringify(todos))
  },[todos])
  // to make button not allowed if input is empty
  useEffect(()=>{
      value ==''? document.querySelector("button").classList.add("not-allowed"):
      document.querySelector("button").classList.remove("not-allowed")
  },[value])
  return (
    <>
     <div className="container">
      <div className="head mt-3 text-center">
        <h1>Todo List App</h1>
      </div>
     <div className="form">
        <div className="input d-flex">
        <input className='input-task ' value={value} onChange={(e)=>setValue(e.target.value)} type="text" placeholder='Enter your task' />
        <button  onClick={addTask}>Add Task</button>
        </div>
        <div className="tasks mt-5 mb-2">
        {todos.map((todo,index)=>{
          return(
            <div key={index} className="task">
            <span className='content' onClick={(e)=>completeTask(e)}>{todo}</span>
            <span  className='remove' onClick={()=>deleteTask(todo)}><FontAwesomeIcon icon={faTrash} /></span>
          </div>
          )
      })}
    </div>
      </div>
     </div>
    </>
  )
}

export default FormBody;
