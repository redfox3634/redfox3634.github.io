var clickShowLeft = 0;

var requestFullScreen = function(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

$( document ).ready(function() {
  $( '#showLeft' ).on('click',function(){
    clickShowLeft++;
    $('#cbp-spmenu-s1').toggleClass('cbp-spmenu-open')
    $(this).toggleClass('active')
    $( '.cbp-spmenu .icon' ).toggleClass('change-color-icon-f96535');
     if(clickShowLeft%2==1){
        $(this).transition({ rotate: '180deg' });
      }
      else{
        $(this).transition({ rotate: '0deg' });
      }
  });

  $('.full-screen').on('click', function(){
    var elem = document.body;
    requestFullScreen(elem);
  })
});

$.extend($.fn.wPaint.defaults, {
  mode:        'pencil',  // set mode
  lineWidth:   '5',       // starting line width
  fillStyle:   'transparent', // starting fill style
  strokeStyle: '#b11276'  // start stroke style
});

$('.drawColor').on('click', function(event){
  var color = ''
  switch($(this).attr('data-color')) {
    case 'purple':
      color = "#b11276";
      break;
    case 'blue':
      color = "#3fc7f9";
      break;
    case 'red':
      color = "#fb371d";
      break;
    case 'white':
      color = "#ffffff";
      break;
    default:
      color = "#000000";
  }
  if($('.toggleCanvas.active').attr('data-el') == 'text') {
    $.fn.wPaint.menus.main.items.fillStyle.callback(color)
  } else {
    $.fn.wPaint.menus.main.items.fillStyle.callback('transparent')
  }
  $.fn.wPaint.menus.main.items.strokeStyle.callback(color)
  $('.drawColor').removeClass('active')
  $(this).addClass('active');
});

$('.toggleCanvas').on('click', function(event){
  event.preventDefault();
  event.stopPropagation();
  if($(this).hasClass('active')){
    $(this).removeClass('active');
    $('canvas').removeClass('enabled');
    $('body').addClass('normal-cursor')
  } else {
    if($(this).attr('data-thick') == 'true') {
      $.fn.wPaint.menus.main.items.lineWidth.callback(8)
    } else if($(this).attr('data-thick') == 'false') {
      $.fn.wPaint.menus.main.items.lineWidth.callback(5)
    }
    if($(this).attr('data-el') == 'text') {
      var color = ''
      switch($('.drawColor.active').attr('data-color')) {
        case 'purple':
          color = "#b11276";
          break;
        case 'blue':
          color = "#3fc7f9";
          break;
        case 'red':
          color = "#fb371d";
          break;
        case 'white':
          color = "#ffffff";
          break;
        default:
          color = "#000000";
      }
      $.fn.wPaint.menus.main.items.fillStyle.callback(color)
    } else {
      $.fn.wPaint.menus.main.items.fillStyle.callback('transparent')
    }
    if($(this).attr('data-el')){
      $('.wPaint-menu-icon-name-' + $(this).attr('data-el'), '.wPaint-menu').click();
      if($(this).attr('data-el') != 'clear'){
        $('.toggleCanvas').removeClass('active')
        $(this).addClass('active');
      }
    }

    $('canvas').addClass('enabled');
    $('body').removeClass('normal-cursor')
  }
})
