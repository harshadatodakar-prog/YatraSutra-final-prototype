/* ============================================
   YATRASUTRA DASHBOARD JAVASCRIPT
============================================ */


/* ============================================
   MOBILE SIDEBAR
============================================ */

const mobileMenu = document.getElementById("mobileMenu");
const sidebar = document.getElementById("sidebar");

mobileMenu.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});


/* ============================================
   SIDEBAR NAVIGATION
============================================ */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", function(e) {
        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


/* ============================================
   SEARCH
============================================ */

const searchInput =
    document.getElementById("searchInput");

searchInput.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {

        const query = this.value.trim();

        if (!query) {
            alert("Please enter something to search.");
            return;
        }

        alert(
            `Searching YatraSutra for "${query}"...`
        );

    }

});


/* ============================================
   AI MODAL
============================================ */

const aiModal =
    document.getElementById("aiModal");


function openAI() {

    aiModal.classList.add("show");

}


function closeAI() {

    aiModal.classList.remove("show");

}


async function generatePlan() {

    const input = document.getElementById("modalMessage");
    const result = document.getElementById("planResult");

    const message = input.value.trim();

    if (!message) {
        result.innerHTML = "Please describe your trip first.";
        return;
    }

    result.innerHTML = `
        <strong>🤖 Yatra AI is creating your itinerary...</strong>
        <br><br>
        Please wait a moment.
    `;

    try {

        const response = await fetch(
            "https://gkmiyzlplgqphnvpeuuh.supabase.co/functions/v1/Yatra_AI",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data = await response.json();

        console.log("Yatra AI response:", data);

        if (!response.ok) {
            throw new Error(
                data.error || "Yatra AI request failed."
            );
        }

        const itinerary =
            data.reply ||
            data.response ||
            data.message ||
            data.text;

        if (!itinerary) {
            throw new Error("AI returned an empty response.");
        }

        result.innerHTML = `
            <strong>✨ Your Yatra AI Itinerary</strong>
            <br><br>
            ${itinerary.replace(/\n/g, "<br>")}
        `;

    } catch (error) {

        console.error("Yatra AI Error:", error);

        result.innerHTML = `
            <strong>❌ Something went wrong.</strong>
            <br><br>
            ${error.message}
        `;

    }
}


/* ============================================
   AI CHAT
============================================ */

const chatInput =
    document.getElementById("chatInput");

async function sendMessage() {

    const message = chatInput.value.trim();

    if (!message) {
        return;
    }

    chatInput.value = "";

    try {

        const response = await fetch(
            "https://gkmiyzlplgqphnvpeuuh.supabase.co/functions/v1/Yatra_AI",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "apikey": "sb_publishable_Sh89iRHQ-8uiDRVFwuy4Vw_Jq3HsBJ-",
                    "Authorization": "Bearer sb_publishable_Sh89iRHQ-8uiDRVFwuy4Vw_Jq3HsBJ-"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data = await response.json();

        console.log("Yatra AI response:", data);

        if (!response.ok) {
            throw new Error(
                data.error || data.message || "Yatra AI request failed."
            );
        }

        alert(data.reply);

    } catch (error) {

        console.error("Yatra AI error:", error);

        alert(
            "Yatra AI could not respond\n\n" +
            error.message
        );

    }
}


/* ============================================
   BEFORE YOU VISIT
============================================ */

function openCulture() {
    window.location.href = "../Cultural/cultural.html";
    return;

    alert(
        "Opening Before You Visit:\n\n"
        +
        "• Local Greetings\n"
        +
        "• Dress Code\n"
        +
        "• Food Etiquette\n"
        +
        "• Cultural Do's & Don'ts\n"
        +
        "• Photography Rules\n"
        +
        "• Local Traditions"
    );

}


/* ============================================
   ITINERARY
============================================ */

function viewItinerary() {
    window.location.href = "../My trip/my-trips.html";
}


/* ============================================
   QUICK ACTIONS
============================================ */

function planTrip() {

    openAI();

}


function explore() {
    window.location.href = "../saved-destinations/saved-destinations.html";
}


function bookings() {
    window.location.href = "../Bookings/bookings.html";

}


function profile() {

    alert(
        "Opening your profile..."
    );

}


/* ============================================
   NOTIFICATION
============================================ */

const notification =
    document.querySelector(".notification");

notification.addEventListener("click", () => {

    alert(
        "You have 3 new YatraSutra updates."
    );

});


/* ============================================
   FULL REPORT
============================================ */

const reportButton =
    document.querySelector(".report-btn");

reportButton.addEventListener("click", () => {

    alert(
        "Destination Intelligence Report\n\n"
        +
        "Weather: Sunny, 29°C\n"
        +
        "Crowd: Moderate (62%)\n"
        +
        "Hidden Gems: 3 nearby\n"
        +
        "Cultural Experiences: 3 available\n"
        +
        "AI Recommendation: Morjim Beach"
    );

});


/* ============================================
   INITIALIZE
============================================ */

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "YatraSutra Smart Tourism Dashboard Loaded."
    );

});