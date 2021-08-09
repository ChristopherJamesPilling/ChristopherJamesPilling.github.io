// Range Control
const inputElements = document.querySelectorAll('[type="range"]');

const handleInput = (inputElement) => {
    let isChanging = false;

    const setCSSProperty = () => {
        let percent =
            ((inputElement.value - inputElement.min) /
                (inputElement.max - inputElement.min)) *
            100;
        if (inputElement.value < 3) {
            percent = percent + 1;
        } else if (inputElement.value > 7) {
            percent = percent - 1;
        }

        inputElement.style.setProperty("--webkitProgressPercent", `${percent}%`);
    }

    // Set event listeners
    const handleMove = () => {
        if (!isChanging) return;
        setCSSProperty();
    };
    const handleUpAndLeave = () => isChanging = false;
    const handleDown = () => isChanging = true;

    // Desktop
    inputElement.addEventListener("mousemove", handleMove);
    inputElement.addEventListener("mousedown", handleDown);
    inputElement.addEventListener("mouseup", handleUpAndLeave);
    inputElement.addEventListener("mouseleave", handleUpAndLeave);
    inputElement.addEventListener("click", setCSSProperty);

    // Mobile
    inputElement.addEventListener("touchmove", handleMove, { passive: true });
    inputElement.addEventListener("touchstart", handleDown, { passive: true });
    inputElement.addEventListener("touchend", handleUpAndLeave, { passive: true });

    // Init input
    setCSSProperty();
}


// Selection Control
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
zZ = document.getElementById("industryContainer");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
        zZ.className = "custom-select";
    });
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

inputElements.forEach(handleInput)

// Color scheme for compass
const compassColorScheme = [
    'rgb(53, 71, 137)',
    'rgb(54, 167, 233)',
    'rgb(141, 196, 239)',
    'rgb(180, 215, 245)',
    'rgb(192, 192, 192)',
    'rgb(170, 170, 170)',
    'rgb(124, 124, 124)',
    'rgb(69, 69, 69)'
];

let resultData = [];

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("steps").style.display = "none";
        document.getElementById("nextBtn").innerHTML = "Start";
    } else if (n == (x.length - 2)) {
        document.getElementById("nextBtn").innerHTML = "View Results";
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("steps").style.display = "none";

        let sliders = document.getElementsByClassName("slider");
        let industryOption = document.getElementById("industryOption").value;

        // Inputs
        for (let i = 0; i < sliders.length; i++) {
            let rstvalue = sliders[i].value
            resultData.push(Number(rstvalue));
        }

        // Generate compass/chart
        new Chart("compass", {
            type: 'radar',
            data: {
                labels: [
                    'Product portfolio',
                    'Customer orientation',
                    'Financial viability',
                    'Go-to-market channels',
                    'Logistics systems',
                    'Manufacturing network',
                    'Supplier landscape',
                    'Advanced planning'
                ],
                datasets: [{
                    label: 'Your assessment',
                    data: resultData,
                    fill: true,
                    backgroundColor: 'rgba(120, 35, 220, 0.2)',
                    borderWidth: 0,
                    pointRadius: 9,
                    pointBackgroundColor: 'rgba(120, 35, 220, 0.6)'
                }, {
                    label: 'Industry leaders',
                    data: benchmark["Leader"][industryOption],
                    fill: true,
                    backgroundColor: 'rgba(192, 192, 192, 0.4)',
                    borderWidth: 0,
                    pointRadius: 9,
                    pointBackgroundColor: 'rgba(192, 192, 192)'
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                interaction: {
                    intersect: true,
                    mode: 'index',
                },
                scales: {
                    r: {
                        grid: {
                            display: false
                        },
                        pointLabels: {
                            display: false
                        },
                        ticks: {
                            display: false
                        },
                        angleLines: {
                            color: '#ccc'
                        },
                        startAngle: 22.5,
                        min: 0,
                        max: 14
                    }
                },
                elements: {
                    line: {
                        borderWidth: 3
                    }
                }
            }
        });

    } else if (n == (x.length - 1)) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("prevBtn").style.display = "none";

    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
        document.getElementById("prevBtn").style.display = "inline";
        document.getElementById("steps").style.display = "block";
        fixStepIndicator(n)
    }

}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        document.getElementById("resiliencecompass");
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, z, i, valid = true;
    x = document.getElementsByClassName("tab");

    if (currentTab == 1) {
        y = document.getElementById("industryOption");
        if (y.value == "") {
            // add an "invalid" class to the field:
            z = document.getElementById("industryContainer");
            z.className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}

const benchmark = {
    "Leader": {
        "Aerospace & Defense": [8.6, 9, 9, 9.2, 9.4, 8.4, 8.8, 9],
        "Automobiles & Parts": [8.33, 8.67, 9, 7.67, 9, 8, 8, 7.67],
        "Chemicals & Industrial": [8.5, 8.5, 9, 8.5, 9, 8.5, 8.5, 9],
        "Communications, Media & Technology": [8.5, 8, 8.17, 8.33, 8.83, 8.5, 8.83, 8.17],
        "Consumer, Retail & Food": [8.53, 8.37, 8.37, 8.42, 8.37, 8.63, 8.26, 8.79],
        "Health": [0, 0, 0, 0, 0, 0, 0, 0],
        "Transportation & Travel": [9, 8, 7.67, 8.33, 8.67, 8.33, 8.67, 7.67],
        "Utilities, Oil & Gas": [8.67, 9.33, 8.67, 9, 9.67, 9, 9.33, 7.67],
        "Other": [7, 9, 9, 8, 8, 9, 7, 8]
    },
    "Laggard": {
        "Aerospace & Defense": [4.33, 6, 6, 6, 5.67, 6, 5.67, 5.67],
        "Automobiles & Parts": [5.67, 5.47, 6, 5.13, 5.33, 5.53, 5.27, 5.93],
        "Chemicals & Industrial": [5.78, 5.95, 5.61, 5.73, 4.92, 5.61, 4.97, 5.23],
        "Communications, Media & Technology": [4.88, 5.84, 4.82, 6.01, 5.86, 5.93, 5.83, 5.36],
        "Consumer, Retail & Food": [5.64, 5.64, 5.49, 5.57, 5.52, 5.07, 5.63, 5.22],
        "Health": [4.51, 4.17, 5.15, 5.59, 5.58, 4.92, 4.8, 4.97],
        "Transportation & Travel": [5.5, 5.75, 5.38, 5.5, 5.38, 5.63, 5.63, 5.63],
        "Utilities, Oil & Gas": [7.25, 4.75, 5.75, 5.75, 6.75, 6.5, 5.5, 5.75],
        "Other": [4.33, 4.67, 6, 4.33, 6.33, 6.33, 3.67, 6.67]
    }
}
