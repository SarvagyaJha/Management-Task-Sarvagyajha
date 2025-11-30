import React, { useState, useEffect } from 'react';
import { taskAPI } from '../../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import './Tasks.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        dueDate: ''
    });

    useEffect(() => {
        fetchTasks();
    }, [filters]);

    const fetchTasks = async () => {
        try {
            const response = await taskAPI.getAll(filters);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskAPI.delete(taskId);
                setTasks(tasks.filter(task => task._id !== taskId));
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingTask(null);
        fetchTasks();
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const clearFilters = () => {
        setFilters({
            status: '',
            priority: '',
            dueDate: ''
        });
    };

    if (loading) {
        return <div className="loading">Loading tasks...</div>;
    }

    return (
        <div className="task-list-container">
            <div className="task-header">
                <h2>My Tasks</h2>
                <button onClick={handleCreateTask} className="btn-primary">
                    Create Task
                </button>
            </div>

            {/* Filters */}
            <div className="filters">
                <select name="status" value={filters.status} onChange={handleFilterChange}>
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <select name="priority" value={filters.priority} onChange={handleFilterChange}>
                    <option value="">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <input
                    type="date"
                    name="dueDate"
                    value={filters.dueDate}
                    onChange={handleFilterChange}
                />

                <button onClick={clearFilters} className="btn-secondary">
                    Clear Filters
                </button>
            </div>

            {/* Task List */}
            <div className="tasks-grid">
                {tasks.map(task => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        onUpdate={fetchTasks}
                    />
                ))}
                {tasks.length === 0 && (
                    <div className="no-tasks">No tasks found. Create your first task!</div>
                )}
            </div>

            {/* Task Form Modal */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <TaskForm
                            task={editingTask}
                            onClose={handleFormClose}
                            onSave={handleFormClose}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;