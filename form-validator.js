// Usage:
// STEP 1: 
// Add data-calidation-type for your form inputs
// Supported Validation Types
// name: minimum for 3 chars and can only contain alphabets
// phone: 10 chars of numbers (does not account for extensions)
// email: regular email
// otp: 4 digit number
// address: more than one char
// exists: more than one char
// none: 0 or more chars
// pincode: 6 digit number
// STEP 2:
// set data-validation-error if needed
// by default it will throw `Please enter a valid ${nameOfYourInput}` as error
// STEP 3: 
// initialize formValidator
// run formValidator.init() before usage
// NOTE: It uses input.nextElementSibling as error element 
// NOTE: On error it will add "has-error" class to the input el that caused the error and adds "active" class to error msg el
// STEP 4: 
// Send form element validateForm fn on form submit
// It will vaildate your inputs and return you if its vaild or not along with your input data
// Dependency - []
const formValidator = {
	init() {
		let allInputEls = document.querySelectorAll('input[data-validation-type]');
		allInputEls.forEach((inputEl) => {
			this.addValidationInput(inputEl);
		});
	},
	getValidationInputs(parentEl) {
		let inputEls = [];
		let allInputEls = parentEl.querySelectorAll('input,select');

		allInputEls.forEach((el) => {
			if (el.data && el.data.validationType) inputEls.push(el);
		});

		return inputEls;
	},
	validateForm(formEl) {
		let inputEls = this.getValidationInputs(formEl);

		let isValid = true;
		let inputData = {};

		inputEls.forEach((input) => {
			if (!this.validateInput(input, input.nextElementSibling)) isValid = false;
		});

		inputEls.forEach((input) => {
			inputData[input.name] = input.value;
		});

		if (!isValid) {
			let errorInputs = formEl.querySelectorAll('.has-error');
			let topEl = getTopMostEl(errorInputs);

			if (topEl) topEl.scrollIntoView({ behavior: 'smooth' });
		}

		return { isValid, inputData };
	},
	validateInput(el, errorEl, errorMsg = '') {
		const regexJson = {
			name: /^[A-z. ]{3,}$/g,
			phone: /^[1-9][0-9]{9}$/g,
			email: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g,
			otp: /^[0-9]{4}$/g,
			address: /^.+$/g,
			exists: /^.+$/g,
			none: /^.*$/g,
			pincode: /^[0-9]{6}$/g,
		};

		let status =
			el.dataset.required == 'false' && el.value == '' ? true : regexJson[el.data.validationType].test(el.value);

		this.showError(el, errorEl, status, errorMsg);

		return status;
	},
	showError(el, errorEl, status, errorMsg = '') {
		errorEl.classList.remove('active');
		el.classList.remove('has-error');

		if (!status) {
			errorEl.innerText = errorMsg ? errorMsg : el.data.errorText;
			void errorEl.offsetWidth;
			errorEl.classList.add('active');
			el.classList.add('has-error');
		}
	},
	clearInputs(formEl) {
		this.getValidationInputs(formEl).forEach((el) => (el.value = ''));
	},
	addValidationInput(inputEl, validationType = '', validationError = '') {
		inputEl.data = !inputEl.data && {};
		inputEl.data.validationType = validationType || inputEl.dataset.validationType;
		inputEl.data.errorText =
			validationError ||
			inputEl.dataset.validationError ||
			`Please enter a valid ${inputEl.name.toLowerCase()}!!`;
		delete inputEl.dataset.validationType;
		delete inputEl.dataset.validationError;
	},
};

export default formValidator;