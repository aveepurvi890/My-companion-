// ============================================================
// MY COMPANION
// COMPLETE SCRIPT.JS
// Character Creator + AI Chat + Voice
// ============================================================


// ============================================================
// CLOUDFLARE WORKER
// ============================================================

const WORKER_URL =
    "https://autumn-moon-8aee.aveepurvi890.workers.dev";


// ============================================================
// CHARACTER STORAGE KEYS
// ============================================================

const STORAGE = {
    name: "companionName",
    age: "companionAge",
    gender: "companionGender",
    relationship: "companionRelationship",
    voice: "companionVoice",
    personality: "companionPersonality",
    backstory: "companionBackstory",
    history: "companionChatHistory"
};


// ============================================================
// GET CHARACTER
// ============================================================

function getCharacter() {

    return {
        name:
            localStorage.getItem(STORAGE.name) ||
            "",

        age:
            localStorage.getItem(STORAGE.age) ||
            "",

        gender:
            localStorage.getItem(STORAGE.gender) ||
            "",

        relationship:
            localStorage.getItem(STORAGE.relationship) ||
            "",

        voice:
            localStorage.getItem(STORAGE.voice) ||
            "neutral",

        personality:
            localStorage.getItem(STORAGE.personality) ||
            "",

        backstory:
            localStorage.getItem(STORAGE.backstory) ||
            ""
    };
}


// ============================================================
// SAVE CHARACTER
// ============================================================

function saveCharacter(character) {

    localStorage.setItem(
        STORAGE.name,
        character.name || ""
    );

    localStorage.setItem(
        STORAGE.age,
        character.age || ""
    );

    localStorage.setItem(
        STORAGE.gender,
        character.gender || ""
    );

    localStorage.setItem(
        STORAGE.relationship,
        character.relationship || ""
    );

    localStorage.setItem(
        STORAGE.voice,
        character.voice || "neutral"
    );

    localStorage.setItem(
        STORAGE.personality,
        character.personality || ""
    );

    localStorage.setItem(
        STORAGE.backstory,
        character.backstory || ""
    );
}


// ============================================================
// UPDATE CHARACTER NAME ON PAGE
// ============================================================

function updateCharacterDisplay() {

    const character = getCharacter();

    const possibleNameElements = [
        document.getElementById("characterCardName"),
        document.getElementById("companionName"),
        document.getElementById("chatName")
    ];

    possibleNameElements.forEach(function (element) {

        if (element && character.name) {
            element.textContent = character.name;
        }
    });

    const characterText =
        document.getElementById("characterCardText");

    if (
        characterText &&
        character.name
    ) {
        characterText.textContent =
            `“Hey! I'm ${character.name}. Tell me about your day. 😊”`;
    }

    if (character.name) {
        document.title =
            `My Companion — ${character.name}`;
    }
}


// ============================================================
// OPEN CHARACTER CREATOR
// ============================================================

function openCreator() {

    const modal =
        document.getElementById("creatorModal");

    if (!modal) {
        console.warn(
            "creatorModal was not found."
        );
        return;
    }

    const character = getCharacter();

    const nameInput =
        document.getElementById("characterName");

    const ageInput =
        document.getElementById("characterAge");

    const genderInput =
        document.getElementById("characterGender");

    const relationshipInput =
        document.getElementById("relationship");

    const voiceInput =
        document.getElementById("characterVoice");

    const personalityInput =
        document.getElementById("personality");

    const backstoryInput =
        document.getElementById("backstory");


    if (nameInput) {
        nameInput.value =
            character.name;
    }

    if (ageInput) {
        ageInput.value =
            character.age;
    }

    if (genderInput) {
        genderInput.value =
            character.gender;
    }

    if (relationshipInput) {
        relationshipInput.value =
            character.relationship;
    }

    if (voiceInput) {
        voiceInput.value =
            character.voice;
    }

    if (personalityInput) {
        personalityInput.value =
            character.personality;
    }

    if (backstoryInput) {
        backstoryInput.value =
            character.backstory;
    }


    modal.classList.add("show");

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";
}


// ============================================================
// CLOSE CHARACTER CREATOR
// ============================================================

