import { supabase } from './supabaseClient.js';

/* =========================
   SUPABASE USER
========================= */

const { data: { user } } = await supabase.auth.getUser();

if (!user) {
    window.location.href = "login.html";
} else {
    const displayName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "User";

    const initial = displayName.charAt(0).toUpperCase();

    const userNameEl = document.getElementById("userName");
    const userAvatarEl = document.getElementById("userAvatar");

    if (userNameEl) {
        userNameEl.textContent = displayName;
    }

    if (userAvatarEl) {
        userAvatarEl.textContent = initial;
    }
}

/* =========================
   HERO SLIDESHOW
========================= */

let currentSlide = 0;

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".slide-dot");

function showSlide(index) {
    if (slides.length === 0) return;

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach(slide => {
        slide.classList.remove("opacity-100");
        slide.classList.add("opacity-0");
    });

    dots.forEach(dot => {
        dot.classList.remove("bg-white");
        dot.classList.add("bg-white/50");
    });

    slides[currentSlide].classList.remove("opacity-0");
    slides[currentSlide].classList.add("opacity-100");

    if (dots.length > 0) {
        dots[currentSlide].classList.remove("bg-white/50");
        dots[currentSlide].classList.add("bg-white");
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

showSlide(0);

setInterval(nextSlide, 5000);

/* =========================
   PROPERTY SEARCH
========================= */

function searchProperties() {
    const locationInput = document.getElementById("locationSearch");
    const roomTypeInput = document.getElementById("propertyType");
    const budgetInput = document.getElementById("budgetSearch");
    const properties = document.querySelectorAll(".property-card");

    const location = locationInput?.value.trim().toLowerCase() || "";
    const roomType = roomTypeInput?.value || "";
    const budgetValue = budgetInput?.value.trim();
    const budget = budgetValue === "" ? null : Number(budgetValue);

    let visibleCount = 0;

    properties.forEach(property => {
        const propertyLocation =
            (property.dataset.location || "").toLowerCase();

        const propertyType = property.dataset.type || "";
        const propertyPrice = Number(property.dataset.price || 0);

        let showProperty = true;

        if (
            location !== "" &&
            !propertyLocation.includes(location)
        ) {
            showProperty = false;
        }

        if (
            roomType !== "" &&
            propertyType !== roomType
        ) {
            showProperty = false;
        }

        if (budget !== null && !Number.isNaN(budget)) {
            const lowerBudget = Math.floor(budget / 1000) * 1000;
            const upperBudget = lowerBudget + 900;

            if (
                propertyPrice < lowerBudget ||
                propertyPrice > upperBudget
            ) {
                showProperty = false;
            }
        }

        property.style.display = showProperty ? "" : "none";

        if (showProperty) {
            visibleCount++;
        }
    });

    updateResultsCount(
        visibleCount,
        location,
        roomType,
        budget
    );
}

/* =========================
   RESULTS COUNT
========================= */

function updateResultsCount(
    visibleCount,
    location,
    roomType,
    budget
) {
    const resultCount = document.getElementById("resultsCount");
    const activeFilters = document.getElementById("activeFilters");

    if (resultCount) {
        resultCount.textContent =
            `${visibleCount} ${visibleCount === 1 ? "property" : "properties"} found`;
    }

    if (activeFilters) {
        const filters = [];

        if (location) {
            filters.push(`Location: ${location}`);
        }

        if (roomType) {
            filters.push(`Room: ${roomType}`);
        }

        if (budget !== null && !Number.isNaN(budget)) {
            const lowerBudget = Math.floor(budget / 1000) * 1000;
            const upperBudget = lowerBudget + 900;

            filters.push(
                `Budget: ₱${lowerBudget.toLocaleString()} - ₱${upperBudget.toLocaleString()}`
            );
        }

        activeFilters.textContent =
            filters.length > 0
                ? filters.join(" • ")
                : "Showing all boarding houses";
    }
}

/* =========================
   RESET FILTERS
========================= */

function resetFilters() {
    const locationInput = document.getElementById("locationSearch");
    const roomTypeInput = document.getElementById("propertyType");
    const budgetInput = document.getElementById("budgetSearch");

    if (locationInput) {
        locationInput.value = "";
    }

    if (roomTypeInput) {
        roomTypeInput.value = "";
    }

    if (budgetInput) {
        budgetInput.value = "";
    }

    searchProperties();
}

/* =========================
   ENTER KEY SEARCH
========================= */

const searchInputs = [
    document.getElementById("locationSearch"),
    document.getElementById("budgetSearch")
];

searchInputs.forEach(input => {
    if (!input) return;

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchProperties();
        }
    });
});

/* =========================
   FAVORITES
========================= */

function getSavedFavorites() {
    return JSON.parse(
        localStorage.getItem("helphiveFavorites") || "[]"
    );
}

function saveFavorites(favorites) {
    localStorage.setItem(
        "helphiveFavorites",
        JSON.stringify(favorites)
    );
}

function toggleFavorite(button, propertyName) {
    let favorites = getSavedFavorites();

    if (favorites.includes(propertyName)) {
        favorites = favorites.filter(
            name => name !== propertyName
        );

        button.textContent = "♡";
    } else {
        favorites.push(propertyName);
        button.textContent = "♥";
    }

    saveFavorites(favorites);
}

function restoreFavorites() {
    const favorites = getSavedFavorites();

    document.querySelectorAll(".favorite-button").forEach(button => {
        const propertyName = button.dataset.property;

        if (favorites.includes(propertyName)) {
            button.textContent = "♥";
        }
    });
}

/* =========================
   VIEW PROPERTY
========================= */

function viewProperty(propertyName) {
    alert(
        `You selected ${propertyName}. Property details can be added here later.`
    );
}

/* =========================
   NOTIFICATIONS
========================= */

function handleNotifications() {
    alert("Notifications will be available here later.");
}

/* =========================
   HTML ONCLICK FUNCTIONS
========================= */

window.showSlide = showSlide;
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;

window.searchProperties = searchProperties;
window.resetFilters = resetFilters;

window.toggleFavorite = toggleFavorite;
window.viewProperty = viewProperty;
window.handleNotifications = handleNotifications;

/* =========================
   START
========================= */

restoreFavorites();

console.log("🐝 HelpHive dashboard.js is working!");