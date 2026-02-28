const router = require("express").Router();
const auth = require("../middleware/authmiddleware");
const contactCtrl = require("../controllers/contactcontroller");
const contactUpdateDelete = require("../controllers/contact_update_delete");

const submitcontact = contactCtrl.submitContact;
const getcontacts = contactCtrl.getContacts;
const updatecontact = contactUpdateDelete.updatecontact;
const deletecontact = contactUpdateDelete.deletecontact;

router.post("/", submitcontact);
router.get("/", auth, getcontacts);
router.put("/:id", auth, updatecontact);
router.delete("/:id", auth, deletecontact);

module.exports = router;
