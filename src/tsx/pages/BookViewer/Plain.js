const initial = (() => {
    console.log("initial load");

    { //page
        //book info drawer layout
        startResize(e => {
            document.querySelectorAll(".book-player-info .info > .drawer").forEach((elem, i, arr) => {
                elem.closest(".book-player-info").classList.toggle("-overflow", overflowY(elem.closest(".book-player-info").querySelector(".info > .description")));
                elem.closest(".book-player-info").style.setProperty("--min-info-desc", elem.closest(".book-player-info").querySelector(".info > .description").scrollHeight + "px");
            });
        });
    }
})();

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("document load");

    
});

window.addEventListener("load", e => {
    console.log("window load");



    // elem = document.createElement("span");
    // elem.classList.add("-live-area");
    // elem.innerText = "new";
    // document.querySelector("body").append(elem);

    let pages = [];
    for (let i = 1; i <= 10; i++) { //pages 3-12
        pages.push(require(`src/assets/books/The Cat in the Hat/THE-CAT-IN-THE-HAT-${String(i + 2).padStart(2, "0")}.png`))
    }

    { //helpers
        //range slider fill
        addGlobalEventListener("input", "input[type='range']", e => {
            e.target.style.setProperty("--range-progress", ((e.target.value - e.target.min) / (e.target.max - e.target.min) * 100) + "%");
        });
        //range slider restrictions
        addGlobalEventListener("change", "input[type='number']", e => {
            e.target.value = Math.min(Math.max(e.target.value, e.target.min), e.target.max);
        });

        //scroll container input
        addGlobalEventListener("input", "*:is(.scroll-container-x, .scroll-container-y) input", e => {
            let scrollX = e.target.closest(".scroll-container-x");
            let scrollY = e.target.closest(".scroll-container-y");

            if (scrollX != null) {
                scrollX.style.setProperty("overflow-x", "hidden");
            }
            if (scrollY != null) {
                scrollY.style.setProperty("overflow-y", "hidden");
            }

            e.target.addEventListener("change", e => {
                if (scrollX != null) {
                    scrollX.style.setProperty("overflow-x", "scroll");
                }
                if (scrollY != null) {
                    scrollY.style.setProperty("overflow-y", "scroll");
                }
            }, { once: true });
        });
    }

    { //page
        //navbar
        document.querySelector("#navbar .toggle").addEventListener("change", () => {
            document.querySelector("#navbar .right-navbar").classList.toggle("-active", document.querySelector("#navbar .toggle").checked);
        });

        //book player page
        // addGlobalEventListener("load", ".book-player > .page > img", e => {
        // document.querySelectorAll(".book-player > .page > img").forEach((elem, i, arr) => {
        //     console.log("img load");
        //     getMetaImg(elem.src, (width, height) => elem.style.setProperty("aspect-ratio", width / height));
        // });

        //progress bar


        { // data / interactivity
            function updatePages(bookPlayer) {
                //set internal custom propertes
                bookPlayer.style.setProperty("--current-page", Math.min(Math.max(parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--current-page")), 1), parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--total-pages")))); //clamp current page

                //set page
                bookPlayer.querySelector(":scope > .page > img").src = pages[parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--current-page")) - 1];
                
                //set slider
                bookPlayer.querySelector(".slider").value = parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--current-page"));
                bookPlayer.querySelector(".slider").min = 1;
                bookPlayer.querySelector(".slider").max = parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--total-pages"));
            /**/bookPlayer.querySelector(".slider").style.setProperty("--range-progress", ((bookPlayer.querySelector(".slider").value - bookPlayer.querySelector(".slider").min) / (bookPlayer.querySelector(".slider").max - bookPlayer.querySelector(".slider").min) * 100) + "%");

                //set point counter
                bookPlayer.querySelector(".point-counter .page").value = parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--current-page"));
                bookPlayer.querySelector(".point-counter .page").min = 1;
                bookPlayer.querySelector(".point-counter .page").max = parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--total-pages"));
                bookPlayer.querySelector(".point-counter .max").innerText = window.getComputedStyle(bookPlayer).getPropertyValue("--total-pages");
                bookPlayer.querySelector(".point-counter").style.setProperty("--comp-width", bookPlayer.querySelector(".point-counter").offsetWidth + "px");
            }
            document.querySelectorAll(".book-player").forEach((elem, i, arr) => {
                updatePages(elem);
            });

            //slider input
            addGlobalEventListener("input", ".book-player .slider", e => {
                e.target.closest(".book-player").style.setProperty("--current-page", e.target.value);

                updatePages(e.target.closest(".book-player"));
            });
            //slider change
            addGlobalEventListener("change", ".book-player .point-counter .page", e => {
                // console.log(e.target.value);
                e.target.closest(".book-player").style.setProperty("--current-page", e.target.value);

                updatePages(e.target.closest(".book-player"));
            });

            //page turn click
            document.addEventListener("pointerdown", event => {
                document.querySelectorAll(".book-player .page-turn .zone").forEach((elem, i, arr) => {
                    if (mouseHover(elem, event)) {
                        document.addEventListener("pointerup", event => {
                            if (elem.closest(".page-turn").classList.contains("next")) {
                                elem.closest(".book-player").style.setProperty("--current-page", parseInt(window.getComputedStyle(elem.closest(".book-player")).getPropertyValue("--current-page")) + 1);
                            } else if (elem.closest(".page-turn").classList.contains("last")) {
                                elem.closest(".book-player").style.setProperty("--current-page", parseInt(window.getComputedStyle(elem.closest(".book-player")).getPropertyValue("--current-page")) - 1);
                            }

                            updatePages(elem.closest(".book-player"));
                        }, { once: true });
                    }
                });
            });
        }
        { //styling
            //progress near
            document.addEventListener("mousemove", event => {
                document.querySelectorAll(".book-player .progress .zone").forEach((elem, i, arr) => {
                    elem.closest(".progress").classList.toggle("-near", mouseHover(elem, event));

                    var lift = setTimeout(() => {
                        elem.closest(".progress").classList.toggle("-near", false);
                    }, 2000);

                    document.addEventListener("mousemove", event => {
                        clearTimeout(lift);
                    }, { once: true });
                });
            });
            //progress hover
            addGlobalEventListener("pointerover", ".book-player .progress .slider", e => {
                e.target.closest(".progress").classList.add("-hover");

                e.target.addEventListener("pointerout", e => {
                    e.target.closest(".progress").classList.remove("-hover");
                }, { once: true });
            });
            //progress active
            addGlobalEventListener("input", ".book-player .progress .slider", e => {
                e.target.closest(".progress").classList.add("-active");

                e.target.addEventListener("change", e => {
                    e.target.closest(".progress").classList.remove("-active");
                }, { once: true });
            });

            //page turn hover
            document.addEventListener("mousemove", event => {
                document.querySelectorAll(".book-player .page-turn .zone").forEach((elem, i, arr) => {
                    elem.closest(".page-turn").classList.toggle("-hover", mouseHover(elem, event));

                    let lift = setTimeout(() => {
                        elem.closest(".page-turn").classList.toggle("-hover", false);
                    }, 2000);

                    document.addEventListener("mousemove", event => {
                        clearTimeout(lift);
                    }, { once: true });
                });
            });

            //page turn active
            document.addEventListener("pointerdown", event => {
                document.querySelectorAll(".book-player .page-turn .zone").forEach((elem, i, arr) => {
                    if (mouseHover(elem, event)) {
                        elem.closest(".page-turn").classList.toggle("-active", true);

                        document.addEventListener("pointerup", (event) => {
                            elem.closest(".page-turn").classList.toggle("-active", false);
                        }, { once: true });
                    }
                });
            });

            //book info drawer
            addGlobalEventListener("click", ".book-player-info .info > .drawer", e => {
                e.target.closest(".book-player-info").classList.toggle("-expand");
            })
        }
    }







    { //device accomodations
        // window.addEventListener("resize", event => {
        //     document.querySelectorAll(".book-player .progress").forEach((elem) => {
        //         elem.classList.toggle("-touch", window.matchMedia("(hover: none)").matches);
        //     });
        // });
        // document.querySelectorAll(".book-player .progress").forEach((elem) => {
        //     elem.classList.toggle("-touch", window.matchMedia("(hover: none)").matches);
        // });
    }
});
