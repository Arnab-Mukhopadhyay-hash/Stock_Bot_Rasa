// Function to alternate "Bot" between English and Bengali with 3D rolling effect
function toggleBotName() {
    const botNameElement = document.getElementById('bot-name');
    const currentText = botNameElement.textContent;

    // Apply roll-out animation before switching the name
    botNameElement.classList.add('rollOut3D');

    // Wait for the roll-out animation to finish before changing the text
    setTimeout(() => {
        // Toggle between "Bot" and "বট"
        if (currentText === "Bot") {
            botNameElement.textContent = "বট"; // Set to Bengali
        } else {
            botNameElement.textContent = "Bot"; // Set to English
        }

        // Apply roll-in animation after the name has changed
        botNameElement.classList.remove('rollOut3D');
        botNameElement.classList.add('rolling-text');
    }, 2000);
     // Wait for the roll-out to finish (2 seconds)

     // Remove the event listener after it's triggered to avoid multiple event triggers
     botNameElement.removeEventListener('animationend', onAnimationEnd);
}

// Call the toggleBotName function every 3 seconds for smooth transitions
setInterval(toggleBotName, 3000);

// Function to send message to Rasa API
const userInput = document.getElementById('user_input');
const chatlogs = document.getElementById('chatlogs');

// Function to send a message when Enter is pressed or the button is clicked
function sendMessage() {
    const message = userInput.value.trim();

    if (message === "") {
        return;
    }

    // Display user message in chatlogs
    displayMessage(message, 'user-msg');

    // Clear the input field
    userInput.value = "";

    // Send user message to Rasa API
    fetch('https://super-duper-cod-rxj6499w9p7hqqq-5005.app.github.dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "message": message })
    })
    .then(response => response.json())
    .then(data => {
        // Display Rasa's response in chatlogs
        if (data && data.length > 0) {
            const botMessage = data[0].text;
            displayMessage(botMessage, 'bot-msg');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage('দুঃখিত, আমি এখন সাড়া দিতে পারছি না। আবার চেষ্টা করুন।', 'bot-msg');
    });
}

// Function to display messages in chatlogs
function displayMessage(message, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-msg', sender);
    msgDiv.textContent = message;

    chatlogs.appendChild(msgDiv);

    // Scroll to the bottom to show the latest message
    chatlogs.scrollTop = chatlogs.scrollHeight;
}
