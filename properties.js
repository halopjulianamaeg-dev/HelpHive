

function searchProperties() {

    const location =
        document
            .getElementById("locationSearch")
            .value
            .toLowerCase();

    const propertyType =
        document
            .getElementById("propertyType")
            .value;

    const budget =
        document
            .getElementById("budget")
            .value;

    const properties =
        document.querySelectorAll(".property-card");

    let count = 0;


    properties.forEach(property => {

        const propertyLocation =
            property
                .dataset
                .location
                .toLowerCase();

        const propertyPrice =
            Number(property.dataset.price);

        const propertyTypeValue =
            property.dataset.type;


        let show = true;


        /* Location */

        if (
            location &&
            !propertyLocation.includes(location)
        ) {
            show = false;
        }


        /* Property type */

        if (
            propertyType &&
            propertyTypeValue !== propertyType
        ) {
            show = false;
        }


        /* Budget */

        if (budget) {

            const maxBudget =
                Number(budget);

            if (propertyPrice > maxBudget) {
                show = false;
            }

        }


        if (show) {

            property.style.display = "block";

            count++;

        } else {

            property.style.display = "none";

        }

    });


    document.getElementById("resultCount").textContent =
        count + " boarding houses found";

}




function toggleFavorite(button) {

    button.classList.toggle("active");


    if (
        button.classList.contains("active")
    ) {

        button.textContent = "♥";

    } else {

        button.textContent = "♡";

    }

}



function viewProperty(propertyName) {

    alert(
        "You selected: " +
        propertyName
    );

}


document
    .getElementById("sortProperties")
    .addEventListener("change", function () {

        const sortValue = this.value;

        const grid =
            document.getElementById("propertyGrid");

        const properties =
            Array.from(
                grid.querySelectorAll(".property-card")
            );


        if (sortValue === "low") {

            properties.sort(
                (a, b) =>
                    Number(a.dataset.price) -
                    Number(b.dataset.price)
            );

        }


        if (sortValue === "high") {

            properties.sort(
                (a, b) =>
                    Number(b.dataset.price) -
                    Number(a.dataset.price)
            );

        }


        properties.forEach(property => {

            grid.appendChild(property);

        });

    });