function closeCreator() {

    const modal =
        document.getElementById("creatorModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("show");

    modal.style.display = "none";

    document.body.style.overflow = "";
}


// ============================================================
// CREATE CHARACTER
// ============================================================

function createCharacter() {

    const nameInput =
        document.getElementById("characterName");

    const ageInput =
        document.getElementById("characterAge");

    const genderInput =
        document.getElementById("characterGender");

    const relationshipInput =
        document.getElementById("relationship");

    const voiceInput =
        document.getElementById("characterVoice");

    const personalityInput =
        document.getElementById("personality");

    const backstoryInput =
        document.getElementById("backstory");


    const name =
        nameInput ?
        nameInput.value.trim() :
        "";

    const age =
        ageInput ?
        ageInput.value.trim() :
        "";

    const gender =
        genderInput ?
        genderInput.value.trim() :
        "";

    const relationship =
        relationshipInput ?
        relationshipInput.value.trim() :
        "";

    const voice =
        voiceInput ?
        voiceInput.value :
        "neutral";

    const personality =
        personalityInput ?
        personalityInput.value.trim() :
        "";

    const backstory =
        backstoryInput ?
        backstoryInput.value.trim() :
        "";


    // Name is required.
    if (!name) {

        alert(
            "Please enter your companion's name."
        );

        if (nameInput) {
            nameInput.focus();
        }

        return;
    }


    const character = {

        name: name,

        age: age,

        gender: gender,

        relationship: relationship,

        voice: voice || "neutral",

        personality:
            personality || "caring and friendly",

        backstory: backstory
    };


    saveCharacter(character);

    // Start a new conversation when a new
    // character is created.
    localStorage.removeItem(
        STORAGE.history
    );


    updateCharacterDisplay();

    closeCreator();


    alert(
        `${name} has been created successfully! ✨`
    );
}


// ============================================================
// EDIT CHARACTER
// ============================================================

function editCharacter() {

    openCreator();
}


// ============================================================
// FEATURE MODAL
// ============================================================

const featureContent = {

    personality: {

        title:
            "Unique Personality",

        description:
            "Create a companion with a personality that feels personal and natural."
    },

    memory: {

        title:
            "Memory That Lasts",

        description:
            "Your conversation history can be stored in your browser so the companion can continue conversations."
    },

    chat: {

        title:
            "Real Conversations",

        description:
            "Talk naturally with your companion through the AI chat system."
    },

    voice: {

        title:
            "Voice & Expression",

        description:
            "Use your device's built-in speech system to listen to companion replies."
    },

    "3d": {

        title:
            "Future 3D Presence",

        description:
            "This project can later be expanded toward a more visual and immersive companion."
    }
};


// ============================================================
// SHOW FEATURE
// ============================================================

function showFeature(type) {

    const feature =
        featureContent[type];

    if (!feature) {
        return;
    }

    const modal =
        document.getElementById("featureModal");

    const title =
        document.getElementById("featureTitle");

    const description =
        document.getElementById(
            "featureDescription"
        );


    if (title) {
        title.textContent =
            feature.title;
    }

    if (description) {
        description.textContent =
            feature.description;
    }

    if (modal) {

        modal.classList.add("show");

        modal.style.display = "flex";

        document.body.style.overflow =
            "hidden";
    }
}


// ============================================================
// CLOSE FEATURE
// ============================================================

function closeFeature() {

    const modal =
        document.getElementById("featureModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("show");

    modal.style.display = "none";

    document.body.style.overflow = "";
}


// ============================================================
// SMOOTH SCROLL
// ============================================================

function scrollToSection(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ============================================================
// CHAT HISTORY
// ============================================================

function getChatHistory() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE.history
            );

        if (!saved) {
            return [];
        }

        const history =
            JSON.parse(saved);

        if (!Array.isArray(history)) {
            return [];
        }

        return history;

    } catch (error) {

        console.error(
            "Could not read chat history:",
            error
        );

        return [];
    }
}


// ============================================================
// SAVE CHAT HISTORY
// ============================================================

function saveChatHistory(history) {

    try {

        // Keep the browser storage reasonably small.
        const limitedHistory =
            history.slice(-30);

        localStorage.setItem(
            STORAGE.history,
            JSON.stringify(
                limitedHistory
            )
        );

    } catch (error) {

        console.error(
            "Could not save chat history:",
            error
        );
    }
}


// ============================================================
// CLEAR CHAT HISTORY
// ============================================================

function clearChatHistory() {

    localStorage.removeItem(
        STORAGE.history
    );

    if (window.myCompanionChat) {

        window.myCompanionChat.clearMessages();
    }
}


// ============================================================
// GET BROWSER VOICES
// ============================================================

function getBrowserVoices() {

    if (
        !("speechSynthesis" in window)
    ) {
        return [];
    }

    return window.speechSynthesis
        .getVoices();
}


// ============================================================
// CHOOSE VOICE
// ============================================================

