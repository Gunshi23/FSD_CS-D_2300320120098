import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "example.txt");

/* 1️⃣ CREATE & WRITE FILE */
fs.writeFile(filePath, "This is the first line.\n", (err) => {
  if (err) throw err;
  console.log("File created and written successfully.");

  /* 2️⃣ APPEND TO FILE */
  fs.appendFile(filePath, "This line is appended.\n", (err) => {
    if (err) throw err;
    console.log("Data appended successfully.");

    /* 3️⃣ READ FILE (optional, for verification) */
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;
      console.log("File content:\n", data);

      /* 4️⃣ DELETE FILE */
      fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log("File deleted successfully.");
      });
    });
  });
});
