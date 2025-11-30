import React, { useState, useEffect } from 'react';
import { taskAPI } from '../../services/api';

const TaskForm = ({ task, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'Pending',
        priority: 'Medium'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                dueDate: task.dueDate.split('T')[0],
                status: task.status,
                priority: task.priority
            });
        }
    }, [task]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (task) {
                await taskAPI.update(task._id, formData);
            } else {
                await taskAPI.create(formData);
            }
            onSave();
        } catch (error) {
            setError(error.response?.data?.message || 'Error saving task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h3>{task ? 'Edit Task' : 'Create New Task'}</h3>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
                <label>Title *</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Description *</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                />
            </div>

            <div className="form-group">
                <label>Due Date *</label>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Priority</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>

            <div className="form-actions">
                <button type="button" onClick={onClose} className="btn-secondary">
                    Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Saving...' : (task ? 'Update Task' : 'Create Task')}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;