import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LogIn,
  Mail,
  Lock,
  ArrowRight,
  Loader,
  ShieldCheck,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [sendingCode, setSendingCode] = useState(false);

  const { login, loading } = useUserStore();

  // Simulate sending verification code
  const handleSendCode = async () => {
    if (!email) {
      toast.error("Please enter an email!");
      return;
    }
    setSendingCode(true);
    try {
      // giả lap tao ma
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      setSentCode(true);
      console.log(`Verification code (simulated): ${code}`); // Log code for debugging
      toast.success("Verification code sent to your email!");
    } catch (error) {
      toast.error("Failed to send verification code!");
    } finally {
      setSendingCode(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sentCode && verificationCode !== generatedCode) {
      toast.error("Invalid verification code!");
      return;
    }
    console.log(email, password, verificationCode);
    login(email, password);
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-600">
          Log in to Your Account
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 pl-10 bg-gray-50 border border-gray-200 
                    rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-emerald-500 
                    focus:border-emerald-500 sm:text-sm"
                  placeholder="user@example.com"
                />
              </div>
              <button
                type="button"
                onClick={handleSendCode}
                disabled={sendingCode || sentCode}
                className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent 
                  rounded-md shadow-sm text-sm font-medium text-white bg-blue-600
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50"
              >
                {sendingCode ? (
                  <>
                    <Loader
                      className="mr-2 h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                    {sentCode ? "Code Sent" : "Send Verification Code"}
                  </>
                )}
              </button>
            </div>

            {sentCode && (
              <div>
                <label
                  htmlFor="verificationCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Verification Code
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="verificationCode"
                    type="text"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="block w-full px-3 py-2 pl-10 bg-gray-50 border border-gray-200 
                      rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-emerald-500 
                      focus:border-emerald-500 sm:text-sm"
                    placeholder="Enter verification code"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 pl-10 bg-gray-50 border border-gray-200 
                    rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-emerald-500 
                    focus:border-emerald-500 sm:text-sm"
                  placeholder="password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-6 border border-transparent 
                rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
                hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading || (sentCode && !verificationCode)}
            >
              {loading ? (
                <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                  Login
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Sign up now <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
