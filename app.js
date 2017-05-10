//Define a function to uh... shuffle an array
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

//Create a function that deletes all children of an element
function deleteChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}




//This is the code for the most important function: building the game
function createGrid(squares) {
    return function() {
    //define the div where we want the game to appear
    var gameDiv = document.getElementById('game');
    // Clear previous grid
    deleteChildren(gameDiv);

    //define how many squares we will create
    var squareNum = squares
    //define number of rows/columns
    var rowNum = Math.sqrt(squareNum);

    //create a score variable
    var score = squareNum * 10
    document.getElementById('score').innerHTML = "Your Score: " + score;

    //create a list of numbers to use
    var numbers = [];
    //Populate the numbers list
    for (i = 0; i < squareNum ; i=i+2) {
      if (i==0) {
        numbers[i] = 1;
        numbers[i+1] = 1;
      } else {
        numbers[i] = numbers[i-1]+1;
        numbers[i+1] = numbers[i-1]+1;
      }
    }
    //Randomise the order of the numbers list
    var randomNumbers = shuffle(numbers);

    //Create some empty lists
    var cards = [];
    var divs = [];
    var cardNumber = []; //holds the corresponding number value for each card id
    var selectedCards = []; //holds the id of the two selected cards
    var k = 0;
    var disabledButtons =[];

    function enableButtons() {
      cards.forEach(function(card) {
        if (disabledButtons.indexOf(card.id) == -1) {
          card.disabled = false;
        }
      });
    }

    //Define the function to compare two elements and say what to do next
    function compare(one, two, i) {
      if (one == two) {
        disabledButtons.push(selectedCards[0], i);
        enableButtons();
        if (disabledButtons.length == squareNum) {
          setTimeout(function(){
            alert("Nice! Your score this round is " + score + "!")
          }, 100);
        }
      } else {
        setTimeout(function(){
          score = score - 5;
          document.getElementById('score').innerHTML = "Your Score: " + score;
          cards[i].innerHTML = null;
          cards[i].className = "card";
          cards[selectedCards[0]].innerHTML = null;
          cards[selectedCards[0]].className = "card";
          enableButtons();
        }, document.getElementById("slider").value);
      }

    k=0;
  }

    //create function to run when the button is clicked
    function showValue(i) {
      return function() {
        //Show the number on the cardNumber card
        cards[i].innerHTML = numbers[i];
        cards[i].className = "clickedCard"
        cards[i].disabled = true;

        //Add to the list
        if (k==0) {
          cardNumber[0] = numbers[i]
          selectedCards[0] = i;
        } else if (k==1) {
          cardNumber[1] = numbers[i]
          selectedCards[1] = i;
        } else {
          return;
        }

        //increment k
        k = k+1

        //check if the numbers match
        if (k==2) {
          for (z=0; z<squareNum; z++) {
            //disable all the buttons
            document.getElementById(z).disabled = true;
          }
          // debugger
          compare(cardNumber[0], cardNumber[1], i)
        }
      }
    }



    //create our first empty row
    divs[0] = document.createElement("div")
    //give it a class
    divs[0].className = "row";
    //chuck it in the main div
    gameDiv.appendChild(divs[0])


    //Run loop to build grid
    //THIS IS WHERE SHIT HAPPENS!!!!
    for (i=0, j=0; i<squareNum; i++) {
      //create a button
      cards[i] = document.createElement("button");
      //give it a class
      cards[i].className = "card";
      //give it an id
      cards[i].id = i;
      //call function when button is clicked
      cards[i].onclick = showValue(i);

      //add card to the row
      divs[j].appendChild(cards[i]);

      //create new row when needed
      if (Number.isInteger((i+1)/rowNum)) {
        j = j++
        divs[j] = document.createElement("div")
        divs[j].className = "row";
        gameDiv.appendChild(divs[j])
      }
    }
  }
}


document.getElementById('test').onclick = createGrid(4);
document.getElementById('easy').onclick = createGrid(16);
document.getElementById('hard').onclick = createGrid(36);
document.getElementById('impossible').onclick = createGrid(64);
