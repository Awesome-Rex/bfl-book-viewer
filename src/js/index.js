// const { update } = require("lodash");

function addGlobalEventListener(type, selector, callback, options) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    }, options)
}

function mouseHover(element, event){
    let rect = element.getBoundingClientRect();

    return (
        event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom
    );
}



function updateTouch() {

}



initial = (() => {
    console.log("initial load");

    { //helpers
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
})();

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("document load");

    // elem = document.createElement("span");
    // elem.classList.add("-live-area");
    // elem.innerText = "new";
    // document.querySelector("body").append(elem);

    { //helpers
        //range slider fill
        addGlobalEventListener("input", "input[type='range']", e => {
            e.target.style.setProperty("--range-progress", ((e.target.value - e.target.min) / (e.target.max - e.target.min) * 100) + "%");
        });
        //range slider restrictions
        addGlobalEventListener("change", "input[type='number']", e => {
            e.target.value = Math.min(Math.max(e.target.value, e.target.min), e.target.max);
        });
    }
    
    { //page
        //navbar
        document.querySelector("#navbar .toggle").addEventListener("change", () => {
            document.querySelector("#navbar .right-navbar").classList.toggle("-active", document.querySelector("#navbar .toggle").checked);
        });


        //progress bar
        { //data
            function updatePages(bookPlayer) {
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
            addGlobalEventListener("input", ".book-player .slider", e => {
                e.target.closest(".book-player").style.setProperty("--current-page", e.target.value);

                updatePages(e.target.closest(".book-player"));
            });
            addGlobalEventListener("change", ".book-player .point-counter .page", e => {
                // console.log(e.target.value);
                e.target.closest(".book-player").style.setProperty("--current-page", e.target.value);

                updatePages(e.target.closest(".book-player"));
            });
        }
        { //styling
            document.addEventListener("mousemove", event => {
                document.querySelectorAll(".book-player .progress .zone").forEach((elem, i, arr) => {
                    elem.closest(".progress").classList.toggle("-near", mouseHover(elem, event));
                });
            });
            addGlobalEventListener("mouseover", ".book-player .progress .slider", e => {
                e.target.closest(".progress").classList.add("-hover");

                e.target.addEventListener("mouseout", e => {
                    e.target.closest(".progress").classList.remove("-hover");
                }, {once: true});
            });
            addGlobalEventListener("input", ".book-player .progress .slider", e => {
                e.target.closest(".progress").classList.add("-active");

                e.target.addEventListener("change", e => {
                    e.target.closest(".progress").classList.remove("-active");
                }, {once: true});
            });
        }
    }
});

window.addEventListener("load", e => {
    console.log("window load");

    { //device accomodations
        window.addEventListener("resize", event => {
            document.querySelectorAll(".book-player .progress").forEach((elem) => {
                elem.classList.toggle("-touch", window.matchMedia("(hover: none)").matches);
            });
        });
        document.querySelectorAll(".book-player .progress").forEach((elem) => {
            elem.classList.toggle("-touch", window.matchMedia("(hover: none)").matches);
        });
    }
});