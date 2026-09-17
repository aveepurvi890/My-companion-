// ============================================================
// MY COMPANION - COMPLETE JAVASCRIPT
// Character Creator + Cloudflare Worker + Gemini AI Chat
// ============================================================

// Your Cloudflare Worker URL.
// Use the URL of YOUR deployed Worker.
const WORKER_URL = "https://autumn-moon-8aee890.workers.dev";

// ---------------- CHARACTER DATA ----------------

function getCharacter() {
    return {
        name: localStorage.getItem("companionName") || "Your Companion",
        age: localStorage.getItem("companionAge") || "",
        gender: localStorage.getItem("companionGender") || "",
        relationship: localStorage.getItem("companionRelationship") || "",
        voice: localStorage.getItem("companionVoice") || "auto",
        personality: localStorage.getItem("companionPersonality") || "caring",
        backstory: localStorage.getItem("companionBackstory") || ""
    };
}

function updateCharacterDisplay() {
    const character = getCharacter();

    const cardName = document.getElementById("characterCardName");
    const cardText = document.getElementById("characterCardText");

    if (cardName) {
        cardName.textContent = character.name;
    }

    if (cardText) {
        cardText.textContent =
            `“Hey! I’m ${character.name}. Tell me about your day. 😊”`;
    }

    const chatName = document.getElementById("chatName");
    if (chatName) {
        chatName.textContent = character.name;
    }

    document.title = `My Companion — ${character.name}`;
}

// ---------------- CREATOR FUNCTIONS ----------------

