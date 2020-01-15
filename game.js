var gamePattern = [];
var userClickedPattern = [];

var buttonColours = [ 'red', 'blue', 'green', 'yellow' ];

var started = false; //Checking if game has started, starts only after keypress

var level = 0; //Set starting level at 0

$(document).keypress(function() {
	if (!started) {
		//Change title to Level 0
		$('#level-title').text('Level ' + level);
		nextSequence();
		//Set started to true so nextSequence doesn't get called again upon new keypress
		started = true;
	}
});

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log('success');

		if (gamePattern.length === userClickedPattern.length) {
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log('wrong');

		playSound('wrong');

		$('body').addClass('game-over');
		setTimeout(function() {
			$('body').removeClass('game-over');
		}, 500);

		$('h1').text('Game Over, Nerd. Press Any Key To Restart.');
		startOver();
	}
}

function nextSequence() {
	//Reset the user pattern
	userClickedPattern = [];

	//Increase level everytime function is called and update title text
	level++;
	$('#level-title').text('Level ' + level);

	var randomNumber = Math.round(Math.random() * 3);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	//Flash animation for button
	$('#' + randomChosenColour).fadeOut(100).fadeIn(100);

	//Play sound for random button
	playSound(randomChosenColour);
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}

$('.btn').click(function() {
	// Getting ID of clicked button
	var userChosenColour = $(this).attr('id');

	//Pushing clicked ID into an array
	userClickedPattern.push(userChosenColour);

	//Check if user's last input was correct
	checkAnswer(userClickedPattern.length - 1);

	//Play sound for clicked button
	playSound(userChosenColour);

	animatePress(userChosenColour);
});

function playSound(name) {
	var audio = new Audio('sounds/' + name + '.mp3');
	audio.volume = 0.1;
	audio.play();
}

function animatePress(currentColour) {
	$('#' + currentColour).addClass('pressed');
	setTimeout(function() {
		$('#' + currentColour).removeClass('pressed');
	}, 100);
}
