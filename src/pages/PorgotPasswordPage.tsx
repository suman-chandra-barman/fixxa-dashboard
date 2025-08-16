import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface IFormInput {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showOTPSection, setShowOTPSection] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
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

      setUserEmail(data.email);
      setShowOTPSection(true);

      // You can replace this with your actual notification system
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

  const handleOTPVerification = () => {
    // Simulate OTP verification (You can replace this with actual OTP validation)
    toast.success("OTP Verified Successfully", {
      description: "You can now reset your password.",
    });

    // Navigate to the ResetPasswordPage and pass email via state
    navigate("/reset-password", { state: { email: userEmail } });
  };

  if (showOTPSection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleBack}
                className="h-auto hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                Verify OTP
              </h2>
            </div>

            <p className="text-gray-600 mb-6">
              We've sent a verification code to{" "}
              <span className="font-medium">{userEmail}</span>
            </p>

            <div className="space-y-6">
              <div className="flex gap-3 justify-center">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-lg font-medium"
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.value && target.nextElementSibling) {
                        (target.nextElementSibling as HTMLInputElement).focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (
                        e.key === "Backspace" &&
                        !target.value &&
                        target.previousElementSibling
                      ) {
                        (
                          target.previousElementSibling as HTMLInputElement
                        ).focus();
                      }
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleOTPVerification}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-full transition-colors duration-200"
              >
                Verify OTP
              </button>

              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Didn't receive the code?{" "}
                  <button className="text-gray-600 hover:text-gray-700 font-medium">
                    Resend OTP
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <div className="relative">
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
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
