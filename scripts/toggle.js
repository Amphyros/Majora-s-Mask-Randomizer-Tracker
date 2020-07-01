$(".sprite").click(function () {
    if ($(this).css('opacity') == '1') {
        $(this).css({"opacity": "0.3", "filter": "grayscale(80%)"});
    } else {
        $(this).css({"opacity": "1", "filter": "grayscale(0%)"});
    }
});