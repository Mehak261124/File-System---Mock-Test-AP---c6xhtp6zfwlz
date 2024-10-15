const {
  parseLocalDriveIntoJson,
  checkIfDirExists,
} = require("../utils/fileSystem.js");

const { prisma } = require("../db/config");
const { driveFolderPath } = require("../utils/constants.js");

const createFileSystemToRemoteDb = async (_, res) => {
  try {
    const doesExist = await checkIfDirExists(driveFolderPath);
    if (!doesExist) {
      return res.status(400).json({ message: "drive folder does not exists" });
    }

    const fileSystemData = await parseLocalDriveIntoJson(driveFolderPath);

    const repository = await prisma.storage.create({
      data: {
        fileSystem: fileSystemData,
      },
    });

    res.status(200).json({
      message: "File system pushed to remote database",
      repository: {
        id: repository.id,
        fileSystem: repository.fileSystem,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateFileSystemToRemoteDb = async (req, res) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ message: "id not provided" });
    }

    const existingEntry = await prisma.storage.findUnique({
      where: { id: Number(id) },
    });

    if (!existingEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    const fileSystemData = await parseLocalDriveIntoJson(driveFolderPath);

    const updatedRepository = await prisma.storage.update({
      where: { id: Number(id) },
      data: {
        fileSystem: fileSystemData,
      },
    });

    res.status(200).json({
      message: "File system pushed to remote database",
      repository: {
        id: updatedRepository.id,
        fileSystem: updatedRepository.fileSystem,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createFileSystemToRemoteDb,
  updateFileSystemToRemoteDb,
};
