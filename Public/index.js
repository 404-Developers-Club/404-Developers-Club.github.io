// NAVIGATION MENU BUTTONS
function sendHome() {
    location.href = "../index.html";
}

function sendEvents() {
    location.href = "../Events/Events.html";
}

function sendLessons() {
    location.href = "../Lessons/Lessons.html";
}

function sendProjects() {
    location.href = "../Projects/Projects.html";
}

function sendSocials() {
    location.href = "../Socials/Socials.html";
}

// EVENTS PAGE
// EVENTS LIST CALENDAR 
const calendarID = '0dfbf6b0715c5734ab533ca72efe09ed708db9a7fe319feb7757fd83101f90f0@group.calendar.google.com';
const calApiKey = 'AIzaSyAPfk300mnQ9MVT-F8CnPYLz_sAp6Id6Ms'
const eventContainers = document.querySelectorAll('.eventsNCont');

async function loadEvents() {
    const now = new Date().toISOString();
    const maxResults = 4;
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?key=${calApiKey}&timeMin=${now}&maxResults=${maxResults}&singleEvents=true&orderBy=startTime`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Filter through events (ex. breaks)
        const originalEvents = data.items;
        for (let i = originalEvents.length - 1; i>=0; i--) {
            const title = (originalEvents[i].summary || '').toLowerCase();
            if (title.includes('break')) {
                originalEvents.splice(i, 1);
                break
            }
        }

        // If there are no more upcoming events, let them know
        if (!originalEvents || originalEvents.length === 0) {
            console.warn("⚠️ No upcoming events found.");
            eventContainers.forEach((container) => {
                container.querySelector('.eNDateH').innerHTML = '--';
                container.querySelector('.eNDescription').ininerHTML = 'No upcoming events.';
            });
            return;
        }
        // Loop through each event container and set each of the dates
        eventContainers.forEach((container, index) => {
            const event = originalEvents[index];
            // If there is an event for that container index, run the script
            if (event) {
                let date;
                // For timed events
                if (event.start.dateTime) {
                    date = new Date(event.start.dateTime);
                } else if (event.start.date) {  // For all day events
                    // Splits the date values and into numerical values 
                    const [year, month, day] = event.start.date.split('-');
                    // Creates a new date object with those numerical values according to local timezone (Avoids time-zone problems with ISO string)
                    date = new Date(Number(year), Number(month) - 1, Number(day));
                }
                // Stores the month (shortened name ver)
                const month = date.toLocaleString('default', { month: 'short' });
                // Stores the day
                const day = date.getDate();

                // Get the heading and description in that container
                const dateElem = container.querySelector('.eNDateH');
                const descElem = container.querySelector('.eNDescription');

                // If those elements exist for that conotainer, change its content
                if (dateElem && descElem) {
                    dateElem.innerHTML = `${month} ${day}`;
                    descElem.innerHTML = event.summary || 'No Title';
                }
            } else {
                container.style.display = 'none';
            }
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        eventContainers.forEach((container) => {
            container.querySelector('.eNDateH').innerHTML = '--';
            container.querySelector('.eNDescription').innerHTML = 'Error loading events.';
        });
    }
}

// Run after DOM is ready
document.addEventListener('DOMContentLoaded', loadEvents);



// EVENTS IMAGE ROTATER
let imageRotateL = ['../Assets/template.png','../Assets/websiteIcon.png'];
let imageListIndex = 0;

function imageRotator() {
    const eventImgElement = document.querySelector('.eventsIMG');
    // Rotates every 5 seconds
    setInterval(() => {
        eventImgElement.src = imageRotateL[imageListIndex];

        imageListIndex++;
        if (imageListIndex > (imageRotateL.length-1)) {
            imageListIndex = 0;
        }
    }, 5000);
}

document.addEventListener('DOMContentLoaded', imageRotator);