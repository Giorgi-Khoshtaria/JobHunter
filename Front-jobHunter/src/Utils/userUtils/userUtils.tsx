import axios from "axios";
import type { UserProfileData } from "../../Types/userTypes";

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
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error updating profile:", error.response || error.message);
    } else if (error instanceof Error) {
      console.error("Error updating profile:", error.message);
    } else {
      console.error("Error updating profile:", error);
    }
    throw error;
  }
};
