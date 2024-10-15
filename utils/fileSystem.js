const fs = require("fs").promises;
const path = require("path");
const { driveFolderPath } = require("./constants");

const parseLocalDriveIntoJson = async (localFilePath = driveFolderPath) => {
  const currentFolderPath = localFilePath;

  const contents = await fs.readdir(currentFolderPath, { withFileTypes: true });
  return Promise.all(
    contents.map(async (item) => {
      const itemPath = path.join(item.path, item.name);
      if (item.isDirectory()) {
        return {
          name: item.name,
          type: "folder",
          children: await parseLocalDriveIntoJson(itemPath),
        };
      } else {
        const fileContent = await fs.readFile(itemPath, "utf-8");
        return {
          name: item.name,
          type: "file",
          content: fileContent,
        };
      }
    })
  );
};

const checkIfDirExists = async (dirPath) => {
  try {
    const stats = await fs.stat(dirPath);
    return stats.isDirectory(); // Returns true if it's a directory
  } catch (error) {
    console.log(error.code);
    if (error.code === "ENOENT") {
      return false; // Directory does not exist
    }
    throw error; // Rethrow if it's another error
  }
};

module.exports = {
  parseLocalDriveIntoJson,
  checkIfDirExists,
};
