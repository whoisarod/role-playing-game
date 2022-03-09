import characterData from "./data.js"
import Character from "./character.js"

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
    if(!isWaiting) {
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()

        if (wizard.dead) {
            endGame()
        }
        else if (monster.dead) {
            isWaiting = true
            if (monstersArray.length > 0) {
                setTimeout(() => {
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                }, 1500);
            } else {
                endGame()
            }
        }
    }
}

function endGame() {
    isWaiting = true
    const endMessage = monster.dead && wizard.dead ? "No Victors - all creatures are dead"
        : monster.dead ? "The Wizard Wins"
        : "The Monsters are Victorious"

    const endEmoji = monster.dead && wizard.dead ? "☠️" 
        : monster.dead ? "🔮"
        : "😈"
        setTimeout(() => {
            document.body.innerHTML = `
            <div class="end-game">
                <h2>Game Over</h2>
                <h3>${endMessage}</h3>
                <p class="end-emoji">${endEmoji}</p>
            </div>
            `
        }, 1500);
   
}

document.getElementById("attack-button").addEventListener("click", attack)

function render(){
    document.getElementById("hero").innerHTML = wizard.getCharacterHtml()
    document.getElementById("monster").innerHTML = monster.getCharacterHtml()   
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()
render()