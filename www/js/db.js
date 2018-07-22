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
    this.load();
}

/* load the database from local storage */
DB.prototype.load = function () {
    var d = localStorage.getItem("arrPlants");
    if (d != null && d != undefined) {
        this.arrPlants = JSON.parse(d);
    }
}

/* save the database to local storage */
DB.prototype.save = function () {
    localStorage.setItem("arrPlants", JSON.stringify(this.arrPlants));
}

/* add a plant.
 * param name = name of the plant
 */
DB.prototype.addPlant = function (name) {
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

    /* save the database to local storage */
    this.save();
}