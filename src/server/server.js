const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // File system module for reading and writing JSON

const app = express();
app.use(bodyParser.json()); // Parse JSON request bodies

const assignmentsFile = 'assignments.json'; // Path to your JSON file

// Function to read assignments from the JSON file
function getAssignments() {
  try {
    const data = fs.readFileSync(assignmentsFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading assignments file:', err);
    return []; // Return an empty array on error
  }
}

// Function to write assignments to the JSON file
function saveAssignments(assignments) {
  try {
    const data = JSON.stringify(assignments, null, 2); // Pretty-print for readability
    fs.writeFileSync(assignmentsFile, data);
  } catch (err) {
    console.error('Error writing assignments file:', err);
  }
}

// Load assignments on startup (optional)
let assignments = getAssignments();

// Add assignment
app.post('/assignments', (req, res) => {
  const newAssignment = req.body;
  newAssignment.id = Date.now().toString(); // Generate unique ID
  assignments.push(newAssignment);
  saveAssignments(assignments);
  res.json(newAssignment); // Return the added assignment
});

// Get all assignments
app.get('/assignments', (req, res) => {
  res.json(assignments);
});

// Update assignment (replace the entire assignment)
app.put('/assignments/:id', (req, res) => {
  const id = req.params.id;
  const updatedAssignment = req.body;
  const assignmentIndex = assignments.findIndex(a => a.id === id);
  if (assignmentIndex !== -1) {
    assignments[assignmentIndex] = updatedAssignment;
    saveAssignments(assignments);
    res.json(updatedAssignment);
  } else {
    res.status(404).send('Assignment not found');
  }
});

// Delete assignment
app.delete('/assignments/:id', (req, res) => {
  const id = req.params.id;
  const assignmentIndex = assignments.findIndex(a => a.id === id);
  if (assignmentIndex !== -1) {
    assignments.splice(assignmentIndex, 1);
    saveAssignments(assignments);
    res.json({ message: 'Assignment deleted' });
  } else {
    res.status(404).send('Assignment not found');
  }
});

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
