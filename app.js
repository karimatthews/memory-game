



  function createGrid() {
    //identify the div where we will place the cards

    //define how many square we will create
    var squareNum = JSON.parse(this.innerHTML);
    //define number of rows/columns
    var rowNum = Math.sqrt(squareNum);

    //create a list of numbers to use
    numbers = [];
    for (i = 0; i < squareNum * 2; i=i+2) {
      if (i==0) {
        numbers[i] = 1;
        numbers[i+1] = 1;

      } else {
        numbers[i] = numbers[i-1]+1;
        numbers[i+1] = numbers[i-1]+1;
      }
    }



    cards = [];
    for (i=0; i<squareNum; i++) {
      cards[i] = document.createElement("button");        // Create a <button> element
      cards[i].className = "card";
      //put text in cards
      cards[i].innerHTML = Math.round(Math.random()*10);
      var gameDiv = document.getElementById('game');
      gameDiv.appendChild(cards[i]);
      //create rows
      if (Number.isInteger((i+1)/rowNum)) {
        lineBreak = document.createElement("br")
        gameDiv.appendChild(lineBreak)
      }
    }
  }


  document.getElementById('four').onclick = createGrid;
  document.getElementById('sixteen').onclick = createGrid;
  document.getElementById('thirty-six').onclick = createGrid;
