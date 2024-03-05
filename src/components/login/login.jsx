import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'

function login() {



    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()

    const [error1, setError1] = useState('')
    const [error2, setError2] = useState('')

    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    console.log(password);
    console.log(email);

    function validate(emailRef, passwordRef) {

        if (emailRef.current.value !== email) {
            setError1('Email not found')
            emailRef.current.focus()
            emailRef.current.value = "";
            return false
        } else {
            setError1('')
        }

        if (!emailRef.current.value) {
            setError1("Can't be empty")
            emailRef.current.focus()
            return false
        } else {
            setError1("")
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailRef.current.value)) {
            setError1('Invalid email address')
            return false
        }

        if (!passwordRef.current.value) {
            setError2("Can't be empty")
            passwordRef.current.focus()
            return false
        } else {
            setError2("")
        }

        if (passwordRef.current.value.trim().length < 3) {
            setError2('Password must be at least 3 characters')
            return false
        } else {
            setError2("")
        }
        

        if (passwordRef.current.value !== password) {
            setError2('The password does not match')
            passwordRef.current.focus()
            passwordRef.current.value = "";
            return false
        } else {
            setError2('')
        }


        return true
    }

    function handleClick() {
        if (validate(emailRef, passwordRef)) {
            localStorage.setItem('password', passwordRef.current.value)
            localStorage.setItem('email', emailRef.current.value)
            navigate('/')
        } else {
            console.log('incorrect');
        }
    }



  return (
    <>
        <div className="container">
            <h1>Login</h1>
            <form>
                <div className="box">
                    <input className='login-register-input' type="email" placeholder='Email address' ref={emailRef}/>
                    {error1 && <p className='pError' style={{ color: 'red' }}>{error1}</p>}
                </div>
                <div className="box">
                    <input className='login-register-input' type="password" placeholder='Password' ref={passwordRef}/>
                    {error2 && <p className='pError' style={{ color: 'red' }}>{error2}</p>}
                </div>
            </form>
            <button className='login-btn' onClick={handleClick}>Create an account</button>
            <p className='loginP'>Don't have an account? <span className='aLink' onClick={() => navigate('/register')} >Sign Up</span> </p>
        </div>
    </>
  )
}

export default login