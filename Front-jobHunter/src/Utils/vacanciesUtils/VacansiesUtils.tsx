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

export const myVacancies = async (companyId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${FRONT_URL}/vacancies/myVacancies/${companyId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to fetch vacancies";
      toast.error(`${errorMessage} ❌`);
    } else {
      toast.error("An unexpected error occurred ❌");
    }
    console.error("Fetching error:", err);
  }
};
export const updateVacancy = async (
  id: string,
  updatedData: {
    title: string;
    description: string;
    location: string;
    employmentType: string;
    jobCategory: string;
    salary: number;
    requirements: string;
    applicationDeadline: string;
  }
) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to update a vacancy ❌");
      return;
    }
    const response = await axios.put(
      `${FRONT_URL}/vacancies/updateVacancy/${id}`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to fetch vacancies";
      toast.error(`${errorMessage} ❌`);
    } else {
      toast.error("An unexpected error occurred ❌");
    }
    console.error("Fetching error:", err);
  }
};

export const deleteVacancy = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to delete a vacancy ❌");
      return;
    }

    const response = await axios.delete(
      `${FRONT_URL}/vacancies/deleteVacancy/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Vacancy deleted successfully ✅");
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to fetch vacancies";
      toast.error(`${errorMessage} ❌`);
    } else {
      toast.error("An unexpected error occurred ❌");
    }
    console.error("Fetching error:", err);
  }
};
