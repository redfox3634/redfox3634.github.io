$( document ).ready(function() {

  var goodAnswerAudio = new Audio('../files/audio/ogolne/brawo.wav');
  var badAnswerAudio = new Audio('../files/audio/ogolne/sprobuj.wav');
  var questionAudio = new Audio('../files/audio/x/krzyzowka/1.wav');

  var questions = [
    "Teresa?",
    "Paryż?",
    "Genów?",
    "WOJTOSZE?",
    "ZŁOTOGŁOWIEC?",
    "DZIEWIĘĆSET?",
    "JERZY?",
    "SZEŚĆSET?",
	"SZAŃCE?",
	"BUNDZ?",
	"CIERNE?",
	"PTAK?",
    "PAINTBALL?"
  ]

  var answers = [
    'teresa',
    'paryż',
    'genów',
    'wojtosze',
    'złotogłowiec',
    'dziewięćset',
    'jerzy',
    'sześćset',
	'szańce',
	'bundz',
	'cierne',
	'ptak',
    'paintball'
  ]

  var mainAnswer = 'TRÓJWIEŚCZEKA'

  var badAnswers = {}
  var checkedAnswers = {}

  var currentAnswer = 1
  var totalAnswers =  13

  $('.check-main-answer').on('click', function(event) {
    event.preventDefault();
    var answer = mainAnswer.split('')
    $('input.main-answer').each(function (i) {
      $(this).val(answer[i])
    })
  })

  $('.check-answer').on('click', function(event) {
    event.preventDefault()
    var answerArr = answers[currentAnswer-1].split('');
    $('input', $('tr[data-answer=' + currentAnswer + ']')).each(function (i) {
      $(this).val(answerArr[i]);
    })
    $('.set-answer', 'tr[data-answer=' + currentAnswer + ']').removeClass('wrong-answer').addClass('correct-answer')
    checkedAnswers[currentAnswer] = true
    if($('.set-answer:not(.correct-answer)')[0]){
      $('.set-answer:not(.correct-answer)')[0].click()
    } else {
      allAnsweredProperly()
    }
  })

  $('.set-answer').on('click', function(event) {
    event.preventDefault();
    $(this).removeClass('correct-answer').removeClass('wrong-answer')
    $('.second-color', '.crossword').removeClass('second-color')
    tr = $(this).parents('tr')
    $('input', $(tr)).val('')
    currentAnswer = parseInt($(tr).attr('data-answer'))
    loadCurrentAnswerData()

    $('img.visible', '.crossword').removeClass('visible')
    // $('img', $(tr)).addClass('visible')
    $(this).addClass('second-color')
    $('input', $(tr)).addClass('second-color')
    $('input', $(tr))[0].focus()
  })

  $('input', '.crossword').on('click', function() {
    $('.second-color', '.crossword').removeClass('second-color')
    tr = $(this).parents('tr')
    $('input', $(tr)).val('')
    currentAnswer = parseInt($(tr).attr('data-answer'))
    loadCurrentAnswerData()

    $('img.visible', '.crossword').removeClass('visible')
    // $('img', $(tr)).addClass('visible')
    $('.set-answer', $(tr)).addClass('second-color')
    $('input', $(tr)).addClass('second-color')
    $('input', $(tr))[0].focus()
  })

  var loadCurrentAnswerData = function() {
    $('.question-text').html(questions[currentAnswer-1])
    questionAudio = new Audio('../files/audio/x/krzyzowka/' + currentAnswer + '.wav');
  }

  $('input', '.crossword').mask('A')
  $('input', '.crossword').on( "keypress", function(event) {
    nextInput = $('input', $(this).parents('td').next('td'))
    if(nextInput[0]) {
      $(nextInput).focus()
    } else {
      $(this).val($(this).val()[0])
    }
  })
  $('input', '.crossword').on( "keyup", function(event) {
    if(event.which == 8){
      $('input', $(this).parents('td').prev('td')).focus()
    }
    nextInput = $('input', $(this).parents('td').next('td'))
    if(!nextInput[0] && $(this).val().length == 1) {
      checkProperAnswer()
    }
  })

  var checkProperAnswer = function () {
    currentAnswerText = ''
    $('input', 'tr[data-answer=' + currentAnswer + ']').each(function() {
      currentAnswerText += $(this).val()
    })
    if(currentAnswerText === answers[currentAnswer-1]) {
      badAnswerAudio.load()
      goodAnswerAudio.play()
      $('.set-answer', 'tr[data-answer=' + currentAnswer + ']').removeClass('wrong-answer').addClass('correct-answer')
      $('.visible2').addClass('visible').removeClass('visible2')
      $('.image', '[data-answer=' + currentAnswer + ']').addClass('visible2')
      if($('.set-answer:not(.correct-answer)')[0]) {
        $('.set-answer:not(.correct-answer)')[0].click()
      }else {
        allAnsweredProperly()
      }
    } else {
     goodAnswerAudio.load()
     badAnswerAudio.play()
     $('.set-answer', 'tr[data-answer=' + currentAnswer + ']').removeClass('correct-answer').addClass('wrong-answer')
     if(badAnswers[currentAnswer]) {
      badAnswers[currentAnswer].push(currentAnswerText)
     } else {
      badAnswers[currentAnswer] = [currentAnswerText]
     }
    }
  }

  var allAnsweredProperly = function() {
    var tableBodyHtml = '';
    for (var i=1; i<=13; i++) {
      tableBodyHtml += '<tr><td>' + i + '</td><td>'
      if(badAnswers[i]) {
        tableBodyHtml += badAnswers[i].length + ' (' + badAnswers[i].join(', ') + ')'
      } else {
        tableBodyHtml += '0'
      }

      tableBodyHtml += '</td>'
    }
    $('tbody', '#crosswordEndedModal').html(tableBodyHtml)
    $('#crosswordEndedModal').modal('show')
  }

  $('.read-question').on('click', function() {
    questionAudio.play()
  })

  $('.set-answer')[0].click()

});
