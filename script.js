// ================ CHAT FEATURE ================

document.addEventListener("DOMContentLoaded", function () {

    // ================= CLOUDFLARE WORKER URL =================

    const WORKER_URL =
        "https://autumn-moon-8aee.aveepurvi890.workers.dev";


    // ================= CHAT BUTTON =================

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


    // ================= CHAT MODAL =================

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


    // ================= ELEMENTS =================

    const messages =
        chatModal.querySelector("#chatMessages");

    const input =
        chatModal.querySelector("#chatInput");

    const sendButton =
        chatModal.querySelector("#sendChat");

    const closeButton =
        chatModal.querySelector("#closeChat");

    const chatName =
        chatModal.querySelector("#chatName");


    // ================= SAVED CHARACTER =================

    const name =
        localStorage.getItem("companionName") || "Arnav";

    const personality =
        localStorage.getItem("companionPersonality") || "caring";

    chatName.textContent = name;


    // ================= ADD MESSAGE =================

    function addMessage(text, person) {

        const message = document.createElement("div");

        message.textContent = text;

        message.style.cssText = `
            max-width:80%;
            padding:10px 14px;
            border-radius:15px;
            background:${person === "user"
                ? "#843cff"
                : "#20263d"};
            align-self:${person === "user"
                ? "flex-end"
                : "flex-start"};
            color:white;
            line-height:1.4;
        `;

        messages.appendChild(message);

        messages.scrollTop =
            messages.scrollHeight;

        return message;
    }


    // ================= SEND TO GEMINI THROUGH CLOUDFLARE =================

    async function companionReply(text) {

        try {

            const response = await fetch(WORKER_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    message: text,

                    name: name,

                    personality: personality

                })

            });


            if (!response.ok) {

                throw new Error(
                    "Worker returned status " +
                    response.status
                );

            }


            const data = await response.json();


            // Accept common response formats

            if (data.reply) {
                return data.reply;
            }

            if (data.response) {
                return data.response;
            }

            if (data.text) {
                return data.text;
            }


            return "I'm here with you, but I couldn't understand the response from Gemini. 😊";

        }

        catch (error) {

            console.error(
                "Cloudflare/Gemini error:",
                error
            );

            return "Sorry, I'm having trouble connecting right now. Please try again. ❤️";

        }

    }


    // ================= SEND MESSAGE =================

    async function sendMessage() {

        const text =
            input.value.trim();


        if (!text) return;


        // Show user's message

        addMessage(
            text,
            "user"
        );


        // Clear input

        input.value = "";


        // Disable button while waiting

        sendButton.disabled = true;

        sendButton.textContent = "…";


        // Thinking message

        const thinkingMessage =
            addMessage(
                "Thinking... 🤔",
                "companion"
            );


        try {

            const reply =
                await companionReply(text);


            // Remove Thinking...

            thinkingMessage.remove();


            // Show Gemini reply

            addMessage(
                reply,
                "companion"
            );

        }

        catch (error) {

            thinkingMessage.remove();

            addMessage(
                "Something went wrong. Please try again. ❤️",
                "companion"
            );

        }


        // Enable button again

        sendButton.disabled = false;

        sendButton.textContent = "Send";


        input.focus();

    }


    // ================= OPEN CHAT =================

    chatButton.addEventListener(
        "click",
        function () {

            chatModal.style.display =
                "flex";


            if (messages.children.length === 0) {

                addMessage(

                    "Hey! 😊 I'm " +
                    name +
                    ". What would you like to talk about?",

                    "companion"

                );

            }


            input.focus();

        }
    );


    // ================= SEND BUTTON =================

    sendButton.addEventListener(
        "click",
        sendMessage
    );


    // ================= ENTER KEY =================

    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();

            }

        }
    );


    // ================= CLOSE BUTTON =================

    closeButton.addEventListener(
        "click",
        function () {

            chatModal.style.display =
                "none";

        }
    );


    // ================= CLOSE BY CLICKING OUTSIDE =================

    chatModal.addEventListener(
        "click",
        function (event) {

            if (event.target === chatModal) {

                chatModal.style.display =
                    "none";

            }

        }
    );

});
