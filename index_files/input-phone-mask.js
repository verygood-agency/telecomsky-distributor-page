// Get all input fields of type "tel"
const phoneInputs = document.querySelectorAll('input[type="tel"]');

// Loop through all phone input fields and attach an event listener for input changes
phoneInputs.forEach((phoneInput) => {
  phoneInput.addEventListener('input', formatPhoneNumber);
});

function formatPhoneNumber() {
  // Get the current value of the input field
  let phoneNumber = this.value;
  
  // Remove all non-digit characters from the input
  phoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Limit the input to a maximum of 11 digits
  phoneNumber = phoneNumber.substring(0, 11);
  
  // Check if the phone number starts with +7 or 8
  if (phoneNumber.startsWith('7')) {
    phoneNumber = '+' + phoneNumber;
  } else if (phoneNumber.startsWith('8')) {
    phoneNumber = '+7' + phoneNumber.substring(1);
  } else {
    phoneNumber = '+7' + phoneNumber;
  }
  
  // Format the phone number with brackets and spaces
  if (phoneNumber.length > 1) {
    phoneNumber = phoneNumber.replace(/^(\+7|7|8)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 ($2) $3 $4 $5');
  }
  
  // Set the formatted phone number as the new value of the input field
  this.value = phoneNumber;
  
  // Show an error message if the phone number entered is less than 11 digits
  if (phoneNumber.length < 11) {
    this.setCustomValidity('Не правильно заполненное. Введите данные вида: 8 912 31 123 32 или 7 912 31 123 32');
  } else {
    this.setCustomValidity('');
  }
}