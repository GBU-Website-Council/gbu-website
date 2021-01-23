$(document).ready(function () {

  $(function () {
    $('#collapse-button').on('click', function () {
      $('.flex-nav ul').toggleClass('open');
    });
  });


  if ($(window).width() < 768) {
    $('#form-search-box').removeClass('mr-0');
    $('#form-search-box').addClass('mx-auto');
  } else {
    $('#form-search-box').removeClass('mx-auto');
    $('#form-search-box').addClass('mr-0');
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 555.5 && $(window).width() > 480) {
      $('.logo').css({ 'width': '7.2vh  ' });
      $('#college-name').css({ 'font-size': '2vh' });
      $('.nav-2').css({ 'font-size': '12px' });
      $('.college-name-tag').css({ 'font-size': '1vh' });
      $('.main-navigation-a').css({ 'font-size': '14px' });
      $('.main-navigation-a').css({ 'padding': '5.0px' });
      $('.college-name-tag').fadeOut(300);
    }
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 555.5 && $(window).width() > 768) {
      $('.logo').css({ 'width': '7.7vh' });
      $('#college-name').css({ 'font-size': '2.1vh' });
      $('.nav-2').css({ 'font-size': '14px' });
      $('.college-name-tag').css({ 'font-size': '1vh' });
      $('.main-navigation-a').css({ 'font-size': '14px' });
      $('.main-navigation-a').css({ 'padding': '5px' });
      $('.college-name-tag').fadeOut(300);
    }
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 555.5 && $(window).width() > 992) {
      $('.logo').css({ 'width': '9vh' });
      $('#college-name').css({ 'font-size': '2.1vh' });
      $('.college-name-tag').css({ 'font-size': '1.2vh' });
      $('.nav-2').css({ 'font-size': '14px' });
      $('.main-navigation-a').css({ 'font-size': '14px' });
      $('.main-navigation-a').css({ 'padding': '5px' });
      $('.college-name-tag').fadeOut(300);
    }
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 555.5 && $(window).width() > 1200) {
      $('.logo').css({ 'width': '10vh' });
      $('#college-name').css({ 'font-size': '2.4vh' });
      $('.nav-2').css({ 'font-size': '14px' });
      $('.college-name-tag').css({ 'font-size': '1.5vh' });
      $('.main-navigation-a').css({ 'font-size': '14px' });
      $('.main-navigation-a').css({ 'padding': '5px' });
      $('.college-name-tag').fadeOut(300);
    }
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////



  $(window).scroll(function () {
    if ($(this).scrollTop() < 350.5 && $(window).width() > 480) {
      $('.logo').css({ 'width': '7.2vh' });
      $('#college-name').css({ 'font-size': '2vh' });
      $('.college-name-tag').css({ 'font-size': '1vh' });
      $('.nav-2').css({ 'font-size': '14px' });
      $('.main-navigation-a').css({ 'font-size': '15px' });
      $('.main-navigation-a').css({ 'padding': '7px' });
      $('.college-name-tag').fadeIn(500);
    }
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() < 350.5 && $(window).width() > 768) {
      $('.logo').css({ 'width': '7.7vh' });
      $('#college-name').css({ 'font-size': '2.1vh' });
      $('.nav-2').css({ 'font-size': '14px' });
      $('.college-name-tag').css({ 'font-size': '1vh' });
      $('.main-navigation-a').css({ 'font-size': '15px' });
      $('.main-navigation-a').css({ 'padding': '7px' });
      $('.college-name-tag').fadeIn(500);
    }
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() < 350.5 && $(window).width() > 992) {
      $('.logo').css({ 'width': '9vh' });
      $('#college-name').css({ 'font-size': '2.2vh' });
      $('.college-name-tag').css({ 'font-size': '1.2vh' });
      $('.nav-2').css({ 'font-size': '14px' });
      $('.main-navigation-a').css({ 'font-size': '15px' });
      $('.main-navigation-a').css({ 'padding': '7px' });
      $('.college-name-tag').fadeIn(500);
    }
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() < 350.5 && $(window).width() > 1200) {
      $('.logo').css({ 'width': '10vh' });
      $('#college-name').css({ 'font-size': '2.4vh' });
      $('.nav-2').css({ 'font-size': '14px' });
      $('.college-name-tag').css({ 'font-size': '1.5vh' });
      $('.main-navigation-a').css({ 'font-size': '15px' });
      $('.main-navigation-a').css({ 'padding': '7px' });
      $('.college-name-tag').fadeIn(500);
    }
  });


  $(".d-h-m").hover(function () {
    $('>.dropdown-menu', this).stop(true, true).fadeIn("fast");
    $(this).addClass('open');
  },
    function () {
      $('>.dropdown-menu', this).stop(true, true).fadeOut("fast");
      $(this).removeClass('open');
    });


  // manual carousel controls
  $('.next').click(function () { $('.carousel').carousel('next'); return false; });
  $('.prev').click(function () { $('.carousel').carousel('prev'); return false; });


  //counting numbers   
  $('.numberCounter').each(function () {
    $(this).prop('Counter', 1).animate({
      Counter: $(this).text()
    }, {
      duration: 2000,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });



  });


});
$(document).ready(function () {
  $('.mdb-select').materialSelect();
})

//=================== News Button JS-================

//  Function for Menu collaps---------------------
function showCollapsNewsmenu() {
  var myTab = document.getElementById("myTab");
  var menuDisplay = myTab.style.display;
  if (menuDisplay == "none") {
    myTab.style.display = 'block';
  } else {
    myTab.style.display = 'none';
  }
}

// function for active Button ---------------------
function active(y, x, z) {
  document.getElementById("newsMenu").innerHTML = y;
  var myTab = document.getElementById("myTab");

  if (sw.matches) { // If media query matches
    myTab.style.display = 'none';
  }
}

//  function for Windows width, (Menu hide or show) --
function myFunction(sw) {
  if (sw.matches) { // If media query matches
    document.getElementById("myTab").style.display = 'none';
  } else {
    document.getElementById("myTab").style.display = 'block';
  }
}

//  Getting value of screen width --------------------
var sw = window.matchMedia("(max-width: 992px)");
myFunction(sw); // Call listener function at run time
sw.addListener(myFunction);

//===================End  News Button JS-================

//===================POPUP JS-================

$(document).ready(function () {
  var id = '#dialog';
  var maskHeight = $(document).height();
  var maskWidth = $(window).width();
  $('#mask').css({ 'width': maskWidth, 'height': maskHeight });
  $('#mask').fadeIn(500);
  $('#mask').fadeTo("slow", 0.9);
  var winH = $(window).height();
  var winW = $(window).width();
  $(id).css('top', winH / 2 - $(id).height() / 2);
  $(id).css('left', winW / 2 - $(id).width() / 2);
  $(id).fadeIn(2000);
  $('.window .close').click(function (e) {
    e.preventDefault();
    $('#mask').hide();
    $('.window').hide();
  });
  $('#mask').click(function () {
    $(this).hide();
    $('.window').hide();
  });

});

//===================End  POPUP JS-================


