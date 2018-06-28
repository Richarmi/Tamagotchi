


// website functionality for the Tamagotchi
$(() =>
{

  class Personality {
    constructor(factors1, factors2, factors3)
    {
      this.hungryFactors = [];
      this.tiredFactors = [];
      this.boredomFactors = [];
      this.thirdMin = 0;


      const firstMin = Math.min(factors1.length, factors2.length);
      const secondMin = Math.min(factors2.length, factors3.length);
      this.thirdMin = Math.min(firstMin, secondMin);

      // initiate the personality factors
      for(let i = 0; i < this.thirdMin; i++)
      {
        // if(factors1[i] === 0) { this.hungryFactors[i] = 1; }
        // else { this.hungryFactors[i] = factors1[i]; }
        //
        // if(factors2[i] === 0) { this.tiredFactors[i] = 1; }
        // else { this.tiredFactors[i] = factors2[i]; }
        //
        // if(factors3[i] === 0) { this.boredomFactors[i] = 1; }
        // else { this.boredomFactors[i] = factors3[i];}

        this.hungryFactors[i] = factors1[i];
        this.tiredFactors[i] = factors2[i];
        this.boredomFactors[i] = factors1[i];

        console.log(this.hungryFactors[i] + " " + this.tiredFactors[i] + " " + this.boredomFactors[i]);
      }
    }

    getHungryFactor()
    {
       let y = Math.floor(Math.random() * this.thirdMin);
       let x = this.hungryFactors[Math.floor(Math.random() * this.thirdMin)];
       console.log(x + " " + y);
       return x;
    }

    getTiredFactor()
    {
       return this.tiredFactors[Math.floor(Math.random() * this.thirdMin)];
    }

    getBoredomFactor()
    {
       return this.boredomFactors[Math.floor(Math.random() * this.thirdMin)];
    }

    getRandomIndex() { return Math.floor(Math.random() * this.thirdMin); }

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

   var personalityTrait1 = [5, 2, 10];
   var personalityTrait2 = [7, 5, 5];
   var personalityTrait3 = [7, 7, 7];
   //const personality2 =

  // let morty = new Tamagotchi("pookie", pics1, morph1);
  // let seconds = 0;

  const timePassing = () => {
    if(morty.dead === false)
    {
      console.log("morphCounter: " + morty.morphCounter);
      morty.timeToMorph();
      console.log(`It has been ${seconds} seconds`);

      console.log("hungry factor: " + mortysPersonality.getHungryFactor());
      console.log("boredom factor: " + mortysPersonality.getBoredomFactor());
      console.log("tired factor: " + mortysPersonality.getTiredFactor());

      seconds++;
      morty.age = seconds;

      mortysTime.displayTime();
      mortysTime.setSeconds(seconds);

      if(seconds % mortysPersonality.getHungryFactor() === 0)
      {
        console.log("hungry factor: " + mortysPersonality.getHungryFactor());
        morty.hunger++;
        $('#hunger').text(`Hunger: ${morty.hunger}`) ;
      }
      if(seconds % mortysPersonality.getBoredomFactor() === 0)
      {
        console.log("boredom factor: " + mortysPersonality.getBoredomFactor());
        morty.boredom++;
        $('#boredom').text(`Boredom: ${morty.boredom}`);
      }
      if(seconds % mortysPersonality.getTiredFactor() === 0)
      {
        console.log("tired factor: " + mortysPersonality.getTiredFactor());
        morty.sleepiness++;
        $('#sleepiness').text(`Sleepiness: ${morty.sleepiness}`);
      }

      if(morty.hunger >= 10 || morty.boredom >= 10 || morty.sleepiness >= 10){
        morty.dead = true;
        $('#current-status').text("Status: Dead");

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

  // declare the tomagotchi's existence
  // within the global scope
  let thisName = "???";
  let mortysPersonality = null;
  let morty = null;
  let mortysTime = null;
  let timePasses = null;
  let seconds = 0;

  $('form').on('submit', (e) => {
  // Which stops the form from refreshing the page
  e.preventDefault(); // keep the page from refreshing

  thisName = $('tomagotchi-name').val();
  $('#name-plate').append("<h3>" + thisName + "</h3>");

});

  $('#feed-btn').on('click', () => { morty.eat(); });
  $('#light-btn').on('click', () => { morty.sleep(); });
  $('#play-btn').on('click', () => { morty.play(); });

  $('#egg1-link').on('click', () => {
    $('.tomagotchi-choice').remove();
    $('.tomagotchi-interface').css('visibility', 'visible');

    // declare the new tomagotchi's personality
    mortysPersonality = new Personality(personalityTrait2, personalityTrait2, personalityTrait1);

    // declare the values of the new tomagotchi
    morty = new Tamagotchi(thisName, pics1, morph1);

    // start the timer when the tomagotchi is born
    mortysTime = new Timer(0,0,0,0);

    // start the life of the new tomagotchi
    timePasses = setInterval(timePassing, 1000);
  });

  $('#egg2-link').on('click', () => {
    $('.tomagotchi-choice').remove();
    $('.tomagotchi-interface').css('visibility', 'visible');

    mortysPersonality = new Personality(personalityTrait1, personalityTrait2, personalityTrait3);
    morty = new Tamagotchi(thisName, pics2, morph1);
    mortysTime = new Timer(0,0,0,0);
    timePasses = setInterval(timePassing, 1000);
  });

  $('#egg3-link').on('click', () => {
    $('.tomagotchi-choice').remove();
    $('.tomagotchi-interface').css('visibility', 'visible');

    mortysPersonality = new Personality(personalityTrait3, personalityTrait3, personalityTrait3);
    morty = new Tamagotchi(thisName, pics3, morph1);
    mortysTime = new Timer(0,0,0,0);
    timePasses = setInterval(timePassing, 1000);
  });

});
