/* ==========================================
   YATRASUTRA - MY TRIPS
========================================== */


/* ==========================================
   FILTER TRIPS
========================================== */

const filters =
    document.querySelectorAll(".filter");

const trips =
    document.querySelectorAll(".trip-card");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const selected =
            filter.dataset.filter;

        trips.forEach(trip => {

            const status =
                trip.dataset.status;

            if (
                selected === "all" ||
                status === selected
            ) {

                trip.classList.remove("hidden");

            } else {

                trip.classList.add("hidden");

            }

        });

    });

});


/* ==========================================
   SEARCH TRIPS
========================================== */

const search =
    document.getElementById("searchTrips");

search.addEventListener("input", () => {

    const query =
        search.value.toLowerCase().trim();

    trips.forEach(trip => {

        const name =
            trip.dataset.name.toLowerCase();

        if (name.includes(query)) {

            trip.classList.remove("hidden");

        } else {

            trip.classList.add("hidden");

        }

    });

});


/* ==========================================
   FAVORITE BUTTON
========================================== */

const heartButtons =
    document.querySelectorAll(".heart-btn");

heartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const icon =
            button.querySelector("i");

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");

        if (icon.classList.contains("fa-solid")) {

            button.style.color = "#e86676";

        } else {

            button.style.color = "#555";

        }

    });

});


/* ==========================================
   VIEW TRIP
========================================== */

function viewTrip(destination) {

    alert(
        `Opening ${destination} trip...\n\n`
        +
        "Your AI itinerary, weather, crowd level, "
        +
        "cultural guide and bookings will appear here."
    );

}


/* ==========================================
   CREATE NEW TRIP
========================================== */

function createTrip() {

    openAI();

}


/* ==========================================
   AI MODAL
========================================== */

const aiModal =
    document.getElementById("aiModal");


function openAI() {

    aiModal.classList.add("show");

}


function closeAI() {

    aiModal.classList.remove("show");

}


window.addEventListener("click", (event) => {

    if (event.target === aiModal) {

        closeAI();

    }

});


/* ==========================================
   AI TRIP GENERATION - DEMO
========================================== */

function generateTrip() {

    const input =
        document.getElementById("aiInput");

    const result =
        document.getElementById("aiResult");

    const request =
        input.value.trim();

    if (!request) {

        result.innerHTML =
            "Please describe your trip first.";

        return;

    }


    result.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Yatra AI is analyzing your trip...
    `;


    setTimeout(() => {

        result.innerHTML = `
            <strong>
                ✨ Yatra AI has understood your preferences!
            </strong>

            <br><br>

            ✓ Destination preferences analyzed<br>
            ✓ Budget considered<br>
            ✓ Weather conditions checked<br>
            ✓ Crowd levels analyzed<br>
            ✓ Lesser-known destinations found<br>
            ✓ Cultural experiences matched<br><br>

            <strong>
                Your personalized itinerary is ready.
            </strong>
        `;

    }, 1800);

}


/* ==========================================
   NOTIFICATION
========================================== */

const notification =
    document.querySelector(".notification");

notification.addEventListener("click", () => {

    alert(
        "You have 3 new YatraSutra updates."
    );

});


/* ==========================================
   INITIALIZATION
========================================== */

console.log(
    "YatraSutra My Trips loaded successfully."
);