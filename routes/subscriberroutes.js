const router = require("express").Router();
const auth = require("../middleware/authmiddleware");
const subscriberCtrl = require("../controllers/subscribercontroller");
const subscriberUpdateDelete = require("../controllers/subscriber_update_delete");

const addsubscriber = subscriberCtrl.addSubscriber;
const getsubscribers = subscriberCtrl.getSubscribers;
const updatesubscriber = subscriberUpdateDelete.updatesubscriber;
const deletesubscriber = subscriberUpdateDelete.deletesubscriber;

router.post("/", addsubscriber); // Public can subscribe
router.get("/", auth, getsubscribers); // Only admin can view subscribers
router.delete("/:id", auth, deletesubscriber);
router.put("/:id", auth, updatesubscriber);

module.exports = router;
