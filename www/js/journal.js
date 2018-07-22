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
    refreshPlantListDropdown(document.getElementById("selectPlantList"));    
}

function onchangePlantList() {
    switch(document.getElementById("selectPlantList").value) {
        case "hr":
            /* nothing to do */
            break;
            
        case "all":
            break;
            
        case "add":
            document.getElementById('modalAddPlant').style.display='block';
            break;
            
        case "remove":
            break;
            
        default:
            break;
    }
}

function onclickAddLog() {
    document.getElementById("modalAddLog").style.display = "block";
}

function onsubmitAddPlant() {
    db.addPlant(document.getElementById("textPlantName").value);
}

function onsubmitAddLog() {
}

function refreshPlantListDropdown(dropdown) {
    /* clear the dropdown */
    var len = dropdown.length;
    for (var i = 0; i < len; i++)
        dropdown.remove(0);

    /* fill with plant list */
        for( var i=0; i<db.arrPlants.length; i++ ) {
            var option = document.createElement("option");
            option.text = db.arrPlants[i].name;
            option.value = db.arrPlants[i].id.toString();
            dropdown.add(option);
        }

    /* fill with default entries */
    
    var option = document.createElement("option");
    option.text = "-------";
    option.value = "hr";
    dropdown.add(option);
    
    option = document.createElement("option");
    option.text = "Show all plants";
    option.value = "all";
    dropdown.add(option);
    
    option = document.createElement("option");
    option.text = "Add new plant";
    option.value = "add";
    dropdown.add(option);
    
    option = document.createElement("option");
    option.text = "Remove a plant";
    option.value = "remove";
    dropdown.add(option);
}

function setStyle() {
    /* set the app name and version */
    document.title = APP_NAME;
    document.getElementById("title").innerText = APP_NAME;    
}

function sidebarShow() {
	document.getElementById("divSidebar").style.display = "block";
	document.getElementById("overlaySidebar").style.display = "block";
}

function sidebarHide() {
	document.getElementById("divSidebar").style.display = "none";
	document.getElementById("overlaySidebar").style.display = "none";
}