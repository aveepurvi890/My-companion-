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

  // Close popup with Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeCreator();
    }
  });

});
