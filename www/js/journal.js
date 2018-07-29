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

var db = new DB();

function main() {
    setStyle();
    refreshPlantListDropdown(document.getElementById("dropdownPlantListJournal"));

    /* check session storage for the selected plant and they show its log */
    if( sessionStorage.getItem("SelectedPlant") != null ) {
        var arr = document.getElementById("dropdownPlantListJournal").options;
        var i=0;
        for(; i<arr.length; i++)
            if(arr[i].value == sessionStorage.getItem("SelectedPlant"))
                break;
        document.getElementById("dropdownPlantListJournal").selectedIndex = i;
    }
    showLog();

    /* exit the app on back button */
    document.addEventListener("backbutton", function(event) {
        navigator.app.exitApp();
    });
}

function hideMenuJournal() {
    document.getElementById("menuJournal").style.display = "none";
    document.getElementById("overlayMenuJournal").style.display = "none";
    resetSelectionJournal();
    window.removeEventListener( "keydown", oncancelMenuJournal );
}

function hideModalAddLog() {
    document.getElementById('modalAddEditLog').style.display='none';
    window.removeEventListener( "keydown", oncancelModalAddLog );
    window.removeEventListener( "click", oncancelModalAddLog );
}

function hideModalAddPlant() {
    document.getElementById('modalAddEditPlant').style.display='none';
    window.removeEventListener( "keydown", oncancelModalAddPlant );
    window.removeEventListener( "click", oncancelModalAddPlant );
}

function hideSidebar() {
	document.getElementById("divSidebar").style.display = "none";
	document.getElementById("overlaySidebar").style.display = "none";
}

function oncancelMenuJournal(event) {
    if(event.code == "Escape") {
        hideMenuJournal();
    }
}

function oncancelModalAddLog(event) {
    if(event.code == "Escape" || (event.type == "click" && event.target == document.getElementById('modalAddEditLog'))) {
        hideModalAddLog();
    }
}

function oncancelModalAddPlant(event) {
    if(event.code == "Escape" || (event.type == "click" && event.target == document.getElementById('modalAddEditPlant'))) {
        hideModalAddPlant();
    }
}

function onchangePlantList() {
    showLog();
    
    /* save new selection to session data */
    sessionStorage.setItem( "SelectedPlant", document.getElementById("dropdownPlantListJournal").value );
}

function onclickAddLog() {
    /* change labels */
    document.getElementById('labelAddEditLog').innerText = "Add Log";
    document.getElementById('submitAddEditLog').value = "Add";
    
    /* display the modal */
    document.getElementById("modalAddEditLog").style.display = "block";
    
    /* populate the plant list dropdown */
    refreshPlantListDropdown(document.getElementById("dropdownPlantListAddLog"));
    document.getElementById("dropdownPlantListAddLog").value = document.getElementById("dropdownPlantListJournal").value;
    
    /* fill the date */
    document.getElementById("dateAddLog").value = moment().format("YYYY-MM-DD");
    
    /* handle escape key and outside click */
    window.addEventListener( "keydown", oncancelModalAddLog );
    window.addEventListener( "click", oncancelModalAddLog );    
}

function onclickAddPlant() {
    var idPlant = document.getElementById("dropdownPlantListJournal").value.split("_")[1];
    
    /* fill different labels */
    document.getElementById('labelAddPlant').innerText = "Add a new plant";
    document.getElementById('submitAddPlant').value = "Add";

    /* show the modal */
    document.getElementById('modalAddEditPlant').style.display = 'block';
    
    /* handle escape key and outside click */
    window.addEventListener( "keydown", oncancelModalAddPlant );
    window.addEventListener( "click", oncancelModalAddPlant );
}

function onclickDeleteLog() {
}

