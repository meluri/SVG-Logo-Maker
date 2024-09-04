const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

// Function to prompt user for input
function promptUser() {
  return inquirer.prompt([
    { type: 'input', name: 'text', message: 'Enter up to three characters:', validate: input => input.length <= 3 || 'Text must be up to 3 characters' },
    { type: 'input', name: 'textColor', message: 'Enter text color (keyword or hex):' },
    { type: 'list', name: 'shape', message: 'Choose a shape:', choices: ['Circle', 'Triangle', 'Square'] },
    { type: 'input', name: 'shapeColor', message: 'Enter shape color (keyword or hex):' },
  ]);
}

// Function to generate SVG content based on the user's inputs
function generateSVG({ text, textColor, shape, shapeColor }) {
  let selectedShape;
  
  // Instantiate the appropriate shape class
  switch (shape) {
    case 'Circle':
      selectedShape = new Circle();
      break;
    case 'Triangle':
      selectedShape = new Triangle();
      break;
    case 'Square':
      selectedShape = new Square();
      break;
  }

  // Set the shape's color
  selectedShape.setColor(shapeColor);

  // Return the full SVG content
  return `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${selectedShape.render()}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;
}

// Function to write the generated SVG content to a file
function writeSVGFile(svgContent) {
  fs.writeFile('logo.svg', svgContent, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('Generated logo.svg');
    }
  });
}

// Run the application
promptUser().then(answers => {
  const svgContent = generateSVG(answers);
  writeSVGFile(svgContent);
});