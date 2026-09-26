/* =========================================
   YATRASUTRA - SAVED DESTINATIONS JS
========================================= */


/* =========================================
   MOBILE SIDEBAR
========================================= */

const mobileMenu = document.querySelector(".mobile-menu");
const sidebar = document.querySelector(".sidebar");

if (mobileMenu) {

    mobileMenu.addEventListener("click", function () {

        sidebar.classList.toggle("show");

    });

}


/* =========================================
   DESTINATION FILTER
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const destinationCards =
    document.querySelectorAll(".destination-card");


filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        /* Remove active from all buttons */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        /* Add active to clicked button */

        this.classList.add("active");


        const filter =
            this.getAttribute("data-filter");


        destinationCards.forEach(card => {

            const category =
                card.getAttribute("data-category");


            if (filter === "all" || category === filter) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });


        checkEmptyState();

    });

});


/* =========================================
   SEARCH DESTINATIONS
========================================= */

const searchInput =
    document.getElementById("destinationSearch");


if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchValue =
            this.value.toLowerCase().trim();


        destinationCards.forEach(card => {

            const name =
                card.getAttribute("data-name")
                    .toLowerCase();

            const text =
                card.innerText.toLowerCase();


            if (
                name.includes(searchValue) ||
                text.includes(searchValue)
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });


        checkEmptyState();

    });

}


/* =========================================
   SORT DESTINATIONS
========================================= */

const sortSelect =
    document.getElementById("sortDestinations");

const grid =
    document.getElementById("destinationsGrid");


if (sortSelect) {

    sortSelect.addEventListener("change", function () {

        const cards =
            Array.from(
                document.querySelectorAll(".destination-card")
            );


        if (this.value === "name") {

            cards.sort((a, b) => {

                return a.dataset.name
                    .localeCompare(b.dataset.name);

            });

        }


        if (this.value === "budget") {

            cards.sort((a, b) => {

                return Number(a.dataset.budget) -
                       Number(b.dataset.budget);

            });

        }


        cards.forEach(card => {

            grid.appendChild(card);

        });

    });

}


/* =========================================
   REMOVE SAVED DESTINATION
========================================= */

function removeDestination(button) {

    const card =
        button.closest(".destination-card");


    const destinationName =
        card.getAttribute("data-name");


    const confirmRemove =
        confirm(
            `Remove ${destinationName} from your saved destinations?`
        );


    if (!confirmRemove) {
        return;
    }


    card.style.opacity = "0";
    card.style.transform = "scale(0.95)";


    setTimeout(() => {

        card.remove();

        updateSavedCount();

        checkEmptyState();

    }, 300);

}


/* =========================================
   UPDATE SAVED COUNT
========================================= */

function updateSavedCount() {

    const remainingCards =
        document.querySelectorAll(".destination-card");


    const totalSaved =
        document.getElementById("totalSaved");


    if (totalSaved) {

        totalSaved.textContent =
            remainingCards.length;

    }

}


/* =========================================
   CHECK EMPTY STATE
========================================= */

function checkEmptyState() {

    const cards =
        Array.from(
            document.querySelectorAll(".destination-card")
        );


    const visibleCards =
        cards.filter(card => {

            return card.style.display !== "none";

        });


    const emptyState =
        document.getElementById("emptyState");


    if (!emptyState) {
        return;
    }


    if (visibleCards.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }

}


/* =========================================
   VIEW DESTINATION
========================================= */

function viewDestination(destination) {

    window.location.href =
        "../My trip/my-trips.html?destination=" +
        encodeURIComponent(destination);

}


/* =========================================
   AI SUGGESTION
========================================= */

function getAISuggestion() {

    const modal =
        document.getElementById("aiModal");


    const suggestionText =
        document.getElementById("aiSuggestionText");


    modal.classList.add("show");


    suggestionText.textContent =
        "Yatra AI is analyzing your saved destinations, preferred experiences, travel style and destination categories...";


    setTimeout(() => {

        suggestionText.textContent =
            "Based on your saved destinations, you seem interested in beaches, culture and nature. Yatra AI recommends exploring Konkan for a similar but more local and authentic experience.";

    }, 1200);

}


/* =========================================
   CLOSE AI MODAL
========================================= */

function closeAIModal() {

    const modal =
        document.getElementById("aiModal");

    modal.classList.remove("show");

}


/* Close modal when clicking outside */

const aiModal =
    document.getElementById("aiModal");


if (aiModal) {

    aiModal.addEventListener("click", function (event) {

        if (event.target === this) {

            closeAIModal();

        }

    });

}


/* =========================================
   PLAN AI SUGGESTION
========================================= */

function planSuggestion() {

    window.location.href =
        "../My trip/my-trips.html?destination=Konkan";

}


/* =========================================
   NOTIFICATION
========================================= */

function showNotification() {

    alert(
        "You have 2 new Yatra AI destination recommendations."
    );

}


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    updateSavedCount();

    checkEmptyState();

});