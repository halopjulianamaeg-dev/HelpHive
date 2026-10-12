
// ==========================================
// HELPHIVE DASHBOARD JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // DARK MODE
    // ==========================================

    const savedTheme = localStorage.getItem("helpHiveDarkMode");

    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }


    // ==========================================
    // HERO SLIDER
    // ==========================================

    let currentSlide = 0;
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".slide-dot");

    function showSlide(index) {

        if (slides.length === 0) return;

        // Make sure index stays within range
        if (index >= slides.length) {
            index = 0;
        }

        if (index < 0) {
            index = slides.length - 1;
        }

        currentSlide = index;

        // Hide all slides
        slides.forEach((slide, i) => {
            slide.classList.remove("opacity-100");
            slide.classList.add("opacity-0");

            if (i === currentSlide) {
                slide.classList.remove("opacity-0");
                slide.classList.add("opacity-100");
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.remove("bg-white");
            dot.classList.add("bg-white/50");

            if (i === currentSlide) {
                dot.classList.remove("bg-white/50");
                dot.classList.add("bg-white");
            }
        });
    }


    // Make showSlide available to your HTML onclick
    window.showSlide = showSlide;


    // Automatically change slide every 5 seconds
    if (slides.length > 1) {
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }


    // ==========================================
    // DARK MODE TOGGLE
    // ==========================================

    window.toggleDarkMode = function () {

        const html = document.documentElement;

        html.classList.toggle("dark");

        if (html.classList.contains("dark")) {
            localStorage.setItem("helpHiveDarkMode", "dark");
        } else {
            localStorage.setItem("helpHiveDarkMode", "light");
        }
    };


    // ==========================================
    // NOTIFICATION DROPDOWN
    // ==========================================

    window.toggleNotifications = function () {

        const notificationDropdown =
            document.getElementById("notificationDropdown");

        const profileDropdown =
            document.getElementById("profileDropdown");

        if (!notificationDropdown) return;

        // Close profile dropdown
        if (profileDropdown) {
            profileDropdown.classList.add("hidden");
        }

        // Toggle notification dropdown
        notificationDropdown.classList.toggle("hidden");
    };


    // ==========================================
    // PROFILE DROPDOWN
    // ==========================================

    window.toggleProfileDropdown = function () {

        const profileDropdown =
            document.getElementById("profileDropdown");

        const notificationDropdown =
            document.getElementById("notificationDropdown");

        if (!profileDropdown) return;

        // Close notification dropdown
        if (notificationDropdown) {
            notificationDropdown.classList.add("hidden");
        }

        // Toggle profile dropdown
        profileDropdown.classList.toggle("hidden");
    };


    // ==========================================
    // CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
    // ==========================================

    document.addEventListener("click", (event) => {

        const notificationDropdown =
            document.getElementById("notificationDropdown");

        const profileDropdown =
            document.getElementById("profileDropdown");

        const notificationButton =
            event.target.closest(
                '[onclick="toggleNotifications()"]'
            );

        const profileButton =
            event.target.closest(
                '[onclick="toggleProfileDropdown()"]'
            );

        // Close notification dropdown
        if (
            notificationDropdown &&
            !notificationDropdown.contains(event.target) &&
            !notificationButton
        ) {
            notificationDropdown.classList.add("hidden");
        }

        // Close profile dropdown
        if (
            profileDropdown &&
            !profileDropdown.contains(event.target) &&
            !profileButton
        ) {
            profileDropdown.classList.add("hidden");
        }
    });


    // ==========================================
    // SMOOTH SCROLL TO TOP
    // ==========================================

    window.scrollToTop = function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // ==========================================
    // INITIALIZE SLIDER
    // ==========================================

    showSlide(0);

    // Successfully Rented Properties carousel
const rentedTrack = document.getElementById("rentedPropertiesTrack");
const rentedPrevBtn = document.getElementById("rentedPrevBtn");
const rentedNextBtn = document.getElementById("rentedNextBtn");

if (rentedTrack && rentedPrevBtn && rentedNextBtn) {
    const scrollRentedProperties = (direction) => {
        const firstCard = rentedTrack.querySelector(":scope > div");

        if (!firstCard) return;

        const cardWidth = firstCard.getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(rentedTrack).columnGap) || 0;

        rentedTrack.scrollBy({
            left: direction * (cardWidth + gap),
            behavior: "smooth"
        });
    };

    rentedPrevBtn.addEventListener("click", () => {
        scrollRentedProperties(-1);
    });

    rentedNextBtn.addEventListener("click", () => {
        scrollRentedProperties(1);
    });
}

});



