﻿$(window).load(function () {
    var speed = 700;
    var isShown = false;
    var currentMessage = "";

    //workaround for the infinite browser load in chrome
    if ($.browser.webkit) {
        $.doTimeout(1000, refreshNotifications);
    }
    else {
        refreshNotifications();
    }
    

    function refreshNotifications() {
        $.get('/notification/Comet', { message: currentMessage }, notificationCallback);
    }

    function notificationCallback(data) {
        currentMessage = data;

        if (data === "") {
            closeMsg();
        }
        else {
            displayMsg(data);
        }

        refreshNotifications();
    }

    //SetupNotifications();
    //DisplayMsg("Scanning Series Folder.");



    function displayMsg(sMsg) {
        //set the message text
        $("#msgText").showHtml(sMsg, 150);

        if (!isShown) {
            $('#msgBox').show("slide", { direction: "right" }, speed / 2);
        }

        isShown = true;
    }

    function closeMsg() {
        //hide the message      
        if (isShown) {
            $('#msgBox').hide("slide", { direction: "right" }, speed);
            isShown = false;
        }
    }
});




// Animates the dimensional changes resulting from altering element contents
// Usage examples: 
//    $("#myElement").showHtml("new HTML contents");
//    $("div").showHtml("new HTML contents", 400);
//    $(".className").showHtml("new HTML contents", 400, 
//                    function() {/* on completion */});
(function ($) {
    $.fn.showHtml = function (html, speed, callback) {
        return this.each(function () {
            // The element to be modified
            var el = $(this);

            // Preserve the original values of width and height - they'll need 
            // to be modified during the animation, but can be restored once
            // the animation has completed.
            var finish = { width: 'auto', height: 'auto' };

            // The original width and height represented as pixel values.
            // These will only be the same as `finish` if this element had its
            // dimensions specified explicitly and in pixels. Of course, if that 
            // was done then this entire routine is pointless, as the dimensions 
            // won't change when the content is changed.
            var cur = { width: el.width() + 'px', height: el.height() + 'px' };

            // Modify the element's contents. Element will resize.
            el.html(html);

            // Capture the final dimensions of the element 
            // (with initial style settings still in effect)
            var next = { width: el.width() + 'px', height: el.height() + 'px' };

            el.css(cur) // restore initial dimensions
            .animate(next, speed, function ()  // animate to final dimensions
            {
                el.css(finish); // restore initial style settings
                if ($.isFunction(callback)) callback();
            });
        });
    };


})(jQuery);