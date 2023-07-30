import express from "express";

import { getUser } from "../controllers/user.js";
import { deleteUser } from "../controllers/user.js";
import { updateUser } from "../controllers/user.js";
import { singleUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUser);
router.get("/:id", singleUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