/* HELPHIVE - MY LISTINGS */

const hhListings = [
    {
        id: "HH-BOR001",
        name: "Borongan Student Loft",
        location: "Near City Center, Borongan City",
        price: 3500,
        room: "Bunk Bed",
        wifi: "Free WiFi",
        bath: "1 bathroom",
        area: 22,
        owner: "Maria Santos",
        status: "featured",
        favorite: false,
        images: [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"
        ]
    },
    {
        id: "HH-BOR002",
        name: "Sunrise Boarding House",
        location: "Lalawigan, Borongan City",
        price: 4500,
        room: "Private Room",
        wifi: "AC Available",
        bath: "5 bathrooms",
        area: 18,
        owner: "Juan Dela Cruz",
        status: "verified",
        favorite: false,
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=900&q=80"
        ]
    },
    {
        id: "HH-BOR003",
        name: "Hive Dormitory Hub",
        location: "Songco, Borongan City",
        price: 2800,
        room: "Student Bed",
        wifi: "Utilities Included",
        bath: "1 bathroom",
        area: 15,
        owner: "Mark Anthony",
        status: "verified",
        favorite: false,
        images: [
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
        ]
    }
];

let hhNextId = 4;
let hhEditingId = null;
let hhMode = "view";

const hhGrid = document.getElementById("hh-listing-grid");
const hhSearch = document.getElementById("hh-search");
const hhFilter = document.getElementById("hh-filter");
const hhCount = document.getElementById("hh-count");
const hhEmpty = document.getElementById("hh-empty");
const hhModal = document.getElementById("hh-modal");
const hhForm = document.getElementById("hh-form");

