// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}
