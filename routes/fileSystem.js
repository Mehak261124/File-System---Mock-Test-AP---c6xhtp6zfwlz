const express = require("express");
const {
  createFileSystemToRemoteDb,
  updateFileSystemToRemoteDb,
} = require("../controllers/fileSystem");
const router = express.Router();

router.post("/push", createFileSystemToRemoteDb);
router.put("/update", updateFileSystemToRemoteDb);

module.exports = router;
