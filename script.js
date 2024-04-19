document.addEventListener('DOMContentLoaded', function() {
    const carBrandSelect = document.getElementById('carBrand');
    const carModelSelect = document.getElementById('carModel');
    const carYearSelect = document.getElementById('carYear');
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    const form3 = document.getElementById('form3');
    const form4 = document.getElementById('form4');
    const nextBtn1 = document.getElementById('nextBtn1');
    const backBtn2 = document.getElementById('backBtn2');
    const nextBtn2 = document.getElementById('nextBtn2');
    const backBtn3 = document.getElementById('backBtn3');
    const nextBtn3 = document.getElementById('nextBtn3');
    const backBtn4 = document.getElementById('backBtn4');
    const submitBtn = document.getElementById('submitBtn');
  
    // Dummy data for car brands, models, and years
const carData = {
  brands: ['Toyota', 'Honda', 'Ford'],
  models: {
    Toyota: ['Corolla', 'Camry', 'RAV4'],
    Honda: ['Civic', 'Accord', 'CR-V'],
    Ford: ['Focus', 'Fusion', 'Escape']
  },
  years: [2020, 2021, 2022],
  photos: {
    Toyota: {
      Corolla: 'corolla.jpg',
      Camry: 'camry.jpg',
      RAV4: 'rav4.jpg'
    },
    Honda: {
      Civic: 'civic.jpg',
      Accord: 'accord.jpg',
      'CR-V': 'crv.jpg'
    },
    Ford: {
      Focus: 'focus.jpg',
      Fusion: 'fusion.jpg',
      Escape: 'escape.jpg'
    }
  }
};
  
    // Populate car brand options
    carData.brands.forEach(brand => {
      const option = document.createElement('option');
      option.text = brand;
      carBrandSelect.add(option);
    });
  
    // Update car models based on selected brand
    carBrandSelect.addEventListener('change', function() {
      const selectedBrand = this.value;
      const models = carData.models[selectedBrand];
      carModelSelect.innerHTML = '<option value="">Select Car Model</option>';
      models.forEach(model => {
        const option = document.createElement('option');
        option.text = model;
        carModelSelect.add(option);
      });
      carModelSelect.disabled = false;


    });

  
    carModelSelect.addEventListener('change', function() {
      const selectedModel = this.value;
      const selectedBrand = carBrandSelect.value;
      const models = carData.models[selectedBrand];
      const years = carData.years;
    
      // Filter years based on selected model
      const filteredYears = years.filter(year => {
        // Check if the selected model is available for the selected brand
        return models.includes(selectedModel);
      });
    
      // Populate car year dropdown with filtered years
      carYearSelect.innerHTML = '<option value="">Select Car Year</option>';
      filteredYears.forEach(year => {
        const option = document.createElement('option');
        option.text = year;
        carYearSelect.add(option);
      });
      carYearSelect.disabled = false;
    });
    
    
    
  
    // Function to check if a form is valid
    function isFormValid(form) {
      const inputs = form.querySelectorAll('input, select, textarea');
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].hasAttribute('required') && !inputs[i].value.trim()) {
          return false;
        }
      }
      return true;
    }
  
    // Add event listeners for next buttons
    nextBtn1.addEventListener('click', function() {
      if (isFormValid(form1)) {
        form1.style.display = 'none';
        form2.style.display = 'block';
      } else {
        alert('Please fill in all required fields.');
      }
    });
  
    nextBtn2.addEventListener('click', function() {
      if (isFormValid(form2)) {
        form2.style.display = 'none';
        form3.style.display = 'block';
      } else {
        alert('Please fill in all required fields.');
      }
    });
  
    nextBtn3.addEventListener('click', function() {
      if (isFormValid(form3)) {
        form3.style.display = 'none';
        form4.style.display = 'block';
      } else {
        alert('Please fill in all required fields.');
      }
    });
  
    // Add event listeners for back buttons
    backBtn2.addEventListener('click', function() {
      form2.style.display = 'none';
      form1.style.display = 'block';
    });
  
    backBtn3.addEventListener('click', function() {
      form3.style.display = 'none';
      form2.style.display = 'block';
    });
  
    backBtn4.addEventListener('click', function() {
      form4.style.display = 'none';
      form3.style.display = 'block';
    });
  
    // Add event listener for form 4 submission
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (isFormValid(form4)) {
        alert('Form submitted successfully!');
        // Display reset button with user details
        displayResetButton();
      } else {
        alert('Please fill in all required fields.');
      }
    });
});
