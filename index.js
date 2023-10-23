const carTypeSelect = document.getElementById("vehicle-type");
const carTypeDivs = document.querySelectorAll(".vehicle-type-div");
const emptySelects = document.getElementsByClassName("model-empty");
const brandSelect = document.querySelectorAll(".brand-select");
const placeholderSelects = document.querySelectorAll(".placeholder-inputs");
const modelSelects = document.querySelectorAll(".vehicle-model-div");
let vehicleTypeValid = false;
let vehicleBrandValid = false;
let vehicleModelValid = false;
let vehicleTypeValue = "";
let vehicleBrandValue = "";
let vehicleModelValue = "";

carTypeSelect.addEventListener("change", () => {
    const selectedValue = carTypeSelect.value;
    carTypeDivs.forEach((div) => {
        if (div.dataset.type === selectedValue) {
            vehicleTypeValue = selectedValue;
            vehicleTypeValid = true;
            div.style.display = "block";
            document.querySelector(`[data-type=${selectedValue}]` + " .brand-select").value = "none";
            vehicleBrandValid = false;
            vehicleBrandValue = "";
        } else {
            div.style.display = "none";
        }
    });
    document.getElementById("vehicle-brand").style.display = "none";
    document.getElementById("vehicle-model").style.display = "none";
    modelSelects.forEach((select) => {
        select.value = "";
        vehicleModelValid = false;
        vehicleModelValue = "";
        select.style.display = "none";
    });
    for (let i = 0; i < emptySelects.length; i++) {
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
        const selectedValue = select.value;
        modelSelects.forEach((select) => {
            if (select.dataset.brand === selectedValue) {
                select.style.display = "block";
                vehicleBrandValue = selectedValue;
                vehicleBrandValid = true;
            } else {
                select.style.display = "none";
            }
        });
        for (let i = 0; i < emptySelects.length; i++) {
            emptySelects[i].style.display = "none";
        }
    });
});

modelSelects.forEach((select) => {
    select.addEventListener("change", () => {
        select.classList.remove("error");
        if(select.value === "" || select.value === "none"){
            vehicleModelValid = false;
            vehicleModelValue = "";
        }
        else{
            vehicleModelValue = select.value;
            vehicleModelValid = true;      
        }
    });
});

const radioCustom = document.getElementById("rental-length-4");
const rentalLengthTextarea = document.getElementById("rental-length-textarea");
const radioGroup = document.querySelectorAll(".radio-group input[type=radio]");
let radioGroupValue = "";
let rentalLengthTextareaValue = "";
radioGroup.forEach((radio) => {
    radio.addEventListener("change", () => {
        radioGroupValue = radio.value;
        if (radioCustom.checked) {
            rentalLengthTextarea.style.display = "block";
            document.getElementById("rental-length-textarea-counter").style.display = "block";
        } else {
            rentalLengthTextarea.style.display = "none";
            document.getElementById("rental-length-textarea-counter").style.display = "none";
        }
        calcPrice();
    });
});

rentalLengthTextarea.addEventListener("keydown", () => {
    rentalLengthTextareaValue = rentalLengthTextarea.value;
    document.getElementById("rental-length-textarea-counter").innerHTML = rentalLengthTextarea.value.length + "/30";
});

function validateRadioGroup() {
    const radioCustom = document.getElementById("rental-length-4");
    const rentalLengthTextarea = document.getElementById("rental-length-textarea");
    const radioGroup = document.querySelectorAll(".radio-group input[type=radio]");
    let radioGroupValid = false;

    radioGroup.forEach((radio) => {
        if (radio.checked && radio.value !== "" && radio.value !== "none") {
            radioGroupValid = true;
            return;
        }
    });

    if (radioCustom.checked && rentalLengthTextarea.value.trim() === "") {
        rentalLengthTextarea.classList.add("error");
        rentalLengthTextarea.classList.remove("correct");
        document.getElementById("rental-length-4").classList.add("error");
        return false;
    } else {
        rentalLengthTextarea.classList.remove("error");
        rentalLengthTextarea.classList.add("correct");
        document.getElementById("rental-length-4").classList.remove("error");
    }
    if (radioGroupValid === false) {
        document.getElementById("rental-err-msg").style.display = "block";
    } else {
        document.getElementById("rental-err-msg").style.display = "none";
    }
    return radioGroupValid;
}

