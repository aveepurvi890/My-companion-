function showMessage(text) {
  alert(text);
}

function openCreator() {
  const modal = document.getElementById("creatorModal");

  if (modal) {
    modal.classList.add("show");
  }
}

function closeCreator() {
  const modal = document.getElementById("creatorModal");

  if (modal) {
    modal.classList.remove("show");
  }
}

function scrollToSection(id) {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function createCharacter() {
  const name = document.getElementById("characterName").value.trim();
  const personality = document.getElementById("personality").value.trim();
  const backstory = document.getElementById("backstory").value.trim();

  if (name === "") {
    alert("Please enter a name for your character.");
    return;
  }

  localStorage.setItem("companionName", name);
  localStorage.setItem("companionPersonality", personality);
  localStorage.setItem("companionBackstory", backstory);

  const characterTitle = document.querySelector(".character-info h2");
  const characterDescription = document.querySelector(".character-info p");

  if (characterTitle) {
    characterTitle.textContent = name;
  }

  if (characterDescription) {
    characterDescription.textContent =
      personality
        ? "Personality: " + personality
        : "Your new companion is ready to chat. ✨";
  }

  alert("✨ " + name + " has been created!");

  closeCreator();
}

document.addEventListener("DOMContentLoaded", function () {

  // Load saved character
  const savedName = localStorage.getItem("companionName");
  const savedPersonality = localStorage.getItem("companionPersonality");

  if (savedName) {
    const characterTitle = document.querySelector(".character-info h2");
    const characterDescription = document.querySelector(".character-info p");

    if (characterTitle) {
      characterTitle.textContent = savedName;
    }

    if (characterDescription && savedPersonality) {
      characterDescription.textContent =
        "Personality: " + savedPersonality;
    }
  }

  // Close popup when clicking outside it
  const modal = document.getElementById("creatorModal");

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeCreator();
      }
    });
  }
  // ================= CHAT FEATURE =================

document.addEventListener("DOMContentLoaded", function () {

  const characterInfo = document.querySelector(".character-info");

  if (!characterInfo) return;

  // Create Chat button
  const chatButton = document.createElement("button");

  chatButton.textContent = "💬 Chat with me";
  chatButton.style.cssText = `
    margin-top:18px;
    width:100%;
    padding:12px;
    border:none;
    border-radius:25px;
    background:linear-gradient(100deg,#843cff,#3f8cff);
    color:white;
    font-weight:700;
    cursor:pointer;
  `;

  characterInfo.appendChild(chatButton);

  // Create chat window
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
    z-index:100;
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
        <div>
          <strong id="chatCharacterName">My Companion</strong>
          <div style="color:#44dc91;font-size:12px;">● Online</div>
        </div>

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
        <input id="chatInput"
          placeholder="Type a message..."
          style="
            flex:1;
            background:#12162a;
            border:1px solid #2d3149;
            color:white;
            border-radius:20px;
            padding:12px 15px;
            outline:none;
          ">

        <button id="sendChat" style="
          border:none;
          border-radius:20px;
          padding:0 18px;
          background:#843cff;
          color:white;
          font-weight:700;
          cursor:pointer;
        ">Send</button>
      </div>

    </div>
  `;

  document.body.appendChild(chatModal);

  const messages = chatModal.querySelector("#chatMessages");
  const input = chatModal.querySelector("#chatInput");
  const sendButton = chatModal.querySelector("#sendChat");
  const closeButton = chatModal.querySelector("#closeChat");
  const characterName = chatModal.querySelector("#chatCharacterName");

  function addMessage(text, person) {

    const message = document.createElement("div");

    message.textContent = text;

    message.style.cssText = `
      max-width:80%;
      padding:10px 14px;
      border-radius:15px;
      background:${person === "user" ? "#843cff" : "#171b30"};
      align-self:${person === "user" ? "flex-end" : "flex-start"};
      color:white;
    `;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function companionReply(text) {

    const name =
      localStorage.getItem("companionName") || "Luna";

    const personality =
      localStorage.getItem("companionPersonality") || "friendly";

    const lower = text.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi")) {
      return "Hey! 😊 I'm " + name + ". It's nice to talk with you.";
    }

    if (lower.includes("how are you")) {
      return "I'm doing great! ✨ I'm here to spend some time with you.";
    }

    if (lower.includes("name")) {
      return "My name is " + name + ". That's the character you created for me.";
    }

    if (lower.includes("personality")) {
      return "My personality is " + personality + ".";
    }

    if (lower.includes("bye")) {
      return "Bye! 👋 Come back whenever you want to talk.";
    }

    return "That's interesting! Tell me more. 😊";
  }

  function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    setTimeout(function () {
      addMessage(companionReply(text), "companion");
    }, 500);
  }

  chatButton.addEventListener("click", function () {

    const name =
      localStorage.getItem("companionName") || "Luna";

    characterName.textContent = name;

    chatModal.style.display = "flex";

    if (messages.children.length === 0) {
      addMessage(
        "Hey! 😊 I'm " + name + ". What would you like to talk about?",
        "companion"
      );
    }

    input.focus();
  });

  closeButton.addEventListener("click", function () {
    chatModal.style.display = "none";
  });

  sendButton.addEventListener("click", sendMessage);

  input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
      sendMessage();
    }

  });

  chatModal.addEventListener("click", function (event) {

    if (event.target === chatModal) {
      chatModal.style.display = "none";
    }

  });

});

  // Close popup with Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeCreator();
    }
  });

});
