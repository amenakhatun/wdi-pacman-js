// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: true
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: true
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: true
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: true
};

var ghosts = [ inky, blinky, pinky, clyde]

for (var i = 0; i < ghosts.length; i++) {
  console.log(ghosts[i]);

}



// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + 'Lives: ' + lives + '\n\nPower-Pellets:' + powerPellets);
}


function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
    if (powerPellets > 0){
  console.log('(p) Eat Power-Pellets');
  }
  console.log('(1) Eat Inky' + getEdibleString(inky));
  console.log('(2) Eat Blinky' + getEdibleString(blinky));
  console.log('(3) Eat Pinky' + getEdibleString(pinky));
  console.log('(4) Eat Clyde' + getEdibleString(clyde));
  console.log('(q) Quit');

}

function getEdibleString(ghost) {
  if (ghost.edible == true){
    return "edible";
  }
  else{
    return "inedible";
  }
}


function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}



// Menu Options

function eatPowerPellet(){
  console.log('\n chomp!');
  score = score + 50;
  edible = true;
  powerPellets = powerPellets - 1;
  

}


function eatDot() {
  console.log('\nChomp!');
  score = score + 10;
}

function eatGhost(ghost) {
  if (ghost.edible === true){
    score += 200;
    console.log('\n you just ate' + ghost.name + '\n and his colour is' + ghost.colour);
  }

  else {
    lives -=1;
    gameOver()
    console.log('\n you were killed by' + ghost.name);
  }


gameOver(lives);


}

  // console.log('\nchomp!');
  // if Ghost() = edible: 'true'
  // lives = lives - 1;


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerPellets > 0) {
        eatPowerPellet();
        break
      }
      else {
        console.log('\n No Power Pellets Left!');
      }
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

function gameOver(lives){
  if (lives <= 0){
  process.exit();
}

    console.log('\n\nGame Over!\n');
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
