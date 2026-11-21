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
let typingTimer = null;

const userAvatar = "https://cdn-icons-png.flaticon.com/512/847/847969";
const botAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712039";

function addMessage(text, isUser) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(isUser ? "user-message" : "bot-message")

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
    } else if (userText.includes('нормально')) {
        return "Это хорошо, что все нормально"
    } else if (userText.includes('погода')) {
        return "К сожалению, я не могу проверить погоду"
    } else if (userText.includes('имя')) {
        return "Nicolas Jackson"
    } else if (userText.includes('пока') || userText.includes("до свидания")) {
        return "Пока!"
    } else if (userText.includes('время') || userText.includes('который час')) {
        return "Сейчас самое время сделать перерыв";
    } else if (userText.includes('кто получил золотой мяч в 2026') || userText.includes('кто получил зм в 2026')) {
        return "Харри Кейн";
    } else {
        return "Извините, я не понял"
    }
}

function hadleSendMessage() {
    const userText = userInput.value.trim();

    if (userText === "" || isTyping) return;

    addMessage(userText, true);
    userInput.value = "";

    isTyping = true;
    typingIndicator.style.display = "flex";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (typingTimer) {
        clearTimeout(typingTimer)
    }

    typingTimer = setTimeout(() => {
        isTyping = false;
        typingIndicator.style.display = "none";

        const BotResponse = getBotResponce(userText);
        addMessage(BotResponse, false)

        typingTimer = null;
    }, 3000);
}

function clearChatHistory() {
    chatMessages.innerHTML = `
        <div class="message bot-message">
            <img src="${botAvatar}" alt="Бот" class="message-avatar">
            <div class="message-text">История очищена, можешь спрашивать по новой.</div>
        </div>
    `;
}

sendButton.addEventListener('click', hadleSendMessage)

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        hadleSendMessage();
    }
})

clearChatButton.addEventListener("click", clearChatHistory);