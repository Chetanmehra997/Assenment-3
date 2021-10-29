
import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"

 function Login() {
    const [data, setData] = useState([])
    const [change, setChange] = useState({fname:"", lname:"", age:"", study:""})
    useEffect(()=>{
        axios.get("http://localhost:5000/").then(res=>{
            setData(res.data)
        })
    }, [])

    const studentAdd =() =>{
        axios.post("http://localhost:5000/studentAdd", change).then(res=>{
            setData(res.data)
        })
    }

    const deleteStudent = (fname, lname, age) =>{
        axios.delete('http://localhost:5000/deleteStudent', { data: { fname: fname, 
        lname: lname, age: age } }).then(res => setData(res.data))
    }

    return (
        <div>
            <h2>STUDENT DATA</h2>
            <input type="text"  placeholder="first_name" onChange={(e)=>setChange({ ...change, fname:e.target.value})}/>
            <input type="text"  placeholder="last_name" onChange={(e)=>setChange({...change, lname:e.target.value})}/>
            <input type="number" placeholder="Age" onChange={(e)=> setChange({...change, age:e.target.value})}/>
            <select onChange={(e)=> setChange( {...change, study:e.target.value})}>
                <option>ECE</option>
                <option>CSE</option>
                <option>ME</option>
                <option>EEE</option>
            </select>
            <button onClick={studentAdd}>Submit</button>

            <table>
              <thead>
                  <td>Serial No.</td>
                  <td>First Name</td>
                  <td>Last Name</td>
                  <td>Age</td>
                  <td>Field of Study</td>
              </thead>
              {data.map((item, index) =>{
                  return(
                      <tr>
                          <td>{index + 1}</td>
                          <td>{item.fname}</td>
                          <td>{item.lname}</td>
                          <td>{item.age}</td>
                          <td>{item.study}</td>
                          <td><button>edit</button></td>
                          <td><button onClick={()=>{deleteStudent( item.fname, item.lname, item.age )}} >delete</button></td>
                      </tr>
                      
                  )
              })}
          </table>
        </div>
    )
}

export default Login;