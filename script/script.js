window.onload = function() {
  let shirtChoose,
    cardsNum,
    openCard = 'first',
    firstCard,
    secondCard,
    firstElement,
    totalCards = 0,
    time = 0,
    interval,
    arrAnimals = [
      'cat.jpg',
      'chicken.jpg',
      'cow.jpg',
      'dog.jpg',
      'fox.jpg',
      'frog.jpg',
      'goose.jpg',
      'horse.jpg',
      'hamster.jpg',
      'lizard.jpg',
      'rabbit.jpg',
      'squirrel.jpg'
    ];
  class MatchGame {

    makeTiles(cardsNum) {
      let shuffledAnimals = this.shuffle(arrAnimals);
      let chosenAnimals = shuffledAnimals.slice(0, cardsNum);
      let newAnimals = [];

      for ( let i = 0; i < chosenAnimals.length; i++ ) {
        newAnimals.push(chosenAnimals[i], chosenAnimals[i]);
      }

      let shufflednewAnimals = this.shuffle(newAnimals);
      document.getElementsByClassName('shirts')[0].classList.add('hidden-element');
      let elem  = document.getElementsByClassName('shirts')[0];
      elem.parentNode.removeChild(elem);

      for ( let i = 0; i < shufflednewAnimals.length; i++ ) {
        cardsField.innerHTML += '<div class="tile" id="tile"><img class="animal" src="img/cards/' + shufflednewAnimals[i] + '"><div class="shirt" style="background: url(img/' + shirtChoose + ')  no-repeat;"></div></div>';
      }

      if( cardsNum == 4 || cardsNum == 6 ) {
        cardsField.classList.add('medium');
      } else {
        cardsField.classList.add('hard');
      }
    };

    shuffle(arr) {
      arr = arr.slice(0);
      let newArr = [];

      while ( arr.length > 0 ) {
        let index = Math.floor(Math.random() * arr.length);
        let item = arr[index];
        newArr.push(item);
        arr.splice(index, 1);
      }
      return newArr;
    };

    startTimer() {
      time = new Date().getTime();
      interval = setInterval(function() {
        if ( time==0 ) return;
        counter.innerHTML = ((new Date().getTime()-time)/1000).toFixed(1)
      },100);
    };

    changeScene() {
      let elem = document.getElementsByClassName('levels')[0];
      elem.parentNode.removeChild(elem);
      document.getElementsByClassName('shirts')[0].classList.remove('hidden-element');
    };

    play() {
      this.makeTiles(cardsNum);
      this.startTimer();
    };
  }

  let game = new MatchGame('firstGame');

  reset.addEventListener( 'click' , function() {
      location.reload();
  });

  shirt1.addEventListener( 'click' , function() {
    shirtChoose = 'shirt-green.jpg';
    game.play();
  });

  shirt2.addEventListener( 'click' , function() {
    shirtChoose = 'shirt-light.jpg';
    game.play();
  });

  shirt3.addEventListener( 'click' , function() {
    shirtChoose = 'shirt-brown.jpg';
    game.play();
  });

  level1.addEventListener( 'click' , function(e) {
    cardsNum = 4;
    game.changeScene();
  });

  level2.addEventListener( 'click' , function() {
    cardsNum = 6;
    game.changeScene();
  });

  level3.addEventListener( 'click' , function() {
    cardsNum = 12;
    game.changeScene();
  });

  cardsField.addEventListener( 'click' , function(e) {
    let elem = e.target.parentNode;

    if( elem.classList.contains('active') ) {
      return;
    }else if ( e.target !== document.getElementById('cardsField') ) {
      elem.classList.add('active');

      if( openCard == 'first' ) {
        firstCard = elem.children[0].getAttribute('src');
        openCard = 'second';
        firstElement = elem;
      } else if( openCard == 'second' ) {
        secondCard = elem.children[0].getAttribute('src');
        openCard = 'first';

        if( firstCard !== secondCard ) {
          let act = document.getElementsByClassName('active');
          setTimeout(function () {
            firstElement.classList.remove('active');
            elem.classList.remove('active');
          }, 500);
        } else {
          elem.classList.add('match');
          firstElement.classList.add('match');
          totalCards += 2;
        }
      }
    }

    if ( cardsNum*2 == totalCards ) {
      cardsField.innerHTML = '<h2>Congratulations!</h2><p> You won! Your time: ' + counter.innerHTML + ' s</p>';
      cardsField.style.display = 'block';
      clearInterval(interval);
    }
  });

};
