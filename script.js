/* ============================================================
MY COMPANION
COMPLETE JAVASCRIPT

Character Creator
Age
Gender
Relationship
Personality
Voice
Backstory
AI Chat
Chat Memory
Voice Input
Voice Output
Cloudflare Worker
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

/* ========================================================
   CLOUDFLARE WORKER
   ======================================================== */

const WORKER_URL =
    "https://autumn-moon-8aee.aveepurvi890.workers.dev";


/* ========================================================
   STORAGE
   ======================================================== */

const CHARACTER_KEY = "myCompanionCharacter";
const HISTORY_KEY = "myCompanionChatHistory";


/* ========================================================
   DEFAULT CHARACTER
   ======================================================== */

function defaultCharacter() {

    return {
        name: "",
        age: "",
        gender: "",
        relationship: "",
        personality: "",
        voice: "neutral",
        backstory: ""
    };

}


/* ========================================================
   GET CHARACTER
   ======================================================== */

function getCharacter() {

    const saved =
        localStorage.getItem(CHARACTER_KEY);

    if (!saved) {
        return defaultCharacter();
    }

    try {

        const character =
            JSON.parse(saved);

        return {
            name: character.name || "",
            age: character.age || "",
            gender: character.gender || "",
            relationship: character.relationship || "",
            personality: character.personality || "",
            voice: character.voice || "neutral",
            backstory: character.backstory || ""
        };

    } catch (error) {

        console.error(
            "Character data error:",
            error
        );

        return defaultCharacter();
    }
}


/* ========================================================
   SAVE CHARACTER
   ======================================================== */

function saveCharacter(character) {

    localStorage.setItem(
        CHARACTER_KEY,
        JSON.stringify(character)
    );

}


/* ========================================================
   CHAT HISTORY
   ======================================================== */

function getHistory() {

    const saved =
        localStorage.getItem(HISTORY_KEY);

    if (!saved) {
        return [];
    }

    try {

        const history =
            JSON.parse(saved);

        return Array.isArray(history)
            ? history
            : [];

    } catch (error) {

        console.error(
            "History error:",
            error
        );

        return [];
    }
}


function saveHistory(history) {

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    );

}


function clearHistory() {

    localStorage.removeItem(HISTORY_KEY);

}


/* ========================================================
   CHARACTER NAME
   ======================================================== */

function getCharacterName() {

    const character =
        getCharacter();

    if (
        character.name &&
        character.name.trim()
    ) {

        return character.name.trim();

    }

    return "Your Companion";
}


/* ========================================================
   UPDATE CHARACTER NAME ON PAGE
   ======================================================== */

function updateCharacterNames() {

    const character =
        getCharacter();

    const name =
        getCharacterName();

    const cardName =
        document.getElementById(
            "characterCardName"
        );

    if (cardName) {
        cardName.textContent = name;
    }

    const cardText =
        document.getElementById(
            "characterCardText"
        );

    if (cardText && character.name) {

        cardText.textContent =
            "“Hey! I’m here. Tell me about your day. 😊”";

    }

}


/* ========================================================
   MESSAGE FUNCTION
   ======================================================== */

window.showMessage = function (message) {

    alert(message);

};


/* ========================================================
   SCROLL
   ======================================================== */

window.scrollToSection = function (id) {

    const section =
        document.getElementById(id);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

};


/* ========================================================
   CHARACTER CREATOR
   ======================================================== */

