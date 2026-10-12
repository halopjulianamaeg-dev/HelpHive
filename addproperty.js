
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("property-form");
    const message = document.getElementById("property-message");

    if (!form || !message) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

       
const property = {
    id: crypto.randomUUID(),

    propertyName: document.getElementById("propertyName").value.trim(),
    propertyType: document.getElementById("propertyType").value,
    propertyAddress: document.getElementById("propertyAddress").value.trim(),
    propertyDescription: document.getElementById("propertyDescription").value.trim(),

    // Room Details
    availableRooms: Number(
    document.getElementById("availableRooms").value
    ),
    roomType: document.getElementById("roomType").value,

    // Rental Pricing
    monthlyRent: Number(document.getElementById("monthlyRent").value),
    electricityCharge: document.getElementById("electricityCharge").value,
    waterCharge: document.getElementById("waterCharge").value,

    // Selected Amenities
    amenities: Array.from(
        document.querySelectorAll('input[name="amenities"]:checked')
    ).map(checkbox => checkbox.value),

    createdAt: new Date().toISOString()
};


    if (
    !property.propertyName ||
    !property.propertyType ||
    !property.propertyAddress ||
    property.propertyDescription.length < 10 ||
    document.getElementById("monthlyRent").value === "" ||
    property.monthlyRent < 0 ||
    !property.electricityCharge ||
    !property.waterCharge
) {
    message.textContent = "Please complete all required fields correctly.";
    message.className = "text-sm font-medium text-red-500";
    return;
}

        try {
            const savedProperties = JSON.parse(
                localStorage.getItem("helpHiveProperties") || "[]"
            );

            savedProperties.push(property);

            localStorage.setItem(
                "helpHiveProperties",
                JSON.stringify(savedProperties)
            );

            message.textContent = "Property information saved successfully!";
            message.className = "text-sm font-medium text-green-600";

            form.reset();
        } catch (error) {
            message.textContent = "Unable to save the property. Please try again.";
            message.className = "text-sm font-medium text-red-500";
        }
    });
});

    // Dark mode
    window.toggleDarkMode = () => {
        const isDark = document.documentElement.classList.toggle("dark");

        document.documentElement.classList.toggle("light", !isDark);

        try {
            localStorage.setItem("helpHiveDarkMode", isDark ? "dark" : "light");
        } catch (error) {
            console.warn("Could not save theme preference.", error);
        }
    };

    // Notifications dropdown
    window.toggleNotifications = () => {
        document.getElementById("notificationDropdown")
            ?.classList.toggle("hidden");
    };

    // Sign-in profile dropdown
    window.toggleProfileDropdown = () => {
        document.getElementById("profileDropdown")
            ?.classList.toggle("hidden");
    };