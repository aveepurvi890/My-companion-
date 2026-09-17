// ============================================================
// MY COMPANION - COMPLETE JAVASCRIPT
// Character Creator + Cloudflare Worker + Gemini AI Chat
// ============================================================

// Your Cloudflare Worker URL.
// Use the URL of YOUR deployed Worker.
const WORKER_URL = "https://autumn-moon-8aee.aveepurvi890.workers.dev";

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
            character.name === "Your Companion"
                ? ""
                : character.name;

        document.getElementById("characterAge").value =
            character.age;

        document.getElementById("characterGender").value =
            character.gender;

        document.getElementById("relationship").value =
            character.relationship;

        document.getElementById("characterVoice").value =
            character.voice;

        document.getElementById("personality").value =
            character.personality === "caring"
                ? ""
                : character.personality;

        document.getElementById("backstory").value =
            character.backstory;

        modal.classList.add("show");

        document.body.style.overflow = "hidden";
    }
}

function closeCreator() {
    const modal =
        document.getElementById("creatorModal");

    if (modal) {
        modal.classList.remove("show");

        document.body.style.overflow = "";
    }
}

function scrollToSection(id) {
    const element =
        document.getElementById(id);

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
        document.getElementById("characterName")
            ?.value.trim();

    const age =
        document.getElementById("characterAge")
            ?.value.trim();

    const gender =
        document.getElementById("characterGender")
            ?.value;

    const relationship =
        document.getElementById("relationship")
            ?.value;

    const voice =
        document.getElementById("characterVoice")
            ?.value || "auto";

    const personality =
        document.getElementById("personality")
            ?.value.trim();

    const backstory =
        document.getElementById("backstory")
            ?.value.trim();

    // Name is required.
    if (!name) {

        alert(
            "Please enter your character's name."
        );

        document
            .getElementById("characterName")
            ?.focus();

        return;
    }

    // Save complete character.
    localStorage.setItem(
        "companionName",
        name
    );

    localStorage.setItem(
        "companionAge",
        age || ""
    );

    localStorage.setItem(
        "companionGender",
        gender || ""
    );

    localStorage.setItem(
        "companionRelationship",
        relationship || ""
    );

    localStorage.setItem(
        "companionVoice",
        voice
    );

    localStorage.setItem(
        "companionPersonality",
        personality || "caring"
    );

    localStorage.setItem(
        "companionBackstory",
        backstory || ""
    );

    // Update website immediately.
    updateCharacterDisplay();

    alert(
        `✨ ${name} has been created!\n\n` +
        (age ? `Age: ${age}\n` : "") +
        (gender ? `Gender: ${gender}\n` : "") +
        (relationship
            ? `Relationship: ${relationship}\n`
            : "") +
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

    const feature =
        featureContent[type];

    if (!feature) return;

    const title =
        document.getElementById("featureTitle");

    const description =
        document.getElementById(
            "featureDescription"
        );

    const modal =
        document.getElementById(
            "featureModal"
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

        document.body.style.overflow =
            "hidden";
    }
}

function closeFeature() {

    const modal =
        document.getElementById(
            "featureModal"
        );

    if (modal) {

        modal.classList.remove("show");

        document.body.style.overflow =
            "";
    }
}

// ---------------- DOM READY ----------------

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCharacterDisplay();

        // Smooth scrolling
        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function (event) {

                            const targetId =
                                link.getAttribute(
                                    "href"
                                );

                            if (
                                !targetId ||
                                targetId === "#"
                            ) {
                                return;
                            }

                            const target =
                                document.querySelector(
                                    targetId
                                );

                            if (!target) {
                                return;
                            }

                            event.preventDefault();

                            target.scrollIntoView({
                                behavior:
                                    "smooth",
                                block:
                                    "start"
                            });
                        }
                    );
                }
            );

        // Mobile navigation
        const menuButton =
            document.querySelector(
                ".menu-toggle"
            ) ||
            document.querySelector(
                ".hamburger"
            ) ||
            document.querySelector(
                "[data-menu-toggle]"
            );

        const nav =
            document.querySelector(
                ".nav-links"
            ) ||
            document.querySelector(
                "nav ul"
            ) ||
            document.querySelector(
                "nav"
            );

        if (menuButton && nav) {

            menuButton.addEventListener(
                "click",
                function () {

                    nav.classList.toggle(
                        "active"
                    );

                    menuButton.classList.toggle(
                        "active"
                    );
                }
            );

            nav.querySelectorAll("a")
                .forEach(
                    function (link) {

                        link.addEventListener(
                            "click",
                            function () {

                                nav.classList.remove(
                                    "active"
                                );

                                menuButton.classList.remove(
                                    "active"
                                );
                            }
                        );
                    }
                );
        }

        // Watch Demo
        const demoButtons =
            document.querySelectorAll(
                '.watch-demo, [data-action="demo"]'
            );

        demoButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        const existingModal =
                            document.querySelector(
                                ".demo-modal"
                            );

                        if (existingModal) {

                            existingModal.remove();

                            return;
                        }

                        const modal =
                            document.createElement(
                                "div"
                            );

                        modal.className =
                            "demo-modal";

                        modal.innerHTML = `
                            <div class="demo-box">

                                <button
                                    class="demo-close"
                                    aria-label="Close">
                                    &times;
                                </button>

                                <h2>
                                    My Companion ✨
                                </h2>

                                <p>
                                    Imagine creating an AI companion with a unique
                                    personality, memories, and a voice that feels
                                    truly personal.
                                </p>

                                <button class="demo-ok">
                                    Got it
                                </button>

                            </div>
                        `;

                        document.body.appendChild(
                            modal
                        );

                        const closeModal =
                            function () {
                                modal.remove();
                            };

                        modal
                            .querySelector(
                                ".demo-close"
                            )
                            .addEventListener(
                                "click",
                                closeModal
                            );

                        modal
                            .querySelector(
                                ".demo-ok"
                            )
                            .addEventListener(
                                "click",
                                closeModal
                            );

                        modal.addEventListener(
                            "click",
                            function (event) {

                                if (
                                    event.target ===
                                    modal
                                ) {
                                    closeModal();
                                }
                            }
                        );
                    }
                );
            }
        );

        // Header scroll effect
        const header =
            document.querySelector(
                "header"
            );

        if (header) {

            const updateHeader =
                function () {

                    header.classList.toggle(
                        "scrolled",
                        window.scrollY > 30
                    );
                };

            updateHeader();

            window.addEventListener(
                "scroll",
                updateHeader,
                {
                    passive: true
                }
            );
        }

        // Reveal sections
        const revealItems =
            document.querySelectorAll(
                "section, .feature-card, .feature, .step, .card"
            );

        if (
            "IntersectionObserver" in window &&
            revealItems.length
        ) {

            const observer =
                new IntersectionObserver(
                    function (
                        entries,
                        obs
                    ) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "visible"
                                    );

                                    obs.unobserve(
                                        entry.target
                                    );
                                }
                            }
                        );
                    },
                    {
                        threshold: 0.12
                    }
                );

            revealItems.forEach(
                function (item) {
                    observer.observe(item);
                }
            );
        }

        // Creator modal
        const creatorModal =
            document.getElementById(
                "creatorModal"
            );

        if (creatorModal) {

            creatorModal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        creatorModal
                    ) {
                        closeCreator();
                    }
                }
            );
        }

        // Feature modal
        const featureModal =
            document.getElementById(
                "featureModal"
            );

        if (featureModal) {

            featureModal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        featureModal
                    ) {
                        closeFeature();
                    }
                }
            );
        }

        // Keyboard support
        document
            .querySelectorAll(
                ".feature-click"
            )
            .forEach(
                function (card) {

                    card.addEventListener(
                        "keydown",
                        function (event) {

                            if (
                                event.key ===
                                    "Enter" ||
                                event.key ===
                                    " "
                            ) {

                                event.preventDefault();

                                card.click();
                            }
                        }
                    );
                }
            );
