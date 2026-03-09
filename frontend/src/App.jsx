import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const API = "http://127.0.0.1:8000/users";

  const [users,setUsers] = useState([]);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [age,setAge] = useState("");
  const [editing,setEditing] = useState(false);
  const [message,setMessage] = useState("");

  const getUsers = async ()=>{
    try{
      const res = await axios.get(API);
      setUsers(res.data);
    }catch(err){
      console.error(err);
    }
  };

  useEffect(()=>{
    getUsers();
  },[]);

  const clearForm = ()=>{
    setName("");
    setEmail("");
    setAge("");
    setEditing(false);
  };

  const validateForm = ()=>{

    if(!name || !email || !age){
      alert("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
      alert("Enter valid email");
      return false;
    }

    const ageNumber = Number(age);

    if(ageNumber <1 || ageNumber>120){
      alert("Age must be between 1 and 120");
      return false;
    }

    if(!editing){
      const exists = users.find(u=>u.email===email);
      if(exists){
        alert("Email already exists");
        return false;
      }
    }

    return true;
  };

  const addUser = async ()=>{

    if(!validateForm()) return;

    try{

      await axios.post(API,{
        name,
        email,
        age:Number(age)
      });

      setMessage("User added successfully");

      setTimeout(()=>{
        setMessage("");
      },3000);

      clearForm();
      getUsers();

    }catch(err){
      console.error(err);
    }
  };

  const deleteUser = async (email)=>{

    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if(!confirmDelete) return;

    try{

      await axios.delete(`${API}/${email}`);

      setMessage("User deleted successfully");

      setTimeout(()=>{
        setMessage("");
      },3000);

      getUsers();

    }catch(err){
      console.error(err);
    }

  };

  const editUser = (user)=>{

    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
    setEditing(true);

  };

  const updateUser = async ()=>{

    if(!validateForm()) return;

    try{

      await axios.put(`${API}/${email}`,{
        name,
        email,
        age:Number(age)
      });

      setMessage("User updated successfully");

      setTimeout(()=>{
        setMessage("");
      },3000);

      clearForm();
      getUsers();

    }catch(err){
      console.error(err);
    }

  };

  return (

    <div className="container">

      <h2>User Management System</h2>

      <div className="form-group">
        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          disabled={editing}
        />
      </div>

      <div className="form-group">
        <input
          placeholder="Age"
          value={age}
          onChange={(e)=>{
            if(/^\d*$/.test(e.target.value)){
              setAge(e.target.value);
            }
          }}
        />
      </div>

      {editing ? (

        <button
          className="update-btn"
          onClick={updateUser}
        >
          Update User
        </button>

      ) : (

        <button
          className="add-btn"
          onClick={addUser}
        >
          Add User
        </button>

      )}

      {message && (
        <p className="message">{message}</p>
      )}

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          ) : (

            users.map((u)=>(
              <tr key={u.email}>

                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.age}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={()=>editUser(u)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={()=>deleteUser(u.email)}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default App;