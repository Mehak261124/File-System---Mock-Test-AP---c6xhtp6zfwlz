const {
  parseLocalDriveIntoJson,
  checkIfDirExists,
} = require("../utils/fileSystem.js");

const { prisma } = require("../db/config");
const {  driveFolderPath } = require("../utils/constants.js");

const createFileSystemToRemoteDb = async (_, res) => {

};

const updateFileSystemToRemoteDb = async (req, res) => {

};

module.exports = {
  createFileSystemToRemoteDb,
  updateFileSystemToRemoteDb,
};
