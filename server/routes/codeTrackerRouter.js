const express = require("express")
const router = express.Router();
const CodeTrackerController = require("../controller/codeTrackerController")
const {authenticate} = require("../middlewares/auth")

router.post("/",authenticate,CodeTrackerController.createCodeTracker)
router.get("/",CodeTrackerController.getCodeTrackers)
router.get("/:id",CodeTrackerController.getCodeTrackerById)
router.put("/:id",CodeTrackerController.putCodeTracker)
router.delete("/:id",authenticate,CodeTrackerController.deleteCodeTracker)

module.exports = router