$("#greatBayMapSection").click(function () {
    toggleTop(false);
    toggleSecond(true);
});

$(".close-button").click(function () {
    toggleTop(true);
    toggleSecond(false);
});

function toggleTop(state) {
    if (state) {
        $("#map-tracker-top").css("display", "block");
    } else {
        $("#map-tracker-top").css("display", "none");
    }
}

function toggleSecond(state) {
    if (state) {
        $("#map-tracker-second-level").css("display", "block");
    } else {
        $("#map-tracker-second-level").css("display", "none");
    }
}