const PRIORITY_STYLES = {
  high:   { background: '#fee2e2', color: '#dc2626' },
  medium: { background: '#ffedd5', color: '#d97706' },
  low:    { background: '#dbeafe', color: '#2563eb' },
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>{task.title}</div>

      {task.description && (
        <div style={styles.desc}>{task.description}</div>
      )}

      <div style={styles.meta}>
        <span style={{ ...styles.badge, ...PRIORITY_STYLES[task.priority] }}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        {task.dueDate && (
          <span style={styles.dueDate}>📅 {formatDate(task.dueDate)}</span>
        )}
      </div>

      <div style={styles.actions}>
        <button style={styles.editBtn} onClick={() => onEdit(task)} title="Edit task">
          ✏️ Edit
        </button>
        <button style={styles.deleteBtn} onClick={() => onDelete(task._id)} title="Delete task">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#fff', borderRadius: 10, padding: '14px 15px',
    marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
  },
  title: { fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 6 },
  desc: { fontSize: 12, color: '#64748b', marginBottom: 8, lineHeight: 1.5 },
  meta: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  badge: { fontSize: 11, fontWeight: 600, borderRadius: 5, padding: '2px 9px' },
  dueDate: { fontSize: 11, color: '#94a3b8' },
  actions: { display: 'flex', gap: 6, justifyContent: 'flex-end' },
  editBtn: {
    background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe',
    borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 500, cursor: 'pointer',
  },
  deleteBtn: {
    background: '#fff5f5', color: '#dc2626', border: '1px solid #fecaca',
    borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 500, cursor: 'pointer',
  },
};

export default TaskCard;
