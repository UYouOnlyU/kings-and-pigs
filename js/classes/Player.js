class Player extends Sprite {
    constructor({
        collisionBlocks = [], imageSrc, frameRate, animations }){
        super({imageSrc, frameRate, animations})
        this.position = {
            x: 200,
            y: 200,
        }

        this.velocity = {
            x: 0,
            y: 0,
        }

        this.width = 25
        this.height = 25
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.gravity = 1

        this.collisionBlocks = collisionBlocks
        console.log(this.collisionBlocks)
    }

    update() {
        //this tis the blue box
        //c.fillStyle = 'rgba(0,0,255,0.5)'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        this.position.x += this.velocity.x

        this.updateHitbox()
        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.updateHitbox()

        

        //c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        this.checkForVerizontalCollisions()
        
    }

    switchSprite(name){
        if(this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
    }

    updateHitbox(){
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34,
            },
            width: 50,
            height: 54,
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0;i<this.collisionBlocks.length;i++){
            const collisionBlocks = this.collisionBlocks[i]

            //if a collisions exist
            if(
            this.hitbox.position.x <= collisionBlocks.position.x + collisionBlocks.width &&
            this.hitbox.position.x + this.hitbox.width >= collisionBlocks.position.x &&
            this.hitbox.position.y + this.hitbox.height >= collisionBlocks.position.y &&
            this.hitbox.position.y <= collisionBlocks.position.y + collisionBlocks.height
            ) {
                //collision on x asis going to the left
                if(this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlocks.position.x + collisionBlocks.width - offset + 0.01
                    break
                }
                if(this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlocks.position.x - offset - 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }

    checkForVerizontalCollisions() {
        for (let i = 0;i<this.collisionBlocks.length;i++){
            const collisionBlocks = this.collisionBlocks[i]

            //if a collisions exist
            if(
            this.hitbox.position.x <= collisionBlocks.position.x + collisionBlocks.width &&
            this.hitbox.position.x + this.hitbox.width >= collisionBlocks.position.x &&
            this.hitbox.position.y + this.hitbox.height >= collisionBlocks.position.y &&
            this.hitbox.position.y <= collisionBlocks.position.y + collisionBlocks.height
            ) {
                if(this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlocks.position.y + collisionBlocks.height - offset + 0.01
                    break
                }
                if(this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlocks.position.y - offset - 0.01
                    break
                }
            }
        }
    }
}