function openCreator() {
    const modal = document.getElementById("creatorModal");

    if (modal) {
        const character = getCharacter();

        document.getElementById("characterName").value =
            character.name === "Your Companion" ? "" : character.name;

        document.getElementById("characterAge").value = character.age;
        document.getElementById("characterGender").value = character.gender;
        document.getElementById("relationship").value = character.relationship;
        document.getElementById("characterVoice").value = character.voice;
        document.getElementById("personality").value =
            character.personality === "caring" ? "" : character.personality;
        document.getElementById("backstory").value = character.backstory;

        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

function closeCreator() {
    const modal = document.getElementById("creatorModal");

    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
}

function scrollToSection(id) {
    const element = document.getElementById(id);

    if (element) {
        element.scrollIntoView({
            behavior: "smooth"
        });
    }
}

function showMessage(text) {
    alert(text);
}

function createCharacter() {
    const name =
        document.getElementById("characterName")?.value.trim();

    const age =
        document.getElementById("characterAge")?.value.trim();

    const gender =
        document.getElementById("characterGender")?.value;

    const relationship =
        document.getElementById("relationship")?.value;

    const voice =
        document.getElementById("characterVoice")?.value || "auto";

    const personality =
        document.getElementById("personality")?.value.trim();

    const backstory =
        document.getElementById("backstory")?.value.trim();

    // Name is required so we never silently create an "Arnav" character.
    if (!name) {
        alert("Please enter your character's name.");
        document.getElementById("characterName")?.focus();
        return;
    }

    // Save the complete character.
    localStorage.setItem("companionName", name);
    localStorage.setItem("companionAge", age || "");
    localStorage.setItem("companionGender", gender || "");
    localStorage.setItem("companionRelationship", relationship || "");
    localStorage.setItem("companionVoice", voice);
    localStorage.setItem("companionPersonality", personality || "caring");
    localStorage.setItem("companionBackstory", backstory || "");

    // Update the website immediately.
    updateCharacterDisplay();

    alert(
        `✨ ${name} has been created!\n\n` +
        (age ? `Age: ${age}\n` : "") +
        (gender ? `Gender: ${gender}\n` : "") +
        (relationship ? `Relationship: ${relationship}\n` : "") +
        `Voice: ${voice}\n` +
        `Personality: ${personality || "caring"}\n\n` +
        `Your companion has been saved!`
    );

    closeCreator();
}

// ---------------- FEATURE MODAL ----------------

const featureContent = {
    personality: {
        title: "Unique Personality",
        description:
            "Choose how your companion thinks, speaks, reacts and connects with you."
    },

    memory: {
        title: "Memory That Lasts",
        description:
            "Important conversations, preferences and moments can become long-term memories."
    },

    chat: {
        title: "Real Conversations",
        description:
            "Move beyond scripted replies and build natural conversations over time."
    },

    voice: {
        title: "Voice & Expression",
        description:
            "A future-ready foundation for voice, expressions and richer interaction."
    },

    "3d": {
        title: "Future 3D Presence",
        description:
            "One day, bring your companion beyond the screen and into your space."
    }
};

function showFeature(type) {
    const feature = featureContent[type];

    if (!feature) return;

    const title = document.getElementById("featureTitle");
    const description = document.getElementById("featureDescription");
    const modal = document.getElementById("featureModal");

    if (title) title.textContent = feature.title;
    if (description) description.textContent = feature.description;

    if (modal) {
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

function closeFeature() {
    const modal = document.getElementById("featureModal");

    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
}

// ---------------- DOM READY ----------------

document.addEventListener("DOMContentLoaded", function () {

    updateCharacterDisplay();

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    // Mobile navigation
    const menuButton =
        document.querySelector(".menu-toggle") ||
        document.querySelector(".hamburger") ||
        document.querySelector("[data-menu-toggle]");

    const nav =
        document.querySelector(".nav-links") ||
        document.querySelector("nav ul") ||
        document.querySelector("nav");

    if (menuButton && nav) {
        menuButton.addEventListener("click", function () {
            nav.classList.toggle("active");
            menuButton.classList.toggle("active");
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("active");
                menuButton.classList.remove("active");
            });
        });
    }

    // Watch Demo
    const demoButtons = document.querySelectorAll(
        '.watch-demo, [data-action="demo"]'
    );

    demoButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const existingModal =
                document.querySelector(".demo-modal");

            if (existingModal) {
                existingModal.remove();
                return;
            }

            const modal = document.createElement("div");

            modal.className = "demo-modal";

            modal.innerHTML = `
                <div class="demo-box">
                    <button class="demo-close"
                        aria-label="Close">&times;</button>

                    <h2>My Companion ✨</h2>

                    <p>
                        Imagine creating an AI companion with a unique
                        personality, memories, and a voice that feels
                        truly personal.
                    </p>

                    <button class="demo-ok">Got it</button>
                </div>
            `;

            document.body.appendChild(modal);

            const closeModal = function () {
                modal.remove();
            };

            modal.querySelector(".demo-close")
                .addEventListener("click", closeModal);

            modal.querySelector(".demo-ok")
                .addEventListener("click", closeModal);

            modal.addEventListener("click", function (event) {
                if (event.target === modal) {
                    closeModal();
                }
            });
        });
    });

    // Header scroll effect
    const header = document.querySelector("header");

    if (header) {
        const updateHeader = function () {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 30
            );
        };

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );
    }

    // Reveal sections
    const revealItems = document.querySelectorAll(
        "section, .feature-card, .feature, .step, .card"
    );

    if (
        "IntersectionObserver" in window &&
        revealItems.length
    ) {
        const observer = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealItems.forEach(function (item) {
            observer.observe(item);
        });
    }

    // Creator modal - click outside to close
    const creatorModal =
        document.getElementById("creatorModal");

    if (creatorModal) {
        creatorModal.addEventListener("click", function (event) {
            if (event.target === creatorModal) {
                closeCreator();
            }
        });
    }

    // Feature modal - click outside to close
    const featureModal =
        document.getElementById("featureModal");

    if (featureModal) {
        featureModal.addEventListener("click", function (event) {
            if (event.target === featureModal) {
                closeFeature();
            }
        });
    }

    // Keyboard support for feature cards
    document.querySelectorAll(".feature-click")
        .forEach(function (card) {
            card.addEventListener("keydown", function (event) {
                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();
                    card.click();
                }
            });
        });

    // ========================================================
    // CHAT FEATURE - CLOUDFLARE WORKER + GEMINI
    // ========================================================

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

    // Chat modal
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
                <strong id="chatName">Your Companion</strong>

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

    // Add chat message
    function addMessage(text, person) {
        const message = document.createElement("div");

        message.style.cssText = `
            max-width:80%;
            padding:10px 14px;
            border-radius:15px;
            background:${
                person === "user"
                    ? "#843cff"
                    : "#20263d"
            };
            align-self:${
                person === "user"
                    ? "flex-end"
                    : "flex-start"
            };
            color:white;
            white-space:pre-wrap;
        `;

        const textElement = document.createElement("span");
        textElement.textContent = text;
        message.appendChild(textElement);

        // A free browser voice button for companion replies.
        if (person === "companion" && "speechSynthesis" in window) {
            const speakButton = document.createElement("button");
            speakButton.type = "button";
            speakButton.textContent = "🔊";
            speakButton.title = "Listen";
            speakButton.setAttribute("aria-label", "Listen to this message");

            speakButton.style.cssText = `
                margin-left:8px;
                border:0;
                border-radius:50%;
                width:30px;
                height:30px;
                background:#343b5c;
                color:white;
                cursor:pointer;
                vertical-align:middle;
            `;

            speakButton.addEventListener("click", function () {
                speakText(text);
            });

            message.appendChild(speakButton);
        }

        messages.appendChild(message);

        messages.scrollTop =
            messages.scrollHeight;

        return message;
    }

    function chooseVoice(preference) {
        if (!("speechSynthesis" in window)) return null;

        const voices = window.speechSynthesis.getVoices();

        if (!voices.length) return null;

        const englishVoices = voices.filter(function (voice) {
            return /^en(-|_)/i.test(voice.lang);
        });

        const available = englishVoices.length ? englishVoices : voices;

        if (preference === "female") {
            return available.find(function (voice) {
                return /female|woman|zira|samantha|susan|karen|moira|victoria|aria|jenny|libby/i.test(voice.name);
            }) || available[0];
        }

        if (preference === "male") {
            return available.find(function (voice) {
                return /male|man|david|daniel|alex|mark|george|guy|ryan/i.test(voice.name);
            }) || available
