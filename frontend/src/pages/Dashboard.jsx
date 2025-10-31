import { useEffect, useState } from 'react';
import { get } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard(){
    const [user,setUser] = useState(null);
    const nav = useNavigate();
    useEffect(()=>{
        (async ()=>{
            const token = localStorage.getItem('token');
            if(!token)return nav('/login');
            const data = await get('/user/me',token);
            if(data.msg){
                alert(data.msg);
                return nav('/login');
            }
            setUser(data);
        })();
    },[]);

    const logout = ()=> {
        localStorage.removeItem('token');
        nav('/');
    };

    if(!user) return <div className="container">Loading...</div>;
    return(
        <div className="container">
      <h2>Welcome, {user.fullName}</h2>
      <p><strong>UserID:</strong> {user.userId}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Balance:</strong> {user.balance} Tk</p>
      <p><strong>Recent travels:</strong> No travels yet</p>

      <div className="buttons">
        <Link to="/recharge">Recharge Wallet</Link>
        <Link to="/metro-location">Metro Location</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
    );
}