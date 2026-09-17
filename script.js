// ============================================================
// MY COMPANION
// COMPLETE JAVASCRIPT
// Character Creator + Chat + Memory + Voice
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================================
    // CLOUDFLARE WORKER
    // ========================================================

    const WORKER_URL =
        "https://autumn-moon-8aee.aveepurvi890.workers.dev";


    // ========================================================
    // STORAGE
    // ========================================================

    const CHARACTER_KEY = "myCompanionCharacter";
    const HISTORY_KEY = "myCompanionChatHistory";


    // ========================================================
    // GET CHARACTER
    // ========================================================

    function getCharacter() {

        const saved =
            localStorage.getItem(CHARACTER_KEY);

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

            console.error(
                "Character data error:",
                error
            );

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

        const saved =
            localStorage.getItem(HISTORY_KEY);

        if (!saved) {
            return [];
        }

        try {

            const history = JSON.parse(saved);

            if (Array.isArray(history)) {
                return history;
            }

            return [];

        } catch (error) {

            console.error(
                "History error:",
                error
            );

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

        localStorage.removeItem(
            HISTORY_KEY
        );
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
    // UPDATE CHARACTER DISPLAY
    // ========================================================

    function updateCharacterDisplay() {

        const character = getCharacter();

        const nameElement =
            document.getElementById(
                "characterDisplayName"
            );

        const infoElement =
            document.getElementById(
                "characterDisplayInfo"
            );

        if (!nameElement || !infoElement) {
            return;
        }

        if (!character.name) {

            nameElement.textContent =
                "No Companion Yet";

            infoElement.textContent =
                "Create your companion to get started.";

            return;
        }

        nameElement.textContent =
            character.name;

        let information = [];

        if (character.age) {
            information.push(
                character.age + " years old"
            );
        }

        if (character.gender) {
            information.push(
                character.gender
            );
        }

        if (character.relationship) {
            information.push(
                character.relationship
            );
        }

        if (information.length > 0) {

            infoElement.textContent =
                information.join(" • ");

        } else {

            infoElement.textContent =
                "Your AI companion";
        }
    }


    // ========================================================
    // CREATOR MODAL
    // ========================================================

    function openCreator() {

        const modal =
            document.getElementById(
                "creatorModal"
            );

        if (!modal) {
            console.error(
                "creatorModal not found."
            );
            return;
        }

        const character = getCharacter();

        document.getElementById(
            "characterName"
        ).value = character.name;

        document.getElementById(
            "characterAge"
        ).value = character.age;

        document.getElementById(
            "characterGender"
        ).value = character.gender;

        document.getElementById(
            "characterRelationship"
        ).value = character.relationship;

        document.getElementById(
            "characterPersonality"
        ).value = character.personality;

        document.getElementById(
            "characterVoice"
        ).value = character.voice;

        document.getElementById(
            "characterBackstory"
        ).value = character.backstory;

        document.getElementById(
            "characterSaveMessage"
        ).textContent = "";

        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";
    }


    // ========================================================
    // CLOSE CREATOR
    // ========================================================

    function closeCreator() {

        const modal =
            document.getElementById(
                "creatorModal"
            );

        if (modal) {
            modal.classList.remove("active");
        }

        document.body.style.overflow =
            "";
    }


    // ========================================================
    // SAVE CHARACTER FROM FORM
    // ========================================================

    function createCharacter() {

        const name =
            document.getElementById(
                "characterName"
            ).value.trim();

        const age =
            document.getElementById(
                "characterAge"
            ).value.trim();

        const gender =
            document.getElementById(
                "characterGender"
            ).value;

        const relationship =
            document.getElementById(
                "characterRelationship"
            ).value;

        const personality =
            document.getElementById(
                "characterPersonality"
            ).value.trim();

        const voice =
            document.getElementById(
                "characterVoice"
            ).value;

        const backstory =
            document.getElementById(
                "characterBackstory"
            ).value.trim();


        // ----------------------------------------------------
        // NAME REQUIRED
        // ----------------------------------------------------

        if (!name) {

            alert(
                "Please enter a name for your companion."
            );

            return;
        }


        // ----------------------------------------------------
        // CREATE CHARACTER OBJECT
        // ----------------------------------------------------

        const character = {

            name: name,

            age: age,

            gender: gender,

            relationship: relationship,

            personality: personality,

            voice: voice,

            backstory: backstory
        };


        // ----------------------------------------------------
        // SAVE
        // ----------------------------------------------------

        saveCharacter(character);


        // Start a new conversation for a new/saved character
        clearHistory();


        // ----------------------------------------------------
        // UPDATE PAGE
        // ----------------------------------------------------

        updateCharacterDisplay();


        const message =
            document.getElementById(
                "characterSaveMessage"
            );

        message.textContent =
            name +
            " has been created successfully!";


        // ----------------------------------------------------
        // CLOSE CREATOR
        // ----------------------------------------------------

        setTimeout(function () {

            closeCreator();

            openChat();

        }, 700);
    }


    // ========================================================
    // CHAT
    // ========================================================

    function openChat() {

        const modal =
            document.getElementById(
                "chatModal"
            );

        if (!modal) {

            console.error(
                "chatModal not found."
            );

            return;
        }

        const character = getCharacter();


        // ----------------------------------------------------
        // REQUIRE CHARACTER
        // ----------------------------------------------------

        if (!character.name) {

            alert(
                "Please create your companion first."
            );

            openCreator();

            return;
        }


        document.getElementById(
            "chatTitle"
        ).textContent =
            character.name;


        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";


        renderChat();


        setTimeout(function () {

            const input =
                document.getElementById(
                    "chatInput"
                );

            if (input) {
                input.focus();
            }

        }, 100);
    }


    // ========================================================
    // CLOSE CHAT
    // ========================================================

    function closeChat() {

        const modal =
            document.getElementById(
                "chatModal"
            );

        if (modal) {
            modal.classList.remove("active");
        }

        document.body.style.overflow =
            "";
    }


    // ========================================================
    // ADD MESSAGE TO SCREEN
    // ========================================================

    function addMessageToScreen(
        role,
        text
    ) {

        const container =
            document.getElementById(
                "chatMessages"
            );

        if (!container) {
            return;
        }


        const message =
            document.createElement("div");

        message.className =
            "message " +
            (
                role === "user"
                    ? "user"
                    : "companion"
            );


        const label =
            document.createElement("div");

        label.className =
            "message-label";

        label.textContent =
            role === "user"
                ? "You"
                : getCharacterName();


        const content =
            document.createElement("div");

        content.textContent =
            text;


        message.appendChild(label);

        message.appendChild(content);

        container.appendChild(message);


        container.scrollTop =
            container.scrollHeight;
    }


    // ========================================================
    // RENDER CHAT HISTORY
    // ========================================================

    function renderChat() {

        const container =
            document.getElementById(
                "chatMessages"
            );

        if (!container) {
            return;
        }

        container.innerHTML = "";


        const history =
            getHistory();


        if (history.length === 0) {

            addMessageToScreen(
                "companion",
                "Hello! I'm " +
                getCharacterName() +
                ". I'm ready to talk with you."
            );

            return;
        }


        history.forEach(function (item) {

            if (
                item &&
                item.role &&
                item.text
            ) {

                addMessageToScreen(
                    item.role,
                    item.text
                );
            }
        });
    }


    // ========================================================
    // SET STATUS
    // ========================================================

    function setChatStatus(text) {

        const status =
            document.getElementById(
                "chatStatus"
            );

        if (status) {
            status.textContent =
                text || "";
        }
    }


    // ========================================================
    // SEND MESSAGE
    // ========================================================

    async function sendMessage() {

        const input =
            document.getElementById(
                "chatInput"
            );

        if (!input) {
            return;
        }


        const message =
            input.value.trim();


        if (!message) {
            return;
        }


        const character =
            getCharacter();


        if (!character.name) {

            alert(
                "Please create your companion first."
            );

            closeChat();

            openCreator();

            return;
        }


        // ----------------------------------------------------
        // DISPLAY USER MESSAGE
        // ----------------------------------------------------

        addMessageToScreen(
            "user",
            message
        );


        // ----------------------------------------------------
        // SAVE USER MESSAGE
        // ----------------------------------------------------

        const history =
            getHistory();


        history.push({

            role: "user",

            text: message
        });


        saveHistory(history);


        input.value = "";

        setChatStatus(
            "Thinking..."
        );


        // ----------------------------------------------------
        // DISABLE SEND
        // ----------------------------------------------------

        const sendButton =
            document.getElementById(
                "sendButton"
            );

        if (sendButton) {
            sendButton.disabled = true;
        }


        try {

            // ------------------------------------------------
            // SEND TO CLOUDFLARE WORKER
            // ------------------------------------------------

            const response =
                await fetch(
                    WORKER_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            message: message,

                            history: history,

                            name:
                                character.name,

                            age:
                                character.age,

                            gender:
                                character.gender,

                            relationship:
                                character.relationship,

                            personality:
                                character.personality,

                            backstory:
                                character.backstory
                        })
                    }
                );


            // ------------------------------------------------
            // READ RESPONSE
            // ------------------------------------------------

            const data =
                await response.json();


            // ------------------------------------------------
            // WORKER ERROR
            // ------------------------------------------------

            if (!response.ok) {

                throw new Error(

                    data.error ||
                    "The AI server returned an error."
                );
            }


            // ------------------------------------------------
            // FIND AI REPLY
            // ------------------------------------------------

            let reply = "";


            if (
                typeof data.reply ===
                "string"
            ) {

                reply =
                    data.reply;

            } else if (
                typeof data.response ===
                "string"
            ) {

                reply =
                    data.response;

            } else if (
                typeof data.text ===
                "string"
            ) {

                reply =
                    data.text;

            } else if (
                data.candidates &&
                data.candidates[0] &&
                data.candidates[0].content &&
                data.candidates[0].content.parts &&
                data.candidates[0].content.parts[0]
            ) {

                reply =
                    data.candidates[0]
                        .content
                        .parts[0]
                        .text || "";
            }


            // ------------------------------------------------
            // NO REPLY
            // ------------------------------------------------

            if (!reply) {

                throw new Error(
                    "The Worker did not return an AI reply."
                );
            }


            // ------------------------------------------------
            // DISPLAY AI MESSAGE
            // ------------------------------------------------

            addMessageToScreen(
                "companion",
                reply
            );


            // ------------------------------------------------
            // SAVE AI MESSAGE
            // ------------------------------------------------

            const updatedHistory =
                getHistory();


            updatedHistory.push({

                role: "companion",

                text: reply
            });


            saveHistory(
 
