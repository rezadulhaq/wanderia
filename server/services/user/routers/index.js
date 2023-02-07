const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const preferencesRouter = require("./preferencesRouter")
router.use("/users", userRouter);
router.use("/preferences", preferencesRouter)
module.exports = router;
