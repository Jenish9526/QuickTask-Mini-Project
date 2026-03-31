const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Task = require('./models/Task');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅  Connected to MongoDB');

  // Delete existing demo user and re-create to ensure clean password hash
  await User.deleteOne({ email: 'demo@quicktask.com' });
  const user = await User.create({ name: 'Demo User', email: 'demo@quicktask.com', password: 'demo1234' });
  console.log('👤  Demo user created:', user.email);

  const uid = user._id;

  const tasks = [
    // ── To Do ──────────────────────────────────────────────
    { title: 'Set up project repository', description: 'Initialize Git repo and push initial commit.', priority: 'high',   status: 'todo',       dueDate: '2025-08-01', user: uid },
    { title: 'Write API documentation',   description: 'Document all REST endpoints using Swagger.',  priority: 'medium', status: 'todo',       dueDate: '2025-08-05', user: uid },
    { title: 'Design database schema',    description: 'Plan collections and relationships in MongoDB.', priority: 'high', status: 'todo',      dueDate: '2025-07-30', user: uid },
    { title: 'Add unit tests for auth',   description: 'Cover login and register routes with Jest.',  priority: 'low',    status: 'todo',       dueDate: '2025-08-10', user: uid },

    // ── In Progress ─────────────────────────────────────────
    { title: 'Build task dashboard UI',   description: 'Create Kanban board with drag-and-drop support.', priority: 'high',   status: 'inProgress', dueDate: '2025-07-28', user: uid },
    { title: 'Integrate JWT auth',        description: 'Implement login flow and protect private routes.', priority: 'high',   status: 'inProgress', dueDate: '2025-07-27', user: uid },
    { title: 'Style with Tailwind CSS',   description: 'Apply responsive styles across all pages.',        priority: 'medium', status: 'inProgress', dueDate: '2025-07-29', user: uid },

    // ── Done ────────────────────────────────────────────────
    { title: 'Initialize React app',      description: 'Bootstrapped frontend with Create React App.',    priority: 'medium', status: 'done',       dueDate: '2025-07-20', user: uid },
    { title: 'Set up Express server',     description: 'Created server.js with basic middleware.',        priority: 'high',   status: 'done',       dueDate: '2025-07-18', user: uid },
    { title: 'Connect MongoDB Atlas',     description: 'Configured Mongoose connection with .env URI.',   priority: 'high',   status: 'done',       dueDate: '2025-07-19', user: uid },
    { title: 'Create User model',         description: 'Defined schema with bcrypt password hashing.',    priority: 'medium', status: 'done',       dueDate: '2025-07-21', user: uid },
  ];

  await Task.insertMany(tasks);
  console.log(`🌱  Inserted ${tasks.length} fake tasks (4 todo, 3 inProgress, 4 done)`);

  await mongoose.disconnect();
  console.log('🔌  Disconnected. Done!');
}

seed().catch((err) => { console.error(err); process.exit(1); });
