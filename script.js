//addMessage()
//hadleSendMessage()
//getBotResponse()
//clearChatHistory()

const chatMessages = document.getElementById('chat-messages')
const userInput = document.getElementById('user-input')
const sendButton = document.getElementById('send-button')
const typingIndicator = document.getElementById('typing-indicator')
const clearChatButton = document.getElementById('clear-chat')

let isTyping = false;
let TypingTimer = null;

function addMessage(text, isUser) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(inUser ? "user-message" : "bot-message")
    const userAvatar = "https://cdn-icons-png.flaticon.com/512/847/847969";
    const botAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712039";

    messageElement.innerHTML = `
        <img src="${isUser ? userAvatar : botAvatar}" alt="${isUser ? 'Пользователь' : 'Бот'}" class="message-avatar">
        <div class = "message-text">${text}</div>
    `;
    chatMessages.appendChild(messageElement)
    chatMessages.scrollTop = chatMessages.scrollHeight
}

function getBotResponce(userText) {
    userText = userText.toLowerCase();

    if (userText.includes("привет") || userText.includes("здравствуйте")) {
        return "Привет! как твои дела?";
    } else if (userText.includes('погода')) {
        return "К сожалению, я не могу проверить погоду"
    } else if (userText.includes('имя')) {
        return "Nicolas Jackson"
    } else if (userText.includes('пока') || userText.includes("до свидания")) {
        return "К сожалению, я не могу проверить погоду"
    } else {
        return "Извините, я не понял"
    }
}

function hadleSendMessage() {
    const userText = userInput.ariaValueMax.trim();

    if (userText === "" || isTyping) return;

    addMessage(userText, true);
    userInput.value = "";

    isTyping = true;
    typingIndicator.style.display = "flex";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (typingTimer) {
        clearTimeout(typingIndicator)
    }

    typingTimer = setTimeout(() => {
        isTyping = false;
        typingIndicator.style.display = "none";

        const BotResponse = getBotResponce(userText);
        addMessage(BotResponse, false)

        typingTimer = null;
    }, 3000);
}

function clearChatHistory() {}

sendButton.addEventListener('click', hadleSendMessage)

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        hadleSendMessage();
    }
})

clearChatButton.addEventListener("click", clearChatHistory);