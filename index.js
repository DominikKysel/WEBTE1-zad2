//Variables
const carTypeSelect = document.getElementById("vehicle-type");
const carTypeDivs = document.querySelectorAll(".vehicle-type-div");
const emptySelects = document.getElementsByClassName("model-empty");
const brandSelect = document.querySelectorAll(".brand-select");
const placeholderSelects = document.querySelectorAll(".placeholder-inputs");
const modelSelects = document.querySelectorAll(".vehicle-model-div");
const radioCustom = document.getElementById("rental-length-4");
const rentalLengthTextarea = document.getElementById("rental-length-textarea");
const radioGroup = document.querySelectorAll("#rental-radio-group input[type=radio]");
const genderGroup = document.querySelectorAll("#gender-radio-group input[type=radio]");
const genderTextarea = document.getElementById("gender-textarea");
const genderCustom = document.getElementById("gender-val4");
const form = document.getElementById("form");
const firstName = document.getElementById("name");
const lastName = document.getElementById("surname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const phonePrefix = document.getElementById("phone-prefix");
const ageInput = document.getElementById("age");
const dateOfBirth = document.getElementById("date-of-birth");
const extraServices = document.querySelectorAll(".checkbox-container input[type=checkbox]");
const extraServicesTextarea = document.getElementById("extra-service-textarea");
const extraServicesCustom = document.getElementById("additional-services-4");
let vehicleTypeValid = false;
let vehicleBrandValid = false;
let vehicleModelValid = false;
let vehicleTypeValue = "";
let vehicleBrandValue = "";
let vehicleModelValue = "";
let nameValid = false;
let surnameValid = false;
let emailValid = false;
let phoneValid = false;
let ageValid = false;
let genderValid = false;
let nameValue = "";
let surnameValue = "";
let emailValue = "";
let phoneValue = "";
let ageValue = "";
let dateOfBirthValue = "";
let radioGroupValue = "";
let rentalLengthTextareaValue = "";
let genderValue = "";
let genderTextareaValue = "";

//Functions
function isValidEmail(testEmail) {
    const emailRegex = /^[\w]{3,}([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return emailRegex.test(testEmail);
}
function calcPrice(){
    let price = 0;
    let rentalLengthCustom = false;
    const selectedValue = carTypeSelect.value;
    carTypeDivs.forEach((div) => {
        if (div.dataset.type === selectedValue) {
            price += parseInt(div.dataset.price, 10);
        }
    });
    radioGroup.forEach((radio) => {
        if(radio.checked){
            price += parseInt(radio.dataset.price, 10);
        }
        if(radio.id === "rental-length-4" && radio.checked){
            rentalLengthCustom = true;
        }
    });
    extraServices.forEach((checkbox) => {
        if(checkbox.checked){
            price += parseInt(checkbox.dataset.price, 10);
        }
        if(checkbox.id === "additional-services-4" && checkbox.checked){
            rentalLengthCustom = true;
        }
    });

    if(rentalLengthCustom){
        document.getElementById("price").value ="Cena od: " + price + "€+";
        document.getElementById("sum-price").innerHTML ="Cena od: " + price + "€+";
    } else{
        document.getElementById("price").value ="Cena: " + price + "€";
        document.getElementById("sum-price").innerHTML ="Cena: " + price + "€";
    }
}
function validateRadioGroup() {
    let radioGroupValid = false;

    radioGroup.forEach((radio) => {
        if (radio.checked && radio.value !== "" && radio.value !== "none") {
            radioGroupValid = true;
            return;
        }
    });

    if (radioCustom.checked && (rentalLengthTextarea.value.trim() === "" || rentalLengthTextarea.value.trim().length === 0)) {
        radioCustom.classList.add("error");
        radioGroupValid = false;
    } else {
        radioCustom.classList.remove("error");
    }
    if (radioGroupValid === false) {
        radioGroup.forEach((radio) => {
            let currentRadio = radio;
            currentRadio.classList.remove("correct");
            currentRadio.classList.add("error");
        });
        rentalLengthTextarea.classList.add("error");
        rentalLengthTextarea.classList.remove("correct");
        document.getElementById("rental-err-msg").style.display = "block";
    } else {
        radioGroup.forEach((radio) => {
            let currentRadio = radio;
            if (currentRadio.checked) {
                currentRadio.classList.add("correct");
            }
            currentRadio.classList.remove("error");
        });
        rentalLengthTextarea.classList.remove("error");
        rentalLengthTextarea.classList.add("correct");
        document.getElementById("rental-err-msg").style.display = "none";
    }
    return radioGroupValid;
}
function valGender(){
    let genderGroupValid = false;

    genderGroup.forEach((gender) => {
        if (gender.checked && gender.value !== "" && gender.value !== "none") {
            genderGroupValid = true;
            return;
        }
    });

    if (genderCustom.checked && (genderTextarea.value.trim() === "" || genderTextarea.value.trim().length === 0)) {
        genderCustom.classList.add("error");
        genderGroupValid = false;
    } else {
        genderCustom.classList.remove("error");
    }
    if (genderGroupValid === false) {
        genderGroup.forEach((gender) => {
            let currentGender = gender;
            currentGender.classList.remove("correct");
            currentGender.classList.add("error");
        });
        genderTextarea.classList.add("error");
        genderTextarea.classList.remove("correct");
        document.getElementById("gender-err-msg").style.display = "block";
    } else {
        genderGroup.forEach((gender) => {
            let currentGender = gender;
            if (currentGender.checked) {
                currentGender.classList.add("correct");
            }
            currentGender.classList.remove("error");
        });
        genderTextarea.classList.remove("error");
        genderTextarea.classList.add("correct");
        document.getElementById("gender-err-msg").style.display = "none";
    }
    return genderGroupValid;
}
function validateExtraServices(){
    let extraServicesValid = false;
    if(extraServicesCustom.checked && (extraServicesTextarea.value.trim() === "" || extraServicesTextarea.value.trim().length === 0)){
        extraServicesCustom.classList.add("error");
        extraServicesTextarea.classList.add("error");
        extraServicesValid = false;
    } else{
        extraServicesCustom.classList.remove("error");
        extraServicesTextarea.classList.remove("error");
        extraServicesValid = true;
    }
    return extraServicesValid;
}



//Event listeners
carTypeSelect.addEventListener("change", () => {
    let selectedValue = carTypeSelect.value;
    carTypeDivs.forEach((div) => {
        let brandDiv = div;
        if (brandDiv.dataset.type === selectedValue) {
            vehicleTypeValue = selectedValue;
            vehicleTypeValid = true;
            brandDiv.style.display = "block";
            document.querySelector(`[data-type=${selectedValue}] .brand-select`).value = "none";
            vehicleBrandValid = false;
            vehicleBrandValue = "";
        } else {
            brandDiv.style.display = "none";
        }
    });
    document.getElementById("vehicle-brand-div").style.display = "none";
    document.getElementById("vehicle-model-div").style.display = "none";
    modelSelects.forEach((select) => {
        let currentSelect = select;
        currentSelect.value = "none";
        vehicleModelValid = false;
        vehicleModelValue = "";
        currentSelect.style.display = "none";
    });
    for (let i = 0; i < emptySelects.length; i+=1) {
        emptySelects[i].style.display = "block";
    }
    placeholderSelects.forEach((select) => {
        select.classList.remove("error");
    });
    document.getElementById("vehicle-err-msg").style.display = "none";
    carTypeSelect.classList.remove("error");
    calcPrice();
});

brandSelect.forEach((select) => {
    select.addEventListener("change", () => {
        select.classList.remove("error");
        let currentBrand = select;
        let selectedValue = currentBrand.value;
        modelSelects.forEach((modelSelect) => {
            let currentModelSelect = modelSelect;
            if (currentModelSelect.dataset.brand === selectedValue) {
                currentModelSelect.style.display = "block";
                vehicleBrandValue = selectedValue;
                vehicleBrandValid = true;
            } else {
                currentModelSelect.style.display = "none";
            }
        });
        for (let i = 0; i < emptySelects.length; i+=1) {
            emptySelects[i].style.display = "none";
        }
    });
});

modelSelects.forEach((select) => {
    select.addEventListener("change", () => {
        let currentSelect = select;
        currentSelect.classList.remove("error");
        if(currentSelect.value === "" || currentSelect.value === "none"){
            vehicleModelValid = false;
            vehicleModelValue = "";
        }
        else{
            vehicleModelValue = currentSelect.value;
            vehicleModelValid = true;      
        }
    });
});


radioGroup.forEach((radio) => {
    let currentRadio = radio;
    currentRadio.addEventListener("change", () => {
        radioGroupValue = currentRadio.value;            
        if (radioCustom.checked) {
            rentalLengthTextarea.style.display = "block";
            document.getElementById("rental-length-textarea-counter").style.display = "block";
        } else {
            rentalLengthTextarea.style.display = "none";
            document.getElementById("rental-length-textarea-counter").style.display = "none";
        }
        radioGroup.forEach((curr) => {
            let currRad = curr;
            currRad.classList.remove("error");
            document.getElementById("rental-err-msg").style.display = "none";
        });
        calcPrice();
    });
});

genderGroup.forEach((gender) => {
    let currentGender = gender;
    currentGender.addEventListener("change", () => {
        genderValue = currentGender.value;            
        if (genderCustom.checked) {
            genderTextarea.style.display = "block";
            document.getElementById("gender-textarea-counter").style.display = "block";
        } else {
            genderTextarea.style.display = "none";
            document.getElementById("gender-textarea-counter").style.display = "none";
        }
        genderGroup.forEach((curr) => {
            let currGender = curr;
            currGender.classList.remove("error");
            document.getElementById("gender-err-msg").style.display = "none";
        });
    });
});

genderTextarea.addEventListener("keyup", () => {
    genderTextareaValue = genderTextarea.value;
    if(genderTextareaValue.length === 0){
        genderTextarea.classList.remove("correct");
        genderTextarea.classList.add("error");
    }
    else {
        genderTextarea.classList.remove("error");
        genderTextarea.classList.add("correct");
    }
    document.getElementById("gender-textarea-counter").innerHTML = genderTextarea.value.length + "/15";
});

firstName.addEventListener("keyup", () => {
    if (firstName.value.trim() === "") {
        firstName.classList.add("error");
        firstName.classList.remove("correct");
        document.getElementById("name-err-msg").style.display = "block";
        nameValid = false;
    } else {
        nameValue = firstName.value;
        firstName.classList.remove("error");
        firstName.classList.add("correct");
        document.getElementById("name-err-msg").style.display = "none";
        nameValid = true;
    }
    document.getElementById("name-counter").innerHTML = firstName.value.length + "/30";
});

lastName.addEventListener("keyup", () => {
    if (lastName.value.trim() === "") {
        lastName.classList.add("error");
        lastName.classList.remove("correct");
        document.getElementById("surname-err-msg").style.display = "block";
        surnameValid = false;
    } else {
        surnameValue = lastName.value;
        lastName.classList.remove("error");
        lastName.classList.add("correct");
        document.getElementById("surname-err-msg").style.display = "none";
        surnameValid = true;
    }
    document.getElementById("surname-counter").innerHTML = lastName.value.length + "/30";
});

email.addEventListener("keyup", () => {
    if (email.value.trim() === "" || !isValidEmail(email.value.trim())) {
        email.classList.add("error");
        email.classList.remove("correct");
        emailValid = false;
        document.getElementById("email-err-msg").style.display = "block";
    } else {
        emailValue = email.value;
        email.classList.remove("error");
        email.classList.add("correct");
        emailValid = true;
        document.getElementById("email-err-msg").style.display = "none";
    }
});

phone.addEventListener("keyup", () => {
    const phoneRegex = /^\d{9}$/;
    if (phone.value.length === 9 && phonePrefix.value !== "" && phonePrefix.value !== "none" && phoneRegex.test(phone.value)) {
        phoneValue = phonePrefix.value + phone.value;
        phone.classList.remove("error");
        phone.classList.add("correct");
        phonePrefix.classList.remove("error");
        phonePrefix.classList.add("correct");
        phoneValid = true;
        document.getElementById("phone-err-msg").style.display = "none";
    } else {
        phone.classList.remove("correct");
        phone.classList.add("error");
        phonePrefix.classList.remove("correct");
        phonePrefix.classList.add("error");
        phoneValid = false;
        document.getElementById("phone-err-msg").style.display = "block";
    }
    document.getElementById("phone-counter").innerHTML = phone.value.length + "/9";
});

phonePrefix.addEventListener("change", () => {
    const phoneRegex = /^\d{9}$/;
    if (phone.value.length === 9 && phonePrefix.value !== "" && phonePrefix.value !== "none" && phoneRegex.test(phone.value)) {
        phoneValue = phonePrefix.value + phone.value;
        phone.classList.remove("error");
        phone.classList.add("correct");
        phonePrefix.classList.remove("error");
        phonePrefix.classList.add("correct");
        phoneValid = true;
        document.getElementById("phone-err-msg").style.display = "none";
    } else {
        phone.classList.remove("correct");
        phone.classList.add("error");
        phonePrefix.classList.remove("correct");
        phonePrefix.classList.add("error");
        phoneValid = false;
        document.getElementById("phone-err-msg").style.display = "block";
    }
});

dateOfBirth.addEventListener("change", () => {
    const birthDate = new Date(dateOfBirth.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age-=1;
    }
    ageInput.value = age;
    
    if(dateOfBirth.value === "" || age < 18 || age > 100){
        ageInput.value = "0";
        ageValid = false;
        dateOfBirth.classList.remove("correct");
        dateOfBirth.classList.add("error");    
        ageInput.classList.remove("correct");
        ageInput.classList.add("error");
        document.getElementById("age-err-msg").style.display = "block";
    }
    else{
        dateOfBirthValue = dateOfBirth.value;
        ageValue = age;
        ageValid = true;
        dateOfBirth.classList.remove("error");
        dateOfBirth.classList.add("correct");
        ageInput.classList.remove("error");
        ageInput.classList.add("correct");
        document.getElementById("age-err-msg").style.display = "none";
    }
});

extraServices.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        if(!extraServicesCustom.checked){
            document.getElementById("extra-service-err-msg").style.display = "none";
        }
        calcPrice();
    });
});

