$( document ).ready(function() {
  
  $(function(){
    $('#collapse-button').on('click',function(){
      $('.flex-nav ul').toggleClass('open');
    });
  });
  
   $(window).scroll(function(){
    if($(this).scrollTop()>555.5){
      $('.logo').css({'width':'8vh'});
      $('#college-name').css({'font-size':'2.4vh'});
      $('.nav-2').css({'font-size':'12px'});
      $('.main-navigation-a').css({'font-size':'14px'});
      $('.main-navigation-a').css({'padding':'8px'});
      $('.college-name-tag').fadeOut(10);
     
      }
    });
  
    $(window).scroll(function(){
    if($(this).scrollTop()<350.5){
      $('.logo').css({'width':'10vh'});
      $('#college-name').css({'font-size':'2.3vh'});
      $('.nav-2').css({'font-size':'14px'});
      $('.main-navigation-a').css({'font-size':'16px'});
      $('.main-navigation-a').css({'padding':'10px'});
      $('.college-name-tag').fadeIn(500);     
      }
    });

    $(".dropdown").hover(function () {
        $('>.dropdown-menu', this).stop(true, true).fadeIn("fast");
        $(this).addClass('open');
    },
    function () {
        $('>.dropdown-menu', this).stop(true, true).fadeOut("fast");
        $(this).removeClass('open');
    });  
    
      // manual carousel controls
    $('.next').click(function(){ $('.carousel').carousel('next');return false; });
    $('.prev').click(function(){ $('.carousel').carousel('prev');return false; });
    

    //counting numbers   
    $('.numberCounter').each(function () {
    $(this).prop('Counter',1).animate({
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
$(document).ready(function() {
$('.mdb-select').materialSelect();
})


//=================== News Button JS-================

function showCollapsNewsmenu() {
    var x = document.getElementById("myTab");
    var d = x.style.display;
    if (d == "none") {
    x.style.display = 'block';
    } else {
    x.style.display = 'none';
    }
  }
  function active(y, x, z) {
    document.getElementById("newsMenu").innerHTML = y;
    // var xx = x.getElementsByTagName("span")[0];
    // xx.classList.add("news-active");
  }
  function myFunction(x) {
    if (x.matches) { // If media query matches
    document.getElementById("myTab").style.display = 'none';
    } else {
    document.getElementById("myTab").style.display = 'block';
    }
  }
  var x = window.matchMedia("(max-width: 992px)");
  myFunction(x); // Call listener function at run time
  x.addListener(myFunction);