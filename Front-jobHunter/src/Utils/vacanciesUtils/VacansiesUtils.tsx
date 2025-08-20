import axios from "axios";
import { toast } from "react-toastify";
const FRONT_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getAllVacancies = async (callback: (data: []) => void) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${FRONT_URL}/vacancies/allVacancies`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    callback(response.data);
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to post vacancy";
      toast.error(`${errorMessage} ❌`);
    } else {
      toast.error("An unexpected error occurred ❌");
    }
    console.error("Submission error:", err);
  }
};
