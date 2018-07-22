function Plant(id, name) {
    /* default parameters */
    this.id = id;
    this.timestamp = moment().toString();
    this.deleted = false;
    
    /* class specific parameters */
    this.name = name;
}

function Log() {
    /* default parameters */
    this.id = -1;
    this.timestamp = "";
    this.deleted = false;
    
    /* class specific parameters */
    this.event = "";
    this.date = "";
    this.photo = "";
}

function DB() {
    this.arrPlants = new Array();

    /* add a plant.
     * param name = name of the plant
     */
    this.addPlant = function (name) {
        /* calculate id */
        var id = 0;
        for (var i = 0; i < this.arrPlants.length + 1; i++) {
            if (this.arrPlants.findIndex(
                    function (val) {
                        return (val.id == i);
                    }
                ) == -1)
                id = i;
        }

        /* create plant object and add to the array */
        var plant = new Plant(id, name);
        this.arrPlants.push(plant);
    }
}
