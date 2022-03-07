jQuery(() => {
    $(".book-player .progress").on("input change", () => {
        $(".book-player").css("--progress", $(".book-player .progress").val() + "%");
    });
});