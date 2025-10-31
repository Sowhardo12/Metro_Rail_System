import { useState } from "react";
import { post } from "../services/api";
import {useNavigate} from 'react-router-dom';

export default function Signup(){
    const[form,setForm]=useState({fullName:'',email:'',phone:'',nid:'',password:'',role:'user'});
    const nav = useNavigate();

    const submit = async (e)=>{
        e.preventDefault();
        const res = await post('/auth/signup',form);
        if(res.token){
            localStorage.setItem('token',res.token);
            nav('/dashboard');
        }else{
            alert(res.msg||'Signup Failed');
        }
    };
    return(
       <div className="container">
      <h2>Signup</h2>
      <form onSubmit={submit} className="form">
        <input placeholder="Full name" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} required />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
        <input placeholder="NID" value={form.nid} onChange={e=>setForm({...form, nid:e.target.value})} />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        <label>
          Role:
          <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
            <option value="user">User</option>
            <option value="developer">Developer</option>
            <option value="system admin">System Admin</option>
            <option value="database admin">Database Admin</option>
          </select>
        </label>
        <button type="submit">Sign up</button>
      </form>
    </div> 
    );
}