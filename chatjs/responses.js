function getBotResponse(input) {
    if(input== "yes" || input== "Yes" || input== "YES"){
        return "Thank you so much";
    }
    if(input== "no problem" || input== "No problem" || input== "NO PROBLEM"){
        return "How's going today?";
    }
    if(input== "no" || input== "No" || input== "NO"){
        return ":( Can i know why?";
    }
    //rock paper scissors
    if (input == "rock") {
        return "paper";
    } else if (input == "paper") {
        return "scissors";
    } else if (input == "scissors") {
        return "rock";
    }
    if (input == "play rock paper scissos" || input == "one two three" ){
        return "OK,you first"
    }
    // Simple responses
    if (input == "hello"||input == "Hello"||input == "HELLO"||input == "hi"||input == "HI" ) {
        return "Hello there!";
    } else if (input == "goodbye"|| input=="Goodbye"|| input=="bye" || input=="Bye" ) {
        return "Talk to you later!";
    } else {
        return "Let's asking something else!";
    }
}