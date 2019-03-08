import { parseToJson } from './editData.js'
  var sounds = {
    spin: new Audio('https://cdn.rawgit.com/ManzDev/cursos-assets/gh-pages/js/spin.mp3'),
    win: new Audio('https://cdn.rawgit.com/ManzDev/cursos-assets/gh-pages/js/win.mp3')
  }

  var roulette = document.querySelector('#roulette');
  var arrow = document.querySelector('#arrow');
  var txt = document.querySelector('#txt');
  var item = document.querySelector('#item');
  const finalScreen = document.querySelector('.final-screen');

  let data = parseToJson(localStorage.getItem('Komedie'))
  console.log(data);


  var items = [['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
               ['./src/img/montijn.jpeg', '', ''],
  ];


  export function spin() {
      var offset = 0;
      var maxOffset = items.length * 200;

      var wheel = {
        speed: 100,

        getSpeed: function() {
          this.speed = this.speed - Math.round(Math.random() * 1);
          if (this.speed < 0)
            return 0;
          return this.speed;
        },
        resetSpeed: function() { this.speed = 100 }
      }

      items.forEach(function(e) {
        var newItem = item.content.cloneNode(true);
        newItem.querySelector('img').src = e[0];
        newItem.querySelector('span').textContent = e[1];
        roulette.appendChild(newItem);
      });

    console.log('max: ', maxOffset);

    timer = setInterval(function() {
      offset = offset + wheel.getSpeed();
      if ((offset > maxOffset) || (offset < 0))
        offset = 0;
      roulette.style.transform = 'translateX(-'+offset+'px)';
        setTimeout(function() {
          finalScreen.classList.remove('final-screen__noshow')
        }, 2500);
    }, 10);

    setTimeout(function() {
      clearInterval(timer);
      wheel.resetSpeed();
      sounds.spin.currentTime = 0;

      /*
      var selected = Math.floor( (150 + offset) / (maxOffset / items.length) );
      txt.textContent = items[selected][1];
      */
    }, 2500);
  }
