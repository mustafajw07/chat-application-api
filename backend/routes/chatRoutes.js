const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const  {accessChat , fetchChat ,createGroupChat , renameGroup , removeFromGroup , addToGroup} =  require("../controllers/chatController.js")

router.route("/").post(protect , accessChat).get(protect , fetchChat);
router.route("/group").post(protect , createGroupChat);
router.route("/rename").put(protect , renameGroup);
router.route("/remove").put(protect , removeFromGroup);
router.route("/add").put(protect , addToGroup);

module.exports = router;