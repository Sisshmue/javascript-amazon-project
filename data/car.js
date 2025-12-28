class Car{
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carProperties){
        this.#brand = carProperties.brand;
        this.#model = carProperties.model;
    };

    displayInfo(){
        return `${this.#brand} ${this.#model}, ${this.speed} km/h`;
    }

    go(){
        if(!this.isTrunkOpen && this.speed < 200){
            this.speed += 5;
        }
    }

    brake(){
        if(this.speed > 0){
            this.speed -= 5;
        }
    }

    openTrunk(){
        if(this.speed > 0){
            return;
        }
        this.isTrunkOpen = true;
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }
};

const car1 = new Car({brand : 'Toyota', model : "Corolla"});
const car2 = new Car({brand : 'Tesla', model : "Model 3"});

car1.openTrunk();
car1.go();
car1.go();
car1.closeTrunk();
car1.brake();
car2.go();
car2.openTrunk();


class RaceCar extends Car{
    acceleration = 0;

    constructor(carProperties){
        super(carProperties);
        this.acceleration = carProperties.acceleration;
    }

    go(){
        if(this.speed < 300){
            this.speed += this.acceleration;
        }
    }
}
const raceCar = new RaceCar({brand : 'McLaren', model : "F1", acceleration : 20});

raceCar.go();
