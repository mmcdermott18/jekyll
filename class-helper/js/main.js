// TO DO LIST
// 2a. Multiple saved lists
// 2b. Updated current saved list
// 3a. Display set time somewhere
// 4. Add count down timer for overall timeout
// 5. Add count down timer for group time
// 6. Add count down timer for individual time
// 7. Start class button that displays current group/person with relevant timer(s)
// 8. Add in break (length, how many)
// 10. Style

$(document).ready(function() {
    // run function on initial page load
    clicks();
    saveButton();
    // run function on resize of the window
    $(window).resize(function() {

    });
    // run function on scroll
    $(window).scroll(function() {

    });
});
var i = 0;
var t = 0;
var v = 0;
var classArray = [];
var groupArray = [];
var nameList = [];
var shuffledList = [];
var storedNames = [];
var time;
var breakNumber = 0;
var breakDuration = 0;
function clicks() {
  $('#button1').click(function() {
    names();
  });
  $('#names').keypress(function(e){
    if(e.which == 13){//Enter key pressed
      names();//Trigger search button click event
    }
  });
  $('#button2').click(function() {
    randomList();
  });
  $('#button3').click(function() {
    group();
  });
  $('#groups').keypress(function(e){
    if(e.which == 13){//Enter key pressed
      group();//Trigger search button click event
    }
  });
  $('#button4').click(function() {
    showIt();
  });
  $('#button5').click(function() {
    saveIt();
  });
  $('#button6').click(function() {
    setTime();
  });
  $('#hours, #minutes, #nB, #tB').keypress(function(e){
    if(e.which == 13){
      setTime();
    }
  });
  $('#buttonClear').click(function() {
    $('#shuffled').empty();
    $('#groupings').empty();
    $('#PPTime').empty();
    $('#shuffledTime').empty();
  });
  $('#begin').click(function() {
    startClass();
  });
}
function checkList() {
  var oldArray = $("#list li").map(function() {
                     return $(this).text();
                  }).get();
  nameList = oldArray;
}
function names() {
  checkList();
  i = nameList.length;
  nameList[i] = $('#names').val();
  $("#list").append('<li class="names">' + nameList[i] + '</li>');
  i++;
  $('#names').val("");
  remove();
}
function saveIt() {
  var saveName = $('#save').val();
  localStorage.setItem("saveName", JSON.stringify(saveName));
  var savedName = JSON.parse(localStorage.getItem("saveName"));
  var nameList = $("#list li").map(function() {
                     return $(this).text();
                  }).get();
  var storedList = nameList;
  localStorage.setItem("storedList", JSON.stringify(storedList));
  var storedNames = JSON.parse(localStorage.getItem("storedList"));
  saveButton();
}
function saveButton() {
  var savedName = JSON.parse(localStorage.getItem("saveName"));
  if (savedName == null) {
    $('#button4').css('display', 'none');
  } else {
    $('#button4').css('display', 'block');
    $('#button4').val(savedName);
  }
}
function showIt() {
  var storedNames = JSON.parse(localStorage.getItem("storedList"));
  $('#list').empty();
  for (var a = 0; a < storedNames.length; a++) {
      $("#list").append('<li>' + storedNames[a] + '</li>');
  }
  var nameList = storedNames;
  checkList();
  remove();
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function randomList() {
  checkList();
  shuffledList = shuffle(nameList);
  $('#shuffled').empty();
  $('#groupings').empty();
  $('#PPTime').empty();
  $('#shuffledTime').empty();
  if (time == null) {

  } else {
    var timePP = Math.floor(time / shuffledList.length);
    $("#shuffledTime").append('<p>' + timePP + ' minutes each</p>');
  }
  var slMax = parseInt(shuffledList.length) + parseInt(breakNumber);
  for (var y = 0; y < shuffledList.length; y++) {
      $("#shuffled").append('<li>' + shuffledList[y] + '</li>');
  }
}
function setTime() {
  minutes = $('#minutes').val();
  if (minutes == false) {
    minutes = 0;
  } else {
    minutes = $('#minutes').val();
  }
  hours = $('#hours').val();
  if (hours == false) {
    hours = 0;
  } else {
    hours = $('#hours').val();
  }
  breakNumber = $('#nB').val();
  if (breakNumber == false) {
    breakNumber = 0;
  } else {
    breakNumber = $('#nB').val();
  }
  breakDuration = $('#tB').val();
  if (breakDuration == false) {
    breakDuration = 0;
  } else {
    breakDuration = $('#tB').val();
  }
  htom = (hours * 60);
  var breakTotal = breakDuration * breakNumber;
  time = parseInt(minutes) + parseInt(htom) - parseInt(breakTotal);
  $("#setTime").text('The time is set for ' + hours + ' hour(s) and ' + minutes + ' minute(s). There is/are ' + breakNumber + ' break(s) lasting ' + breakDuration + ' minute(s) each for a total of ' + time + ' minutes of critique.');
  $('#minutes').val("");
  $('#hours').val("");
  $('#nB').val("");
  $('#tB').val("");
  minutes = 0;
  hours = 0;
  if ($('#groupings').text().length > 0) {
    group();
  } if ($('#shuffled').text().length > 0) {
    randomList();
  } else {

  }
}
function group() {
  checkList();
  $('#shuffled').empty();
  $('#groupings').empty();
  $('#PPTime').empty();
  $('#shuffledTime').empty();
  var numbering = 1;
  $('#groupings').empty();
  var array = shuffle(nameList);
  var groups = $('#groups').val();
  var perPerson = Math.floor(time / array.length);
  var a=0,b,c = 0, z;
  if ( isNaN(perPerson) == true) {

  } else {
    $('#PPTime').text(perPerson + ' minutes each');
  }
  for (z=0; z<groups; z++) {
    var temparray = [];
     a=c;
    for (a, b=array.length; a<b; a = parseInt(a) + parseInt(groups)) {
      temparray.push(array[a]);
    }
    if (time == null) {
      var timePP = " - Time not set";
    } else {
      var timePP = " - " + perPerson * temparray.length + " minutes per group";
    }
    $("#groupings").append('<p>Group ' + numbering +  timePP + ' </p><ul id="group' + numbering + '"></ul>');
    var id = "#group" + numbering;
    numbering++;
    for (var x = 0; x < temparray.length; x++) {
        $(id).append('<li>' + temparray[x] + '</li>');
    }
    a++;
    c++;
  }
  $('#groups').val("");
}
function remove() {
  $('#list li').click(function(e) {
    if(e.handled !== true) {
      console.log($(this).index());
      var removeIndex = $(this).index();
      nameList.splice(removeIndex, 1);
      console.log(nameList);
      $(this).remove();
      e.handled = true;
    }
  });
}
function startClass() {
  if ($('#groupings').text().length > 0) {
    if (t < nameList.length) {
      console.log('this should fire');
      $('ul[id*="group"]').find('li').each(function(){
        classArray.push( $(this).text() );
      });
      $('#groupings').find('ul').each(function(){
        groupArray.push( $(this).attr("id") );
      });
      console.log(classArray);
      console.log(groupArray)
      // countdown();
    }
    else {
      $('.countdown').html('Time is up.');
    }
  } if ($('#shuffled').text().length > 0) {
    if (t < shuffledList.length) {
      classArray = shuffledList;
      countdown();
    }
    else {
      $('.countdown').html('Time is up.');
    }
  } else {

  }
}
function countdown() {
  console.log(classArray);
  var timePP = Math.floor(time / classArray.length);
  var timer2 = timePP + ":01";
  var interval = setInterval(function() {
    var timer = timer2.split(':');
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = (seconds < 0) ? --minutes : minutes;
    seconds = (seconds < 0) ? 59 : seconds;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    $('.countdown').html(classArray[t] + ' has ' + minutes + ':' + seconds + ' left');
    timer2 = minutes + ':' + seconds;
    if (minutes == 0 && seconds == 0) {
      clearInterval(interval);
      t++;
      startClass();
    }
  }, 10);
  // above number should be 1000 for normal countdown
}
