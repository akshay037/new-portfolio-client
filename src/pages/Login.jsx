import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../redux/adminApi";
import { setAdmin } from "../redux/adminSlice";

const Login = () => {
  const [adminData, setAdminData] = useState({
    email: "admin@gmail.com",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const admin = useSelector((state) => state.admin.admin);
  const [
    login,
    {
      data: dataLogin,
      isLoading: isLoadingLogin,
      isSuccess: isSuccessLogin,
      isFetching: isFetchLogin,
    },
  ] = useLoginMutation();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isSuccessLogin && dataLogin) {
      dispatch(setAdmin(dataLogin));
      navigate("/dashboard");
    }
  }, [isSuccessLogin, dataLogin, dispatch, navigate]);

  useEffect(() => {
    document.title = "Portfolio - Login";
    return () => {
      document.title;
    };
  }, []);

  /** Already logged in (e.g. from localStorage) → skip login */
  useEffect(() => {
    if (!admin) return;
    let to = location.state?.from || "/dashboard";
    if (typeof to !== "string" || !to.startsWith("/") || to.startsWith("//")) {
      to = "/dashboard";
    }
    navigate(to, { replace: true });
  }, [admin, navigate, location.state]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(adminData);
  };

  const inputStyle = {
    borderColor: "color-mix(in srgb, var(--color-accent) 40%, transparent)",
    color: "var(--color-text)",
    backgroundColor: "var(--color-surface)",
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6">
      <h1
        className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8"
        style={{ color: "var(--color-text)" }}
      >
        Login
      </h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:gap-5">
        <div>
          <label
            htmlFor="login-email"
            className="block text-sm font-medium mb-1 sm:mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={adminData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="block text-sm font-medium mb-1 sm:mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            value={adminData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2"
            style={inputStyle}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoadingLogin || isFetchLogin}
          className="w-full py-3 px-4 rounded-lg font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-on-accent)",
          }}
        >
          {isLoadingLogin || isFetchLogin ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
