function openCreator(){document.getElementById('creatorModal').classList.add('show');document.body.style.overflow='hidden'}
function closeCreator(){document.getElementById('creatorModal').classList.remove('show');document.body.style.overflow=''}
function scrollToSection(id){document.getElementById(id).scrollIntoView({behavior:'smooth'})}
function showMessage(text){alert(text)}
function createCharacter(){
  const name=document.getElementById('characterName').value.trim()||'Your Companion';
  const personality=document.getElementById('personality').value.trim()||'unique';
  alert(`✨ ${name} is ready to be created!\n\nPersonality: ${personality}\n\nNext step: connect this form to the AI + memory system.`);
  closeCreator();
}
document.getElementById('creatorModal').addEventListener('click',e=>{if(e.target.id==='creatorModal')closeCreator()});
