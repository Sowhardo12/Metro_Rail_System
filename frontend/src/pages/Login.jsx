import { useState } from 'react';
import { post } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const nav = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    const res = await post('/auth/login', form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      nav('/dashboard');
    } else {
      alert(res.msg || 'Login failed');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit} className="form">
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
