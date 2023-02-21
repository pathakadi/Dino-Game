container = document.querySelector("#container")
dino = document.querySelector("#dino")
block = document.querySelector("#block")
cloud = document.querySelector("#cloud")
road = document.querySelector("#road")
score = document.querySelector("#score")
gameOver = document.querySelector("#gameOver")

let playerScore = 0;
let interval = null;
let gameStart = false

let scoreCounter = ()=>{
    playerScore++;
    score.innerHTML = `Score <b>${playerScore}</b>`
}

window.addEventListener("keydown", (e)=>{
    
    if(e.code==="Space" && !gameStart){
        gameStart = true
        gameOver.style.display = "none"
        block.classList.add("blockActive");
        cloud.firstElementChild.style.animation = "cloudAnimate 1s linear infinite";
        road.firstElementChild.style.animation = "roadAnimate 1s linear infinite";
        interval = setInterval(scoreCounter, 10)
    }
})

window.addEventListener("keydown", (e)=>{
    if(e.key==="ArrowUp"){
        dino.classList.add("dinoActive")
        setTimeout(()=>{
            dino.classList.remove("dinoActive")
        }, 500)
    }
})

let result = setInterval(()=>{

    let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue("bottom"))
    let dinoHeight = parseInt(getComputedStyle(dino).getPropertyValue("height"))
    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"))
    let blockWidth = parseInt(getComputedStyle(block).getPropertyValue("width"))

    let dinoLeft = parseInt(getComputedStyle(dino).getPropertyValue("left"))
    let dinoWidth = parseInt(getComputedStyle(dino).getPropertyValue("width"))

    let dinoRight = dinoLeft+ dinoWidth
    let blockBottom = parseInt(getComputedStyle(block).getPropertyValue("bottom"))
    let blockHeight = parseInt(getComputedStyle(block).getPropertyValue("height"))

    let blocktop = blockBottom+blockHeight
    let blockRight = blockLeft+blockWidth
    
    let verticalCollide = dinoBottom <= blocktop
    let leftBoundaryCond = blockLeft<dinoRight
    let rightBoundaryCond = blockRight>dinoLeft

    if(verticalCollide && leftBoundaryCond && rightBoundaryCond){
        block.classList.remove("blockActive");
        cloud.firstElementChild.style.animation = "none";
        road.firstElementChild.style.animation = "none";

        gameOver.style.display = "block"
        clearInterval(interval);
        playerScore = 0;
        gameStart = false
    }

}, 10)

