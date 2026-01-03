import React, {useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';

function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        setError('');

        if(login(credentials.email, credentials.password)) {

        return;
    
    } setError('Invalid email or password');
    };
    return (
        <div classname="login-page">
            <h1>login page</h1>
            <form onSubmit={handlesubmit}>
                <div>
                    <label>role</label>
                    <select value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}>
                        <option value="">Select Role</option>
                        <option value="admin@admin.com">Admin</option>
                        <option value="customer@customer.com">custommer</option>
                    </select>
                </div>
                <div>
                <label>email</label>
                <input type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  required />
</div>
              <div>
                <label>password</label>
                <input type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
                  required />
                
           </div>       
            {error && <p className="error">{error}</p>}
           <button type="submit">Login</button>
        </form>
        </div>
    );
}
export default Login;