function chooseVoice(preference) {

    const voices =
        getBrowserVoices();

    if (!voices.length) {
        return null;
    }


    const englishVoices =
        voices.filter(
            function (voice) {

                return /^en(-|_)/i.test(
                    voice.lang
                );
            }
        );


    const available =
        englishVoices.length ?
        englishVoices :
        voices;


    if (preference === "female") {

        return (
            available.find(
                function (voice) {

                    return /female|woman|zira|samantha|susan|karen|moira|victoria|aria|jenny|libby/i
                        .test(voice.name);
                }
            ) ||
            available[0]
        );
    }


    if (preference === "male") {

        return (
            available.find(
                function (voice) {

                    return /male|man|david|daniel|alex|mark|george|guy|ryan/i
                        .test(voice.name);
                }
            ) ||
            available[0]
        );
    }


    if (preference === "neutral") {

        return (
            available.find(
                function (voice) {

                    return /neutral|google us english/i
                        .test(voice.name);
                }
            ) ||
            available[0]
        );
    }


    return available[0];
}


// ============================================================
// SPEAK TEXT
// ============================================================

function speakText(text) {

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Voice playback is not supported by this browser."
        );

        return;
    }


    if (!text) {
        return;
    }


    window.speechSynthesis.cancel();


    const character =
        getCharacter();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    const voice =
        chooseVoice(
            character.voice
        );


    if (voice) {

        utterance.voice =
            voice;

        utterance.lang =
            voice.lang;
    }

    else {

        utterance.lang =
            "en-US";
    }


    utterance.rate = 1;

    utterance.pitch =
        character.voice === "female" ?
        1.05 :
        character.voice === "male" ?
        0.95 :
        1;


    window.speechSynthesis.speak(
        utterance
    );
}


// ============================================================
// CHAT UI CREATION
// ============================================================

function createChatInterface() {

    // Prevent duplicate chat systems.
    if (
        document.getElementById(
            "myCompanionChatModal"
        )
    ) {
        return;
    }


    const button =
        document.createElement(
            "button"
        );


    button.id =
        "myCompanionChatButton";


    button.type =
        "button";


    button.textContent =
        "💬 Chat with me";


    button.style.cssText = `
        position:fixed;
        bottom:25px;
        right:25px;
        z-index:9998;
        border:none;
        border-radius:30px;
        padding:14px 22px;
        background:linear-gradient(100deg,#843cff,#4dc9ff);
        color:#ffffff;
        font-size:16px;
        font-weight:700;
        cursor:pointer;
        box-shadow:0 8px 25px rgba(0,0,0,.35);
    `;


    document.body.appendChild(
        button
    );


    // ========================================================
    // CHAT MODAL
    // ========================================================

    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "myCompanionChatModal";


    modal.style.cssText = `
        position:fixed;
        inset:0;
        z-index:10000;
        display:none;
        align-items:center;
        justify-content:center;
        padding:20px;
        background:rgba(0,0,0,.75);
        backdrop-filter:blur(8px);
    `;


    modal.innerHTML = `

        <div id="myCompanionChatBox"
            style="
                width:min(520px,100%);
                height:min(680px,90vh);
                background:#0b0e1d;
                border:1px solid #30334c;
                border-radius:25px;
                overflow:hidden;
                display:flex;
                flex-direction:column;
                box-shadow:0 20px 60px rgba(0,0,0,.5);
            ">

            <div
                style="
                    padding:18px;
                    border-bottom:1px solid #292c40;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                "
            >

                <div>
                    <div
                        id="myCompanionChatName"
                        style="
                            color:#ffffff;
                            font-size:20px;
                            font-weight:700;
                        "
                    >
                        Your Companion
                    </div>

                    <div
                        style="
                            color:#8f95ad;
                            font-size:12px;
                            margin-top:3px;
                        "
                    >
                        AI Companion
                    </div>
                </div>


                <button
                    id="myCompanionCloseChat"
                    type="button"
                    aria-label="Close chat"
                    style="
                        background:none;
                        border:none;
                        color:#aaaaaa;
                        font-size:30px;
                        line-height:1;
                        cursor:pointer;
                    "
                >
                    ×
                </button>

            </div>


            <div
                id="myCompanionMessages"
                style="
                    flex:1;
                    overflow-y:auto;
                    padding:20px;
                    display:flex;
                    flex-direction:column;
                    gap:12px;
                "
            >
            </div>


            <div
                style="
                    padding:14px;
                    border-top:1px solid #292c40;
                    display:flex;
                    gap:8px;
                    align-items:center;
                "
            >

                <input
                    id="myCompanionChatInput"
                    type="text"
                    autocomplete="off"
                    placeholder="Type a message..."
                    style="
                        flex:1;
                        min-width:0;
                        background:#12162a;
                        border:1px solid #303650;
                        color:#ffffff;
                        border-radius:22px;
                        padding:13px 16px;
                        font-size:15px;
                        outline:none;
                    "
                >


                <button
                    id="myCompanionSendButton"
          
