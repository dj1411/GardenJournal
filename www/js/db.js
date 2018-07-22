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
    alert(document.getElementById("dateAddLog").value);
    this.date = moment(document.getElementById("dateAddLog").value, "YYYY-MM-DD"); // todo bug?? date is reflecting one day before
    this.event = document.getElementById("textEvent").value;
}

function DB() {
    this.arrPlants = new Array();
    this.load();
}

/* add log for a plant */
DB.prototype.addLog = function () {
    var idPlant = parseInt(document.getElementById("selectPlantListAddLog").value.split("_")[1]);
    var plant = this.arrPlants[idPlant];
    var log = new Log(plant.arrLogs.length);
    plant.arrLogs.push(log);
    this.save();
}

/* add a plant */
DB.prototype.addPlant = function () {
    var id = this.arrPlants.length;
    var plant = new Plant(id);
    this.arrPlants.push(plant);
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
