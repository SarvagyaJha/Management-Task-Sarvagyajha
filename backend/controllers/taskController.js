const Task = require('../models/Task');

const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, status, priority } = req.body;

        // Validation
        if (!title || !description || !dueDate) {
            return res.status(400).json({ message: 'Title, description, and due date are required' });
        }

        const task = new Task({
            userId: req.user.id,
            title,
            description,
            dueDate: new Date(dueDate),
            status: status || 'Pending',
            priority: priority || 'Medium'
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getTasks = async (req, res) => {
    try {
        const { status, priority, dueDate } = req.query;
        let filter = { userId: req.user.id };

        // Add filters
        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };

        const tasks = await Task.find(filter).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, status, priority } = req.body;

        const task = await Task.findOne({ _id: id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update fields
        if (title) task.title = title;
        if (description) task.description = description;
        if (dueDate) task.dueDate = new Date(dueDate);
        if (status) task.status = status;
        if (priority) task.priority = priority;

        await task.save();
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};