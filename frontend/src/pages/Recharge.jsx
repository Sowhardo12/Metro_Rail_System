import { useState } from 'react';
import { post } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Recharge(){
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('BRAC Bank');
  const nav = useNavigate();
  const handle = async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await post('/user/recharge',{amount:Number(amount),bank},token);
    if(res.msg && res.msg.includes('successful')){
        alert('Payment Successful');
        nav('/dashboard');
    }else{
        alert(res.msg||'Payment Failed. Minimum 50 tk required');
    }
  };
    return (
    <div className="container">
      <h2>Recharge</h2>
      <form onSubmit={handle} className="form">
        <input type="number" placeholder="Amount (>=50)" value={amount} onChange={e=>setAmount(e.target.value)} required />
        <select value={bank} onChange={e=>setBank(e.target.value)}>
          <option>BRAC Bank</option>
          <option>City Bank</option>
          <option>DBBL</option>
          <option>Standard Chartered</option>
        </select>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}