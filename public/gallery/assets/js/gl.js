
  var x, p=1, y, t, n = 0;
  var zoomin = document.getElementsByClassName("zoomin")[0];
  var zoomout = document.getElementsByClassName("zoomout")[0];
  var sliderH = document.getElementById("seekslider");
  var sliderV = document.getElementById("seekslider-v");
  var vr_img = document.getElementById("vr-img");

window.onload = function() {


  //sliding HR
  sliderH.oninput = function() {
    bgposition = sliderH.value;
    x = (bgposition)*35;
    $('#vr-img').css('background-position',  -x+'px', '0px');
  }
  //sliding vR
  sliderV.oninput = function() {
    tpos = sliderV.value;
    y = tpos-50;
    if (y<0) {
      y =  y*((2)*n);
      console.log(n+"  "+y);
      $('#vr-img').css('top', y+"%");

    } else if(y >0){
      y =  y*((2)*n);
      console.log(n+"  "+y);
      $('#vr-img').css('top', y+"%");
    } else{
      $('#vr-img').css('top', "0%");
    }
  }

  // Top increas

  function top(){
    t = 100*n-50;
    console.log(n+"  "+t);
    return t;
  }
  // Zoom In and Out
  zoomin.addEventListener("click", zoomIn);
  zoomout.addEventListener("click", zoomOut);

  //zoom in
  var sc = 0; 
  function zoomIn(){
    if (sc < 10){
      n++;
      top();
      sc +=2; 
      $('#vr-img').css('transform','scale('+sc+')');
    }
    
  }

  //zoomout
  function zoomOut(){
    if (sc >0){
      sc -=2;
      if (n >0) { n--;}
      top();
      if (sc <= 0){sc = 1;}
      $('#vr-img').css('transform','scale('+sc+')');
    }
  }

  //  Play Pause
  // $("#playPause").click(function(){
  //   if (p == 1 ) {
  //     play();
  //   } else {
  //     pause();
  //   }
    
  // });
  // function play() {
  //   p = 0;
      
  //     $('#playPause').css({'background-color': '#14ff31c4'});
  //     $('#vr-img').animate({
  //       'background-position-x': '210%',
  //       'background-position-y': '0px'
  //   }, 20000, 'linear');
  //     $('#vr-img').css({'background-position-x': '0%'});
      
  // }
  // function pause() {
  //   p=1;
  //     $('#playPause').css({'background-color': '#dc3545'});
  //     $('#vr-img').stop();
      
  // }
//------------ GWtting image




// ---------------END WINDOW ON LOAD -----------------------------------
}


//  Vr ---------------------------------------------------------------------------------------
function fullsrc(x) {
document.getElementById("vrFull").style.width = "100%";
document.getElementById("headermain").style.display="none";
document.getElementById("headermain2").style.position="unset";
var vrImg = document.getElementById("vr-img");
switch(x){
    case 'mainGate':
      $('#vr-img').css({'background-image': 'url(assets/360/1.vr.jpg)'});
      document.getElementById("info").innerHTML='Main Gate of Gautam Buddha university';
      break;
    case 'library':
      $('#vr-img').css({'background-image': 'url(assets/360/8.vr.jpg)'});
      document.getElementById("info").innerHTML='Bodhisattva Dr. B.R. Ambedkar Library Central Library';
      break;
    case 'meditationIn':
      $('#vr-img').css({'background-image': 'url(assets/360/3.vr.jpg)'});
      document.getElementById("info").innerHTML='Mahatma Jyotiba Phule Dhyan Kendra InnerView';
      break;
    case 'meditationOut':
      $('#vr-img').css({'background-image': 'url(assets/360/4.vr.jpg)'});
      document.getElementById("info").innerHTML='Mahatma Jyotiba Phule Dhyan Kendra Outter view';
      break;//meditationIn
    case 'ict':
      $('#vr-img').css({'background-image': 'url(assets/360/5.vr.jpg)'});
      document.getElementById("info").innerHTML='SO Information & Communication Technology';
      break;
    case 'gims':
      $('#vr-img').css({'background-image': 'url(assets/360/7.vr.jpg)'});
      document.getElementById("info").innerHTML='GIMS'
      break;
  }
//$("#exampleIframe").show();
}
function closesrc() {
document.getElementById("vrFull").style.width = "0%";
document.getElementById("headermain2").style.position="sticky";
$("#headermain").show();
pause();
}



//  grid image view ----------------------------------------------------------------------------------
function fullImg(x) {
  document.getElementById("imgFull").style.width = "100%";
  document.getElementById("headermain").style.display="none";
  document.getElementById("headermain2").style.position="unset";  
  var fullGrigImg = document.getElementById('fullGrigImg');
  fullGrigImg.src = x;
//   $(document).ready(function(){
//   $("button").click(function(){
//     $.ajax({url: "demo_test.txt", success: function(result){
//       $("#div1").html(result);
//     }});
//   });
// })
}
function closeImgScr() {
  document.getElementById("imgFull").style.width = "0%";
  document.getElementById("headermain2").style.position="sticky";
  fullGrigImg.src = 'assets/img/gbu_logo.png';
  $("#headermain").show();
  //document.getElementById("exampleIframe").style.display = 'none';
}



