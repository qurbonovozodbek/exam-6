import React, { useState } from 'react'
import './register.css'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

function register() {
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()
    const rePasswordRef = useRef()

    const [error1, setError1] = useState('')
    const [error2, setError2] = useState('')
    const [error3, setError3] = useState('')

    function validate(emailRef, passwordRef, rePasswordRef) {

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
        
        if (!rePasswordRef.current.value) {
            setError3("Can't be empty")
            rePasswordRef.current.focus()
            return false
        } else {
            setError3("")
        }

        if (passwordRef.current.value !== rePasswordRef.current.value) {
            setError2('Passwords do not match')
            setError3('Passwords do not match')
            passwordRef.current.focus()
            rePasswordRef.current.value = "";
            passwordRef.current.value = "";
            return false
        } else {
            setError2('')
            setError3('')
        }


        return true
    }

    function handleClick() {
        if (validate(emailRef, passwordRef, rePasswordRef)) {
            // emailRef.current.value = ""
            // passwordRef.current.value = ""
            // rePasswordRef.current.value = ""
            localStorage.setItem('password', passwordRef.current.value)
            localStorage.setItem('email', emailRef.current.value)
            navigate('/login')
        } else {
            console.log('incorrect');
        }
    }

    return (
    <>
        <div className="container">
            <h1>Sign Up</h1>
            <form>
                <div className="box">
                    <input className='login-register-input' type="email" placeholder='Email address' ref={emailRef}/>
                    {error1 && <p style={{ color: 'red' }}>{error1}</p>}
                </div>
                <div className="box">
                    <input className='login-register-input' type="password" placeholder='Password' ref={passwordRef}/>
                    {error2 && <p style={{ color: 'red' }}>{error2}</p>}
                </div>
                <div className="box">
                    <input className='login-register-input' type="password" placeholder='Repeat password' ref={rePasswordRef}/>
                    {error3 && <p style={{ color: 'red' }}>{error3}</p>}
                </div>
            </form>
            <button onClick={handleClick}>Create an account</button>
            <p className='loginP'>Already have an account? <span className='aLink' onClick={() => navigate('/login')} >Login</span> </p>
        </div>
    </>
  )
}

export default register