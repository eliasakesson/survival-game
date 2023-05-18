import PhysicsObject from "./PhysicsObject";

export default class Player extends PhysicsObject{
    constructor(){
        super(...arguments)

        this.size = { x: 100, y: 200 }
    }

    Update(deltaTime){
        super.Update(deltaTime)
    }
}