// import React from 'react';
// import { taskAPI } from '../../services/api';

// const TaskItem = ({ task, onEdit, onDelete, onUpdate }) => {
//     const handleStatusChange = async (newStatus) => {
//         try {
//             await taskAPI.update(task._id, { status: newStatus });
//             onUpdate();
//         } catch (error) {
//             console.error('Error updating task status:', error);
//         }
//     };

//     const getPriorityClass = (priority) => {
//         switch (priority) {
//             case 'High': return 'priority-high';
//             case 'Medium': return 'priority-medium';
//             case 'Low': return 'priority-low';
//             default: return 'priority-medium';
//         }
//     };

//     const getStatusClass = (status) => {
//         switch (status) {
//             case 'Pending': return 'status-pending';
//             case 'In Progress': return 'status-in-progress';
//             case 'Completed': return 'status-completed';
//             default: return 'status-pending';
//         }
//     };

//     return (
//         <div className="task-item">
//             <div className="task-header">
//                 <h3 className="task-title">{task.title}</h3>
//             </div>

//             <p className="task-description">{task.description}</p>

//             <div className="task-meta">
//                 <span className="task-due-date">
//                     Due: {new Date(task.dueDate).toLocaleDateString()}
//                 </span>
//                 <span className={`task-priority ${getPriorityClass(task.priority)}`}>
//                     {task.priority}
//                 </span>
//             </div>

//             <div className={`task-status ${getStatusClass(task.status)}`}>
//                 {task.status}
//             </div>

//             <div className="status-actions">
//                 <label>Change Status:</label>
//                 <select
//                     value={task.status}
//                     onChange={(e) => handleStatusChange(e.target.value)}
//                 >
//                     <option value="Pending">Pending</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                 </select>
//             </div>

//             <div className="task-actions">
//                 <button
//                     onClick={() => onEdit(task)}
//                     className="btn-edit"
//                 >
//                     Edit
//                 </button>
//                 <button
//                     onClick={() => onDelete(task._id)}
//                     className="btn-delete"
//                 >
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TaskItem;
import React from 'react';
import { taskAPI } from '../../services/api';

const TaskItem = ({ task, onEdit, onDelete, onUpdate }) => {
    const handleStatusChange = async (newStatus) => {
        try {
            await taskAPI.update(task._id, { status: newStatus });
            onUpdate();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High': return 'priority-high';
            case 'Medium': return 'priority-medium';
            case 'Low': return 'priority-low';
            default: return 'priority-medium';
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Pending': return 'status-pending';
            case 'In Progress': return 'status-in-progress';
            case 'Completed': return 'status-completed';
            default: return 'status-pending';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return '⏳';
            case 'In Progress': return '🚀';
            case 'Completed': return '✅';
            default: return '📝';
        }
    };

    const isOverdue = () => {
        return new Date(task.dueDate) < new Date() && task.status !== 'Completed';
    };

    return (
        <div className="task-item">
            {isOverdue() && (
                <div className="overdue-badge">Overdue</div>
            )}

            <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
            </div>

            <p className="task-description">{task.description}</p>

            <div className="task-meta">
                <span className={`task-due-date ${isOverdue() ? 'overdue' : ''}`}>
                    {new Date(task.dueDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </span>
                <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                </span>
            </div>

            <div className="task-status-section">
                <span className={`task-status ${getStatusClass(task.status)}`}>
                    {getStatusIcon(task.status)} {task.status}
                </span>
            </div>

            <div className="status-actions">
                <label>Update Status:</label>
                <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                >
                    <option value="Pending">⏳ Pending</option>
                    <option value="In Progress">🚀 In Progress</option>
                    <option value="Completed">✅ Completed</option>
                </select>
            </div>

            <div className="task-actions">
                <button
                    onClick={() => onEdit(task)}
                    className="btn-edit"
                >
                    ✏️ Edit
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="btn-delete"
                >
                    🗑️ Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;