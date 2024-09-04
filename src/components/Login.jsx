import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
  const navigate=useNavigate()

  // Formik hook for managing form state and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    }),
    onSubmit: () => {
      alert('Login Successful!');
      localStorage.setItem("auth","token")
      navigate("/graphs")
    },
  });
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.email && formik.errors.email ? 'error' : ''}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="error-message">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.password && formik.errors.password ? 'error' : ''}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="error-message">{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="forgot-password">
        <a href="/forgot-password">Forgot Password?</a>
      </div>
      <br/>
        <button type="submit" className="login-button">Login</button>
      </form>
      
    </div>
  );
};

export default Login;
