import express from "express";
import userController from "../../controller/userController.js";
const router = express.Router();

router.get("/users", userController.getUsers);
router.post("/register", userController.register);
router.put("/update", userController.editUser);
router.delete("/deleteUser", userController.deletUser);

export default router;
