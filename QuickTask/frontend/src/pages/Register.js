import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email) e.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    setServerError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>✓</div>
          <span style={styles.logoText}>QuickTask</span>
        </div>
        <h2 style={styles.heading}>Create your account</h2>
        <p style={styles.subheading}>Start managing your tasks today</p>

        {serverError && <div style={styles.serverError}>{serverError}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input
              name="name" value={form.name} onChange={handleChange}
              placeholder="Jenish Dobariya"
              style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
            />
            {errors.name && <span style={styles.errMsg}>{errors.name}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="you@example.com"
              style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
            />
            {errors.email && <span style={styles.errMsg}>{errors.email}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              name="password" type="password" value={form.password} onChange={handleChange}
              placeholder="Create a password (min. 6 characters)"
              style={{ ...styles.input, ...(errors.password ? styles.inputError : {}) }}
            />
            {errors.password && <span style={styles.errMsg}>{errors.password}</span>}
          </div>

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p style={styles.switchLink}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  card: {
    background: '#fff', borderRadius: 16, padding: '44px 40px 36px',
    width: '100%', maxWidth: 420,
    boxShadow: '0 8px 32px rgba(59,130,246,0.15)',
  },
  logo: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28 },
  logoIcon: {
    width: 40, height: 40, background: '#2563eb', borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 700, fontSize: 20,
  },
  logoText: { fontSize: 26, fontWeight: 700, color: '#1e3a8a' },
  heading: { fontSize: 20, fontWeight: 600, color: '#1e293b', textAlign: 'center', marginBottom: 6 },
  subheading: { fontSize: 14, color: '#64748b', textAlign: 'center', marginBottom: 28 },
  serverError: {
    background: '#fee2e2', color: '#dc2626', padding: '10px 14px',
    borderRadius: 8, fontSize: 14, marginBottom: 16,
  },
  field: { marginBottom: 18 },
  label: { display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 },
  input: {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid #d1d5db', borderRadius: 8,
    fontSize: 15, color: '#1e293b', background: '#f9fafb',
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  },
  inputError: { borderColor: '#dc2626' },
  errMsg: { fontSize: 12, color: '#dc2626', marginTop: 4, display: 'block' },
  btn: {
    width: '100%', padding: 12, background: '#2563eb', color: '#fff',
    border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600,
    cursor: 'pointer', marginTop: 6,
  },
  switchLink: { textAlign: 'center', marginTop: 20, fontSize: 14, color: '#64748b' },
  link: { color: '#2563eb', fontWeight: 500 },
};

export default Register;
