'use strict';

function initial() {
    $("#team")
        .delay(600)
        .fadeIn(1200, function() {})
        .delay(600)
        .fadeOut(1200, function() {
            intro();
        });
}

function intro() {
    $("#image")
        .fadeIn(1200, function() {})
        .delay(600)
        .fadeOut(1200, function() {
            showUI()
        });
}

function showUI() {
    $("#right-hero")
        .fadeIn(600, function() {});
    $("#left-hero")
        .fadeIn(600, function() {
            showLogo()
        });
}

function showLogo() {
    $("#logo")
        .show(700, function() {
            showNameField()
        });
}

function showNameField() {
    $("#name-field")
        .show(700, function() {
            showHints()
        });
}

function showHints() {
    $("#tip-arrow")
        .show(700, function() {  showStartButton()
		});
}

function showStartButton() {
    $("#start-button").animate({ top: '85%' }, 1000);
}

function startGame() {
    $("#logo").animate({ top: '-10%' }, 1200);
    $("#name-field").animate({ top: '-10%' }, 1200);
    $("#tip-arrow").animate({ left: '-10%' }, 1200);
    $("#tip-spacebar").animate({ left: '120%' }, 1200);
    $("#left-hero").animate({ left: '-50%' }, 1200);
    $("#right-hero").animate({ right: '-50%' }, 1200);
    $("#start-button").animate({ top: '110%' }, 1200);

    //localStorage.setItem('username', $('#name-field').val()); // if we want to use localStorage for username

    setTimeout(function() {
        document.location = ("game.html#items?username/:" + $('#name-field').val());
    }, 2000);
}