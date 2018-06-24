
// Controlled from the document ready event

$("document").ready(function(){


    //Set initial variables

    var current_game_score=0;
    var totalwins=0;
    var totalloss=0;
    
    
    //Instructions populated

    $("#instructions").css({"background-color":"aquamarine","height":"150px","width":"900px"});
    $("#instructions").append("<h1>Welcome to the Crystal Collector game!</h1>");
    $("#instructions").append("<p>We shall provide you a random number which is shown in the green box below. </p> ");
    $("#instructions").append("<p>Your objective is to get to the exact score (nothing more, nothing less), by clicking on a combination of the crystals, each of which has a value. <p>");
    $("#instructions").append("<p><strong> All the best !! </strong> <p>");
    $("#scoreboard").css({"background-color":"green","height":"150px","width":"300px"});

    
    // I keep these ready - once the game starts, they come on to the scene

    var scrcur=$("<div></div>").css({"background-color":"orange","height":"150px","width":"300px"});
    var wins=$("<div></div>").css({"background-color":"green","height":"150px","width":"150px","top":"150px"});
    var loss=$("<div></div>").css({"background-color":"red","height":"150px","width":"150px"});

    var curr_score= $("<h3></h3>").text("Target:");
    var Random;
    var jewelArray;
    var valueArray;

    
    // Initialize Game function - I shall merge this with reset soon since I notice some overlap - or maybe I shall not 
    
    function init(){ 

        $("#scoreboard").text("");

        Random=Math.ceil(Math.random()*70);

        $(curr_score).empty();

        
        //Set the target
        curr_score= $("<h3></h3>").text("Target:");
        curr_score.append(Random);
        
        $("#scoreboard").append(curr_score);


        //Create array of gems - I shall soon try to mix them up

        jewelArray=["./assets/images/stone1.jpg","./assets/images/stone2.jpg","./assets/images/stone3.jpg","./assets/images/stone4.jpg"]; 
        
        //Create random value array - I am loading them to make them have a nice' range' of values
        valueArray=[Math.ceil(Math.random()*4)+Math.ceil(Math.random()*4),Math.ceil(Math.random()*8)+Math.ceil(Math.random()*8),Math.ceil(Math.random()*20)+Math.ceil(Math.random()*2),Math.ceil(Math.random()*15)+Math.ceil(Math.random()*15)];

        $("#parade").empty();

        $(".playbutton").empty();

        
        for(var i=0;i<4;i++){
            $("#parade").append($("<button>",{"class":"playbutton","id":"btn"+i,"value":valueArray[i]}).append($("<img>",{"src":jewelArray[i],"value":valueArray[i],"height":"200px","width":"200px"})));
            console.log(valueArray[i]);
            console.log(jewelArray[i]);
        };


    };

    init();

    //Reset Function

    function resett(){

        //re-generate random target and the values
        Random=Math.ceil(Math.random()*70);
        
        current_game_score=0;
        valueArray=[Math.ceil(Math.random()*4)+Math.ceil(Math.random()*4),Math.ceil(Math.random()*8)+Math.ceil(Math.random()*8),Math.ceil(Math.random()*20)+Math.ceil(Math.random()*2),Math.ceil(Math.random()*15)+Math.ceil(Math.random()*15)];



        //re-assigning random array values to buttons
        for(var i=0;i<4;i++){
            $("#btn"+i).attr({value:valueArray[i]});
        };
        $(curr_score).remove();

        curr_score= $("<h3></h3>").text("Target:");


        $(curr_score).append(Random);
        
        $("#scoreboard").append(curr_score);
        $(scrcur).remove();
    
    };


    //decision - whenever I click on the buttons with gemstones


    $(".playbutton").click(function(){

        current_game_score+=this.value*1;
        
        $(scrcur).empty();
        
        
        $("#scoreboard").append($(scrcur.append("<h3>Current Score : "+current_game_score+"</h3>")));
        
        //Make decision on wins and losses
        
        if (current_game_score === Random){


                alert("YOU HAVE WON !!!");
    
                //Increment wins
                totalwins+=1;
                $(wins).text("");
                $("#right").append($(wins).append("<h3>Total Wins:"+totalwins));
                $("#gamescore").append(" Win - ");

                //Call reset
                resett();

            } else if(current_game_score > Random) {
                alert("You LOSE !!");

                //Increment losses
                totalloss+=1;
                $(loss).text("");
                $("#right").append($(loss).append("<h3>Total Losses:"+totalloss));
                $("#gamescore").append("Loss -");
                //call reset
                resett();

            } else if (Random-current_game_score <=6) {alert("Keep going, you are close!");};

            //The above is a small motivating message - it may help in slowing down the player and help him remember how to calmly close out the last few steps
        
    });

    //Create a reset button and assign action of a reset function to it

    $("#gamescoreheading").append($("<button>",{"id":"reset","height":"40px","width":"80px","text":"Reset","background-color":"pink"}));
    
    $("#reset").click(function(){

        //Reset comes at a cost

        var r = confirm("You have chosen to reset. That means I will have to put this down as a loss. Are you sure?");
        
        if(r==true){
            totalloss+=1;
            $(loss).text("");
            $("#right").append($(loss).append("<h3>Total Losses:"+totalloss));
            $("#gamescore").append("Concede(Loss) -");
            resett();
            
        } else {};
        
    });


});