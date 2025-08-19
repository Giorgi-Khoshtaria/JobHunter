import User from "../Modules/auth.modules.js";

export const getUserProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userProfile = await User.findById(userId).select("-password"); // Exclude password from the response
    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
