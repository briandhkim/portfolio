/* ---- mixitup.js our work sorting ---- */
$('#thework').mixItUp({
    animation: {
		duration: 1000
    }
});

/* ---- our ideology hover ---- */
$('.process-box').hover(function() {
	$(this).find('.process-intro').hide();
	$(this).find('.process-content').fadeIn();
}, function() {
	$(this).find('.process-content').hide();
	$(this).find('.process-intro').fadeIn();
});

/* ---- contact form ---- */
$("#contactForm").validator().on("submit", function(event) {
    if (event.isDefaultPrevented()) {
        formError();
        let submitMsg = 'Did you fill in the form properly?';

        let msg_subject = $("#msg_subject").val().trim();
        let name = $("#name").val().trim();
        let message = $("#message").val().trim();
        var email = $("#email").val().trim();

        const emailReg = /[A-z0-9._%+-]+@[A-z0-9.-]+\.[a-z]{2,3}$/;
        if(!emailReg.test(email)){
            submitMsg = 'Please check your email';
        }

        let subjectErr = false;
        let nameErr = false;
        let messageErr = false;

        const regex = /[\w\d\s\W]+/;
        if(!regex.test(msg_subject)){
            submitMsg = 'Please check the message subject';
            subjectErr = true;
        }
        if(!regex.test(name)){
            submitMsg = 'Please check your name input';
            nameErr = true;
        }
        if(!regex.test(message)){
            submitMsg = 'Please check your message';
            messageErr = true;
        }
        
        if(subjectErr && nameErr && messageErr){
            submitMsg = 'Please check the subject, name, and message';
        }
        submitMSG(false, submitMsg);
    } else {
        event.preventDefault();
        submitForm();
    }
});
function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    var msg_subject = $("#msg_subject").val().trim();
    var message = $("#message").val().trim();

    // const emailReg = /[A-z0-9._%+-]+@[A-z0-9.-]+\.[a-z]{2,3}$/;
    // if(!emailReg.test(email)){
    //     submitMSG(false, 'Please check your email');
    //     return;
    // }

    let sendIcon = $('<i>',{
        class: 'fa fa-spinner fa-lg fa-spin fa-fw text-warning'
    }).css('color','white');
    let sendSpan = $('<span>').addClass('sendingMsg').text(' sending...').prepend(sendIcon);
    $('#msgSubmit').text('').removeClass();
    $('#msgSubmit').append(sendSpan);
    $.ajax({
            url: 'mail/mail_handler.php',
            method: 'post',
            data:{
                email: email,
                name: name,
                subject: msg_subject,
                message: message
            },
            success: function(data){
                console.log(data);   
                formSuccess();
            },
            error: function(err){
                console.log(err.responseText);
                const errResp = JSON.parse(err.responseText).messages[0];
                formError();
                submitMSG(false, 'something went wrong... ' + errResp);
            }
        });
}
function formSuccess() {
    $("#contactForm")[0].reset();
    $('.sendingMsg').remove();
    submitMSG(true, "Message Submitted!")
}
function formError() {
    $('.sendingMsg').remove();
    $("#contactForm").removeClass().addClass('shake animated').one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function() {
            $(this).removeClass();
        });
}
function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h4 text-success";
        var msgIcon = "fa fa-paper-plane-o fa-lg text-info";
        // var msgIcon = 'fa fa-child fa-lg text-info';
    } else {
        var msgClasses = "h4 text-danger";
        var msgIcon = "fa fa-exclamation-triangle text-danger";
    }
    const icon = $('<i>',{
        class: msgIcon,
        'aria-hidden': true
    }).css('margin', '0 5px');
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg).prepend(icon);
}

/* ---- our work gallery ---- */
$('#work').magnificPopup({
    delegate: 'a.zoom',
    type: 'image',
    fixedContentPos: false,
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
        enabled: true,
        preload: [0,2]
    }
});

/* ---- popup image ---- */
$('.popup-img').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade'
});

/* ---- popup video ---- */
$(document).ready(function() {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
});

/* ---- nav smooth scroll ---- */
$(document).ready(function() {
    $('.scroll-link').on('click', function(event){
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 750);
    });
    $('.scroll-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop:0}, 1200);       
    });
});

/* ---- navbar offset ---- */
function scrollToID(id, speed){
    var offSet = 69;
    var targetOffset = $(id).offset().top - offSet;
    $('html,body').animate({scrollTop:targetOffset}, speed);
}

/* ---- animations ---- */
if (typeof sr == 'undefined') {
    window.sr = ScrollReveal({
        duration: 1500,
        delay: 50
    });
}
Royal_Preloader.config({
    onComplete: function () {
        triggerReveals();
    }
});
function triggerReveals() {
    sr.reveal('.bottomReveal', {
        origin: 'bottom'
    }).reveal('.leftReveal', {
        origin: 'left'
    }).reveal('.rightReveal', {
        origin: 'right'
    }).reveal('.topReveal', {
        origin: 'top'
    });

    sr.reveal('.rotateBottomReveal', {
        origin: 'bottom',
        rotate: { x: 90 }
    }).reveal('.rotateLeftReveal', {
        origin: 'left',
        rotate: { x: 90 }
    }).reveal('.rotateRightReveal', {
        origin: 'right',
        rotate: { x: 90 }
    }).reveal('.rotateTopReveal', {
        origin: 'top',
        rotate: { x: 90 }
    })

    sr.reveal('.scaleReveal', {
        origin: 'top',
        scale: 0.6
    });
}

/* ---- close mobile nav on click ---- */
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});

/* ---- rotater text ---- */
var current = 1; 
var height = jQuery('.ticker').height(); 
var numberDivs = jQuery('.ticker').children().length; 
var first = jQuery('.ticker h1:nth-child(1)'); 
setInterval(function() {
    var number = current * -height;
    first.css('margin-top', number + 'px');
    if (current === numberDivs) {
        first.css('margin-top', '0px');
        current = 1;
    } else current++;
}, 2500);