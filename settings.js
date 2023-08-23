const showColors = [
  "#FF7F7F",
  "#FFBF7F",
  "#FFDF7F",
  "#FFFF7F",
  "#BFFF7F",
  "#7FFF7F",
  "#7FFFFF",
  "#7FBFFF",
  "#7F7FFF",
  "#FF7FFF",
  "#BF7FBF",
  "#3B3B3B",
  "#858585",
  "#F7F7F7",
];
const settingsBtns = document.querySelectorAll(".settingsBtn");
const chooseColor = document.querySelector(".chooseColor");
const tableBody = document.querySelector("#tableBody");
const textArea = document.getElementById("labeltext");
const addRowAbove = document.getElementById("addRowAbove");
const addRowBelow = document.getElementById("addRowBelow");
const showSettingsPanel = document.getElementById("showSettingsPanel");

let selectedColor = showColors[0];
let selectedRow = null;

// Settings panel renk seçenekleri
showColors.forEach((color, index) => {
  const span = document.createElement("span");
  span.className = "color";
  span.style.backgroundColor = color;
  chooseColor.appendChild(span);

  span.addEventListener("click", () => {
    chooseColor
      .querySelectorAll(".color")
      .forEach((s) => s.classList.remove("activeColor"));
    if (selectedRow) {
      const labelDiv = selectedRow.querySelector(".label");
      labelDiv.style.backgroundColor = color;
      selectedColor = color;
      span.classList.add("activeColor");
    }
  });
});

// settings button
settingsBtns.forEach((settingsBtn) => {
  settingsBtn.addEventListener("click", () => {
    showSettingsPanel.style.display = "flex";
    const appendedField = settingsBtn.closest(".draggable");
    const row = appendedField.querySelector(".label");

    textArea.value = row.textContent;
    selectedColor = row.style.backgroundColor;
    selectedRow = appendedField;
  });
});

// textarea input
textArea.addEventListener("input", () => {
  if (selectedRow) {
    const labelDiv = selectedRow.querySelector(".label");
    labelDiv.textContent = textArea.value;
  }
});

// settings panel buttons
showSettingsPanel.addEventListener("click", (event) => {
  if (event.target.classList.contains("closePanel")) {
    showSettingsPanel.style.display = "none";
  } else if (event.target.id === "deleteBtn" && selectedRow) {
    tableBody.removeChild(selectedRow);
    showSettingsPanel.style.display = "none";
  } else if (event.target.id === "addRowAbove") {
    addRow("above");
  } else if (event.target.id === "addRowBelow") {
    addRow("below");
  }
});

// Add row function
function addRow(position) {
  const newRow = document.createElement("tr");
  newRow.className = "draggable";

  newRow.innerHTML = `
        <td>
            <div class="row">
                <div style="background-color:${selectedColor};" class="label">New</div>
            </div>
        </td>
        <td>
            <button class='settingsBtn'><i class="fa fa-gear" aria-hidden="true"></i></button>
        </td>
        <td>
            <button class='moveUpBtn'><i class="fa fa-chevron-up" aria-hidden="true"></i></button> <br>
            <button class='moveDownBtn'><i class="fa fa-chevron-down" aria-hidden="true"></i></button>
        </td>
    `;

  if (position === "above") {
    tableBody.insertBefore(newRow, selectedRow);
  } else {
    if (selectedRow.nextElementSibling) {
      tableBody.insertBefore(newRow, selectedRow.nextElementSibling);
    } else {
      tableBody.appendChild(newRow);
    }
  }

  attachRowButtons(newRow);
  newRow.querySelector(".label").style.backgroundColor = selectedColor;
  showSettingsPanel.style.display = "none";
}

// Attach buttons to new row
function attachRowButtons(row) {
  const settingsBtn = row.querySelector(".settingsBtn");

  settingsBtn.addEventListener("click", () => {
    showSettingsPanel.style.display = "flex";
    selectedRow = row;

    textArea.value = selectedRow.querySelector(".label").textContent;
    selectedColor = selectedRow.querySelector(".label").style.backgroundColor;

    textArea.addEventListener("input", () => {
      if (selectedRow) {
        selectedRow.querySelector(".label").textContent = textArea.value;
      }
    });
  });
}
