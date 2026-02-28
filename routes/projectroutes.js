const router = require("express").Router();
const upload = require("../middleware/uploadmiddleware");
const auth = require("../middleware/authmiddleware");

const projectCtrl = require("../controllers/projectcontroller");
const projectUpdateDelete = require("../controllers/project_update_delete");

const getProjects = projectCtrl.getProjects;
const addProject = projectCtrl.createProject;
const updateproject = projectUpdateDelete.updateproject;
const deleteproject = projectUpdateDelete.deleteproject;

router.get("/", getProjects);
router.post("/", auth, upload.single("image"), addProject);
router.put("/:id", auth, upload.single("image"), updateproject);
router.delete("/:id", auth, deleteproject);

module.exports = router;
