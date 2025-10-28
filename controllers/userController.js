import jwt from 'jsonwebtoken';

// ADMIN LOGIN
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, msg: 'Email and password are required' });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase() || password !== adminPassword) {
      return res.status(401).json({ success: false, msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ role: 'admin', email: adminEmail }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '1d' });

    return res.json({ success: true, token });
  } catch (err) {
    console.error('Admin login error:', err);
    return res.status(500).json({ success: false, msg: 'Server error', error: err.message });
  }
};

export default { adminLogin };
