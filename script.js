function showMessage(text) {
  alert(text);
}

function openCreator() {
  document.getElementById("creatorModal").classList.add("show");
}

function closeCreator() {
  document.getElementById("creatorModal").classList.remove("show");
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

function createCharacter() {
  const name = document.getElementById("characterName").value;
  const personality = document.getElementById("personality").value;

  if (name === "") {
    alert("Please enter a name.");
    return;
  }

  alert("✨ " + name + " is ready to be created!\n\nPersonality: " + personality);
  closeCreator();
}

document.getElementById("creatorModal").addEventListener("click", function(event) {
  if (event.target === this) {
    closeCreator();
  }
});
