import { User } from "../model/userModel.js";

export default {
  getUsers: async (req, res) => {
    console.log(req.query);
    try {
      const skip = parseInt(req.query.skip);
      const limit = parseInt(req.query.limit);
      const count = await User.collection.count();
      if (!count) return res.status(404).json({ message: "No user found" });
      const obj = await User.aggregate([
        {
          $group: {
            _id: null,
            totalMale: {
              $sum: { $cond: [{ $eq: ["$gender", "Male"] }, 1, 0] },
            },
            totalFemale: {
              $sum: { $cond: [{ $eq: ["$gender", "Female"] }, 1, 0] },
            },
            totalActive: {
              $sum: { $cond: [{ $eq: ["$status", "Active"] }, 1, 0] },
            },
          },
        },
      ]);
      const dashBoardData = [
        { type: "Total Users", value: count },
        { type: "Total Males", value: obj[0].totalMale },
        { type: "Total Females", value: obj[0].totalFemale },
        { type: "Total Active", value: obj[0].totalActive },
      ];
      const user = await User.find().skip(skip).limit(limit);
      res.status(200).json({ user, count, dashBoardData });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deletUser: async (req, res) => {
    try {
      await User.deleteOne({ _id: req.query.id });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  register: async (req, res) => {
    console.log(req.body);
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) return res.status(409).json({ message: "Email already exist" });
      await User.create({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
      });
      res.status(200).json({ message: "New user created successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal sever error" });
    }
  },
  editUser: async (req, res) => {
    try {
      const user = await User.findOne({
        _id: req.query.id,
        email: req.body.email,
      });
      if (!user) return res.status(404).json({ message: "User not found" });
      await User.updateOne(
        { _id: req.query.id, email: req.body.email },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            status: req.body.status,
          },
        }
      );
      res.status(200).json({ message: "User update successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
