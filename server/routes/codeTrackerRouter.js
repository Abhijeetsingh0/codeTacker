const express = require("express")
const router = express.Router();
const CodeTrackerController = require("../controller/codeTrackerController")
const {authenticate} = require("../middlewares/auth")

router.post('/query',CodeTrackerController.queryCodeTracker)

router.post("/", authenticate, CodeTrackerController.createCodeTracker)
router.get("/", authenticate, CodeTrackerController.getCodeTrackers)
router.get('/getCodeTrackerCalendar',authenticate,CodeTrackerController.getCodeTrackerCalender)
router.get("/:id", authenticate, CodeTrackerController.getCodeTrackerById)
router.put("/:id", authenticate, CodeTrackerController.putCodeTracker)
router.delete("/:id",authenticate,CodeTrackerController.deleteCodeTracker)

module.exports = router