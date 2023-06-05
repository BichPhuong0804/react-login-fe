// eslint-disable-next-line no-unused-vars
import loginImg from '../assets/login_3.jpg'
import React, { useState } from 'react';
import {Router, Link} from 'react-router-dom'


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleRememberMeChange = (e) => {
      setRememberMe(e.target.checked)
    }
    
  
    const handleSubmit = (e) => {
        e.preventDefault();
  
      fetch('http://127.0.0.1:8000/api/users/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access) {
            localStorage.setItem('token', data.access);
            window.location.href = 'https://www.linux.org/';
          } else {
            setError('Tên người dùng hoặc mật khẩu không chính xác')
          }
        })
        .catch((error) => {
          setError(error)
        });
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
            <div className="hidden sm:block"> {/* ẩn trên các màng hình nhỏ và hiển thị trên các màng hình có kích thước phù hợp với sm */}
                <img className="w-full h-full object-cover" src={loginImg} alt="" /> {/* object-cover: cắt hình ảnh để lấp đầy phần tử mà không làm biến dạng khung hình */}
            </div>
            <div className="bg-gray-800 flex flex-col justify-center" >
                <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="text-4xl text-white font-bold text-center">LOGIN</h2>
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
                    <div className="flex flex-col text-gray-400 py-2"> {/*Khi áp dụng py-2 cho một phần tử, nó sẽ có khoảng cách dọc bằng 0.5rem (8px) phía trên và phía dưới của phần tử */}
                        <label>Password</label>
                        <input
                            value={password}
                            className="rounded-lg bg-gray-800 mt-2 p-2 focus:border-blue-500 focus:bg-gray-700 focus:outline-none"
                            type="password"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="flex justify-between text-gray-400 py-2">
                        <p className="flex items-center">  {/*items-center: Lớp CSS items-center được sử dụng để căn giữa các phần tử con theo chiều dọc (theo trục chính) bên trong phần tử <p> */}
                            <input 
                            className="mr-2" 
                            type="checkbox" 
                            /> Remember Me
                        </p>
                        <p>Forgot Password</p>
                    </div>
                    <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/30 font-semibold rounded-lg text-white">Login</button>
                    <p className="text-gray-400">Don't have an account? <Link to="/register" className="text-blue-100">Sign in</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;