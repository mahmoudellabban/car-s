document.addEventListener("DOMContentLoaded", function () {
  const carBrandSelect = document.getElementById("carBrand");
  const carModelSelect = document.getElementById("carModel");
  const carYearSelect = document.getElementById("carYear");
  const form1 = document.getElementById("form1");
  const form2 = document.getElementById("form2");
  const form3 = document.getElementById("form3");
  const form4 = document.getElementById("form4");
  const nextBtn1 = document.getElementById("nextBtn1");
  const backBtn2 = document.getElementById("backBtn2");
  const nextBtn2 = document.getElementById("nextBtn2");
  const backBtn3 = document.getElementById("backBtn3");
  const nextBtn3 = document.getElementById("nextBtn3");
  const backBtn4 = document.getElementById("backBtn4");
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
    years: [2020, 2021, 2022],
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
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].hasAttribute("required") && !inputs[i].value.trim()) {
        return false;
      }
    }
    return true;
  }

  // Add event listeners for next buttons
  nextBtn1.addEventListener("click", function () {
    if (isFormValid(form1)) {
      form1.style.display = "none";
      form2.style.display = "block";
    } else {
      alert("Please fill in all required fields.");
    }
  });

  nextBtn2.addEventListener("click", function () {
    if (isFormValid(form2)) {
      form2.style.display = "none";
      form3.style.display = "block";
    } else {
      alert("Please fill in all required fields.");
    }
  });

  nextBtn3.addEventListener("click", function () {
    if (isFormValid(form3)) {
      form3.style.display = "none";
      form4.style.display = "block";
    } else {
      alert("Please fill in all required fields.");
    }
  });

  // Add event listeners for back buttons
  backBtn2.addEventListener("click", function () {
    form2.style.display = "none";
    form1.style.display = "block";
  });

  backBtn3.addEventListener("click", function () {
    form3.style.display = "none";
    form2.style.display = "block";
  });

  backBtn4.addEventListener("click", function () {
    form4.style.display = "none";
    form3.style.display = "block";
  });

  // Add event listener for form 4 submission
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (isFormValid(form4)) {
      alert("Form submitted successfully!");
      // Display reset button with user details
      displayResetButton();
    } else {
      alert("Please fill in all required fields.");
    }
  });
  // Function to display user-selected details
function displayUserDetails() {
  const userDetailsContainer = document.getElementById('userDetails');
  userDetailsContainer.innerHTML = `
    <h2>User Details</h2>
    <p><strong>Car Brand:</strong> ${carBrandSelect.value}</p>
    <p><strong>Car Model:</strong> ${carModelSelect.value}</p>
    <p><strong>Car Year:</strong> ${carYearSelect.value}</p>
    p><strong>Name:</strong> ${document.getElementById('name').name}</p>
    <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
  `;
}

// Add event listener for form 4 submission
submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (isFormValid(form4)) {
    // Display user details
    displayUserDetails();
    // Hide form
    form4.style.display = 'none';
    // Show user details page
    const userDetailsPage = document.getElementById('userDetailsPage');
    userDetailsPage.style.display = 'block';
  } else {
    alert('Please fill in all required fields.');
  }
});
});
/* 
<h2>Confirmation Page</h2>
    <p><strong>Car Brand:</strong> ${carBrandSelect.value}</p>
    <p><strong>Car Model:</strong> ${carModelSelect.value}</p>
    <p><strong>Car Year:</strong> ${carYearSelect.value}</p>
    <p><strong>Name:</strong> ${document.getElementById("name").value}</p>
    <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
    <p><strong>Phone No:</strong> ${document.getElementById("phone").value}</p>
    <p><strong>Country:</strong> ${document.getElementById("country").value}</p>
    <p><strong>Town:</strong> ${document.getElementById("Town").value}</p>
    <p><strong>Postal Code:</strong> ${
      document.getElementById("postalCode").value
    }</p>
    <p><strong>Spare Part Name:</strong> ${
      document.getElementById("sparePartName").value
    }</p>
    <p><strong>No of spare parts:</strong> ${
      document.getElementById("numberOfParts").value
    }</p>
    <p><strong>Serial No:</strong> ${
      document.getElementById("serialNumber").value
    }</p>
    <p><strong>Car Number:</strong> ${
      document.getElementById("carNumber").value
    }</p>
    <p><strong>Spare Part Describtion:</strong> ${
      document.getElementById("partDescription").value
    }</p>
*/