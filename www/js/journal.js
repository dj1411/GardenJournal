/*******************************************************************************
 * MIT License
 * 
 * Copyright (c) 2018 Jayanta Debnath
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *******************************************************************************/

var db;

function main() {
    setStyle();
    db = new DB();
    refreshPlantListDropdown(document.getElementById("selectPlantListJournal"));
    showLog();
}

function onchangePlantList() {
    showLog();
}

function onclickAddLog() {
    /* display the modal */
    document.getElementById("modalAddLog").style.display = "block";
    
    /* populate the plant list dropdown */
    refreshPlantListDropdown(document.getElementById("selectPlantListAddLog"));
    document.getElementById("selectPlantListAddLog").value = document.getElementById("selectPlantListJournal").value;
    
    /* fill the date */
    document.getElementById("dateAddLog").value = moment().format("YYYY-MM-DD");
}

function onsubmitAddPlant() {
    db.addPlant();
}

function onsubmitAddLog() {
    db.addLog();
}

function refreshPlantListDropdown(dropdown) {
    /* clear the dropdown */
    var len = dropdown.length;
    for (var i = 0; i < len; i++) {
        dropdown.remove(0);
    }

    /* fill with plant list */
    for (var i = 0; i < db.arrPlants.length; i++) {
        var option = document.createElement("option");
        option.text = db.arrPlants[i].name;
        option.value = "id_" + db.arrPlants[i].id.toString();
        dropdown.add(option, i);
    }
    dropdown.selectedIndex = 0;
}

function setStyle() {
    /* set the app name and version */
    document.title = APP_NAME;
    document.getElementById("title").innerText = APP_NAME;    
}

function showLog() {
    /* clear and initialize the table */
    var table = document.getElementById("tableJournal");
    table.innerHTML = "";
    var row = table.insertRow(0);
    var cellDate = row.insertCell(0);
    var cellEvent = row.insertCell(1);
    var cellPhoto = row.insertCell(2);
    cellDate.innerHTML = "<b>Date</b>";
    cellEvent.innerHTML = "<b>Event</b>";
    cellPhoto.innerHTML = "<b>Photo</b>";
    row.classList.add("w3-theme");
    
    /* add the logs */
    var idPlant = document.getElementById("selectPlantListJournal").value.split("_")[1];
    for(var i=0; i<db.arrPlants[idPlant].arrLogs.length; i++) {
        row = table.insertRow(i+1);
        cellDate = row.insertCell(0);
        cellEvent = row.insertCell(1);
        cellPhoto = row.insertCell(2);
        cellDate.innerText = moment( db.arrPlants[idPlant].arrLogs[i].date ).format( "Do MMM YYYY" );
        cellEvent.innerText = db.arrPlants[idPlant].arrLogs[i].event;
        cellPhoto.innerHTML = '<img src="img/dummyplant.png" width="50px" height="50px">';
    }
}

function sidebarShow() {
	document.getElementById("divSidebar").style.display = "block";
	document.getElementById("overlaySidebar").style.display = "block";
}

function sidebarHide() {
	document.getElementById("divSidebar").style.display = "none";
	document.getElementById("overlaySidebar").style.display = "none";
}