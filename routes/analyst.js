const express=require('express')
const router=express.Router()
const fs=require('fs')
const { spawn } = require('child_process');

router.get('/files', (req, res) => {
    // Read the files in the specified directory
    fs.readdir('C:/Users/saite/Desktop/major_project/data/models', (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ files });
    });
  });



router.post('/files/getNames', (req, res) => {
    const pythonProcess = spawn('python', [
      '../data/scripts/list_names.py',
      'C:/Users/saite/Desktop/major_project/data/models/' + req.body.path,
    ]);
  
    let outputData = '';
  
    pythonProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });
  
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });
  
    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
      if (code === 0) {
        // Successfully executed
        const response = outputData;
        console.log(response);
        res.json(response);
      } else {
        res.status(500).json({ error: 'Python script execution failed' });
      }
    });

  });
  


module.exports=router

