const gameplay = () => {
    const canvas = document.getElementById("snake")
    const grid = canvas.getContext("2d")
    const playerScore = document.getElementById("playerScore")

    const dead = new Audio()
    dead.src = 'audio/dead.mp3'
    const levelup = new Audio()
    levelup.src = 'audio/levelup.mp3'

    const box = 22

    let snake = [{x:12 * box,y: 12 * box}]
// adding the objective random position and an image to it
    const objectiveImage = new Image(16,16)
    objectiveImage.height = 16
    objectiveImage.src = 'efficom.png'

    let objective = {
        x: Math.floor(Math.random()* box ) * box,
        y: Math.floor(Math.random() * box ) * box
    }

    let snakeDirection
// add input mapping
    const direction = event => {
        if (event.keyCode === 37 && snakeDirection !== "RIGHT") {
            snakeDirection = "LEFT"
        }else if (event.keyCode === 38 && snakeDirection !== "DOWN") {
            snakeDirection = "UP"
        }else if (event.keyCode === 39 && snakeDirection !== "LEFT") {
            snakeDirection = "RIGHT"
        }else if (event.keyCode === 40 && snakeDirection !== "UP") {
            snakeDirection = "DOWN"
        }
    }

    document.addEventListener("keydown", direction)

// General score of current user
    let score = 0
    playerScore.textContent = `Score : ${score}`

    const hitHimself = (snakePosition, snake) => {
        for (let index = 0; index < snake.length ; index++) {
            if (snake[index].x === snakePosition.x && snake[index].y === snakePosition.y) {
                return true
            }
        }

        return false
    }

    const draw = () =>  {
        objective.x === 0 ? objective.x = box : objective.x
        objective.y === 0 ? objective.y = box : objective.y
        grid.fillStyle = 'black'
        grid.fillRect(0,0, canvas.width,canvas.height)

        grid.fillStyle = "red"
        grid.fillRect(objective.x,objective.y,box,box)

        for (let index = 0; index < snake.length; index++) {
            grid.fillStyle = (index === 0) ? "#4287f5" : "white"
            grid.fillRect(snake[index].x, snake[index].y, box, box)
        }

        let snakeX = snake[0].x
        let snakeY = snake[0].y

        if (snakeDirection === 'LEFT') snakeX -= box
        if (snakeDirection === 'UP') snakeY -= box
        if (snakeDirection === 'RIGHT') snakeX += box
        if (snakeDirection === 'DOWN') snakeY += box

        // handle if player move beyond the limit
        if (snakeX < box - 1) {
            snakeX = box * 25
        } else if (snakeX > box * 25) {
            snakeX = box
        } else if (snakeY < box ) {
            snakeY = box * 25
        } else if ( snakeY > box * 25) {
            snakeY = box
        }

        if (snakeX === objective.x && snakeY === objective.y) {
            score++
            levelup.play()
            playerScore.textContent = `Score : ${score}`
            objective = {
                x: Math.floor(Math.random()* box) * box,
                y: Math.floor(Math.random()* box) * box
            }
        } else {
            snake.pop()
        }

        // set the snake new position
        let snakeNewPosition = {
            x : snakeX,
            y: snakeY
        }

        if (hitHimself(snakeNewPosition, snake)) {
            clearInterval(game)
            dead.play()
            setTimeout(() => gameplay(), 8000)
        }

        snake.unshift(snakeNewPosition)
    }

    let game = setInterval(draw, 100)
}

gameplay()