jQuery(() => {
    $(".book-player .progress").on("input change", () => {
        $(".book-player .progress ~ .fill").css("width", $(".book-player .progress").val() + "%");
    });
});