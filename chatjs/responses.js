function getBotResponse(input) {
    if(input== "yes" || input== "Yes" || input== "YES"){
        return "Thank you.How's going today?";
    }
    if(input== "no problem" || input== "No problem" || input== "NO PROBLEM"){
        return "How's going today?";
    }
    if(input== "wonderful" || input== "great" || input== "awesome" || input== "good"|| input== "perfect"){
        return "YAY(^^) a great day";
    }
    if(input== "terrible" || input== "bad" || input== "so bad" || input== "very bad"){
        return "What happen with you?";
    }
    if(input== "no" || input== "No" || input== "NO"){
        return ":( why? No";
    }
    //games
    if(input== "games" || input== "game" || input== "let's talk about game"|| input== "let's talk about games"|| input== "about game"){
        return "What kind of games do you like to play?";
    }
    if(input== "role-playing games" || input== "role playing games" || input== "role play"|| input== "i like role play"|| input== "i like role playing games"){
        return "Oh i like that too, cs go,valorant,PUBG";
    }
    if(input== "MOBA" || input== "Multiplayer Online Battlefield Arena"|| input== "i like MOBA game"|| input== "i like MOBA games"){
        return "Wow, i know the famous MOBA games, it is League of Legends"; 
    }
    if(input== "entertain" || input== "game entertain" || input== "games entertain"|| input== "i like game entertain"|| input== "i like games entertain"){
        return "Yes,you try my website games, have many games entertain"; 
    }
    if(input=="Simulation"||input=="simulation"||input=="SIMULATION"){
        return "Simulation? I never played it yet"
    }
    //code favorite
    if(input== "code" || input== "programming" || input== "let's talk about programming"|| input== "let's talk about code"|| input== "about programming"|| input== "IT"|| input== "it"|| input== "program"){
        return "What programming language do you use?";
    }
    if(input=="javascript"||input=="JAVASCRIPT"||input=="JavaScript"||input=="i use javascript"||input=="JS"||input=="js"){
        return "JavaScript, in its current version, is an interpreted programming language developed from the concept of prototypes. This language is widely used for websites (user side) as well as server side (with Nodejs). It was originally developed by Brendan Eich at Netscape Communications as Mocha, then renamed LiveScript, and finally JavaScript. Like Java, JavaScript has a similar syntax to C, but it is closer to Self than Java. .js is a commonly used extension for JavaScript source files."
    }
    if(input=="java"||input=="JAVA"||input=="Java"||input=="i use java"){
        return "oh java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It is a general-purpose programming language that allows developers to write once, run anywhere (WORA),[9] which means that the compiled Java code can run on all supported platforms. support Java without recompiling.[10] Java applications are typically compiled to bytecode that can run on any Java virtual machine (JVM) regardless of the underlying computer architecture."
    }
    if(input=="c"||input=="C"||input=="i use c"){
        return "oh c is an imperative language developed in the early 1970s by Dennis Ritchie for use in the UNIX operating system. Since then, this language has spread to many other operating systems and has become one of the most popular languages. C is the most efficient and preferred language for writing system software, although it is also used for writing applications. In addition, C is also often used as a teaching medium in computer science, although the language is not designed for beginners."
    }
    if(input=="c++"||input=="C++"||input=="i use c++"){
        return "oh c++ is a kind of middle-level programming language. It is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language. The language has expanded considerably over time, and C++ Modern programming has the following features: generic programming, object-oriented programming, procedural programming, statically typed free-parametric multi-paradigm languages, abstract data, and polymorphic programming, plus more features and tools for manipulating low-level memory. Since the 1990s, C++ has become one of the favorite and popular commercial languages of programmers."
    }
    if(input=="c#"||input=="C#"||input=="C Sharp"||input=="c sharp"||input=="i use c#"){
        return "oh c# is a powerful, general-purpose object-oriented programming language developed by Microsoft, C# was the beginning of their .NET plan. The name of the language includes the pound character according to Microsoft but according to ECMA it is C#, including only lowercase digits. Microsoft develops C# based on C++ and Java. C# is described as a language that has a balance between C++, Visual Basic, Delphi and Java."
    }
    if(input=="php"||input=="PHP"||input=="i use php"){
        return "oh Usually abbreviated to PHP is a scripting language or a type of code primarily used to develop general purpose, open source, server-written applications. It is very suitable for the web and can be easily embedded into HTML pages. Because it is optimized for web applications, is fast, compact, has a syntax similar to C and Java, is easy to learn, and has a relatively shorter product build time compared to other languages, PHP has quickly become one of the most popular languages in the world. the world's most popular web programming language."
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
