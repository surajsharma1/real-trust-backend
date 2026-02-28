const router = require("express").Router();
const upload = require("../middleware/uploadmiddleware");
const auth = require("../middleware/authmiddleware");
const clientCtrl = require("../controllers/clientcontroller");
const clientUpdateDelete = require("../controllers/client_update_delete");

// Combine exports from both files
const getclients = clientCtrl.getclients;
const addclient = clientCtrl.addclient;
const updateclient = clientUpdateDelete.updateclient;
const deleteclient = clientUpdateDelete.deleteclient;

router.get("/", getclients); // Public can view clients on landing page
router.post("/", auth, upload.single("image"), addclient); // Only admin can add
router.put("/:id", auth, updateclient);
router.delete("/:id", auth, deleteclient);

module.exports = router;
