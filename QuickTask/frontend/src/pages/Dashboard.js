import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

const COLUMNS = [
  { key: 'todo',       label: 'To-Do',       dot: '#6b7280' },
  { key: 'inProgress', label: 'In Progress',  dot: '#f59e0b' },
  { key: 'done',       label: 'Done',         dot: '#10b981' },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data.tasks);
    } catch {
      // 401 handled by interceptor
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleLogout = () => { logout(); navigate('/login'); };

  const openCreate = () => { setEditTask(null); setModalOpen(true); };
  const openEdit   = (task) => { setEditTask(task); setModalOpen(true); };

  const handleSave = async (formData) => {
    if (editTask) {
      const { data } = await api.put(`/tasks/${editTask._id}`, formData);
      setTasks((prev) => prev.map((t) => (t._id === editTask._id ? data.task : t)));
    } else {
      const { data } = await api.post('/tasks', formData);
      setTasks((prev) => [data.task, ...prev]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const tasksByStatus = (status) => tasks.filter((t) => t.status === status);

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          <div style={styles.logoIcon}>✓</div>
          <span style={styles.logoText}>QuickTask</span>
        </div>
        <div style={styles.navRight}>
          <span style={styles.userName}>👋 Hello, {user?.name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Board Header */}
      <div style={styles.boardHeader}>
        <h1 style={styles.boardTitle}>My Task Board</h1>
        <p style={styles.boardSub}>Track and manage all your personal tasks</p>
      </div>

      {/* Kanban Columns */}
      {loading ? (
        <div style={styles.loading}>Loading tasks...</div>
      ) : (
        <div style={styles.board}>
          {COLUMNS.map((col) => (
            <div key={col.key} style={styles.column}>
              <div style={styles.colHeader}>
                <span style={styles.colTitle}>
                  <span style={{ ...styles.colDot, background: col.dot }} />
                  {col.label}
                </span>
                <span style={styles.colCount}>{tasksByStatus(col.key).length}</span>
              </div>

              {tasksByStatus(col.key).length === 0 ? (
                <div style={styles.emptyCol}>No tasks here</div>
              ) : (
                tasksByStatus(col.key).map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      <button style={styles.fab} onClick={openCreate} title="Create new task">+</button>

      {/* Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editTask={editTask}
      />
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Segoe UI', Arial, sans-serif" },
  nav: {
    background: '#fff', borderBottom: '1px solid #e2e8f0',
    padding: '0 32px', height: 62,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    position: 'sticky', top: 0, zIndex: 100,
  },
  navLogo: { display: 'flex', alignItems: 'center', gap: 10 },
  logoIcon: {
    width: 34, height: 34, background: '#2563eb', borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 700, fontSize: 18,
  },
  logoText: { fontSize: 20, fontWeight: 700, color: '#1e3a8a' },
  navRight: { display: 'flex', alignItems: 'center', gap: 14 },
  userName: { fontSize: 14, fontWeight: 500, color: '#374151' },
  logoutBtn: {
    background: '#f1f5f9', color: '#374151', border: '1px solid #d1d5db',
    borderRadius: 7, padding: '6px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
  },
  boardHeader: { padding: '28px 32px 16px' },
  boardTitle: { fontSize: 22, fontWeight: 700, color: '#1e293b' },
  boardSub: { color: '#64748b', fontSize: 14, marginTop: 4 },
  loading: { textAlign: 'center', padding: 60, color: '#64748b', fontSize: 16 },
  board: {
    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
    gap: 20, padding: '0 32px 80px',
  },
  column: { background: '#f8fafc', borderRadius: 12, padding: 16, minHeight: 300 },
  colHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  colTitle: { fontSize: 14, fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: 8 },
  colDot: { width: 10, height: 10, borderRadius: '50%', display: 'inline-block' },
  colCount: {
    fontSize: 12, background: '#e2e8f0', color: '#374151',
    borderRadius: 20, padding: '2px 9px', fontWeight: 600,
  },
  emptyCol: { fontSize: 13, color: '#94a3b8', textAlign: 'center', marginTop: 32 },
  fab: {
    position: 'fixed', bottom: 32, right: 32,
    width: 52, height: 52, background: '#2563eb', color: '#fff',
    border: 'none', borderRadius: '50%', fontSize: 28, fontWeight: 300,
    cursor: 'pointer', boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    lineHeight: 1,
  },
};

export default Dashboard;
