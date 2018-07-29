function Plant(id) {
    /* default parameters */
    this.id = id;
    this.timestamp = moment().toString();
    this.deleted = false;
    
    /* class specific parameters */
    this.name = document.getElementById("textPlantName").value;
    
    /* log array */
    this.arrLogs = new Array();
}

function Log(id) {
    /* default parameters */
    this.id = id;
    this.timestamp = moment().toString();
    this.deleted = false;
    
    /* class specific parameters */
    this.date = moment(document.getElementById("dateAddLog").value, "YYYY-MM-DD"); // date is strangely reflecting one day before, but retreive works fine
    this.event = document.getElementById("textEvent").value;
}

function DB() {
    this.arrPlants = new Array();
    this.load();
}

/* add log for a plant */
DB.prototype.addLog = function () {
    var idPlant = parseInt(document.getElementById("dropdownPlantListAddLog").value.split("_")[1]);
    var plant = this.arrPlants[idPlant];
    var log = new Log(plant.arrLogs.length);
    plant.arrLogs.push(log);
    this.save();
}

/* add/edit a plant */
DB.prototype.addPlant = function (update) {
    var id = this.arrPlants.length;
    var plant = new Plant(id);
    this.arrPlants.push(plant);
    this.save();
}

/* delete a plant */
DB.prototype.deletePlant = function () {
    var idPlant = document.getElementById("dropdownPlantListJournal").value.split("_")[1];
    this.arrPlants[idPlant].deleted = true;
    this.save();
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
