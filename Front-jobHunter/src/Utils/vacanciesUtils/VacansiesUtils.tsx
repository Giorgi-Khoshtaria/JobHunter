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

export const applyForVacancy = async (
  id: string | undefined,
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    coverLetter: string;
    cv: File | null;
    vacancyTitle?: string;
  }
) => {
  if (!id) return;

  try {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("coverLetter", data.coverLetter);
    if (data.vacancyTitle !== undefined) {
      formData.append("vacancyTitle", data.vacancyTitle);
    }
    if (data.cv) formData.append("cv", data.cv);

    const response = await axios.post(
      `${FRONT_URL}/vacancies/applyforVacancy/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Application submitted successfully ✅");
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to submit application";
      toast.error(`${errorMessage} ❌`);
    } else {
      toast.error("An unexpected error occurred ❌");
    }
    console.error("Submission error:", err);
  }
};
