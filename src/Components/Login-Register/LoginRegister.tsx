import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginRegister.css';

const LoginRegister: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    
    // State for Sign Up form
    const [signUpData, setSignUpData] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    // State for Sign In form
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });

    // Handle input changes for Sign Up
    const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle input changes for Sign In
    const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignInData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className="login-register-wrapper">
            <button className="back-arrow btn-secondary btn-compact" onClick={handleBackClick} aria-label="Go back to home">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Home
            </button>
            <div className={`login-register-container ${isActive ? 'active' : ''}`} id="container">
                <div className="form-container sign-up">
                    <form>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="#" className="icon" aria-label="Sign up with Google"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon" aria-label="Sign up with Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icon" aria-label="Sign up with GitHub"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icon" aria-label="Sign up with LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registeration</span>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Name" 
                            value={signUpData.name}
                            onChange={handleSignUpChange}
                            autoComplete="off"
                        />
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            value={signUpData.email}
                            onChange={handleSignUpChange}
                            autoComplete="off"
                        />
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            value={signUpData.password}
                            onChange={handleSignUpChange}
                            autoComplete="off"
                        />
                        <button type="button">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="icon" aria-label="Sign in with Google"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon" aria-label="Sign in with Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icon" aria-label="Sign in with GitHub"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icon" aria-label="Sign in with LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email password</span>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            value={signInData.email}
                            onChange={handleSignInChange}
                            autoComplete="off"
                        />
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            value={signInData.password}
                            onChange={handleSignInChange}
                            autoComplete="off"
                        />
                        <a href="#">Forget Your Password?</a>
                        <button type="button">Sign In</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" onClick={handleLoginClick}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden" onClick={handleRegisterClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
