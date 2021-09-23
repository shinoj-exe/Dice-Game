'use strict';

//Selecting Elemet
const player0El= document.querySelector(".player--0");
const player1El= document.querySelector(".player--1");
const Score0El = document.querySelector("#score--0");
const Score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice")
const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")
const current0El=document.getElementById("current--0")
const current1El=document.getElementById("current--1")
let scores,currenScore,activePlayer,playing

//Initialization funcion
const initial = function() {

    scores=[0,0];
    currenScore=0;
    activePlayer=0;
    playing=true;
    
    Score0El.textContent=0;
    Score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;

    diceEl.classList.add("hidden")
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    
};
initial();


//function for awitching active player
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currenScore=0
    activePlayer=activePlayer===0?1:0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

//Rolling Dice Func
btnRoll.addEventListener("click", function(){
    if(playing){
        const dice= Math.trunc(Math.random()*6)+1;

        diceEl.classList.remove("hidden")
        diceEl.src=`dice-${dice}.png`   //TO DISPLAY THE DICE ACCORDING TO THE RANDOM NUMBER
    
        //Checking if the rolled number is 1
        if(dice!==1){
            currenScore+=dice;
            document.getElementById(`current--${activePlayer}`).textContent=currenScore  
        }else{
            switchPlayer();
        }
    }

})

btnHold.addEventListener("click",function(){
    if(playing){
                //add active player score to toal score
        scores[activePlayer] += currenScore;
        document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
        
        //check if greater than 100
        if(scores[activePlayer]>=25){
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            diceEl.classList.add("hidden");
            playing=false;
        }else{
            switchPlayer();
        }
    }
})

btnNew.addEventListener("click",initial)