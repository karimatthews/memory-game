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



  function createGrid() {
    //identify the div where we will place the cards

    //define how many square we will create
    var squareNum = JSON.parse(this.innerHTML);
    //define number of rows/columns
    var rowNum = Math.sqrt(squareNum);



    //create function to run when the button is clicked
    function showValue(i) {
      return function() {
        cards[i].innerHTML = numbers[i];
        cards[i].className = "clickedCard"
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

    cards = [];
    var gameDiv = document.getElementById('game');
    divs = [];
    divs[0] = document.createElement("div")
    divs[0].className = "row";
    gameDiv.appendChild(divs[0])


    //Run loop to build grid
    for (i=0, j=0; i<squareNum; i++) {
      cards[i] = document.createElement("button");        // Create a <button> element
      cards[i].className = "card";
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
