function Plant(id) {
    /* default parameters */
    this.id = id;
    this.timestamp = moment().toString();
    this.deleted = false;
    
    /* class specific parameters */
    this.name = document.getElementById("textPlantName").value;
}

function Log() {
    /* default parameters */
    this.id = -1;
    this.timestamp = "";
    this.deleted = false;
    
    /* class specific parameters */
    this.event = "";
    this.date = "";
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

/* add a plant */
DB.prototype.addPlant = function () {
    /* calculate id */
    var id = this.arrPlants.length;

    /* create plant object and add to the array */
    var plant = new Plant(id);
    this.arrPlants.push(plant);

    /* save the database to local storage */
    this.save();
}