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
  function createGrid() {
    //define the div where we want the game to appear
    var gameDiv = document.getElementById('game');

    // Clear previous grid
    deleteChildren(gameDiv);

    //define how many squares we will create
    var squareNum = JSON.parse(this.innerHTML);
    //define number of rows/columns
    var rowNum = Math.sqrt(squareNum);

    //Create some empty lists
    cards = [];
    divs = [];
    selected = [];
    selectedCards = [];
    k = 0;
    var disabledButtons =[];

    function compare(one, two, i) {
      if (one == two) {
        // debugger

        setTimeout(function(){
          // alert("Yay, they match!");
          for (z=0; z<squareNum; z++) {
            if ((z != i) && (z != selectedCards[0]) && (disabledButtons.indexOf(z) == -1)) {
              document.getElementById(z).disabled = false;
              disabledButtons.push(selectedCards[0], i);
              // debugger
            }
          }
        }, 1000);
        k=0;
      } else {
        // debugger
        setTimeout(function(){
          // alert("Nope. You suck.");
          cards[i].innerHTML = null;
          cards[i].className = "card";
          cards[selectedCards[0]].innerHTML = null;
          cards[selectedCards[0]].className = "card";
          for (z=0; z<squareNum; z++) {
            if (disabledButtons.indexOf(z) == -1) {
              document.getElementById(z).disabled = false;
              // debugger
            }

          }
          k = 0;
        }, 1000);

      }
    }

  //create function to run when the button is clicked
  function showValue(i) {
    return function() {
      //Show the number on the selected card
      cards[i].innerHTML = numbers[i];
      cards[i].className = "clickedCard"
      cards[i].disabled = true;

      //Add to the list
      if (k==0) {
        selected[0] = numbers[i]
        selectedCards[0] = i;
      } else if (k==1) {
        selected[1] = numbers[i]
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
        compare(selected[0], selected[1], i)
      }
    }
  }

    //create a list of numbers to use
    numbers = [];
    for (i = 0; i < squareNum ; i=i+2) {
      if (i==0) {
        numbers[i] = 1;
        numbers[i+1] = 1;
      } else {
        numbers[i] = numbers[i-1]+1;
        numbers[i+1] = numbers[i-1]+1;
      }
    }
    randomNumbers = shuffle(numbers);





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



  document.getElementById('four').onclick = createGrid;
  document.getElementById('sixteen').onclick = createGrid;
  document.getElementById('thirty-six').onclick = createGrid;
