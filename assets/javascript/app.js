
    var startScreen;
    var gameHTML;
    var questionCounter = 0;
    var counter = 15;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var questionArray = ["Which year was the first FIFA world cup played?", "Which country has won maximum number of FIFA World Cup?", "Which team won the FIFA World Cup 2014?", "Which team won the first FIFA World Cup?", "How many times Canada has participated in FIFA World Cup?", "Which country is hosting FIFA World Cup 2018?", "Which player has scored the most number of goals in FIFA World Cup?", "Who was the runner up team in World Cup 2014"];
    var answerArray = [["1930", "1935", "1940", "1945"], ["Germany","Italy","Brazil","Argentina"], ["Spain", "Argentina", "England", "Germany"], ["Brazil","Italy","Uruguay","Egypt"], ["1", "2", "3", "Never"], ["Brazil","Italy","Russia","Germany"], ["Messi", "Ronaldo", "Maradona", "Klose"], ["Italy","Argentina","Germany","Brazil"]];
    var imageArray = ["<img class='center-block img-right' src='assets/images/Q1.jpg'>", "<img class='center-block img-right' src='assets/images/Q2.jpg'>", "<img class='center-block img-right' src='assets/images/Q3.jpg'>", "<img class='center-block img-right' src='assets/images/Q4.png'>", "<img class='center-block img-right' src='assets/images/Q5.png'>", "<img class='center-block img-right' src='assets/images/Q6.jpg'>", "<img class='center-block img-right' src='assets/images/Q7.jpg'>", "<img class='center-block img-right' src='assets/images/Q8.jpg'>"];
    var correctAnswers = ["A. 1930", "C. Brazil", "D. Germany", "C. Uruguay", "A. 1", "C. Russia", "D. Klose", "B. Argentina"];


$(document).ready(function() {  

    // Create a function that creates the start button and initial screen
    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }
    
    initialScreen();
    
    //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...
    
    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  // added line to test issue on GitHub Viewer

        generateHTML();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        //answeredQuestion = true;

        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){

        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>"  + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 2000); 
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 2000); 
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 2000);
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 15;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 15;
        generateHTML();
        timerWrapper();
    }

