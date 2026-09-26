/* =========================================
   YATRASUTRA - BOOKINGS JS
========================================= */


/* =========================================
   MOBILE SIDEBAR
========================================= */

const mobileMenu =
    document.querySelector(".mobile-menu");

const sidebar =
    document.querySelector(".sidebar");


if (mobileMenu) {

    mobileMenu.addEventListener("click", function () {

        sidebar.classList.toggle("show");

    });

}


/* =========================================
   FILTER BOOKINGS
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const bookingCards =
    document.querySelectorAll(".booking-card");


filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        /* Remove active class */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        /* Add active class */

        this.classList.add("active");


        const filter =
            this.getAttribute("data-filter");


        bookingCards.forEach(card => {

            const type =
                card.getAttribute("data-type");


            if (
                filter === "all" ||
                type === filter
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });


        checkEmptyState();

    });

});


/* =========================================
   SEARCH BOOKINGS
========================================= */

const searchInput =
    document.getElementById("bookingSearch");


if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchValue =
            this.value.toLowerCase().trim();


        bookingCards.forEach(card => {

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
   SORT BOOKINGS
========================================= */

const sortSelect =
    document.getElementById("sortBookings");

const bookingsContainer =
    document.getElementById("bookingsContainer");


if (sortSelect) {

    sortSelect.addEventListener("change", function () {

        const cards =
            Array.from(
                document.querySelectorAll(".booking-card")
            );


        if (this.value === "date") {

            cards.sort((a, b) => {

                return new Date(a.dataset.date) -
                       new Date(b.dataset.date);

            });

        }


        if (this.value === "amount") {

            cards.sort((a, b) => {

                return Number(a.dataset.amount) -
                       Number(b.dataset.amount);

            });

        }


        cards.forEach(card => {

            bookingsContainer.appendChild(card);

        });

    });

}


/* =========================================
   EMPTY STATE
========================================= */

function checkEmptyState() {

    const cards =
        Array.from(
            document.querySelectorAll(".booking-card")
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
   VIEW BOOKING
========================================= */

function viewBooking(bookingId) {

    const modal =
        document.getElementById("bookingModal");

    const modalId =
        document.getElementById("modalBookingId");

    const modalTitle =
        document.getElementById("modalBookingTitle");


    modalId.textContent =
        bookingId;


    const card =
        document.querySelector(
            `[data-name][data-type]`
        );


    /*
       Find the booking card using
       booking ID from its text.
    */

    const cards =
        document.querySelectorAll(".booking-card");


    let selectedCard = null;


    cards.forEach(item => {

        if (
            item.innerText.includes(bookingId)
        ) {

            selectedCard = item;

        }

    });


    if (selectedCard) {

        const title =
            selectedCard.querySelector("h3");

        if (title) {

            modalTitle.textContent =
                title.textContent.trim();

        }

    }


    modal.classList.add("show");

}


/* =========================================
   CLOSE BOOKING MODAL
========================================= */

function closeBookingModal() {

    document
        .getElementById("bookingModal")
        .classList.remove("show");

}


/* =========================================
   CANCEL BOOKING
========================================= */

function cancelBooking(bookingId) {

    const confirmCancel =
        confirm(
            `Are you sure you want to cancel booking ${bookingId}?`
        );


    if (!confirmCancel) {
        return;
    }


    alert(
        `Booking ${bookingId} cancellation request has been submitted.`
    );

}


/* =========================================
   DOWNLOAD RECEIPT
========================================= */

function downloadTicket(bookingId) {

    alert(
        `Receipt for ${bookingId} will be available here after backend integration.`
    );

}


/* =========================================
   MAKE PAYMENT
========================================= */

function makePayment(bookingId) {

    alert(
        `Payment gateway for booking ${bookingId} will be connected during backend integration.`
    );

}


/* =========================================
   WRITE REVIEW
========================================= */

function writeReview(bookingId) {

    window.location.href =
        `bookings.html?review=${encodeURIComponent(bookingId)}`;

}


/* =========================================
   NOTIFICATION
========================================= */

function showNotification() {

    alert(
        "You have 2 new booking notifications."
    );

}


/* =========================================
   AI CHAT
========================================= */

function openAIChat() {

    document
        .getElementById("aiChatModal")
        .classList.add("show");

}


function closeAIChat() {

    document
        .getElementById("aiChatModal")
        .classList.remove("show");

}


/* =========================================
   AI QUICK ACTIONS
========================================= */

function aiAction(action) {

    const response =
        document.getElementById("aiResponse");


    if (action === "upcoming") {

        response.innerHTML =
            "<strong>Yatra AI:</strong> You have 3 upcoming bookings. Your Goa trip includes a hotel, airport transfer, heritage walk and restaurant reservation.";

    }


    if (action === "hotel") {

        response.innerHTML =
            "<strong>Yatra AI:</strong> Based on your Goa trip, I can compare hotels using price, location, ratings, availability and distance from your planned activities.";

    }


    if (action === "experience") {

        response.innerHTML =
            "<strong>Yatra AI:</strong> I recommend adding a local cultural experience, such as a heritage walk, traditional food experience or artisan activity.";

    }

}


/* =========================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================= */

document.querySelectorAll(".modal-overlay")
    .forEach(modal => {

        modal.addEventListener("click", function (event) {

            if (event.target === this) {

                this.classList.remove("show");

            }

        });

    });


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        checkEmptyState();

    }
);