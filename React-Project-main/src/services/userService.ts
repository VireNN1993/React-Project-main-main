// src/services/userService.ts
import axios from "axios";
import { SignupFormData, SignInFormData } from "../types/User";

export const BASE_URL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";

export const signup = async (formData: SignupFormData) => {
  const payload = {
    name: {
      first: formData.first,
      middle: formData.middle || "",
      last: formData.last,
    },
    phone: formData.phone,
    email: formData.email,
    password: formData.password,
    image: {
      url:
        formData.imageUrl?.trim() ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      alt: formData.imageAlt || "User image",
    },
    address: {
      state: formData.state || "",
      country: formData.country,
      city: formData.city,
      street: formData.street,
      houseNumber: formData.houseNumber,
      zip: formData.zip ?? 0,
    },
    isBusiness: formData.biz ?? false,
  };

  const { data } = await axios.post(`${BASE_URL}/users`, payload);
  return data;
};

export const login = async (credentials: SignInFormData) => {
  const { data } = await axios.post(`${BASE_URL}/users/login`, credentials);
  return data;
};

export const getUser = async (userId: string) => {
  const { data } = await axios.get(`${BASE_URL}/users/${userId}`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return data;
};

// פונקציה חדשה לעדכון פרטי משתמש
export const updateUserProfile = async (
  userId: string,
  userData: Partial<SignupFormData>,
) => {
  // הכנת האובייקט לשליחה לשרת
  interface UserProfilePayload {
    name: {
      first: string | undefined;
      middle: string;
      last: string | undefined;
    };
    phone?: string;
    email?: string;
    image: {
      url?: string;
      alt?: string;
    };
    address: {
      state: string;
      country?: string;
      city?: string;
      street?: string;
      houseNumber?: number;
      zip: number;
    };
    password?: string;
  }

  const payload: UserProfilePayload = {
    name: {
      first: userData.first,
      middle: userData.middle || "",
      last: userData.last,
    },
    phone: userData.phone,
    email: userData.email,
    image: {
      url: userData.imageUrl?.trim() || undefined,
      alt: userData.imageAlt || undefined,
    },
    address: {
      state: userData.state || "",
      country: userData.country,
      city: userData.city,
      street: userData.street,
      houseNumber: userData.houseNumber,
      zip: userData.zip ?? 0,
    },
  };

  // אם יש סיסמה חדשה, הוסף אותה לבקשה
  if (userData.password) {
    payload.password = userData.password;
  }

  const { data } = await axios.put(`${BASE_URL}/users/${userId}`, payload, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return data;
};

export const getAllUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return data;
};

export const deleteUser = async (userId: string) => {
  await axios.delete(`${BASE_URL}/users/${userId}`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};

export const changeBusinessStatus = async (userId: string) => {
  const { data } = await axios.patch(
    `${BASE_URL}/users/${userId}`,
    {},
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    },
  );
  return data;
};
