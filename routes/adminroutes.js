const router = require("express").Router();
const { adminlogin } = require("../controllers/admincontroller");

router.post("/login", adminlogin);

module.exports = router;