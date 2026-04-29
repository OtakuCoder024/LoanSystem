import '../styles/Main.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login(){
    
    const [ isVisible, setIsVisible ] = useState(false);
    const [ email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();

    function toggle(){
        setIsVisible(prev => !prev)
    }

    async function handleLogin(){
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        console.log(data);
        console.log(email);

        if(response.ok){
            alert("Login Success");
            navigate('/dashboard');
        }
        else{
            alert(data.message);
        
        }
    }


    return(
        <div className="app">
            <div className="container">

                <h2>Sign In Here</h2>

                    <label> Email </label>
                    <input 
                        type="text"  
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label> Password </label>
                    <input 
                        type={ isVisible ? "text" : "password" }
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="hideButton" onClick={() => toggle()}>
                        { isVisible ? "Hide" : "Show"}
                    </button>

                    <button onClick={handleLogin}>
                        Login
                    </button>

                    <Link to="/register">
                        If you don't have an account. Click Here!
                    </Link>


            </div>
        </div>
    )
}

export default Login;