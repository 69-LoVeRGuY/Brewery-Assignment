import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Validate from './LoginValidation';




function Login() {
    const [values, setValues] = useState({
        email:'',
        password:''
    })
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const handleInput = (e) => {
        setValues((prev) => ({...prev, [e.target.name]: [e.target.value]}))
    }


    function submitHandler(e){
        e.preventDefault();
        setErrors(Validate(values))
        if(errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/login',values)
            .then(res => {
                if(res.data === "Successful")
                {
                  localStorage.setItem('user',values.email)
                  navigate('/home');
                }
                else
                    alert("Incorrect email or password");
            })
            .catch(err => console.log(err))
        }
    }

  return (

    <div className="w-screen min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="w-[55%] relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  {/* INPUT EMAIL */}
                  <input onChange={e => handleInput(e)} autocomplete="off" id="email" name="email" type="text" className="bg-white peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                  <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                </div>
                <div className="relative">
                  {/* INPUT PASSWORD */}
                  <input onChange={e => handleInput(e)} autocomplete="off" id="password" name="password" type="password" className=" bg-white peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                  <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                </div>
                <div className="relative">
                  <button onClick={e => submitHandler(e)} className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                  <p className='mt-4 text-gray-500'>Not a registered user? <Link to='/signup'>Sign up!</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Login