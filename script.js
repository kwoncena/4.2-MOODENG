// script.js

// Get the cursor, text elements, and the typewriter container
const myCursor = document.getElementById("cursor");
const moodengText = document.getElementById("moodeng-text");
const typewriterContainer = document.getElementById("typewriter-container");
const contentDiv = document.getElementById('content');

let isDrawingImages = false; // Track if the user is currently drawing images
let currentLine = 0; // Track the current line being typed for typewriter
let typingActive = false; // Track if the typing animation is currently running

// Text lines about Moo Deng
const mooDengText = [
    "Moo Deng (born 10 July 2024) is a pygmy hippopotamus living in Khao Kheow Open Zoo in Si Racha, Chonburi, Thailand.",
    "She became a popular Internet meme at two months of age after images of her went viral online in September 2024.",
    "",
    "Background",
    "Moo Deng was born on 10 July 2024 to parents Tony and Jonah.",
    "She has two full siblings (Nadet and Moo Tun) and four half-siblings (Ko, Kanya, Phalo, and Moo Wan).",
    "The name Moo Deng (Thai: หมูเด้ง, RTGS: mu deng, pronounced [mǔː dêŋ]) was chosen through a public poll, with over 20,000 people voting for it.",
    "It translates to 'bouncy pork' or 'bouncy pig' in English.",
    "",
    "Online popularity",
    "Khao Kheow Open Zoo posted images of its pygmy hippopotamuses on its official Facebook page, and Moo Deng quickly became a favorite among fans.",
    "Moo Deng is noted to be more playful and energetic than other hippopotamuses.",
    "In response to her popularity, the zoo began selling clothing and other merchandise featuring designs based on Moo Deng.",
    "Moo Deng has become the subject of many pieces of fan art.",
    "",
    "Due to Moo Deng's viral online popularity, the number of daily visitors to the zoo doubled in early September 2024.",
    "Around this time, some visitors have harassed the baby by splashing her with water or throwing objects at her to wake her up.",
    "As a result, the Khao Kheow Open Zoo installed security cameras around her enclosure.",
    "The zoo director has threatened legal action against visitors who harassed her.",
    "The misbehavior by some visitors has been widely condemned online.",
    "The zoo also implemented a five-minute time limit for visitors in order to accommodate the high volume.",
    "",
    "In September 2024, zoo director Narongwit Chodchoi announced that the zoo had begun the process of copyrighting and trademarking 'Moo Deng the hippo' to raise funds for the zoo.",
    "The zoo also plans to launch a continuous livestream to allow fans to watch Moo Deng live over the Internet.",
    "On September 28, Moo Deng was the subject of a Saturday Night Live sketch.",
    "She was parodied by Bowen Yang on Weekend Update, and the character was used to satirize American pop-artist Chappell Roan's commentary on fame and political endorsements."
];

// Function to trigger typewriter effect using spacebar
document.addEventListener("keydown", function(e) {
    if (e.code === "Space" && !typingActive) {
        typingActive = true;
        displayTextWithTypingEffect();
    }
    e.preventDefault(); // Prevent default spacebar behavior
});

// Function to display text with typewriter effect
function displayTextWithTypingEffect() {
    typewriterContainer.innerHTML = ''; // Clear previous output
    currentLine = 0;
    typeLine(); // Start typing the first line
}

// Function to type each line with an effect
function typeLine() {
    if (currentLine < mooDengText.length) {
        const line = mooDengText[currentLine];
        const p = document.createElement('p');
        typewriterContainer.appendChild(p);

        let charIndex = 0;
        const typingSpeed = 50; // Adjust typing speed as needed

        function typeCharacter() {
            if (charIndex < line.length) {
                p.textContent += line[charIndex];
                charIndex++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                p.innerHTML += '<br>'; // Add a line break after completing the line
                currentLine++;
                setTimeout(typeLine, typingSpeed);
            }
        }

        typeCharacter();
    } else {
        typingActive = false; // Reset typing status
    }
}

// Mouse movement listener to update custom cursor position
window.addEventListener("mousemove", function(e) {
    const x = e.pageX;
    const y = e.pageY;
    myCursor.style.width = '80px';
    myCursor.style.transform = `translate(${x - 80 / 2}px, ${y - 80 / 2}px)`;
    
    // If drawing images is active, create and place images at the mouse position
    if (isDrawingImages) {
        createImageAtPosition(x, y);
    }
});

// Mouse down activates drawing mode
window.addEventListener("mousedown", function() {
    isDrawingImages = true;
});

// Mouse up deactivates drawing mode
window.addEventListener("mouseup", function() {
    isDrawingImages = false;
});

// Function to create and position an image at the mouse location
function createImageAtPosition(x, y) {
    const img = document.createElement("img");
    img.src = myCursor.src; // Use the custom cursor image source

    // Random size between 20px and 100px for variety
    const randomSize = Math.floor(Math.random() * 80) + 20;
    img.style.width = `${randomSize}px`;
    
    img.style.position = 'absolute'; // Ensure image is positioned absolutely
    img.style.transform = `translate(${x - randomSize / 2}px, ${y - randomSize / 2}px)`;
    document.body.appendChild(img); // Add the image to the document
}

// Infinite Scroll Setup
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // When reaching the bottom, load more content
        addContent();
    }

    // Change the background and text color dynamically
    changeBackgroundAndTextColor();
});

// Function to add new content (simulating infinite scroll)
function addContent() {
    const newDiv = document.createElement('div');
    newDiv.style.height = '100vh';
    newDiv.style.backgroundColor = getRandomColor();
    contentDiv.appendChild(newDiv);
}

// Function to change the background and text color dynamically
function changeBackgroundAndTextColor() {
    // Calculate the scroll percentage
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Change background color based on scroll position
    const hue = Math.floor((scrollPercent / 100) * 360); // 0 to 360 for hue
    document.body.style.backgroundColor = `hsl(${hue}, 80%, 90%)`;

    // Change the color of the "MOODENG" text based on scroll position
    moodengText.style.color = `hsl(${(hue + 180) % 360}, 80%, 50%)`;

    // Ensure typewriter text color matches the "MOODENG" text
    typewriterContainer.style.color = moodengText.style.color;
}

// Utility function to get a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
