const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const junedates = [
    "2025-6-1", "2025-6-2", "2025-6-3", "2025-6-4", "2025-6-5", "2025-6-6", "2025-6-7",
    "2025-6-8", "2025-6-9", "2025-6-10", "2025-6-11", "2025-6-12", "2025-6-13", "2025-6-14",
    "2025-6-15", "2025-6-16", "2025-6-17", "2025-6-18", "2025-6-19", "2025-6-20", "2025-6-21",
    "2025-6-22", "2025-6-23", "2025-6-24", "2025-6-25", "2025-6-26", "2025-6-27", "2025-6-28",
    "2025-6-29", "2025-6-30"
];

const julydates = [
    "2025-7-1", "2025-7-2", "2025-7-3", "2025-7-4", "2025-7-5", "2025-7-6", "2025-7-7",
    "2025-7-8", "2025-7-9", "2025-7-10", "2025-7-11", "2025-7-12", "2025-7-13", "2025-7-14",
    "2025-7-15", "2025-7-16", "2025-7-17", "2025-7-18", "2025-7-19", "2025-7-20", "2025-7-21",
    "2025-7-22", "2025-7-23", "2025-7-24", "2025-7-25", "2025-7-26", "2025-7-27", "2025-7-28",
    "2025-7-29", "2025-7-30", "2025-7-31"
];
const junePromotions  = [
    "Open House Sunday", "Mortgage Monday", "Tour Tuesday", "Walkthrough Wednesday", "Thrifty Thursday", "Feature Friday", "Spotlight Saturday",
    "Virtual Tour", "Condo Highlights", "Buyer’s Guide", "Market Update", "Luxury Listing", "Home Financing Tips", "Staging Secrets",
    "Neighbourhood Walk", "First-Time Buyer Help", "Investment Insights", "Homeowner Hacks", "Ask a Realtor", "Land Listing Special", "Farmhouse Feature",
    "Virtual Open House", "Eco-Friendly Focus", "Renovation Day", "Q&A Wednesday", "New Listing Alert", "Hot Property Day", "Best Deal Friday",
    "Final Offer Saturday", "Wrap-up"
  ];
  
  const juneDetails = [
    "Live open house showcase", "Low rate mortgage options", "Personal guided tours", "Live walkthrough sessions", "Discounts on select listings", "Highlighting top property", "Special spotlight home",
    "Tour from your home", "Explore best condos", "Free guide for buyers", "June market trends", "Luxury picks for June", "Tips to finance your dream", "How to stage your house",
    "Explore new areas", "Advice for first-time buyers", "Where to invest now", "Home maintenance tips", "Chat with our experts", "Spotlight on land", "Charming farmhouses",
    "Open house you can join online", "Green energy homes", "DIY renovation tips", "Live Q&A with agent", "Be the first to see it", "Best deals this month", "Unmissable property",
    "Make your final offer", " final events"
  ];
  
  const junePrices = [
    "$500,000", "$350,000", "$420,000", "$450,000", "$375,000", "$490,000", "$505,000",
    "$460,000", "$380,000", "$410,000", "$465,000", "$1,000,000", "$360,000", "$395,000",
    "$370,000", "$330,000", "$470,000", "$340,000", "Free Consultation", "$275,000", "$690,000",
    "$480,000", "$400,000", "$320,000", "Free Event", "$520,000", "$398,000", "$450,000",
    "$525,000", "$0 Info Only"
  ];

  const julyPromotions = [
    "Summer Open House", "Mid-Year Mortgage Special", "July Tour Days", 
    "Walk-In Wednesdays", "Summer Savings Thursday", "Feature Friday", 
    "Weekend Showcase", "Virtual Home Tours", "Condo Summer Special", 
    "Buyer's Summer Guide", "July Market Update", "Luxury Summer Homes", 
    "Summer Financing Tips", "Summer Staging", "Neighborhood Summer Fest", 
    "First-Time Summer Buyers", "Summer Investment Deals", "Summer Home Care", 
    "Ask a Summer Realtor", "Summer Land Deals", "Summer Farmhouse Tours",
    "Virtual Summer Open House", "Summer Eco Homes", "Summer Renovation Tips", 
    "Summer Q&A", "New Summer Listings", "Hot Summer Deals", 
    "Best Summer Offers", "Summer Closing Special", "July Finale", 
    "Summer Wrap-up"
];

const julyDetails = [
    "Summer edition open houses", "Special summer mortgage rates", 
    "Cool summer property tours", "Casual Wednesday walkthroughs", 
    "Summer season discounts", "Featured summer properties", 
    "Weekend summer showcases", "Virtual tours from anywhere", 
    "Best summer condos", "Summer buyer's handbook", 
    "July real estate trends", "Luxury homes for summer", 
    "Summer financing options", "Summer home staging", 
    "Summer neighborhood events", "Summer first-time buyer help", 
    "Hot summer investments", "Summer home maintenance", 
    "Summer realtor advice", "Summer land opportunities", 
    "Summer farmhouse features", "Online summer open houses", 
    "Summer eco-friendly homes", "Summer DIY projects", 
    "Summer Q&A sessions", "Fresh summer listings", 
    "Hottest summer deals", "Best summer offers", 
    "Summer closing specials", "July closing events", 
    "Summer holiday specials"
];

const julyPrices = [
    "$495,000", "$345,000", "$415,000", "$445,000", "$370,000", "$485,000", 
    "$500,000", "$455,000", "$375,000", "$405,000", "$460,000", "$995,000", 
    "$355,000", "$390,000", "$365,000", "$325,000", "$465,000", "$335,000", 
    "Free Summer Consult", "$270,000", "$685,000", "$475,000", "$395,000", 
    "$315,000", "Free Summer Event", "$515,000", "$393,000", "$445,000", 
    "$520,000", "$0 Summer Info", "Summer Special Price"
];

  
window.addEventListener("load", showJune);

function renderCalendar(datesArray, nextHandler, buttonLabel, headerText, namesArray, detailsArray, pricesArray) {
    const headingcells = document.getElementsByTagName("th");
    const cells = document.getElementsByTagName("td");
    const header = document.querySelector("h1");
    header.textContent = headerText;

    for (let i = 0; i < 7; i++) {
        headingcells[i].innerHTML = days[i];
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
    }

    const firstDay = new Date(datesArray[0]).getDay();

    for (let i = 0; i < datesArray.length && (i + firstDay) < cells.length; i++) {
        const dateObj = new Date(datesArray[i]);
        const dayCell = cells[i + firstDay];

        dayCell.innerHTML = `
            <strong>${dateObj.getDate()}</strong><br/>
            <em>${namesArray[i]}</em><br/>
            ${detailsArray[i]}<br/>
            <strong>${pricesArray[i]}</strong>
        `;
    }

    const button = document.getElementById("next_month");
    button.onclick = nextHandler;
    button.value = buttonLabel;
}


function showJune() {
    renderCalendar(junedates, showJuly, "Next Month", "June 2025 Promotions", junePromotions, juneDetails, junePrices);
}

function showJuly() {
    renderCalendar(julydates, showJune, "Previous Month", "July 2025 Promotions", julyPromotions, julyDetails, julyPrices);
}

