// ================ ORIGINAL CREATOR FUNCTIONS ================

function openCreator() {
    document.getElementById('creatorModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCreator() {
    document.getElementById('creatorModal').classList.remove('show');
    document.body.style.overflow = '';
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth'
    });
}

function showMessage(text) {
    alert(text);
}

function createCharacter() {

    const name =
        document.getElementById('characterName').value.trim()
        || 'Your Companion';

    const personality =
        document.getElementById('personality').value.trim()
        || 'unique';

    // Save companion information
    localStorage.setItem('companionName', name);
    localStorage.setItem('companionPersonality', personality);

    alert(
        `✨ ${name} is ready to be created!\n\n` +
        `Personality: ${personality}\n\n` +
        `Your companion has been saved!`
    );

    closeCreator();
}


// Close creator modal when clicking outside it
document.addEventListener("DOMContentLoaded", function () {

    const creatorModal = document.getElementById('creatorModal');

    if (creatorModal) {
        creatorModal.addEventListener('click', function (e) {

            if (e.target.id === 'creatorModal') {
                closeCreator();
            }

        });
    }

});


// ================ CHAT FEATURE ================

document.addEventListener("DOMContentLoaded", function () {

    // Create Chat Button
    const chatButton = document.createElement("button");

    chatButton.textContent = "💬 Chat with me";

    chatButton.style.cssText = `
        position:fixed;
        bottom:25px;
        right:25px;
        padding:14px 22px;
        border:none;
        border-radius:30px;
        background:linear-gradient(100deg,#843cff,#4dc9ff);
        color:white;
        font-weight:700;
        font-size:16px;
        cursor:pointer;
        z-index:9999;
        box-shadow:0 8px 25px rgba(0,0,0,.3);
    `;

    document.body.appendChild(chatButton);


    // Create Chat Modal
    const chatModal = document.createElement("div");

    chatModal.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.75);
        backdrop-filter:blur(8px);
        display:none;
        align-items:center;
        justify-content:center;
        padding:20px;
        z-index:10000;
    `;


    chatModal.innerHTML = `
        <div style="
            width:min(500px,100%);
            height:min(650px,90vh);
            background:#0b0e1d;
            border:1px solid #30334c;
            border-radius:25px;
            display:flex;
            flex-direction:column;
            overflow:hidden;
        ">

            <div style="
                padding:18px;
                border-bottom:1px solid #292c40;
                display:flex;
                justify-content:space-between;
                align-items:center;
            ">

                <strong id="chatName">My Companion</strong>

                <button id="closeChat" style="
                    background:none;
                    border:none;
                    color:#aaa;
                    font-size:28px;
                    cursor:pointer;
                ">×</button>

            </div>


            <div id="chatMessages" style="
                flex:1;
                padding:20px;
                overflow-y:auto;
                display:flex;
                flex-direction:column;
                gap:12px;
            "></div>


            <div style="
                padding:15px;
                border-top:1px solid #292c40;
                display:flex;
                gap:8px;
            ">

                <input
                    id="chatInput"
                    placeholder="Type a message..."
                    style="
                        flex:1;
                        background:#12162a;
                        border:1px solid #2d3149;
                        color:white;
                        border-radius:20px;
                        padding:12px 15px;
                        outline:none;
                    "
                >

                <button id="sendChat" style="
                    border:none;
                    border-radius:20px;
                    padding:12px 18px;
                    background:#843cff;
                    color:white;
                    cursor:pointer;
                ">Send</button>

            </div>

        </div>
    `;

    document.body.appendChild(chatModal);


    // Get Chat Elements
    const messages = chatModal.querySelector("#chatMessages");
    const input = chatModal.querySelector("#chatInput");
    const sendButton = chatModal.querySelector("#sendChat");
    const closeButton = chatModal.querySelector("#closeChat");
    const chatName = chatModal.querySelector("#chatName");


    // Get Saved Companion Information
    const name =
        localStorage.getItem("companionName") || "Arnav";

    const personality =
        localStorage.getItem("companionPersonality") || "caring";

    chatName.textContent = name;


    // Add Message
    function addMessage(text, person) {

        const message = document.createElement("div");

        message.textContent = text;

        message.style.cssText = `
            max-width:80%;
            padding:10px 14px;
            border-radius:15px;
            background:${person === "user" ? "#843cff" : "#20263d"};
            align-self:${person === "user" ? "flex-end" : "flex-start"};
            color:white;
        `;

        messages.appendChild(message);

        messages.scrollTop = messages.scrollHeight;
    }


    // Companion Reply
    function companionReply(text) {

        const lower = text.toLowerCase();


        if (
            lower.includes("hello") ||
            lower.includes("hi")
        ) {
            return "Hey! 😊 I'm " + name + ". It's nice to talk with you!";
        }


        if (lower.includes("how are you")) {
            return "I'm doing great! 😊 Thanks for asking.";
        }


        if (lower.includes("name")) {
            return "My name is " + name + ".";
        }


        if (lower.includes("personality")) {
            return "My personality is " + personality + ".";
        }


        if (lower.includes("bye")) {
            return "Bye! 👋 Come back whenever you want!";
        }


        return "That's interesting! 😊 Tell me more.";
    }


    // Send Message
    function sendMessage() {

        const text = input.value.trim();

        if (!text) return;


        addMessage(text, "user");

        input.value = "";


        setTimeout(function () {

            addMessage(
                companionReply(text),
                "companion"
            );

        }, 500);
    }


    // Open Chat
    chatButton.addEventListener("click", function () {

        chatModal.style.display = "flex";


        if (messages.children.length === 0) {

            addMessage(
                "Hey! 😊 I'm " +
                name +
                ". What would you like to talk about?",
                "companion"
            );

        }


        input.focus();
    });


    // Send Button
    sendButton.addEventListener(
        "click",
        sendMessage
    );


    // Enter Key
    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                sendMessage();
            }

        }
    );


    // Close Chat Button
    closeButton.addEventListener(
        "click",
        function () {

            chatModal.style.display = "none";

        }
    );


    // Close Chat By Clicking Outside
    chatModal.addEventListener(
        "click",
        function (event) {

            if (event.target === chatModal) {
                chatModal.style.display = "none";
            }

        }
    );

});
