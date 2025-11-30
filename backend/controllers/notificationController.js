const Task = require('../models/Task');

const checkTaskDeadlines = async () => {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const upcomingTasks = await Task.find({
            dueDate: {
                $lte: tomorrow,
                $gte: new Date()
            },
            status: { $ne: 'Completed' }
        }).populate('userId');

        // Here you can implement email notifications
        // For now, we'll just log them
        upcomingTasks.forEach(task => {
            console.log(`Reminder: Task "${task.title}" is due on ${task.dueDate}`);
        });
    } catch (error) {
        console.error('Error checking task deadlines:', error);
    }
};

module.exports = { checkTaskDeadlines };