extraServicesCustom.addEventListener("change", () => {
    if(extraServicesCustom.checked){
        extraServicesTextarea.style.display = "block";
        document.getElementById("extra-service-textarea-counter").style.display = "block";
    }
    else{
        extraServicesTextarea.style.display = "none";
        document.getElementById("extra-service-textarea-counter").style.display = "none";
    }
    extraServicesCustom.classList.remove("error");
});

extraServicesTextarea.addEventListener("keyup", () => {
    if(extraServicesTextarea.value.trim() === ""){
        extraServicesTextarea.classList.remove("correct");
        extraServicesTextarea.classList.add("error");
        document.getElementById("extra-service-err-msg").style.display = "block";
    }
    else{
        extraServicesTextarea.classList.remove("error");
        extraServicesTextarea.classList.add("correct");
        document.getElementById("extra-service-err-msg").style.display = "none";
    }
    document.getElementById("extra-service-textarea-counter").innerHTML = extraServicesTextarea.value.length + "/30";
});


form.addEventListener("submit", (event) => {
    event.preventDefault();
    let extraServicesValues = [];
    extraServices.forEach((checkbox) => {
        if (checkbox.checked) {
            extraServicesValues.push(checkbox.value);
        }
    });

    let isValid = true;
    if(nameValid === false || 
        surnameValid === false || 
        emailValid === false || 
        phoneValid === false || 
        ageValid === false || 
        vehicleTypeValid === false || 
        vehicleBrandValid === false || 
        vehicleModelValid === false || 
        validateRadioGroup() === false ||
        valGender() === false ||
        validateExtraServices() === false){
        if(nameValid === false){
            firstName.classList.add("error");
            firstName.classList.remove("correct");
            document.getElementById("name-err-msg").style.display = "block";
        }
        if(surnameValid === false){
            lastName.classList.add("error");
            lastName.classList.remove("correct");
            document.getElementById("surname-err-msg").style.display = "block";
        }
        if(emailValid === false){
            email.classList.add("error");
            email.classList.remove("correct");
            document.getElementById("email-err-msg").style.display = "block";
        }
        if(phoneValid === false){
            phone.classList.add("error");
            phone.classList.remove("correct");
            phonePrefix.classList.add("error");
            phonePrefix.classList.remove("correct");
            document.getElementById("phone-err-msg").style.display = "block";
        }
        if(ageValid === false){
            dateOfBirth.classList.add("error");
            dateOfBirth.classList.remove("correct");
            ageInput.classList.add("error");
            ageInput.classList.remove("correct");
            document.getElementById("age-err-msg").style.display = "block";
        }
        if(vehicleTypeValid === false){
            document.getElementById("vehicle-type").classList.add("error");
            document.getElementById("vehicle-err-msg").style.display = "block";
        }
        if(vehicleBrandValid === false){
            document.getElementById("vehicle-brand-div").classList.add("error");
            document.getElementById("vehicle-err-msg").style.display = "block";
            brandSelect.forEach((select) => {
                select.classList.add("error");
            });
        }
        if(vehicleModelValid === false){
            document.getElementById("vehicle-model-div").classList.add("error");
            document.getElementById("vehicle-err-msg").style.display = "block";
            modelSelects.forEach((select) => {
                select.classList.add("error");
            });
        }
        if(validateRadioGroup() === false){
            document.getElementById("rental-err-msg").style.display = "block";
        }
        if(valGender() === false){
            document.getElementById("gender-err-msg").style.display = "block";
        }
        if(validateExtraServices() === false){
            document.getElementById("extra-service-err-msg").style.display = "block";
        }
        placeholderSelects.forEach((select) => {
            select.classList.add("error");
        });
        isValid = false;
    }

    if (isValid) {
        ageInput.disabled = false;
        document.getElementById("sum-name").innerHTML = "Meno: "+nameValue;
        document.getElementById("sum-surname").innerHTML = "Priezvisko: "+surnameValue;
        document.getElementById("sum-gender").innerHTML = "Pohlavie: "+genderValue;
        document.getElementById("sum-email").innerHTML = "Email: "+emailValue;
        document.getElementById("sum-phone").innerHTML = "Tel. číslo: "+phoneValue;
        document.getElementById("sum-age").innerHTML = "Vek: "+ageValue;
        document.getElementById("sum-date-of-birth").innerHTML = "Dátum narodenia: "+dateOfBirthValue;
        document.getElementById("sum-vehicle-type").innerHTML = "Typ vozidla: "+vehicleTypeValue;
        document.getElementById("sum-vehicle-brand").innerHTML = "Značka vozidla: "+vehicleBrandValue;
        document.getElementById("sum-vehicle-model").innerHTML = "Model vozidla: "+vehicleModelValue;
        document.getElementById("sum-rental-length").innerHTML = "Dĺžka zapožičania: "+radioGroupValue;
        if(radioCustom.checked){
            document.getElementById("sum-rental-length-custom").innerHTML = "Vlastná dĺžka zapožičania: "+rentalLengthTextareaValue;
        } else{
            rentalLengthTextarea.disabled = true;
        }
        if(genderCustom.checked){
            document.getElementById("sum-gender-custom").innerHTML = "Vlastné pohlavie: "+genderTextareaValue;
        } else{
            genderTextarea.disabled = true;
        }
        if(extraServicesValues.length !== 0){
            document.getElementById("sum-extra-services").innerHTML = "Extra služby: "+extraServicesValues.join(", ");
            if(extraServicesCustom.checked){
                document.getElementById("sum-extra-services-custom").innerHTML = "Vlastné extra služby: "+extraServicesTextarea.value;
            } else{
                extraServicesTextarea.disabled = true;
            }
        }

        document.getElementById("sum-modal").style.display = "block";
    }
});

document.getElementById("close-modal-btn").addEventListener("click", () => {
    document.getElementById("sum-modal").style.display = "none";
});

document.getElementById("submit-form-btn").addEventListener("click", () => {
    document.getElementById("sum-modal").style.display = "none";
    form.submit();
});

document.getElementById("hidden-name-btn").addEventListener("click", () => {
    if(document.getElementById("hidden-name-area").hidden === false){
        document.getElementById("hidden-name-area").hidden = true;
    } else {
        document.getElementById("hidden-name-area").hidden = false;
    }
});