// ============================================================
// MY COMPANION
// COMPLETE JAVASCRIPT
// Character Creator + AI Chat + Memory + Voice
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================================
    // CLOUDFLARE WORKER
    // ========================================================

    const WORKER_URL =
        "https://autumn-moon-8aee.aveepurvi890.workers.dev";


    // ========================================================
    // STORAGE KEYS
    // ========================================================

    const CHARACTER_KEY = "myCompanionCharacter";
    const HISTORY_KEY = "myCompanionChatHistory";


    // ========================================================
    // GET CHARACTER
    // ========================================================

    function getCharacter() {

        let saved = localStorage.getItem(CHARACTER_KEY);

        if (!saved) {
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

        try {
            const character = JSON.parse(saved);

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

            console.error("Character data error:", error);

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
    }


    // ========================================================
    // SAVE CHARACTER
    // ========================================================

    function saveCharacter(character) {

        localStorage.setItem(
            CHARACTER_KEY,
            JSON.stringify(character)
        );
    }


    // ========================================================
    // GET CHAT HISTORY
    // ========================================================

    function getHistory() {

        const saved = localStorage.getItem(HISTORY_KEY);

        if (!saved) {
            return [];
        }

        try {
            const history = JSON.parse(saved);

            return Array.isArray(history)
                ? history
                : [];

        } catch (error) {

            console.error("History error:", error);

            return [];
        }
    }


    // ========================================================
    // SAVE CHAT HISTORY
    // ========================================================

    function saveHistory(history) {

        localStorage.setItem(
            HISTORY_KEY,
            JSON.stringify(history)
        );
    }


    // ========================================================
    // CLEAR CHAT HISTORY
    // ========================================================

    function clearHistory() {

        localStorage.removeItem(HISTORY_KEY);
    }


    // ========================================================
    // CHARACTER NAME
    // ========================================================

    function getCharacterName() {

        const character = getCharacter();

        if (
            character.name &&
            character.name.trim()
        ) {
            return character.name.trim();
        }

        return "Your Companion";
    }


    // ========================================================
    // CREATE CHARACTER BUTTON
    // ========================================================

    function findCreateButton() {

        const possibleIds = [
            "createCharacter",
            "createCharacterButton",
            "createBtn",
            "newCharacterBtn",
            "create-character",
            "createCharacterCard"
        ];

        for (let i = 0; i < possibleIds.length; i++) {

            const element =
                document.getElementById(possibleIds[i]);

            if (element) {
                return element;
            }
        }

        const elements =
            document.querySelectorAll(
                "button, a, .feature-click, .feature-card"
            );

        for (let i = 0; i < elements.length; i++) {

            const text =
                (elements[i].textContent || "")
                    .trim()
                    .toLowerCase();

            if (
                text.includes("create character") ||
                text === "create"
            ) {
                return elements[i];
            }
        }

        return null;
    }


    // ========================================================
    // CREATE CHARACTER MODAL
    // ========================================================

    function createCharacterModal() {

        let modal =
            document.getElementById("myCompanionCreatorModal");

        if (modal) {
            return modal;
        }

        modal = document.createElement("div");

        modal.id = "myCompanionCreatorModal";

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

                    <h2
                        style="
                            margin:0;
                            font-size:24px;
                        "
                    >
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


                <label
                    style="
                        display:block;
                        margin-bottom:7px;
                    "
                >
                    Name
                </label>

                <input
                    id="companionName"
                    type="text"
                    placeholder="Enter companion's name"
                    autocomplete="off"
                    style="
                        width:100%;
                        box-sizing:border-box;
                        padding:13px;
                        margin-bottom:15px;
                        border-radius:12px;
                        border:1px solid #303650;
                        background:#151a2d;
                        color:white;
                        font-size:16px;
                        outline:none;
                    "
                />


                <label
                    style="
                        display:block;
                        margin-bottom:7px;
                    "
                >
                    Age
                </label>

                <input
                    id="companionAge"
                    type="number"
                    min="1"
                    max="120"
                    placeholder="Enter age"
                    style="
                        width:100%;
                        box-sizing:border-box;
                        padding:13px;
                        margin-bottom:15px;
                        border-radius:12px;
                        border:1px solid #303650;
                        background:#151a2d;
                        color:white;
                        font-size:16px;
                        outline:none;
                    "
                />


                <label
                    style="
                        display:block;
                        margin-bottom:7px;
                    "
                >
                    Gender
                </label>

                <select
                    id="companionGender"
                    style="
                        width:100%;
                        box-sizing:border-box;
                        padding:13px;
                        margin-bottom:15px;
                        border-radius:12px;
                        border:1px solid #303650;
                        background:#151a2d;
                        color:white;
                        font-size:16px;
                        outline:none;
                    "
                >

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


                <label
                    style="
                        display:block;
                        margin-bottom:7px;
                    "
                >
                    Relationship
                </label>

                <select
                    id="companionRelationship"
                    style="
                        width:100%;
                        box-sizing:border-box;
                        padding:13px;
                        margin-bottom:15px;
                        border-radius:12px;
                        border:1px solid #303650;
                        background:#151a2d;
                        color:white;
                        font-size:16px;
                        outline:none;
                    "
                >

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


                <label
                    style="
                        display:block;
                        margin-bottom:7px;
                    "
                >
                    Personality
                </label>

                <textarea
                    id="companionPersonality"
                    placeholder="Describe the personality..."
                    rows="4"
                    style="
                        width:100%;
                        box-sizing:border-box;
                        padding:13px;
                        margin-bottom:15px;
                        border-radius:12px;
                        border:1px solid #303650;
                        background:#151a2d;
                        color:white;
                        font-size:16px;
                        outline:none;
                        resize:vertical;
                    "
                ></textarea>


                <label
                    style="
                        display:block;
                        margin-bottom:7px;
                    "
                >
                    Voice
                </label>

                <select
                    id="companionVoice"
                    style="
                        width:100%;
                        box-sizing:border-box;
                        padding:13px;
                        margin-bottom:15px;
                        border-radius:12px;
                        border:1px solid #303650;
                        background:#151a2d;
                        color:white;
                        font-size:16px;
                        outline:none;
                    "
                >

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


                <label
                    style="
                        display:block;
                        margin-bottom:7px;
                    "
                >
                    Backstory
                </label>

                <textarea
                    id="companionBackstory"
                    placeholder="Tell a little about your companion..."
                    rows="4"
                    style="
                        width:100%;
                        box-sizing:border-box;
                        padding:13px;
                        margin-bottom:20px;
                        border-radius:12px;
                        border:1px solid #303650;
                        background:#151a2d;
                        color:white;
                        font-size:16px;
                        outline:none;
                        resize:vertical;
                    "
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

        return modal;
    }


    // ========================================================
    // OPEN CHARACTER CREATOR
    // ========================================================

    function openCharacterCreator() {

        const modal =
            createCharacterModal();

        const character =
            getCharacter();

        document.getElementById("companionName").value =
            character.name || "";

        document.getElementById("companionAge").value =
            character.age || "";

        document.getElementById("companionGender").value =
            character.gender || "";

        document.getElementById("companionRelationship").value =
            character.relationship || "";

        document.getElementById("companionPersonality").value =
            character.personality || "";

        document.getElementById("companionVoice").value =
            character.voice || "neutral";

        document.getElementById("companionBackstory").value =
            character.backstory || "";

        document.getElementById("characterSaveMessage").textContent =
            "";

        modal.style.display = "flex";

        document.body.style.overflow = "hidden";
    }


    // ========================================================
    // CLOSE CHARACTER CREATOR
    // ========================================================

    function closeCharacterCreator() {

        const modal =
            document.getElementById("myCompanionCreatorModal");

        if (modal) {
            modal.style.display = "none";
        }

        document.body.style.overflow = "";
    }


    // ========================================================
    // SAVE CHARACTER FROM FORM
    // ========================================================

    function saveCharacterFromForm() {

        const name =
            document.getElementById("companionName").value.trim();

        const age =
            document.getElementById("companionAge").value.trim();

        const gender =
            document.getElementById("companionGender").value;

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

        clearHistory();


        const message =
            document.getElementById(
                "characterSaveMessage"
            );

        message.textContent =
            name + " has been created successfully!";


        updateCharacterNames();


        setTimeout(function () {

            closeCharacterCreator();

            openChat();

        }, 700);
    }


    // ========================================================
    // UPDATE NAMES ON PAGE
    // ========================================================

    function updat
