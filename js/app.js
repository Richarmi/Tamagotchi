


// website functionality for the Tamagotchi
$(() =>
{

  class Personality {
    constructor(hungryFactors, tiredFactors, boredomFactors)
    {
      const firstMax = Math.max(hungryFactors, tiredFactors);
      const secondMax = Math.max(tiredFactors, boredomFactors);
      const thirdMax = Math.max(firstMax, secondMax);

      // initiate the personality factors
      for(let i = 0; i < thirdMax; i++)
      {
        this.hungryFactors[i] = hungryFactors[i];
        this.tiredFactors[i] = tiredFactors[i];
        this.boredomFactors[i] = boredomFactors[i];
      }

    }

    getHungryFactor(index) { return this.hungryFactors[index % this.thirdMax]; }
    getTiredFactor(index) { return this.tiredFactors[index % this.thirdMax]; }
    getBoredomFactor(index) { return this.boredomFactors[index % this.thirdMax]; }
    getRandomIndex() { return Math.random() * this.thirdMax; }

  }

  class Timer {
    constructor(thisDay, thisHour, thisMinute, thisSecond){
      let days = thisDay;
      let hours = thisHour;
      let minutes = thisMinute;
      let seconds = thisSecond;
    }

    getDays() { return this.days; }
    getHours() { return this.hours; }
    getMinutes() { return this.minutes; }
    getSeconds() { return this.seconds; }

    setDays(thisDay) { this.days = thisDay; this.convertTime(); }
    setHours(thisHour) { this.hours = thisHour; this.convertTime(); }
    setMinutes(thisMinute) { this.minutes = thisMinute; this.convertTime(); }
    setSeconds(thisSecond) { this.seconds = thisSecond; this.convertTime(); }

    convertTime() {
      this.minutes = Math.floor(this.seconds / 60);
      this.seconds = Math.floor(this.seconds % 60); // remaining seconds

      this.hours = Math.floor(this.minutes / 60);
      this.minutes = Math.floor(this.minutes % 60); // remaining minutes

      this.days = Math.floor(this.hours / 24);
      this.hours = Math.floor(this.hours % 24);     // remaining hours
    }

    displayTime() {
      //console.log(`days: ${this.days} ${this.hours}:${this.minutes}:${this.seconds}`);
      $('#this-timer').text(`${this.hours}:${this.minutes}:${this.seconds}`);
    }
  }

  class Tamagotchi {
    constructor(name, pictures, morphTimes){
      this.name = name;
      this.boredom = 1;
      this.sleepiness = 1;
      this.hunger = 1;
      this.age = 0;
      this.dead = false;
      this.personality = [];

      // for(let i = 0; i < 3; i++)
      // {
      //   personality[i] = Math.random();
      // }

      // these are used for changing the form
      // of the tomagotchi
      this.pictures = pictures;
      this.morphTimes = morphTimes;
      this.morphCounter = 0;
    }

    timeToMorph()
    {
      let maxCounter = Math.min(this.morphTimes.length, this.pictures.length);

      if((this.age === this.morphTimes[this.morphCounter])
      && (this.morphCounter < maxCounter))
      {
        // replace the tomagotchi's current image with the next one
        $('#screen').empty();
        this.morphCounter++;
        $('#screen').append(`<img src="${this.pictures[this.morphCounter]}.jpg">`);

        console.log("maxCounter: " + maxCounter);
        console.log("Your tomagotchi grew up!");
      }
      else if(this.age === 0)
      {
        $('#screen').append(`<img src="${this.pictures[0]}.jpg">`);
        console.log("A tomagotchi is born! YAY!!!");
        //console.log("Image: " + this.pictures[])
      }
    }

    eat()
    {
       if(this.hunger > 1)
        {
          this.hunger--;
          console.log("YUMMY!!!");
        }

        $('#hunger').text(`Hunger: ${this.hunger}`);
    }
    sleep(interval)
    {
       if(this.sleepiness > 1)
       {
          this.sleepiness--;
          console.log("sleeping...");
       }

       $('#sleepiness').text(`Sleepiness: ${this.sleepiness}`);
    }

    isDead() {
      if(this.sleepiness >= 10 || this.boredom >= 10 || this.hunger >= 10)
      {
        this.dead = true;
      }
    }

    play(){
      let guess = 0;
      let answer = 0;
      let points = 1;

      // for(let i = 0; i < 10; i++)
      // {
      //   guess = Math.random();
      //   answer = Math.random();
      //
      //   if(guess >= answer){ points++; }
      // }

      this.boredom -= points;

      if(this.boredom < 1) { this.boredom = 1; }

      console.log("WHEEEEE!!!");

      $('#boredom').text(`Boredom: ${this.boredom}`);
    }

    getName() { return this.name; }
    getBoredom() { return this.boredom; }
    getHunger() { return this.hunger; }
    getSleepiness() { return this.sleepiness; }
    getAge() { return this.age; }
  }


  // start the timer when the tomagotchi is born


  const pics1 = ['https://imgur.com/RovunBV',
                'https://imgur.com/gLUOC8y',
                'https://imgur.com/PrYoUt4',
                'https://imgur.com/WjbdUeQ',
                'https://imgur.com/vs3FoZw'];
  //const morph1 = [15, 67, 150, 200];
  const morph1 = [5, 10, 15, 20];

  const pics2 = ['https://imgur.com/CpopRvQ',
                'https://imgur.com/AAgwtmd',
                'https://imgur.com/vzQuuQo',
                'https://imgur.com/0Fw3A5K',
                'https://imgur.com/y3StVVM'];
  const morph2 = [30, 65, 140, 185];

  const pics3 = ['https://imgur.com/RovunBV',
                'https://imgur.com/xRJQr73',
                'https://imgur.com/MlWlHAO',
                'https://imgur.com/AMH0b7l',
                'https://imgur.com/oRBKgcV'];
   const morph3 = [45, 115, 200, 300];

   const personality1 = [5, 2, 10];
   //const personality2 =

  // let morty = new Tamagotchi("pookie", pics1, morph1);
  // let seconds = 0;

  const timePassing = () => {
    if(morty.dead === false)
    {
      console.log("morphCounter: " + morty.morphCounter);
      morty.timeToMorph();
      console.log(`It has been ${seconds} seconds`);
      seconds++;
      morty.age = seconds;

      mortysTime.displayTime();
      mortysTime.setSeconds(seconds);

      if(seconds % 3 === 0)
      {
        morty.hunger++;
        $('#hunger').text(`Hunger: ${morty.hunger}`) ;
      }
      if(seconds % 10 === 0)
      {
        morty.boredom++;
        $('#boredom').text(`Boredom: ${morty.boredom}`);
      }
      if(seconds % 25 === 0)
      {
        morty.sleepiness++;
        $('#sleepiness').text(`Sleepiness: ${morty.sleepiness}`);
      }

      if(morty.hunger >= 10 || morty.boredom >= 10 || morty.sleepiness >= 10){
        morty.dead = true;
        console.log(`Funeral services will be held Sunday for ${morty.name}`);
        console.log(`Time of Death: `);
        mortysTime.displayTime();
        clearInterval(timePasses);
      }

      console.log(`sleepiness: ${morty.sleepiness}`);
      console.log(`hunger: ${morty.hunger}`);
      console.log(`boredom: ${morty.boredom}`);
      console.log('\n');
    }

  }

  let morty = null;
  let mortysTime = null;
  let timePasses = null;
  let seconds = 0;


  $('#feed-btn').on('click', () => { morty.eat(); });
  $('#light-btn').on('click', () => { morty.sleep(); });
  $('#play-btn').on('click', () => { morty.play(); });

  $('#egg1-link').on('click', () => {
    $('.tomagotchi-choice').css('visibility', 'hidden');
    $('.tomagotchi-interface').css('visibility', 'visible');

    morty = new Tamagotchi("pookie", pics1, morph1);
    mortysTime = new Timer(0,0,0,0);
    timePasses = setInterval(timePassing, 1000);
  });

  $('#egg2-link').on('click', () => {
    $('.tomagotchi-choice').remove();
    $('.tomagotchi-interface').show();

    morty = new Tamagotchi("pookie", pics2, morph1);
    mortysTime = new Timer(0,0,0,0);
    timePasses = setInterval(timePassing, 1000);
  });

  $('#egg3-link').on('click', () => {
    $('.tomagotchi-choice').remove();
    $('.tomagotchi-interface').css('visibility', 'visible');

    morty = new Tamagotchi("pookie", pics3, morph1);
    mortysTime = new Timer(0,0,0,0);
    timePasses = setInterval(timePassing, 1000);

  });
});
