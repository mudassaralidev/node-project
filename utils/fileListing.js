import fs from 'fs';
import path from 'path';

export const listFilesWithExtension = (directoryPath, extension) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log(`Could not find directory "${directoryPath}"`)
      return
    }

    const txtFiles = files.filter(file => path.extname(file) === extension);

    console.log(`Files with extension ${extension} in directory ${directoryPath}:`);
    txtFiles.forEach(file => {
      console.log(file);
    });
  });
}