function onclickEditLog() {
    /* determining the id of the plant and selected log */
    var idPlant = document.getElementById("dropdownPlantListJournal").value.split("_")[1];
    var idLog;
    var rows = document.getElementById("tableJournal").rows;
    for(var i=0; i<rows.length; i++) {
        if(rows[i].classList.contains(COLOR_SELECTION))
            idLog = rows[i].getAttribute("id").split("_")[1];
    }
    
    /* change labels */
    document.getElementById('labelAddEditLog').innerText = "Edit Log";
    document.getElementById('submitAddEditLog').value = "Update";
    
    /* pre-fill values */
    refreshPlantListDropdown(document.getElementById("dropdownPlantListAddLog"));
    document.getElementById("dropdownPlantListAddLog").value = document.getElementById("dropdownPlantListJournal").value;
    document.getElementById("dateAddLog").value = moment(db.arrPlants[idPlant].arrLogs[idLog].date).format("YYYY-MM-DD");
    document.getElementById("textEvent").value = db.arrPlants[idPlant].arrLogs[idLog].event;

    /* show the modal */
    document.getElementById("modalAddEditLog").style.display = "block";
    
    /* hide the menu */
    hideMenuJournal();
    
    /* handle escape key and outside click */
    window.addEventListener( "keydown", oncancelModalAddPlant );
    window.addEventListener( "click", oncancelModalAddPlant );    
}

function onclickEditPlant() {
    var idPlant = document.getElementById("dropdownPlantListJournal").value.split("_")[1];
    
    /* fill different labels */
    document.getElementById('labelAddPlant').innerText = "Edit plant: " + db.arrPlants[idPlant].name;
    document.getElementById('submitAddPlant').value = "Update";
    
    /* pre-fill existing values */
    document.getElementById("textPlantName").value = db.arrPlants[idPlant].name;
    
    /* show the modal */
    document.getElementById('modalAddEditPlant').style.display='block';
}

function onclickDeletePlant() {
    var idPlant = document.getElementById("dropdownPlantListJournal").value.split("_")[1];
    if( window.confirm("Are you sure to delete " + db.arrPlants[idPlant].name + "?") ) {
        db.deletePlant();
        sessionStorage.removeItem("SelectedPlant");
        refreshPlantListDropdown(document.getElementById("dropdownPlantListJournal"));    
        showLog();
    }
}

function oncontextmenuTableJournal(event) {
    event.preventDefault();
    selectRow(event.clientY);
    showMenuJournal(event.clientX, event.clientY);
}

function onsubmitAddEditPlant() {
    if( document.getElementById("submitAddPlant").value == "Add" )
        db.addPlant();
    else
        db.editPlant();
}

function onsubmitAddEditLog() {
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
        if(!db.arrPlants[i].deleted) {
            var option = document.createElement("option");
            option.text = db.arrPlants[i].name;
            option.setAttribute( "id", "id_" + db.arrPlants[i].id.toString() );
            option.value = "id_" + db.arrPlants[i].id.toString();
            dropdown.add(option, i);
        }
    }
}

function resetSelectionJournal() {
    var table = document.getElementById("tableJournal");
    for(var r=1; r<table.rows.length; r++) { // r=1 for header row
        if( table.rows[r].classList.contains(COLOR_SELECTION) )
            table.rows[r].classList.remove(COLOR_SELECTION);
    }    
}

function selectRow(mouseY) {
    var table = document.getElementById("tableJournal");
    var start = table.rows[1].getBoundingClientRect().top;
    var end = table.rows[table.rows.length - 1].getBoundingClientRect().bottom;
    var height = table.rows[1].getBoundingClientRect().bottom - start;
    
    /* determine the row */
    if(mouseY < start) return; // check if the header bar is clicked
    var row = Math.floor((mouseY-start)/height);
    
    /* select the current row */
    resetSelectionJournal();
    table.rows[row+1].classList.add(COLOR_SELECTION); // +1 for header row
}

