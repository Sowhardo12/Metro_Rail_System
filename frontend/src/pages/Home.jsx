import {Link} from 'react-router-dom';

export default function Home(){
    return(
    <div className="container">
      <h1>Metro Service</h1>
      <div className="card">
        <Link to="/signup">User / Admin Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
    );
}