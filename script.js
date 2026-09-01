function createCharacter() {
  const name = document.getElementById("characterName").value.trim();
  const personality = document.getElementById("personality").value.trim();
  const backstory = document.getElementById("backstory").value.trim();

  if (name === "") {
    alert("Please enter a name for your character.");
    return;
  }

  // Save the character information
  localStorage.setItem("companionName", name);
  localStorage.setItem("companionPersonality", personality);
  localStorage.setItem("companionBackstory", backstory);

  alert("✨ " + name + " has been created!");

  closeCreator();

  // Show the character on the main page
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
}
