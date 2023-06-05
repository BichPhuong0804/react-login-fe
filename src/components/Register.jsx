// eslint-disable-next-line no-unused-vars
import loginImg from '../assets/login_3.jpg'
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/users/register', {
            username: username,
            email: email,
            password: password
        })
        .then((response) => {
            const data = response.data;
            console.log(data)
            if (data.success) {
                window.location.href = 'https://www.linux.org/';
            } else {
                console.log(data.success);
                console.log('Tên người dùng hoặc mật khẩu không chính xác');
            }
        })
        .catch((error) => {
            setError(error);
        });
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
            <div className="hidden sm:block"> 
                <img className="w-full h-full object-cover" src={loginImg} alt="" /> 
            </div>
            <div className="bg-gray-800 flex flex-col justify-center" >
                <form  onSubmit={handleSubmit} className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
                    <h2 className="text-4xl text-white font-bold text-center">SIGN IN</h2>
                    {error && <p className="text-sm text-red-500 py-2 ">{error}</p>}
                    <div className="flex flex-col text-gray-400 py-2">
                        <label>User Name</label>
                        <input
                            value={username}
                            className="rounded-lg bg-gray-800 mt-2 p-2 focus:border-blue-500 focus:bg-gray-700 focus:outline-none"
                            type="text"
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 py-2">
                        <label>Email</label>
                        <input
                            value={email}
                            className="rounded-lg bg-gray-800 mt-2 p-2 focus:border-blue-500 focus:bg-gray-700 focus:outline-none"
                            type="text"
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 py-2"> 
                        <label>Password</label>
                        <input
                            value={password}
                            className="rounded-lg bg-gray-800 mt-2 p-2 focus:border-blue-500 focus:bg-gray-700 focus:outline-none"
                            type="password"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 py-2">
                        <label>Confilm Password</label>
                        <input
                            className="rounded-lg bg-gray-800 mt-2 p-2 focus:border-blue-500 focus:bg-gray-700 focus:outline-none"
                            type="password"
                        />
                    </div>
                    <div className="flex justify-between text-gray-400 py-2">
                        <p className="flex items-center">  
                            <input className="mr-2" type="checkbox" /> Remember Me
                        </p>
                        <p>Forgot Password</p>
                    </div>
                    <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/30 font-semibold rounded-lg text-white">Sign In</button>
                    <p className="text-gray-400">Have an account? <Link to="/" className="text-blue-100">Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default  Register;