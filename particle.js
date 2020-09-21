class Particle {

    constructor(x, y){
        var options = {
            isStatic: false,
            restitution: 0.4,
        }

        this.body = Bodies.circle(x, y, 10, options);
        this.radius = 10;
        this.colour = color(random(0,255), random(0,255), random(0,255));
        World.add(world, this.body);
    }

    display(){
        var angle = this.body.angle;
        push()
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        fill(this.colour);
        ellipseMode(RADIUS);
        ellipse(0, 0, 10, 10);
        pop();
    }
}