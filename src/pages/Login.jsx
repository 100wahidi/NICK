import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { authAPI } from "../API_Settings/api";
import AuthCard from "../components/ui/AuthCard";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await authAPI.login({
        username: form.username,
        password: form.password,
      });

      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);
      }

      setSuccessMsg("Authentication successful! Redirecting...");
      setTimeout(() => navigate("/generate"), 1000);

    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg(error.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Sign in to workspace"
      subtitle="Enter your credentials to access your vector store and CV generator studio."
      footerText="Don't have an account?"
      footerLinkText="Create account"
      footerLinkTo="/signin"
    >
      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-1">
          <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Username</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            </span>
            <input
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 pl-10 text-slate-100 placeholder-slate-600 text-xs focus:outline-none focus:border-indigo-500 transition-all"
              type="text"
              name="username"
              placeholder="username"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Lock className="w-4 h-4" />
            </span>
            <input
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 pl-10 text-slate-100 placeholder-slate-600 text-xs focus:outline-none focus:border-indigo-500 transition-all"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#3DBB78] text-[#06140D] text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:bg-[#35A86B] transition-all group disabled:opacity-50 cursor-pointer"
        >
          <span>{loading ? "Authenticating..." : "Sign In"}</span>
          {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
        </button>
      </form>
    </AuthCard>
  );
}

export default Login;