function setStyle() {
    /* set the app name and version */
    document.title = APP_NAME;
    document.getElementById("title").innerText = APP_NAME;    
    
    /* move all contents below header bar */
    document.getElementById("divJournal").style.top = document.getElementById("divHeader").clientHeight + "px";
    
    /* floating (+) button */
    document.getElementById("buttonAddLog").style.position = "fixed";
    document.getElementById("buttonAddLog").style.bottom = SIZE_W3_PADDING + "px";
    document.getElementById("buttonAddLog").style.right = SIZE_W3_PADDING + "px";
    
    /* setting size of different elements */
    document.getElementById("divSidebar").style.width = WIDTH_SIDEBAR + "px";
    document.getElementById("imgUserSidebar").style.height = SIZE_THUMBNAIL_SMALL + "px";
    document.getElementById("imgUserSidebar").style.width = SIZE_THUMBNAIL_SMALL + "px";
    for(var i=0; i<document.getElementsByClassName("toolbarPlant").length; i++) document.getElementsByClassName("toolbarPlant")[i].style.width = SIZE_ICON + "px";
    for(var i=0; i<document.getElementsByClassName("w3-modal-content").length; i++) document.getElementsByClassName("w3-modal-content")[i].style.maxWidth = WIDTH_MODAL + "px";
    document.getElementById("divPhotoAddPlant").style.width = SIZE_THUMBNAIL_MED + "px";
    document.getElementById("divPhotoAddPlant").style.height = SIZE_THUMBNAIL_MED + "px";
    document.getElementById("imgAddPlant").style.maxWidth = SIZE_THUMBNAIL_MED + "px";
    document.getElementById("imgAddPlant").style.maxHeight = SIZE_THUMBNAIL_MED + "px";
    document.getElementById("divPhotoAddLog").style.width = SIZE_THUMBNAIL_MED + "px";
    document.getElementById("divPhotoAddLog").style.height = SIZE_THUMBNAIL_MED + "px";
    document.getElementById("imgAddLog").style.maxWidth = SIZE_THUMBNAIL_MED + "px";
    document.getElementById("imgAddLog").style.maxHeight = SIZE_THUMBNAIL_MED + "px";
    
    /* setting z-index */
    document.getElementById("divHeader").style.zIndex = Z_INDEX_MED;
    document.getElementById("divSidebar").style.zIndex = Z_INDEX_TOP;
    document.getElementById("buttonAddLog").style.zIndex = Z_INDEX_MED;
    document.getElementById("menuJournal").style.zIndex = Z_INDEX_TOP;
    document.getElementById("overlayMenuJournal").style.zIndex = Z_INDEX_MED;
    
    /* setting color */
    document.getElementById("menuJournal").classList.add(COLOR_MENU);
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
    var idPlant = document.getElementById("dropdownPlantListJournal").value.split("_")[1];
    for(var i=0; i<db.arrPlants[idPlant].arrLogs.length; i++) {
        row = table.insertRow(i+1);
        cellDate = row.insertCell(0);
        cellEvent = row.insertCell(1);
        cellPhoto = row.insertCell(2);
        
        /* set the id */
        row.setAttribute( "id", "id_" + db.arrPlants[idPlant].arrLogs[i].id );
        
        cellDate.style.lineHeight = SIZE_THUMBNAIL_SMALL + "px";
        cellDate.innerText = moment( db.arrPlants[idPlant].arrLogs[i].date ).format( "Do MMM YYYY" );
        
        cellEvent.style.lineHeight = SIZE_THUMBNAIL_SMALL + "px";
        cellEvent.innerText = db.arrPlants[idPlant].arrLogs[i].event;
        
        cellPhoto.innerHTML = '<img src="img/dummyplant.png" width="' + SIZE_THUMBNAIL_SMALL + 'px" height="' + SIZE_THUMBNAIL_SMALL + 'px">';
    }
}

function showMenuJournal(mouseX, mouseY) {
    document.getElementById("menuJournal").style.left = mouseX + "px";
    document.getElementById("menuJournal").style.top = mouseY + "px";
    document.getElementById("menuJournal").style.display = "block";
    document.getElementById("overlayMenuJournal").style.display = "block";
    
    /* handle escape key */
    window.addEventListener( "keydown", oncancelMenuJournal );
}

function showSidebar() {
	document.getElementById("divSidebar").style.display = "block";
	document.getElementById("overlaySidebar").style.display = "block";
}

