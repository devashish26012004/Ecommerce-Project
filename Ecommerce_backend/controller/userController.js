import User from "../model/userModel.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    // if (users.length === 0) {
    //   return res.status(404).send("No users found");
    // }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const destroyUser = async (req, res) => {
  try {
    const { id } = req.params;
    let deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send("Not Found");
    }

    res.status(200).send("User deleted");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export { getAllUsers, getUserDetails, updateUser, destroyUser };
