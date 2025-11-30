import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = ({ switchToRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const { login } = useAuth();

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

        const result = await login(formData.email, formData.password);

        if (!result.success) {
            setMessage(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>

                {message && <div className="error-message">{message}</div>}

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
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p>
                    Don't have an account?{' '}
                    <span className="auth-link" onClick={switchToRegister}>
                        Register here
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;