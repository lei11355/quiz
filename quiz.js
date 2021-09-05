var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
    {
      q: "Q1: How is jquery usually imported into a javascript module",
      o: [
        "1. default from 'jquery'",
        "2. import 'jquery'",
        "3. import $ from 'jquery'",
        "4. import {$}from 'jquery"
      ],
      a: 3 // arrays start with 0, so answer is 70 meters
    },
    {
      q: "Q2: What does a call to super() accomplish",
      o: [
        "1. It optmizes a function call",
        "2. It executes a fuction a a base class",
        "3. It overrides a base class function",
        "4. It executes a function with highest priority"
      ],
      a: 2
    },
    {
      q: "Q3: You found an error in a form's field, and you want to set its border color to red, how do you accomplish this?",
      o: [
        "1. textField.style.bordercolor='red'",
        "2. textField.style.borderColor='red'",
        "3. textField.bordercolor='red'",
        "4. textField.border-color='red'"
      ],
      a: 2
    },
    {
      q: "Q4: Why should you avoid Javascript's eval() function when possible?",
      o: [
        "1. It is prone to Javascript injection attacks",
        "2. It causes poor performing code.",
        "3. It creates an isolated scope",
        "4. It causes slow evaluations"
      ],
      a: 1
    },
    {
      q: "Q5: How would you create a JSON string from a javascript object",
      o: [
        "1. JSON.Parse(obj)",
        "2. JSON.stringfy(obj)",
        "3. obj.parseJSON()",
        "4. obj.toJSON()"
      ],
      a: 2
    }
  ],

  w1: "Coding Quiz Challenge ",
  w2: "Try to answer the following code-related questions within the time limit.Keep in mind that incorrect answers will penalize your score/time by ten seconds!",
  // (A2) HTML ELEMENTS
  discover: 0,
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper
  svp: null,
  fsw: null,
  sdk: null,
  ininame: null,
  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score
  ButtonEl: null,

  timeleft: 60,
  // (B) INIT QUIZ HTML

  beforeInit: function () {

    if (document.getElementById("smbid") != null) document.getElementById("smbid").style.display = "none";
    if (document.getElementById("quizQn") != null) document.getElementById("quizQn").style.display = "none";
    
    quiz.hWrap = document.getElementById("quizWrap");
    quiz.svp = document.createElement("div");
    quiz.svp.id = "firstpage";
    
    quiz.hWrap.appendChild(quiz.svp);
    quiz.svp.innerHTML = quiz.w1;
    quiz.svj= document.createElement("div");
    quiz.svj.id = "secondline";
    
    quiz.hWrap.appendChild(quiz.svj);
    quiz.svj.innerHTML = quiz.w2;

    //create button

    quiz.ButtonEl = document.createElement("button");
    quiz.ButtonEl.id = "startbutton";
    quiz.ButtonEl.textContent = "Start";
    quiz.hWrap.appendChild(quiz.ButtonEl);

    quiz.ButtonEl.addEventListener("click", quiz.init);
    
},

  lastscreen: function () {
   

    var inivalue = document.querySelector("input[name='myname']").value;
   // alert(inivalue);
    if(document.getElementById("smbid")!=null) document.getElementById("smbid").remove();
    document.querySelector("input[name='myname']").remove();
    document.getElementById("lbgetscoreid").style.display="none";
    let lbscore = document.createElement("label");
    lbscore.textContent = inivalue + " , Your total score is " +quiz.score;
    quiz.hWrap.appendChild(lbscore);
   
  },



  init: function () {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    let f = document.getElementById("firstpage");
    //f.remove();
    f.style.display = "none";
    let g = document.getElementById("secondline");
    //g.remove();
    g.style.display = "none";
    let h = document.getElementById("startbutton");
    //h.remove();
    h.style.display = "none";



    // (B2) QUESTIONS SECTION

    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();

    quiz.countdown();
    // let g=document.getElementById("tf");
    // g.remove();
  },
  countdown: function () {
    var timeLeft = 60;
    let lb = document.createElement("label");
    lb.textContent = "Time remaining: ";
    lb.id = "lbl1";
    quiz.hWrap.appendChild(lb);
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1122
      if (timeLeft > 1) {

        // Set the `textContent` of `timerEl` to show the remaining seconds
        lb.textContent = timeLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        //alert(timeLeft);
        timeLeft--;
      } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        lb.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        lb.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        // displayMessage();
      }
    }, 1000);
  },
  // (C) DRAW QUESTION
  draw: function () {



    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;
    //console.debug(quiz.hQn.innerHTML);
    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {



      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", quiz.select);
      let g = document.getElementById("tf");
      if (g != null)
        g.remove();
     
      quiz.hAns.appendChild(label);


    }
   
  },

  // (D) OPTION SELECTED
  select: function () {
    // (D1) DETACH ALL ONCLICK
    // let all = quiz.hAns.getElementsByTagName("label");
    // for (let label of all) {
    //   label.removeEventListener("click", quiz.select);
    // }

    // (D2) CHECK IF CORRECT


    let correct = this.dataset.idx == (quiz.data[quiz.now].a - 1);
    // alert(quiz.data[quiz.now].a);
    // alert("this.dataset.idx" + this.dataset.idx);
    if (correct) {
      quiz.score++;
      this.classList.add("correct");
    } else {
      this.classList.add("wrong");
    }
    
    if (quiz.now < quiz.data.length ) {
      //alert(quiz.data.length);
      quiz.sdk = document.createElement("div");
      quiz.sdk.id = "tf";
      quiz.hWrap.appendChild(quiz.sdk);

      // alert(correct);
      if (correct)
        quiz.sdk.innerHTML = "Right";
      else
        quiz.sdk.innerHTML = "Wrong";
    }



    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(function () {
      if (quiz.now < quiz.data.length) {
        quiz.draw();




      }
      else {
        //add your initial
       
        let lbgetscore = document.createElement("label");
        lbgetscore.id="lbgetscoreid";
        lbgetscore.textContent = " please enter your initial to retrieve your final score    "
        quiz.hWrap.appendChild(lbgetscore);

    
        quiz.sdk.style.display="none";
        //var taskNameInput = document.querySelector("input[name='myname']").value;
        var yourini = document.createElement("input");
        yourini.name = 'myname';
        yourini.type = Text;
        yourini.id = "initid"

        quiz.hWrap.appendChild(yourini);
        
        var smButtonEl = document.createElement("button");
        smButtonEl.textContent = "submit";
        smButtonEl.id = "smbid";
        if (document.getElementById("smbid") === null) {

         
          quiz.hWrap.appendChild(smButtonEl);
          //
          //smButtonEl.addEventListener("click",quiz.beforeInit);
          //quiz.ininame=yourini.value();
          localStorage.setItem("initialname", yourini.value);
          localStorage.setItem("myscore", quiz.score);
          smButtonEl.addEventListener("click", quiz.lastscreen);

        }

        document.getElementById("quizQn").style.display="none";
       // quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
        //document.getElementById("lbl1").remove();
        document.getElementById("lbl1").style.display = "none";


      }
    }, 1000);



  },

  // (E) RESTART QUIZ
  reset: function () {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};

window.addEventListener("load", quiz.beforeInit);
//window.addEventListener("load", quiz.init);
