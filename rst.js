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
    inputElement.addEventListener("touchmove", handleMove);
    inputElement.addEventListener("touchstart", handleDown);
    inputElement.addEventListener("touchend", handleUpAndLeave);
    // Init input
    setCSSProperty();
}


// Selection Control
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
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
let baselineData = [2, 2, 2, 2, 2, 2, 2, 2];
let resiliencecategory = "Mainstream";
let resiliencefailure = "";

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
        document.getElementById("nextBtn").innerHTML = "View Result";
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("steps").style.display = "none";

        var sliders = document.getElementsByClassName("slider");

        let tempcat = 0;
        let tempcat2 = 0;

        // Category
        for (let i = 0; i < sliders.length; i++) {
            let rstvalue = sliders[i].value
            resultData.push(Number(rstvalue));
            tempcat += rstvalue;
            if (rstvalue < 6) {
                resiliencecategory = "Laggard";
            }
            if (rstvalue < 7) {
                tempcat2 = 1;
            }
        }

        if ((tempcat / 8) >= 8 && tempcat2 == 0) {
            resiliencecategory = "Leader";
        }


        // Generate compass/chart
        new Chart("compass", {
            type: 'radar',
            data: {
                labels: [0, 1, 2, 3, 4, 5, 6, 7],
                datasets: [{
                    label: 'input',
                    data: resultData,
                    fill: true,
                    backgroundColor: 'rgba(120, 35, 220, 0.2)',
                    borderWidth: 0,
                    pointRadius: 9,
                    pointBackgroundColor: compassColorScheme,
                }, {
                    label: 'baseline',
                    data: baselineData,
                    fill: true,
                    backgroundColor: 'rgba(120, 35, 220, 0.2)',
                    borderWidth: 0,
                    pointRadius: 9,
                    pointBackgroundColor: 'rgba(120, 35, 220, 0.5)',
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
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
                        max: 13
                    }
                },
                elements: {
                    line: {
                        borderWidth: 3
                    }
                }
            }
        });

        // Archetype
        const archetype = ['Adapter', 'Provider', 'Provider', 'Enhancer', 'Collaborator', 'Planner']

        // Adapter = 0
        // Provider = 3 / 4
        // Enahncer = 5
        // Collaborator = 6
        // Planner = 7

        function sortWithIndices(toSort) {
            toSort.splice(1, 2)
                // Sort low to high
            for (var i = 0; i < toSort.length; i++) {
                toSort[i] = [toSort[i], i];
            }
            toSort.sort(function(left, right) {
                return left[0] < right[0] ? -1 : 1;
            });
            // Extract index of each sorted number
            toSort.sortIndices = [];
            for (var j = 0; j < toSort.length; j++) {
                toSort.sortIndices.push(toSort[j][1]);
                toSort[j] = toSort[j][0];
            }
            // Group by number but return index.
            grouped = toSort.reduce((r, v, i, a) => {
                if (v === a[i - 1]) {
                    r[r.length - 1].push(toSort.sortIndices[i]);
                } else {
                    r.push(v === a[i + 1] ? [toSort.sortIndices[i]] : [toSort.sortIndices[i]]);
                }
                return r;
            }, []);

            return grouped;
        }

        let sortResultData = [...resultData]

        let sortGroup = sortWithIndices(sortResultData)

        function archetypeType(resiliencecategory, sortedGroup) {
            console.log(sortedGroup)
            if (resiliencecategory == "Leader") {
                sortedGroup.reverse;
            }

            if (sortedGroup[0].length == 1) {
                // 1 option:
                resiliencefailure = archetype[sortedGroup[0][0]]
            } else if (sortedGroup[0].length == 2) {
                // 2 options:
                resiliencefailure = archetype[sortedGroup[0][0]] + "/" + archetype[sortedGroup[0][1]]
            } else if (sortedGroup[0].length >= 3) {
                // Greater than 3 options:
                resiliencefailure = "Too many"
            }
        }

        archetypeType(resiliencecategory, sortGroup)

        document.getElementById("resiliencecategory").innerHTML = resiliencecategory;
        document.getElementById("resiliencefailure").innerHTML = resiliencefailure;
        document.getElementById("resultdata").innerHTML = resultData;

    } else if (n == (x.length - 1)) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("prevBtn").style.display = "none";

    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
        document.getElementById("prevBtn").style.display = "inline";
        document.getElementById("steps").style.display = "block";
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
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
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
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