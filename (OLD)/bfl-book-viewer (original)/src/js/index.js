// import pages from "../books/The Cat in the Hat/*.png"; 
// import pages from "../../books";

function addGlobalEventListener(type, selector, callback, options) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    }, options);
}
function startEventListener(type, selector, callback, options){
    document.addEventListener("DOMContentLoaded", e => callback(e));
    addGlobalEventListener(type, selector, e => callback(e), options);
}
function startResize(callback, options) {
    document.addEventListener("DOMContentLoaded", e => callback(e));
    window.addEventListener("resize",  e => callback(e), options);
    screen.orientation.addEventListener("change", e => callback(e), options);
    /* deprecated */window.addEventListener("orientationchange", e => callback(e), options);
    // window.orientation.addEventListener("change", e => callback(e), options);
}

function mouseHover(element, event){
    let rect = element.getBoundingClientRect();

    return (
        event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom
    );
}

function overflowX(element) {
    return element.scrollWidth > element.clientWidth;
}
function overflowY(element) {
    return element.scrollHeight > element.clientHeight;
}
function overflow(element) {
    return overflowX(element) || overflowY(element);
}

function getMetaImg(url, callback) {
    const img = new Image();
    img.src = url;
    img.onload = function() { callback(this.width, this.height); }
}
// getMetaImg("http://snook.ca/files/mootools_83_snookca.png", (width, height) => { alert(width + 'px ' + height + 'px') });



initial = (() => {
    console.log("initial load");

    { //helpers
        //window size (excluding mobile toolbar)
        startResize(e => {
            var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            document.documentElement.style.setProperty("--viewport-height-fill", window.innerHeight + "px");
        });

        //min/max area
        addGlobalEventListener("load", ".-live-area", e => {
            // boxes.forEach(box => {
            //     new ResizeObserver(entries => {
            //         const width = Math.floor(entries[0].contentRect.width);
            //         const height = Math.floor(entries[0].contentRect.height);
            //         entries[0].target.value = `I'm ${width}px and ${height}px tall`;
            //     }).observe(box);
            // });
        });

        // areaObserver = new ResizeObserver(entries => {

        // });
        // areaObserver.observe()
        // window.addEventListener('storage', e => {
        //     console.log("storage");

        //     document.querySelectorAll(".-live-area").forEach((area, index, array) => {

        //     });
        // });

        //range update fill
        addGlobalEventListener("load", "input[type='range']", e => {

        });
    }
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

    // elem = document.createElement("span");
    // elem.classList.add("-live-area");
    // elem.innerText = "new";
    // document.querySelector("body").append(elem);


    let pages = [
        "THE-CAT-IN-THE-HAT-03",
        "THE-CAT-IN-THE-HAT-04",
        "THE-CAT-IN-THE-HAT-05",
        "THE-CAT-IN-THE-HAT-06",
        "THE-CAT-IN-THE-HAT-07",
        "THE-CAT-IN-THE-HAT-08",
        "THE-CAT-IN-THE-HAT-09",
        "THE-CAT-IN-THE-HAT-10",
        "THE-CAT-IN-THE-HAT-11",
        "THE-CAT-IN-THE-HAT-12"
    ];

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
            }, {once: true});
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
                bookPlayer.querySelector(":scope > .page > img").src = "./The Cat in the Hat/" + pages[parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--current-page")) - 1] + ".png";
                // bookPlayer.querySelector(":scope > .page > img").src = "../books/The Cat in the Hat/" + pages[parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--current-page")) - 1] + ".png";

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
                        }, {once: true});
                    }
                });
            });
        }
        { //styling
            //progress near
            document.addEventListener("mousemove", event => {
                document.querySelectorAll(".book-player .progress .zone").forEach((elem, i, arr) => {
                    elem.closest(".progress").classList.toggle("-near", mouseHover(elem, event));

                    lift = setTimeout(() => {
                        elem.closest(".progress").classList.toggle("-near", false);
                    }, 2000);

                    document.addEventListener("mousemove", event => {
                        clearTimeout(lift);
                    }, {once: true});
                });
            });
            //progress hover
            addGlobalEventListener("pointerover", ".book-player .progress .slider", e => {
                e.target.closest(".progress").classList.add("-hover");

                e.target.addEventListener("pointerout", e => {
                    e.target.closest(".progress").classList.remove("-hover");
                }, {once: true});
            });
            //progress active
            addGlobalEventListener("input", ".book-player .progress .slider", e => {
                e.target.closest(".progress").classList.add("-active");

                e.target.addEventListener("change", e => {
                    e.target.closest(".progress").classList.remove("-active");
                }, {once: true});
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
                    }, {once: true});
                });
            });

            //page turn active
            document.addEventListener("pointerdown", event => {
                document.querySelectorAll(".book-player .page-turn .zone").forEach((elem, i, arr) => {
                    if (mouseHover(elem, event)) {
                        elem.closest(".page-turn").classList.toggle("-active", true);

                        document.addEventListener("pointerup", (event) => {
                            elem.closest(".page-turn").classList.toggle("-active", false);
                        }, {once: true});
                    }
                });
            });

            //book info drawer
            addGlobalEventListener("click", ".book-player-info .info > .drawer", e => {
                e.target.closest(".book-player-info").classList.toggle("-expand");
            })
        }
    }
});

window.addEventListener("load", e => {
    console.log("window load");

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