var deleteLog = false;

$(document).ready(function() {

  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
  $('#menu-button').click(function() {
    $(this).toggleClass('open');
  });
  $('.side-anchor').click(function() {
    $("#wrapper").toggleClass("toggled");
    $("#menu-button").toggleClass('open');
  });

  $('#pagepiling').pagepiling({
    direction: 'horizontal',
    menu: '#menu',
    anchors: [
      'home', 'about', 'humans', 'contact'
    ],
    navigation: {
      'textColor': '#f2f2f2',
      'bulletsColor': '#ccc',
      'position': 'right',
      'tooltips': ['Home', 'About', 'Humans', 'Contact']
    },
    onLeave: function(index, nextIndex, direction) {

      //fading out the txt of the leaving section
      $('.section').eq(index - 1).find('h1, p').fadeOut(700, 'easeInQuart');

      //fading in the text of the destination (in case it was fadedOut)
      $('.section').eq(nextIndex - 1).find('h1, p').fadeIn(700, 'easeInQuart');

      //reaching our last section? The one with our normal site?
      if (nextIndex == 4) {
        $('#arrow').hide();

        //fading out navigation bullets
        $('#pp-nav').fadeOut();

        $('#section4').find('.content').animate({
          top: '0%'
        }, 700, 'easeInQuart');
      }
      if (index == 4) {
        $('#arrow').show();
        //fadding in navigation bullets
        $('#pp-nav').fadeOut();

        $('#section4 .content').animate({
          top: '100%'
        }, 700, 'easeInQuart');
      }
    }
  });
  $('#rightArrow').click(function() {
    $.fn.pagepiling.moveSectionDown();
  });
  $('#leftArrow').click(function() {
    $.fn.pagepiling.moveSectionUp();
  });

  $('#contactForm').bootstrapValidator({
    container: '#messages',
    feedbackIcons: {
      valid: ' fa fa-check-circle',
      invalid: 'fa fa-times',
      validating: 'fa fa-circle-o'
    },
    fields: {
      name: {
        validators: {
          notEmpty: {
            message: 'The full name is required and cannot be empty'
          }
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: 'The email address is required and cannot be empty'
          },
          emailAddress: {
            message: 'The email address is not valid'
          }
        }
      },
      subject: {
        validators: {
          notEmpty: {
            message: 'The subject is required and cannot be empty'
          },
          stringLength: {
            max: 100,
            message: 'The subject must be less than 100 characters long'
          }
        }
      },
      content: {
        validators: {
          notEmpty: {
            message: 'The content is required and cannot be empty'
          },
          stringLength: {
            max: 500,
            message: 'The content must be less than 500 characters long'
          }
        }
      }
    }
  });

  var name, email, subject, text;

  $("#send_email").click(function() {
    name = $("#name").val();
    email = $("#email").val();
    subject = $("#subject").val();
    text = $("#content").val();
    $("#message").text("Sending E-mail...Please wait");
    $.get("http://localhost:3000/send", {
      name: name,
      email: email,
      subject: subject,
      text: text
    }, function(data) {
      if (data == "sent") {
        $("#message").empty().html("Email is been sent at " + to + ".Please check inbox!");
      }
    });
  });
});
