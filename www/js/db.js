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
    this.date = moment(document.getElementById("dateAddLog").value, "YYYY-MM-DD");
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

/* edit a log */
DB.prototype.editLog = function () {
    /* determining the id of the plant and selected log */
    var idPlant = document.getElementById("dropdownPlantListJournal").value.split("_")[1];
    var idLog;
    var rows = document.getElementById("tableJournal").rows;
    for(var i=0; i<rows.length; i++) {
        if(rows[i].classList.contains(COLOR_SELECTION))
            idLog = rows[i].getAttribute("id").split("_")[1];
    }

    var log = this.arrPlants[idPlant].arrLogs[idLog];
    log.timestamp = moment().toString();
    log.date = moment(document.getElementById("dateAddLog").value, "YYYY-MM-DD");
    log.event = document.getElementById("textEvent").value;
    this.save();
}

/* add a plant */
DB.prototype.addPlant = function () {
    var id = this.arrPlants.length;
    var plant = new Plant(id);
    console.log( plant.edit );
    this.arrPlants.push(plant);
    sessionStorage.setItem( "SelectedPlant", "id_" + id );
    this.save();
}

/* delete a plant */
DB.prototype.deletePlant = function () {
    var idPlant = document.getElementById("dropdownPlantListJournal").value.split("_")[1];
    this.arrPlants[idPlant].deleted = true;
    this.save();
}

/* edit a plant */
DB.prototype.editPlant = function () {
    var idPlant = parseInt(document.getElementById("dropdownPlantListJournal").value.split("_")[1]);
    this.arrPlants[idPlant].timestamp = moment().toString();
    this.arrPlants[idPlant].name = document.getElementById("textPlantName").value;
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