function createCharacterModal() {

    let modal =
        document.getElementById(
            "myCompanionCreatorModal"
        );

    if (modal) {
        return modal;
    }


    modal =
        document.createElement("div");

    modal.id =
        "myCompanionCreatorModal";


    modal.style.cssText = `
        position:fixed;
        inset:0;
        z-index:99998;
        display:none;
        align-items:center;
        justify-content:center;
        padding:20px;
        background:rgba(0,0,0,0.72);
        backdrop-filter:blur(8px);
        overflow-y:auto;
    `;


    modal.innerHTML = `

        <div
            style="
                width:min(520px,100%);
                max-height:92vh;
                overflow-y:auto;
                background:#0d1020;
                color:white;
                border:1px solid #303650;
                border-radius:24px;
                padding:24px;
                box-shadow:0 20px 70px rgba(0,0,0,.55);
            "
        >

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:20px;
                "
            >

                <h2 style="margin:0;">
                    Create Your Companion
                </h2>

                <button
                    id="myCompanionCreatorClose"
                    type="button"
                    style="
                        background:none;
                        border:none;
                        color:#aaa;
                        font-size:30px;
                        cursor:pointer;
                    "
                >
                    ×
                </button>

            </div>


            <label>Name</label>

            <input
                id="companionName"
                type="text"
                placeholder="Enter companion's name"
                autocomplete="off"
            />


            <label>Age</label>

            <input
                id="companionAge"
                type="number"
                min="1"
                max="120"
                placeholder="Enter age"
            />


            <label>Gender</label>

            <select id="companionGender">

                <option value="">
                    Select gender
                </option>

                <option value="female">
                    Female
                </option>

                <option value="male">
                    Male
                </option>

                <option value="non-binary">
                    Non-binary
                </option>

                <option value="other">
                    Other
                </option>

                <option value="prefer-not-to-say">
                    Prefer not to say
                </option>

            </select>


            <label>Relationship</label>

            <select id="companionRelationship">

                <option value="">
                    Select relationship
                </option>

                <option value="friend">
                    Friend
                </option>

                <option value="best friend">
                    Best Friend
                </option>

                <option value="partner">
                    Partner
                </option>

                <option value="family member">
                    Family Member
                </option>

                <option value="mentor">
                    Mentor
                </option>

                <option value="companion">
                    Companion
                </option>

                <option value="other">
                    Other
                </option>

            </select>


            <label>Personality</label>

            <textarea
                id="companionPersonality"
                rows="4"
                placeholder="Describe the personality..."
            ></textarea>


            <label>Voice</label>

            <select id="companionVoice">

                <option value="female">
                    Female Voice
                </option>

                <option value="male">
                    Male Voice
                </option>

                <option value="neutral">
                    Neutral Voice
                </option>

            </select>


            <label>Backstory</label>

            <textarea
                id="companionBackstory"
                rows="4"
                placeholder="Tell a little about your companion..."
            ></textarea>


            <button
                id="saveCompanionButton"
                type="button"
                style="
                    width:100%;
                    padding:15px;
                    border:none;
                    border-radius:14px;
                    background:linear-gradient(135deg,#843cff,#4dc9ff);
                    color:white;
                    font-size:17px;
                    font-weight:600;
                    cursor:pointer;
                "
            >
                Create Character
            </button>


            <div
                id="characterSaveMessage"
                style="
                    text-align:center;
                    margin-top:12px;
                    color:#8fd3ff;
                    min-height:20px;
                "
            ></div>

        </div>
    `;


    document.body.appendChild(modal);


    /* Close button */

    document
        .getElementById(
            "myCompanionCreatorClose"
        )
        .addEventListener(
            "click",
            closeCharacterCreator
        );


    /* Save button */

    document
        .getElementById(
            "saveCompanionButton"
        )
        .addEventListener(
            "click",
            saveCharacterFromForm
        );


    /* Close by clicking background */

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeCharacterCreator();

            }

        }
    );


    return modal;
}


/* ========================================================
   OPEN CREATOR
   ======================================================== */

window.openCreator = function () {

    const modal =
        createCharacterModal();

    const character =
        getCharacter();


    document.getElementById(
        "companionName"
    ).value =
        character.name || "";


    document.getElementById(
        "companionAge"
    ).value =
        character.age || "";


    document.getElementById(
        "companionGender"
    ).value =
        character.gender || "";


    document.getElementById(
        "companionRelationship"
    ).value =
        character.relationship || "";


    document.getElementById(
        "companionPersonality"
    ).value =
        character.personality || "";


    document.getElementById(
        "companionVoice"
    ).value =
        character.voice || "neutral";


    document.getElementById(
        "companionBackstory"
    ).value =
        character.backstory || "";


    document.getElementById(
        "characterSaveMessage"
    ).textContent = "";


    modal.style.display = "flex";

    document.body.style.overflow =
        "hidden";

};


/* ========================================================
   CLOSE CREATOR
   ======================================================== */

window.closeCreator = function () {

    closeCharacterCreator();

};


function closeCharacterCreator() {

    const modal =
        document.getElementById(
            "myCompanionCreatorModal"
        );

    if (modal) {

        modal.style.display =
            "none";

    }

    document.body.style.overflow =
        "";

}


/* ========================================================
   SAVE CHARACTER
   ======================================================== */

