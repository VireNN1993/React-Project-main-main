// src/hooks/useSignUp.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { signupSchema } from "../utils/validationSchemas";
import { SignupFormData } from "../types/User";
import { signup } from "../services/userService";
import { toast } from "react-toastify";
import axios from "axios";

export const useSignUp = (onSuccess: () => void) => {
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: joiResolver(signupSchema),
  });

  const onSubmit = async (formData: SignupFormData) => {
    try {
      setIsSubmitting(true);
      setServerError("");

      await signup(formData);
      toast.success("Registration successful! Please sign in.");
      onSuccess(); // Call the success callback (usually navigation)
    } catch (error: unknown) {
      let errorMessage = "Registration failed. Please try again.";

      if (axios.isAxiosError(error) && error.response) {
        console.error("Signup failed:", error.response.data);
        // Check for specific errors
        if (error.response.status === 400) {
          // If server returns an error object with a message
          if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          }

          // Specific check for already registered user
          if (
            typeof error.response.data === "string" &&
            error.response.data.includes("User already registered")
          ) {
            errorMessage =
              "This email is already registered. Please use a different email or try to sign in.";
          } else if (
            error.response.data?.message?.includes("User already registered")
          ) {
            errorMessage =
              "This email is already registered. Please use a different email or try to sign in.";
          }
        }
      } else if (error instanceof Error) {
        console.error("Signup failed:", error.message);
      } else {
        console.error("Signup failed:", error);
      }

      setServerError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    serverError,
    isSubmitting,
    onSubmit,
  };
};
