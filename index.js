window.addEventListener("load", () => {
    //Variables
    const carTypeSelect = document.getElementById("vehicle-type");
    const carTypeDivs = document.querySelectorAll(".vehicle-type-div");
    const emptySelects = document.getElementsByClassName("model-empty");
    const brandSelect = document.querySelectorAll(".brand-select");
    const placeholderSelects = document.querySelectorAll(".placeholder-inputs");
    const modelSelects = document.querySelectorAll(".vehicle-model-div");
    const radioCustom = document.getElementById("rental-length-4");
    const rentalLengthTextarea = document.getElementById("rental-length-textarea");
    const radioGroup = document.querySelectorAll(".radio-group input[type=radio]");
    const form = document.getElementById("form");
    const firstName = document.getElementById("name");
    const lastName = document.getElementById("surname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const phonePrefix = document.getElementById("phone-prefix");
    const ageInput = document.getElementById("age");
    const dateOfBirth = document.getElementById("date-of-birth");
    const extraServices = document.querySelectorAll(".checkbox-container input[type=checkbox]");
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
    let nameValue = "";
    let surnameValue = "";
    let emailValue = "";
    let phoneValue = "";
    let ageValue = "";
    let dateOfBirthValue = "";
    let radioGroupValue = "";
    let rentalLengthTextareaValue = "";

    //Functions
    function isValidEmail(testEmail) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
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
            document.getElementById("rental-length-4").classList.add("error");
            radioGroupValid = false;
        } else {
            document.getElementById("rental-length-4").classList.remove("error");
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
            currentSelect.value = "";
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
            calcPrice();
        });
    });

    rentalLengthTextarea.addEventListener("keydown", () => {
        rentalLengthTextareaValue = rentalLengthTextarea.value;
        if(rentalLengthTextarea.value.length === 0){
            rentalLengthTextarea.classList.remove("correct");
            rentalLengthTextarea.classList.add("error");
        }
        else {
            rentalLengthTextarea.classList.remove("error");
            rentalLengthTextarea.classList.add("correct");
        }
        document.getElementById("rental-length-textarea-counter").innerHTML = rentalLengthTextarea.value.length + "/30";
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
            calcPrice();
        });
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

    document.getElementById("close-modal-btn").addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
    });

    document.getElementById("submit-form-btn").addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
        form.submit();
    });

    document.getElementById("hidden-name-btn").addEventListener("click", () => {
        if(document.getElementById("hidden-name-area").hidden === false){
            document.getElementById("hidden-name-area").hidden = true;
        } else {
            document.getElementById("hidden-name-area").hidden = false;
        }
    });
});