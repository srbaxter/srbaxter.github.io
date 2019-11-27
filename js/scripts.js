// Dynamically load current year in the footer
var d = new Date(),
    yr = d.getFullYear();

document.getElementById('yrdisplay').innerText = yr;