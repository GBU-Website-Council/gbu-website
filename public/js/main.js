$( document ).ready(function() {
  
  $(function(){
    $('.toggleNav').on('click',function(){
      $('.flex-nav ul').toggleClass('open');
    });
  });
  
   $(window).scroll(function(){
    if($(this).scrollTop()>555.5){
      $('.logo').css({'width':'55px'});
      $('#college-name').css({'font-size':'16px'});
      $('.nav-2').css({'font-size':'12px'});
      $('.main-navigation-a').css({'font-size':'14px'});
      $('.main-navigation-a').css({'padding':'8px'});
      $('.college-name-tag').fadeOut(50);
      
     
      }
    });

    
  
    $(window).scroll(function(){
    if($(this).scrollTop()<555.5){
      $('.logo').css({'width':'70px'});
      $('#college-name').css({'font-size':'14px'});
      $('.nav-2').css({'font-size':'14px'});
      $('.main-navigation-a').css({'font-size':'16px'});
      $('.main-navigation-a').css({'padding':'10px'});
      $('.college-name-tag').fadeIn(50);     
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