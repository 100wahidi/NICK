import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, MapPin, GraduationCap, Building2, Calendar, Upload, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { authAPI, extractionAPI } from "../API_Settings/api";
import AuthCard from "../components/ui/AuthCard";

function SignIn() {
  const [form, setForm] = useState({
    name: "",
    email_address: "",
    number: "",
    password: "",
    diploma: "",
    school: "",
    dates: "",
    address: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith(".pdf")) {
        setErrorMsg("Please upload a valid PDF document for your resume.");
        return;
      }
      setSelectedFile(file);
      setErrorMsg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const serializedEducation = [
        form.diploma.trim(),
        form.school.trim() ? `at ${form.school.trim()}` : "",
        form.dates.trim() ? `(${form.dates.trim()})` : "",
      ].filter(Boolean).join(" ");

      const payload = {
        name: form.name.trim(),
        password: form.password,
        Education: serializedEducation,
        number: parseInt(form.number, 10),
        address: form.address.trim(),
        email_address: form.email_address.trim(),
      };

      await authAPI.signIn(payload);

      if (selectedFile) {
        setSuccessMsg("Account created! Indexing your resume via vector retrieval...");
        try {
          const loginData = await authAPI.login({
            username: form.email_address.trim(),
            password: form.password,
          });

          if (loginData?.access_token) {
            localStorage.setItem("access_token", loginData.access_token);
            await extractionAPI.processCv(selectedFile, true);
          }
        } catch (uploadErr) {
          console.error("CV Extraction warning:", uploadErr);
        }
      }

      setSuccessMsg("Account successfully created! Redirecting...");
      setTimeout(() => navigate("/login"), 1200);

    } catch (error) {
      console.error("Registration Error:", error);
      setErrorMsg(error.message || "Failed to create account. Please verify your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create an account"
      subtitle="Set up your profile and ingest your career milestones for automated RAG tailoring."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </span>
              <input
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-slate-100 placeholder-slate-600 text-xs focus:outline-none focus:border-[#3DBB78] transition-all"
                type="text"
                name="name"
                placeholder="Mouad WAHIDI"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-slate-100 placeholder-slate-600 text-xs focus:outline-none focus:border-[#3DBB78] transition-all"
                type="email"
                name="email_address"
                placeholder="name@domain.com"
                value={form.email_address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Phone Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Phone className="w-4 h-4" />
              </span>
              <input
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-slate-100 placeholder-slate-600 text-xs focus:outline-none focus:border-[#3DBB78] transition-all"
                type="number"
                name="number"
                placeholder="+212600000000"
                value={form.number}
                onChange={handleChange}
                required
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
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-slate-100 placeholder-slate-600 text-xs focus:outline-none focus:border-[#3DBB78] transition-all"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        {/* Education Section Title */}
        <div className="pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-mono text-[#3DBB78] uppercase tracking-wider">Academic Background (.Education string)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Diploma</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <GraduationCap className="w-4 h-4" />
              </span>
              <input
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-slate-100 placeholder-slate-600 text-xs focus:outline-none focus:border-[#3DBB78] transition-all"
                type="text"
                name="diploma"
                placeholder="Engineering Degree"
                value={form.diploma}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">School</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Building2 className="w-4 h-4" />
              </span>
              <input
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-slate-100 placeholder-slate-600 text-xs focus:outline-none focus:border-[#3DBB78] transition-all"
                type="text"
                name="school"
                placeholder="École Mohammadia"
                value={form.school}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Dates</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Calendar className="w-4 h-4" />
              </span>
              <input
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-slate-100 placeholder-slate-600 text-xs focus:outline-none focus:border-[#3DBB78] transition-all"
                type="text"
                name="dates"
                placeholder="2022 - 2026"
                value={form.dates}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Address / Location</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <MapPin className="w-4 h-4" />
            </span>
            <input
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-slate-100 placeholder-slate-600 text-xs focus:outline-none focus:border-[#3DBB78] transition-all"
              type="text"
              name="address"
              placeholder="Casablanca, Morocco"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>



        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#3DBB78] text-[#06140D] text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:bg-[#35A86B] transition-all group disabled:opacity-50 cursor-pointer"
        >
          <span>{loading ? "Processing Profile..." : "Create Account"}</span>
          {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
        </button>
      </form>
    </AuthCard>
  );
}

export default SignIn;