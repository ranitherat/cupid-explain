// ================= NAVBAR SCROLL =================
const navbar = document.getElementById("navbar");

if (navbar) {
    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            navbar.style.top = "-300px";
        } else {
            navbar.style.top = "0";
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}


// ================= FLAG CARD =================
document.querySelectorAll('.flag-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});


// ================= QUIZ FORM =================
const form = document.getElementById("quizForm");

if (form) {

    let isDirty = false;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let totalScore = 0;

        for (let i = 1; i <= 10; i++) {
            let selected = document.querySelector(`input[name="q${i}"]:checked`);

            if (!selected) {
                alert("Please answer all questions before submitting 💕");
                return;
            }

            totalScore += parseInt(selected.value);
        }

        if (totalScore >= 8) {
            window.location.href = "green-result.html";
        } 
        else if (totalScore >= 4) {
            window.location.href = "mixed-result.html";
        } 
        else {
            window.location.href = "red-result.html";
        }
    });

    form.addEventListener("change", function () {
        const answered = form.querySelector("input[type='radio']:checked");
        if (answered) isDirty = true;
    });

    window.addEventListener("beforeunload", function (e) {
        if (isDirty) {
            e.preventDefault();
            e.returnValue = "";
        }
    });

    document.querySelectorAll(".nav-item").forEach(link => {
        link.addEventListener("click", function (e) {
            if (isDirty) {
                const confirmLeave = confirm(
                    "Are you sure? This will refresh the page and all progress will be lost."
                );

                if (!confirmLeave) e.preventDefault();
            }
        });
    });

    form.addEventListener("submit", function () {
        isDirty = false;
    });
}


// ================= HAMBURGER MENU =================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

if (hamburger && mobileMenu && closeMenu) {
    hamburger.onclick = () => mobileMenu.classList.add("show");
    closeMenu.onclick = () => mobileMenu.classList.remove("show");
}

// ================= iMAGE MAP MOBILE =================

function updateImageMapForMobile() {
    const img = document.getElementById('cardImage');
    const map = document.getElementById('imageMap');

    // Check screen width
    if (window.innerWidth <= 768) { // adjust breakpoint as needed
        img.src = "img/mobile-box.svg";

        // Update coordinates
        const areas = map.getElementsByTagName('area');
        areas[0].coords = "93,110,229,197";   // About
        areas[1].coords = "51,219,174,325";   // Cheat
        areas[2].coords = "107,357,243,440";  // Team
    } else {
        img.src = "img/box.svg";

        const areas = map.getElementsByTagName('area');
        areas[0].coords = "96,151,326,296";   // About
        areas[1].coords = "425,131,632,297";  // Cheat
        areas[2].coords = "719,142,946,291";  // Team
    }
}

// Run on load
window.addEventListener('load', updateImageMapForMobile);
// Run on resize
window.addEventListener('resize', updateImageMapForMobile);