//Validation
const form = document.getElementById("form");
const firstName = document.getElementById("name");
const lastName = document.getElementById("surname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const phonePrefix = document.getElementById("phone-prefix");
const ageInput = document.getElementById("age");
const dateOfBirth = document.getElementById("date-of-birth");
const extraServices = document.querySelectorAll(".checkbox-container input[type=checkbox]");
const submitBtn = document.getElementById("submit-btn");
let nameValid = false;
let surnameValid = false;
let emailValid = false;
let phoneValid = false;
let ageValid = false;
let nameValue = "";
let surnameValue = "";
let emailValue = "";
let phoneValue = "";
let ageValue = "";
let dateOfBirthValue = "";

firstName.addEventListener("keyup", () => {
    if (firstName.value.trim() === "") {
        firstName.classList.add("error");
        firstName.classList.remove("correct");
        nameValid = false;
    } else {
        nameValue = firstName.value;
        firstName.classList.remove("error");
        firstName.classList.add("correct");
        nameValid = true;
    }
    document.getElementById("name-counter").innerHTML = firstName.value.length + "/30";
});
lastName.addEventListener("keyup", () => {
    if (lastName.value.trim() === "") {
        lastName.classList.add("error");
        lastName.classList.remove("correct");
        surnameValid = false;
    } else {
        surnameValue = lastName.value;
        lastName.classList.remove("error");
        lastName.classList.add("correct");
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
        age--;
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
        calcPrice();
    });
});


form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submit button clicked");
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
        validateRadioGroup() === false){
        if(nameValid === false){
            firstName.classList.add("error");
            firstName.classList.remove("correct");
        }
        if(surnameValid === false){
            lastName.classList.add("error");
            lastName.classList.remove("correct");
        }
        if(emailValid === false){
            email.classList.add("error");
            email.classList.remove("correct");
        }
        if(phoneValid === false){
            phone.classList.add("error");
            phone.classList.remove("correct");
            phonePrefix.classList.add("error");
            phonePrefix.classList.remove("correct");
        }
        if(ageValid === false){
            dateOfBirth.classList.add("error");
            dateOfBirth.classList.remove("correct");
            ageInput.classList.add("error");
            ageInput.classList.remove("correct");
        }
        if(vehicleTypeValid === false){
            document.getElementById("vehicle-type").classList.add("error");
            document.getElementById("vehicle-err-msg").style.display = "block";
        }
        if(vehicleBrandValid === false){
            document.getElementById("vehicle-brand").classList.add("error");
            document.getElementById("vehicle-err-msg").style.display = "block";
            brandSelect.forEach((select) => {
                select.classList.add("error");
            });
        }
        if(vehicleModelValid === false){
            document.getElementById("vehicle-model").classList.add("error");
            document.getElementById("vehicle-err-msg").style.display = "block";
            modelSelects.forEach((select) => {
                select.classList.add("error");
            });
        }
        if(validateRadioGroup() === false){
            document.getElementById("rental-err-msg").style.display = "block";
            document.getElementById("rental-err-msg").style.display = "block";
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
        if(extraServicesValues.length !== 0){
            document.getElementById("sum-extra-services").innerHTML = "Extra služby: "+extraServicesValues.join(", ");
        }

        document.getElementById("modal").style.display = "block";
    }
});

function isValidEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return emailRegex.test(email);
}

function calcPrice(){
    let price = 0;
    let rentalLengthCustom = false;
    const carTypeSelect = document.getElementById("vehicle-type");
    const carTypeDivs = document.querySelectorAll(".vehicle-type-div");
    const selectedValue = carTypeSelect.value;
    carTypeDivs.forEach((div) => {
        if (div.dataset.type === selectedValue) {
            console.log(div.dataset.price);
            price += parseInt(div.dataset.price);
        }
    });
    const radioGroup = document.querySelectorAll(".radio-group input[type=radio]");
    radioGroup.forEach((radio) => {
        if(radio.checked){
            console.log(radio.dataset.price);
            price += parseInt(radio.dataset.price);
        }
        if(radio.id === "rental-length-4" && radio.checked){
            rentalLengthCustom = true;
        }
    });
    const extraServices = document.querySelectorAll(".checkbox-container input[type=checkbox]");
    extraServices.forEach((checkbox) => {
        if(checkbox.checked){
            console.log(checkbox.dataset.price);
            price += parseInt(checkbox.dataset.price);
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

const closeModalBtn = document.getElementById("close-modal-btn");
closeModalBtn.addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

const submitModalBtn = document.getElementById("submit-form-btn");
submitModalBtn.addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
    form.submit();
});


const hiddenNameBtn = document.getElementById("hidden-name-btn");

hiddenNameBtn.addEventListener("click", () => {
    if(document.getElementById("hidden-name-area").hidden === false){
        document.getElementById("hidden-name-area").hidden = true;
    } else {
        document.getElementById("hidden-name-area").hidden = false;
    }
});