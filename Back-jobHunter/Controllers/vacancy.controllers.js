import Vacancy from "../Modules/vacancy.modules.js";

export const postVacancy = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      employmentType,
      jobCategory,
      salary,
      requirements,
      applicationDeadline,
      companyId,
      companyName,
      companyLogo,
    } = req.body;

    const deadline =
      applicationDeadline && applicationDeadline.trim() !== ""
        ? new Date(applicationDeadline)
        : undefined;

    // Validate the date if provided
    if (deadline && isNaN(deadline.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid application deadline date" });
    }

    const newVacancy = new Vacancy({
      title,
      description,
      companyId,
      location,
      employmentType,
      jobCategory,
      salary,
      requirements,
      applicationDeadline: deadline,
      companyName,
      companyLogo,
    });

    await newVacancy.save();
    res
      .status(201)
      .json({ message: "Vacancy created successfully", newVacancy });
  } catch (error) {
    console.error("Error creating vacancy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    if (!vacancies || vacancies.length === 0) {
      return res.status(404).json({ message: "No vacancies found" });
    }
    res.status(200).json(vacancies);
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getVacancyById = async (req, res) => {
  try {
    const { id } = req.params;
    const vacancy = await Vacancy.findById(id);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }
    res.status(200).json(vacancy);
  } catch (error) {
    console.error("Error fetching vacancy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
