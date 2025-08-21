import type React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ArrowLeft, User, Mail, Phone, Camera } from "lucide-react";
import { SuccessDialog } from "../components/modal/SuccessDailog";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^[0-9]{11}$/, "Please enter a valid 11-digit phone number"),
});

interface PersonalInfoForm {
  name: string;
  email: string;
  phone: string;
}

export function PersonalInformationPage() {
  const [profileImage, setProfileImage] = useState(
    "/placeholder.svg?height=120&width=120"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const defaultValues = useMemo(
    () => ({
      name: "Steve Moss",
      email: "richardomathew@gmail.com",
      phone: "01764637854",
    }),
    []
  );

  const form = useForm<PersonalInfoForm>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PersonalInfoForm) => {
    console.log("Personal Information Form Submitted:", data);
    try {
      setIsLoading(true);
      console.log("Submitting data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      form.reset(data);

      setShowSuccess(true);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/settings");
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    handleBack();
  };

  return (
    <div className="bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Personal Information
          </h1>
          <p className="text-sm text-gray-600">
            Manage your profile information
          </p>
        </div>
      </div>

      <div className="w-full px-20">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Avatar className="w-44 h-44">
                <AvatarImage
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="icon"
                className="absolute bottom-2 right-4 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-4 h-4 text-white" />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-10"
            >
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Name"
                            className="pl-12 h-12 rounded-lg border-2 border-gray-200"
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field - Read Only */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            {...field}
                            placeholder="Email"
                            className="pl-12 h-12 rounded-lg border-2 border-gray-200 bg-gray-50 cursor-not-allowed"
                            readOnly
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="Phone"
                            className="pl-12 h-12 rounded-lg border-2 border-gray-200"
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full text-center">
                <Button
                  type="submit"
                  className="h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-medium px-8"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <SuccessDialog
        open={showSuccess}
        onOpenChange={handleSuccessClose}
        message="Personal information updated successfully!"
      />
    </div>
  );
}