function hhEscape(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function hhMoney(value) {
    return "₱" + Number(value).toLocaleString("en-PH");
}

function hhInitials(name) {
    return name.trim().split(/\s+/).slice(0, 2)
        .map(word => word[0] || "").join("").toUpperCase();
}

function hhRender() {
    const search = hhSearch.value.trim().toLowerCase();
    const filter = hhFilter.value;

    const results = hhListings.filter(item => {
        const text = [
            item.id, item.name, item.location,
            item.owner, item.room
        ].join(" ").toLowerCase();

        return text.includes(search) &&
            (filter === "all" || item.status === filter);
    });

    hhCount.textContent = results.length;
    hhEmpty.classList.toggle("hidden", results.length !== 0);

    hhGrid.innerHTML = results.map(item => `
        <article class="hh-card overflow-hidden rounded-3xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-800 shadow-sm
            hover:shadow-lg transition-shadow">

            <div class="hh-listing-image">
                <img src="${hhEscape(item.images[0])}"
                    alt="${hhEscape(item.name)}"
                    data-card-image="${hhEscape(item.id)}"
                    onerror="this.onerror=null;this.src='https://placehold.co/800x500/f7edcf/6c5b36?text=Property+Image'">

                <span class="absolute top-4 left-4 rounded-full
                    bg-[#d89a00] px-4 py-2 text-[9px]
                    font-extrabold uppercase text-white">
                    ${item.status === "featured" ? "Featured" : "Verified"}
                </span>

                <button type="button"
                    data-action="favorite" data-id="${hhEscape(item.id)}"
                    aria-label="Toggle favorite"
                    class="absolute top-4 right-4 flex h-10 w-10
                    items-center justify-center rounded-full
                    bg-white text-slate-500 shadow">
                    <i class="${item.favorite ? "fa-solid text-rose-500" : "fa-regular"} fa-heart"></i>
                </button>

                <button type="button" data-action="prev"
                    data-id="${hhEscape(item.id)}"
                    aria-label="Previous photo"
                    class="absolute left-3 top-1/2 -translate-y-1/2
                    flex h-8 w-8 items-center justify-center
                    rounded-full bg-black/50 text-white">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>

                <button type="button" data-action="next"
                    data-id="${hhEscape(item.id)}"
                    aria-label="Next photo"
                    class="absolute right-3 top-1/2 -translate-y-1/2
                    flex h-8 w-8 items-center justify-center
                    rounded-full bg-black/50 text-white">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>

                <div class="absolute bottom-3 left-1/2
                    -translate-x-1/2 flex gap-1.5">
                    ${item.images.map((img, index) => `
                        <button type="button"
                            class="hh-image-dot ${index === 0 ? "active" : ""}"
                            data-action="photo" data-id="${hhEscape(item.id)}"
                            data-index="${index}"
                            aria-label="Show photo ${index + 1}">
                        </button>
                    `).join("")}
                </div>
            </div>

            <div class="p-5">
                <h3 class="text-base font-extrabold
                    text-slate-900 dark:text-white">
                    ${hhEscape(item.name)}
                </h3>

                <p class="mt-1 text-[10px] text-slate-400">
                    ${hhEscape(item.id)}
                </p>

                <p class="mt-3 flex items-start gap-2
                    text-xs leading-5 text-slate-500 dark:text-slate-400">
                    <i class="fa-solid fa-location-dot
                        text-[#d89a00] mt-0.5"></i>
                    ${hhEscape(item.location)}
                </p>

                <p class="mt-4 mb-4 text-2xl font-extrabold
                    text-[#d89a00]">
                    ${hhMoney(item.price)}
                    <span class="text-[11px] font-normal
                        text-slate-400">/ month</span>
                </p>

                <div class="flex flex-wrap gap-2 pb-5
                    border-b border-slate-100 dark:border-slate-700">

                    <span class="rounded-lg bg-slate-50
                        dark:bg-slate-700 px-2.5 py-2
                        text-[10px] font-medium text-slate-600
                        dark:text-slate-200">
                        <i class="fa-solid fa-bed text-[#d89a00] mr-1"></i>
                        ${hhEscape(item.room)}
                    </span>

                    <span class="rounded-lg bg-slate-50
                        dark:bg-slate-700 px-2.5 py-2
                        text-[10px] font-medium text-slate-600
                        dark:text-slate-200">
                        <i class="fa-solid fa-wifi text-[#d89a00] mr-1"></i>
                        ${hhEscape(item.wifi)}
                    </span>

                    <span class="rounded-lg bg-slate-50
                        dark:bg-slate-700 px-2.5 py-2
                        text-[10px] font-medium text-slate-600
                        dark:text-slate-200">
                        <i class="fa-solid fa-bath text-[#d89a00] mr-1"></i>
                        ${hhEscape(item.bath)}
                    </span>

                    <span class="rounded-lg bg-slate-50
                        dark:bg-slate-700 px-2.5 py-2
                        text-[10px] font-medium text-slate-600
                        dark:text-slate-200">
                        <i class="fa-solid fa-ruler-combined text-[#d89a00] mr-1"></i>
                        ${hhEscape(item.area)} sqm
                    </span>
                </div>

                <div class="flex items-center gap-3 pt-4">
                    <div class="flex h-10 w-10 shrink-0
                        items-center justify-center rounded-full
                        bg-amber-100 text-xs font-bold text-amber-800">
                        ${hhEscape(hhInitials(item.owner))}
                    </div>

                    <div class="min-w-0 flex-1">
                        <p class="text-[10px] text-slate-400">Owner</p>
                        <p class="truncate text-xs font-bold
                            text-slate-700 dark:text-slate-200">
                            ${hhEscape(item.owner)}
                        </p>
                    </div>

                    <span class="text-xs text-slate-400">
                        <i class="fa-solid fa-shield-halved text-[#d89a00]"></i>
                        ${item.status === "verified" ? "Verified" : "Featured"}
                    </span>
                </div>

                <!-- VIEW / EDIT BUTTONS -->
                <div class="mt-5 flex gap-2">
                    <button type="button"
                        data-action="view" data-id="${hhEscape(item.id)}"
                        class="hh-action-btn hh-view-btn">
                        <i class="fa-regular fa-eye"></i> View
                    </button>

                    <button type="button"
                        data-action="edit" data-id="${hhEscape(item.id)}"
                        class="hh-action-btn hh-edit-btn">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>

                    <button type="button"
                        data-action="delete" data-id="${hhEscape(item.id)}"
                        aria-label="Delete listing"
                        class="hh-action-btn hh-delete-btn">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

// OPEN AND CLOSE MODAL
function hhOpenModal() {
    hhModal.classList.remove("hidden");
    hhModal.classList.add("flex");
    document.body.style.overflow = "hidden";
}

function hhCloseModal() {
    hhModal.classList.add("hidden");
    hhModal.classList.remove("flex");
    document.body.style.overflow = "";
    hhForm.reset();
    hhEditingId = null;
}

hhModal.addEventListener("click", event => {
    if (event.target === hhModal) hhCloseModal();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !hhModal.classList.contains("hidden")) {
        hhCloseModal();
    }
});

// VIEW LISTING
function hhView(item) {
    hhMode = "view";
    hhEditingId = item.id;

    document.getElementById("hh-modal-title").textContent = "Listing Details";
    document.getElementById("hh-view-content").classList.remove("hidden");
    document.getElementById("hh-edit-fields").classList.add("hidden");
    document.getElementById("hh-save").classList.add("hidden");

    document.getElementById("hh-view-content").innerHTML = `
        <img src="${hhEscape(item.images[0])}"
            alt="${hhEscape(item.name)}"
            onerror="this.onerror=null;this.src='https://placehold.co/800x500/f7edcf/6c5b36?text=Property+Image'">

        <h4 class="text-xl font-extrabold
            text-slate-900 dark:text-white">
            ${hhEscape(item.name)}
        </h4>

        <p class="mt-1 text-xs text-slate-400">
            ${hhEscape(item.id)}
        </p>

        <p class="mt-3 text-sm text-slate-500 dark:text-slate-300">
            <i class="fa-solid fa-location-dot text-[#d89a00] mr-2"></i>
            ${hhEscape(item.location)}
        </p>

        <p class="mt-4 text-2xl font-extrabold text-[#d89a00]">
            ${hhMoney(item.price)}
            <span class="text-xs font-normal text-slate-400">/ month</span>
        </p>

        <div class="mt-5 grid grid-cols-2 gap-3">
            ${[
                ["Room Type", item.room],
                ["Wi-Fi / Utilities", item.wifi],
                ["Bathroom", item.bath],
                ["Floor Area", item.area + " sqm"],
                ["Owner", item.owner],
                ["Status", item.status]
            ].map(([label, value]) => `
                <div class="rounded-xl bg-slate-50
                    dark:bg-slate-800 p-3">
                    <p class="text-[10px] text-slate-400">${hhEscape(label)}</p>
                    <p class="mt-1 text-xs font-bold
                        text-slate-800 dark:text-slate-100">
                        ${hhEscape(value)}
                    </p>
                </div>
            `).join("")}
        </div>
    `;

    hhOpenModal();
}

// ADD / EDIT FORM
function hhOpenAdd() {
    hhEdit(null);
}

function hhEdit(item) {
    hhMode = item ? "edit" : "add";
    hhEditingId = item ? item.id : null;

    document.getElementById("hh-modal-title").textContent =
        item ? "Edit Listing" : "Add New Listing";

    document.getElementById("hh-view-content").classList.add("hidden");
    document.getElementById("hh-edit-fields").classList.remove("hidden");
    document.getElementById("hh-save").classList.remove("hidden");

    document.getElementById("hh-name").value = item?.name || "";
    document.getElementById("hh-location").value = item?.location || "";
    document.getElementById("hh-price").value = item?.price || "";
    document.getElementById("hh-area").value = item?.area || "";
    document.getElementById("hh-room").value = item?.room || "";
    document.getElementById("hh-wifi").value = item?.wifi || "";
    document.getElementById("hh-bath").value = item?.bath || "";
    document.getElementById("hh-owner").value = item?.owner || "";
    document.getElementById("hh-image").value = item?.images?.[0] || "";
    document.getElementById("hh-status").value = item?.status || "verified";

    hhOpenModal();
}

// SAVE LISTING
hhForm.addEventListener("submit", event => {
    event.preventDefault();

    if (hhMode === "view") return;

    const name = document.getElementById("hh-name").value.trim();
    const location = document.getElementById("hh-location").value.trim();
    const price = Number(document.getElementById("hh-price").value);
    const area = Number(document.getElementById("hh-area").value);
    const room = document.getElementById("hh-room").value.trim();
    const wifi = document.getElementById("hh-wifi").value.trim();
    const bath = document.getElementById("hh-bath").value.trim();
    const owner = document.getElementById("hh-owner").value.trim();
    const image = document.getElementById("hh-image").value.trim();
    const status = document.getElementById("hh-status").value;

    if (!name || !location || !room || !wifi || !bath ||
        !owner || price <= 0 || area <= 0) {
        alert("Please complete all required fields.");
        return;
    }

    if (image && !/^https?:\/\//i.test(image)) {
        alert("Please enter a valid image URL beginning with https://");
        return;
    }

    const existing = hhListings.find(item => item.id === hhEditingId);

    const updated = {
        id: existing ? existing.id :
            "HH-BOR" + String(hhNextId++).padStart(3, "0"),
        name, location, price, area, room, wifi, bath, owner, status,
        favorite: existing ? existing.favorite : false,
        images: image
            ? [image, ...(existing?.images || []).filter(url => url !== image)]
            : existing?.images || [
                "https://placehold.co/800x500/f7edcf/6c5b36?text=Property+Image"
            ]
    };

    if (existing) {
        Object.assign(existing, updated);
    } else {
        hhListings.unshift(updated);
    }

    hhCloseModal();
    hhRender();
});

// CARD BUTTONS
hhGrid.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const item = hhListings.find(listing => listing.id === button.dataset.id);
    if (!item) return;

    const action = button.dataset.action;

    if (action === "view") {
        hhView(item);
    }

    if (action === "edit") {
        hhEdit(item);
    }

    if (action === "delete") {
        if (confirm(`Delete "${item.name}" from your listings?`)) {
            const index = hhListings.findIndex(listing => listing.id === item.id);
            if (index !== -1) hhListings.splice(index, 1);
            hhRender();
        }
    }

    if (action === "favorite") {
        item.favorite = !item.favorite;
        hhRender();
    }

    if (action === "prev" || action === "next" || action === "photo") {
        const image = button.closest(".hh-card")
            .querySelector("[data-card-image]");

        let index = Number(image.dataset.index || 0);

        if (action === "photo") {
            index = Number(button.dataset.index);
        } else if (action === "next") {
            index = (index + 1) % item.images.length;
        } else {
            index = (index - 1 + item.images.length) % item.images.length;
        }

        image.dataset.index = index;
        image.src = item.images[index];

        const dots = button.closest(".hh-listing-image")
            .querySelectorAll(".hh-image-dot");

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }
});

// SEARCH AND FILTER
hhSearch.addEventListener("input", hhRender);
hhFilter.addEventListener("change", hhRender);

// INITIAL RENDER
document.addEventListener("DOMContentLoaded", hhRender);
hhRender();


// View Property
function viewProperty(propertyId) {
    // Replace this with your actual View page URL.
    window.location.href =
        `view-property.html?id=${encodeURIComponent(propertyId)}`;
}

// Edit Property
function editProperty(propertyId) {
    // Replace this with your actual Edit page URL.
    window.location.href =
        `edit-property.html?id=${encodeURIComponent(propertyId)}`;
}

