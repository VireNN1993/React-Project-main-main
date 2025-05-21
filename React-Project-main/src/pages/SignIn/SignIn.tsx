// src/pages/SignIn/SignIn.tsx
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { signinSchema } from "../../utils/validationSchemas";
import { SignInFormData } from "../../types/User";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { TextInput, Button } from "flowbite-react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../services/userService";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: joiResolver(signinSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsLoading(true);
      setServerError("");

      const response = await axios.post(`${BASE_URL}/users/login`, data);
      const token = response.data;

      localStorage.setItem("token", token);

      const decoded = jwtDecode<{ _id: string }>(token);
      axios.defaults.headers.common["x-auth-token"] = token;

      const { data: userData } = await axios.get(
        `${BASE_URL}/users/${decoded._id}`,
      );

      dispatch(setUser(userData));

      toast.success("התחברת בהצלחה!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      if (axios.isAxiosError(error) && error.response) {
        setServerError(error.response.data || "שם משתמש או סיסמה לא נכונים");
      } else {
        setServerError("שגיאה בהתחברות, נסה שוב מאוחר יותר");
      }
      toast.error("ההתחברות נכשלה");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded bg-white p-6 shadow">
      <h2 className="mb-4 text-center text-2xl font-semibold">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextInput {...register("email")} placeholder="Email" />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <TextInput
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        {serverError && <p className="text-sm text-red-600">{serverError}</p>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "מתחבר..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
