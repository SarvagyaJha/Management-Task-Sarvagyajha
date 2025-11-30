import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TaskList from './components/tasks/TaskList';
import './App.css';

const AppContent = () => {
    const { user, logout } = useAuth();
    const [isLogin, setIsLogin] = useState(true);

    if (!user) {
        return isLogin ? (
            <Login switchToRegister={() => setIsLogin(false)} />
        ) : (
            <Register switchToLogin={() => setIsLogin(true)} />
        );
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>Task Management App</h1>
                <div className="user-info">
                    <span>Welcome, {user.username}</span>
                    <button onClick={logout} className="btn-logout">
                        Logout
                    </button>
                </div>
            </header>
            <main>
                <TaskList />
            </main>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;