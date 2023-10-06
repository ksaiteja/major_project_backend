const express = require("express");
const { spawn } = require("child_process");
const fs = require("fs");
const route = express.Router();

route.post("/validate", (req, res) => {
  const pythonProcess = spawn("python", [
    "../data/scripts/faces_recognition.py",
    req.body.image,
    "../data/models/" + req.body.model,
    "./output_image.jpg",
  ]);
  let outputData = [];

  pythonProcess.stdout.on("data", (data) => {
    outputData.push(data.toString());
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
    if (code === 0) {
      const imagePath = "./output_image.jpg"; // Specify the path to the image file
      const namesPath = "./output_names.txt";
      // Check if the image file exists
      if (fs.existsSync(imagePath)) {
        // Read the image file and send it as a response
        const image = fs.readFileSync(imagePath);
        const names = fs.readFileSync(namesPath);
        const responseData = {
          image: Buffer.from(image).toString("base64"), // Ensure 'image' is a base64
          names: Buffer.from(names).toString("base64"), // Assuming 'outputData' is an array or an object
        };

        // Set the appropriate HTTP response headers
        res.setHeader("Content-Type", "application/json");

        // Send the JSON response
        res.status(200).json(responseData);
      } else {
        // If the image file does not exist, send a 404 response
        res.status(404).send("Image not found");
      }
    } else {
      res.status(500).json({ error: "Python script execution failed" });
    }
  });
});

module.exports = route;
