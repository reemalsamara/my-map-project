function calculateTotal() {
    let prices = {
        Kitchener: 949000,
        Hamilton: 1100000,
        Burlington: 2399000
    };

    let selectedProperty = null;

    if (document.getElementById("Kitchener").checked) {
        selectedProperty = "Kitchener";
    } else if (document.getElementById("Hamilton").checked) {
        selectedProperty = "Hamilton";
    } else if (document.getElementById("Burlington").checked) {
        selectedProperty = "Burlington";
    }

    if (selectedProperty) {
        let price = prices[selectedProperty];
        let taxRate = 0.015;
        let commissionRate = 0.020;

        let tax = price * taxRate;
        let commission = price * commissionRate;
        let total = price + tax + commission;

        document.getElementById("result").innerHTML =
            `Property price is: ${price}$\n` +
            `Property Tax is: ${tax}$\n` +
            `Realtor commission is: ${commission}$\n` +
            `Total price is: ${total }$`;
    } else {
        document.getElementById("result").innerHTML = "Please select a property.";
    }
}
