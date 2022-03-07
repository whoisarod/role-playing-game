import characterData from "./data.js"
import Character from "./character.js"

function attack() {
    wizard.getDiceHtml()
    orc.getDiceHtml()
    wizard.takeDamage(orc.currentDiceScore)
    orc.takeDamage(wizard.currentDiceScore)
    render()
    if(wizard.dead || orc.dead) {
        endGame()
    }
}

function endGame() {
    const endMessage = orc.dead && wizard.dead ? "No Victors - all creatures are dead"
        : orc.dead ? "The Wizard Wins"
        : "The Orc is Victorious"

    const endEmoji = orc.dead & wizard.dead ? "☠️" 
        : orc.dead ? "🔮"
        : "☠️"
        
    document.body.innerHTML = `
        <div class="end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>
        `
}

const wizard = new Character(characterData.hero)
const orc = new Character(characterData.monster)

function render(){
    document.getElementById("hero").innerHTML = wizard.getCharacterHtml()
    document.getElementById("monster").innerHTML = orc.getCharacterHtml()   
}
render()

document.getElementById("attack-button").addEventListener("click", attack)