import axios from "axios";
import type { UserProfileData } from "../../Types/userTypes";
import { toast } from "react-toastify";

const FRONT_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Fetch user profile
export const fetchUserData = async (
  userId: string,
  callback: (data: UserProfileData) => void
) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${FRONT_URL}/user/profile/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    callback(res.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    callback({} as UserProfileData); // return empty object if error
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, formData: FormData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${FRONT_URL}/user/profile/edit/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Profile updated successfully!");
    return res.data;
  } catch (error: unknown) {
    let message = "Something went wrong. Please try again.";

    if (axios.isAxiosError(error) && error.response) {
      message = error.response.data?.message || message;
    }

    toast.error(message);
    throw error;
  }
};

export const getCompanyImageName = async (
  userId: string,
  callback?: (filename: string | null) => void
) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${FRONT_URL}/user/companyImage/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Call the callback only if it was provided
    if (callback) {
      callback(res.data.companyImage || null);
    }

    return res.data.companyImage || null;
  } catch (error) {
    let message = "Something went wrong. Please try again.";
    if (axios.isAxiosError(error) && error.response) {
      message = error.response.data?.message || message;
    }
    toast.error(message);

    // Call the callback only if it was provided
    if (callback) {
      callback(null);
    }

    return null;
  }
};

export const getVacancyById = async (vacancyId: string) => {
  try {
    const response = await axios.get(
      `${FRONT_URL}/vacancies/vacancyById/${vacancyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching vacancy by ID:", error);
    toast.error("Failed to fetch vacancy details.");
    return null;
  }
};
