import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showOTPSection, setShowOTPSection] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      setIsSubmitting(true);
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowOTPSection(true);

      // You can replace this with your actual notification system
      navigate("/verify-otp");
      console.log("OTP Sent to:", data.email);
    } catch (error) {
      console.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (showOTPSection) {
      setShowOTPSection(false);
    } else {
      navigate("/signin");
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || "Please enter a valid email address";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleBack}
              className=" h-auto hover:bg-gray-100 rounded-full p-2 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              Forgot Password
            </h2>
          </div>

          <p className="text-gray-600 mb-6">
            Please enter your email address to reset your password
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium text-sm">
                Enter Your Email
              </label>
              <div className="relative mt-3">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  {...register("email", {
                    required: "Email is required",
                    validate: validateEmail,
                  })}
                  className="w-full h-12 pl-10 pr-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-full transition-colors duration-200"
            >
              {isSubmitting ? "Sending..." : "Send OTP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
