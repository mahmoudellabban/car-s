document.addEventListener("DOMContentLoaded", function () {
  const carBrandSelect = document.getElementById("carBrand");
  const carModelSelect = document.getElementById("carModel");
  const carYearSelect = document.getElementById("carYear");
  const form4 = document.getElementById("form4");
  const forms = document.querySelectorAll(".form");
  const nextButtons = document.querySelectorAll("[id^='nextBtn']");
  const backButtons = document.querySelectorAll("[id^='backBtn']");
  const submitBtn = document.getElementById("submitBtn");
  // Dummy data for car brands, models, and years
  const carData = {
    brands: ["Toyota", "Honda", "Ford", "Chevrolet", "Audi", "Kia"],
    models: {
      Toyota: ["Corolla", "Camry", "RAV4"],
      Honda: ["Civic", "Accord", "CRV"],
      Ford: ["Focus", "Fusion", "Escape"],
      Chevrolet: ["Malibu", "Silverado", "Equinox"],
      Audi: ["A3", "A4", "Q5"],
      Kia: ["Optima", "Sorento", "Sportage"],
    },
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    photos: {
      Toyota: {
        Corolla: "assets/corolla.jpeg",
        Camry: "assets/toyota-camry.avif",
        RAV4: "assets/toyota-RAV4.webp",
      },
      Honda: {
        Civic: "assets/honda-civic.webp",
        Accord: "assets/Honda-Accord.avif",
        CRV: "assets/Honda-CR-V.webp",
      },
      Ford: {
        Focus: "assets/ford-focus.jpg.avif",
        Fusion: "assets/ford-fusion.avif",
        Escape: "assets/ford-escape.webp",
      },
      Chevrolet: {
        Malibu: "assets/Chevrolet-malibu.webp",
        Silverado: "assets/Silverado-silverado.avif",
        Equinox: "assets/chevrolet-equinox.jpg",
      },
      Audi: {
        A3: "assets/audi-a3.jpg",
        A4: "assets/audi-a4.jpg",
        Q5: "assets/audi-q5.webp",
      },
      Kia: {
        Optima: "assets/kia-optima.avif",
        Sorento: "assets/Sorento-kia.jpg",
        Sportage: "assets/Sportage_ICE_512x288.png",
      },
    },
  };

  // Populate car brand options
  carData.brands.forEach((brand) => {
    const option = document.createElement("option");
    option.text = brand;
    carBrandSelect.add(option);
  });

  // Update car models based on selected brand
  carBrandSelect.addEventListener("change", function () {
    const selectedBrand = this.value;
    const models = carData.models[selectedBrand];
    carModelSelect.innerHTML = '<option value="">Select Car Model</option>';
    models.forEach((model) => {
      const option = document.createElement("option");
      option.text = model;
      carModelSelect.add(option);
    });
    carModelSelect.disabled = false;
  });

  carModelSelect.addEventListener("change", function () {
    const selectedModel = this.value;
    const selectedBrand = carBrandSelect.value;
    const models = carData.models[selectedBrand];
    const years = carData.years;

    // Get the selected car's image URL
    const photoURL = carData.photos[selectedBrand][selectedModel];

    // Display the selected car image
    const carImageContainer = document.getElementById("carImageContainer");
    carImageContainer.innerHTML = `<img src="${photoURL}" alt="${selectedModel}" />`;
    // Filter years based on selected model
    const filteredYears = years.filter((year) => {
      // Check if the selected model is available for the selected brand
      return models.includes(selectedModel);
    });

    // Populate car year dropdown with filtered years
    carYearSelect.innerHTML = '<option value="">Select Car Year</option>';
    filteredYears.forEach((year) => {
      const option = document.createElement("option");
      option.text = year;
      carYearSelect.add(option);
    });
    carYearSelect.disabled = false;
  });
  // Function to check if a form is valid
  function isFormValid(form) {
    const inputs = form.querySelectorAll("input, select, textarea");
    let isValid = true;
    inputs.forEach((input) => {
      if (input.hasAttribute("required") && !input.value.trim()) {
        isValid = false;
        showRequiredMessage(input);
      } else {
        hideRequiredMessage(input);
      }
    });
    return isValid;
  }

  // Function to show required field message
  function showRequiredMessage(field) {
    const message = field.nextElementSibling;
    if (message && message.classList.contains("required-message")) {
      message.style.display = "block";
    }
  }

  // Function to hide required field message
  function hideRequiredMessage(field) {
    const message = field.nextElementSibling;
    if (message && message.classList.contains("required-message")) {
      message.style.display = "none";
    }
  }

  // Function to handle form navigation
  function handleFormNavigation(nextBtn, currentForm, nextForm) {
    nextBtn.addEventListener("click", function () {
      if (isFormValid(currentForm)) {
        currentForm.style.display = "none";
        nextForm.style.display = "block";
      }
    });
  }

  // Handle form navigation for all next buttons
  nextButtons.forEach((nextBtn, index) => {
    handleFormNavigation(nextBtn, forms[index], forms[index + 1]);
  });

  // Handle form navigation for all back buttons
  backButtons.forEach((backBtn, index) => {
    backBtn.addEventListener("click", function () {
      forms[index + 1].style.display = "none";
      forms[index].style.display = "block";
    });
  });

  const repeaterContainer = document.getElementById("repeaterContainer");
  const addSparePartBtn = document.getElementById("addSparePartBtn");
  const removeSparePartBtn = document.getElementById("removeSparePartBtn");
  // Function to create a new spare part input group
  function createSparePartInputGroup() {
    const group = document.createElement("div");
   group.classList.add("spare-part-group");

    const numberLabel = document.createElement("label");
    numberLabel.textContent = "Number of spare parts:";
    group.appendChild(numberLabel);
    const numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.name = "sparePartNumber";
    numberInput.required = true;
    group.appendChild(numberInput);

    const serialLabel = document.createElement("label");
    serialLabel.textContent = "Part's serial number:";
    group.appendChild(serialLabel);
    const serialInput = document.createElement("input");
    serialInput.type = "text";
    serialInput.name = "serialNumber";
    serialInput.required = true;
    group.appendChild(serialInput);

    const carLabel = document.createElement("label");
    carLabel.textContent = "Car's number:";
    group.appendChild(carLabel);
    const carInput = document.createElement("input");
    carInput.type = "text";
    carInput.name = "carNumber";
    carInput.required = true;
    group.appendChild(carInput);

    const descLabel = document.createElement("label");
    descLabel.textContent = "Part's Description:";
    group.appendChild(descLabel);
    const descInput = document.createElement("textarea");
    descInput.name = "desc";
    descInput.required = true;
    group.appendChild(descInput);

    repeaterContainer.appendChild(group);
  }

  // Event listener for adding spare part
  addSparePartBtn.addEventListener("click", function () {
    createSparePartInputGroup();
  });

  // Event listener for removing spare part
  removeSparePartBtn.addEventListener("click", function () {
    const groups = repeaterContainer.querySelectorAll(".spare-part-group");
    if (groups.length > 1) {
      const lastGroup = groups[groups.length - 1];
      repeaterContainer.removeChild(lastGroup);
      addSparePartBtn.style.display = "inline-block"; // Show "Add Spare Part" button after removing a spare part
    }
  });

  // Function to display order details
  function displayUserDetails() {
    const userDetailsContainer = document.getElementById("userDetails");
    userDetailsContainer.innerHTML = `
    <h2>Order Confirmation</h2>
    <p><strong>Name:</strong> ${
      document.getElementById("englishFullName").value
    }</p>
    <p><strong>Email:</strong> ${
      document.getElementById("customerEmail").value
    }</p>
    <p><strong>Phone Number:</strong> ${
      document.getElementById("phone").value
    }</p>
    <p><strong>Car Brand:</strong> ${carBrandSelect.value}</p>
    <p><strong>Car Model:</strong> ${carModelSelect.value}</p>
    <p><strong>Car Year:</strong> ${carYearSelect.value}</p>
    <p><strong>Spare Part:</strong> ${
      document.getElementById("sparePartName").value
    }</p>
    <p><strong>Number of parts:</strong> ${
      document.getElementById("numberOfParts").value
    }</p>
    <p><strong>Serial Number:</strong> ${
      document.getElementById("serialNumber").value
    }</p>
    <p><strong>Car Number:</strong> ${
      document.getElementById("carNumber").value
    }</p>
    <p><strong>Description:</strong> ${
      document.getElementById("partDescription").value
    }</p>
    <p><strong>Country:</strong> ${document.getElementById("country").value}</p>
    <p><strong>Town:</strong> ${document.getElementById("town").value}</p>
    <p><strong>Address:</strong> ${
      document.getElementById("addressDescription").value
    }</p>
  `;

    // div to wrap the buttons
    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("btns");

    // back button and append it to the userDetailsContainer
    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.textContent = "Back";
    backBtn.id = "backBtn";
    backBtn.classList.add("back-button");
    userDetailsContainer.appendChild(backBtn);
    userDetailsContainer.appendChild(btnsDiv);

    // Handle back button click
    backBtn.addEventListener("click", function () {
      userDetailsContainer.innerHTML = ""; // Clear user details
      form4.style.display = "block"; // Show the last form
    });
    // submit button and append it to the userDetailsContainer
    const submitConfirmationBtn = document.createElement("button");
    submitConfirmationBtn.type = "button";
    submitConfirmationBtn.textContent = "Submit";
    submitConfirmationBtn.id = "submitConfirmationBtn";
    submitConfirmationBtn.classList.add("confirmation-button");
    userDetailsContainer.appendChild(submitConfirmationBtn);
    userDetailsContainer.appendChild(btnsDiv);

    // Handle submit confirmation button click
    submitConfirmationBtn.addEventListener("click", function () {
      // Clear user details
      userDetailsContainer.innerHTML = "";
      // Display the message
      const message = document.createElement("p");
      message.textContent =
        "Your order has been successfully submitted, We will contact you as soon as possible!";
      message.classList.add("success-message");
      userDetailsContainer.appendChild(message);
    });
  }

  // event listener for form submission
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (isFormValid(form4)) {
      displayUserDetails();
      form4.style.display = "none";
      const userDetailsPage = document.getElementById("userDetailsPage");
      userDetailsPage.style.display = "block";
    }
  });

  //  event listeners for dropdowns to hide the required field messages
  forms.forEach((form) => {
    const selects = form.querySelectorAll("select");
    selects.forEach((select) => {
      select.addEventListener("change", function () {
        hideRequiredMessage(select);
      });
    });
  });
});
