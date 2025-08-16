import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Mail, Lock, X, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();
  const [focusedField, setFocusedField] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true); // Show loading state when form is submitted

    try {
      // Simulate a login request (replace this with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay to simulate request

      // After successful login
      setLoading(false);
      toast.success("Login successful!");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const clearEmail = () => {
    setEmailValue("");
    setValue("email", "");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <img
                src={logo}
                alt="PIXXA Logo"
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-xl font-medium text-gray-900">Welcome back!</h1>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <input
                  id="email"
                  type="email"
                  value={emailValue}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  onChange={(e) => {
                    setEmailValue(e.target.value);
                    setValue("email", e.target.value);
                  }}
                  className={`w-full pl-12 pr-10 py-4 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    focusedField === "email" || emailValue
                      ? "border-blue-500 focus:ring-blue-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                />
                {emailValue && (
                  <button
                    type="button"
                    onClick={clearEmail}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <label
                htmlFor="email"
                className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                  focusedField === "email" || emailValue
                    ? "top-2 text-xs text-blue-600 font-medium"
                    : "top-1/2 transform -translate-y-1/2 text-gray-500"
                }`}
              >
                Email
              </label>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full pl-12 pr-12 py-4 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    focusedField === "password" || passwordValue
                      ? "border-blue-500 focus:ring-blue-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <label
                htmlFor="password"
                className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                  focusedField === "password" || passwordValue
                    ? "top-2 text-xs text-blue-600 font-medium"
                    : "top-1/2 transform -translate-y-1/2 text-gray-500"
                }`}
              >
                Password
              </label>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-full rounded-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-4 transition-colors duration-200"
            >
              {loading ? "Signing in..." : "Continue"}
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-center space-x-6 text-sm">
              <Link to="/settings/terms-conditions" className="text-blue-600 hover:text-blue-700 transition-colors">
                Terms of Use
              </Link>
              <Link to="/settings/privacy-policy" className="text-blue-600 hover:text-blue-700 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
