import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = ({ switchToLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const { register } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            setLoading(false);
            return;
        }

        const result = await register(formData.username, formData.email, formData.password);

        if (result.success) {
            setMessage('Registration successful! Please login.');
            setTimeout(() => switchToLogin(), 2000);
        } else {
            setMessage(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Register</h2>

                {message && (
                    <div className={message.includes('successful') ? 'success-message' : 'error-message'}>
                        {message}
                    </div>
                )}

                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </div>

                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>

                <p>
                    Already have an account?{' '}
                    <span className="auth-link" onClick={switchToLogin}>
                        Login here
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;