function saveCharacterFromForm() {

    const name =
        document.getElementById(
            "companionName"
        ).value.trim();


    const age =
        document.getElementById(
            "companionAge"
        ).value.trim();


    const gender =
        document.getElementById(
            "companionGender"
        ).value;


    const relationship =
        document.getElementById(
            "companionRelationship"
        ).value;


    const personality =
        document.getElementById(
            "companionPersonality"
        ).value.trim();


    const voice =
        document.getElementById(
            "companionVoice"
        ).value;


    const backstory =
        document.getElementById(
            "companionBackstory"
        ).value.trim();


    if (!name) {

        alert(
            "Please enter a name for your companion."
        );

        return;
    }


    if (
        age &&
        (
            Number(age) < 1 ||
            Number(age) > 120
        )
    ) {

        alert(
            "Please enter an age between 1 and 120."
        );

        return;
    }


    const character = {

        name: name,
        age: age,
        gender: gender,
        relationship: relationship,
        personality: personality,
        voice: voice,
        backstory: backstory

    };


    saveCharacter(character);


    /* Start fresh after creating a new character */

    clearHistory();


    document.getElementById(
        "characterSaveMessage"
    ).textContent =
        name +
        " has been created successfully!";


    updateCharacterNames();


    setTimeout(
        function () {

            closeCharacterCreator();

            openChat();

        },
        700
    );

}


/* ========================================================
   CHAT WINDOW
   ======================================================== */

let chatModal = null;


function createChatModal() {

    if (chatModal) {
        return chatModal;
    }


    chatModal =
        document.createElement("div");


    chatModal.id =
        "myCompanionChatModal";


    chatModal.style.cssText = `
        position:fixed;
        inset:0;
        z-index:99999;
        display:none;
        align-items:center;
        justify-content:center;
        background:rgba(0,0,0,.75);
        backdrop-filter:blur(8px);
        padding:15px;
    `;


    chatModal.innerHTML = `

        <div
            style="
                width:min(600px,100%);
                height:min(750px,92vh);
                display:flex;
                flex-direction:column;
                background:#0d1020;
                color:white;
                border:1px solid #303650;
                border-radius:24px;
                overflow:hidden;
                box-shadow:0 20px 70px rgba(0,0,0,.6);
            "
        >

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    padding:18px;
                    border-bottom:1px solid #303650;
                "
            >

                <div>

                    <div
                        style="
                            font-size:13px;
                            color:#8fd3ff;
                        "
                    >
                        ● Online
                    </div>

                    <strong
                        id="chatCharacterName"
                        style="font-size:20px;"
                    >
                        Your Companion
                    </strong>

                </div>


                <button
                    id="chatCloseButton"
                    type="button"
                    style="
                        background:none;
                        border:none;
                        color:#aaa;
                        font-size:28px;
                        cursor:pointer;
                    "
                >
                    ×
                </button>

            </div>


            <div
                id="chatMessages"
                style="
                    flex:1;
                    overflow-y:auto;
                    padding:18px;
                "
            ></div>


            <div
                style="
                    padding:12px;
                    border-top:1px solid #303650;
                "
            >

                <div
                    style="
                        display:flex;
                        gap:8px;
                    "
                >

                    <button
                        id="voiceButton"
                        type="button"
                        title="Voice input"
                        style="
                            width:48px;
                            border:none;
                            border-radius:12px;
                            background:#252b46;
                            color:white;
                            font-size:20px;
                            cursor:pointer;
                        "
                    >
                        🎤
                    </button>


                    <input
                        id="chatInput"
                        type="text"
                        placeholder="Talk to your companion..."
                        autocomplete="off"
                        style="
                            flex:1;
                            min-width:0;
                            padding:13px;
                            border-radius:12px;
                            border:1px solid #303650;
                            background:#151a2d;
                            color:white;
                            outline:none;
                        "
                    />


                    <button
                        id="sendChatButton"
                        type="button"
                        style="
                            padding:0 18px;
                            border:none;
                            border-radius:12px;
                            background:linear-gradient(135deg,#843cff,#4dc9ff);
                            color:white;
                            font-weight:600;
                            cursor:pointer;
                        "
                    >
                        Send
                    </button>

                </div>


                <button
                    id="clearChatButton"
                    type="button"
                    style="
                        margin-top:8px;
                        background:none;
                        border:none;
                        color:#999;
                        cursor:pointer;
                    "
                >
                    Clear conversation
                </button>

            </div>

        </div>
    `;


    document.body.appendChild(chatModal);


    document
        .getElementById("chatCloseButton")
        .addEventListener(
            "click",
            closeChat
        );


    docu
