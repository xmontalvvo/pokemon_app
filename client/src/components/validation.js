const validationErrors = (form) => {

    let errors = {
        key: false
    }

    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
    const regexUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

    //:::::::: NOMBRE :::::::::::::
    if (!form.name.trim()) {
        errors.name = "The name field is required."
        errors.key = true
    } else if (!regexName.test(form.name.trim())) {
        errors.name = "The name field can only contain letters."
        errors.key = true
    }

    //:::::::::: IMAGEN ::::::::::::
    if (!form.img) {
        errors.img = "The image field is required."
        errors.key = true
    } else if (!regexUrl.test(form.img.trim())) {
        errors.img = "The image field can contain only urls."
        errors.key = true
    }

    //::::::::::::: VIDA ::::::::::::::::
    if (!form.hp) {
        errors.hp = "The life field is required."
        errors.key = true
    } else if (form.hp <= 0 || form.hp >= 1000) {
        errors.hp = "The value must be greater than zero and less than 1000."
        errors.key = true
    }

    //::::::::::: ATAQUE ::::::::::::
    if (!form.attack) {
        errors.attack = "The attack field is required."
        errors.key = true
    } else if (form.attack <= 0 || form.attack >= 1000) {
        errors.attack = "The value must be greater than zero and less than 1000."
        errors.key = true
    }

    //::::::::::: DEFENSA :::::::::::
    if (!form.defense) {
        errors.defense = "The defense field is required."
        errors.key = true
    } else if (form.defense <= 0 || form.defense >= 1000) {
        errors.defense = "The value must be greater than zero and less than 1000."
        errors.key = true
    }

    //:::::::::::: VELOCIDAD ::::::::::::
    if (!form.speed) {
        errors.speed = "The speed field is required."
        errors.key = true
    } else if (form.speed <= 0 || form.speed >= 1000) {
        errors.speed = "The value must be greater than zero and less than 1000."
        errors.key = true
    }

    //::::::::::::::: ALTURA :::::::::::::
    if (!form.height) {
        errors.height = "The height field is required."
        errors.key = true
    } else if (form.height <= 0 || form.height >= 1000) {
        errors.height = "The value must be greater than zero and less than 1000."
        errors.key = true
    }

    //:::::::::::::::: PESO :::::::::::::::::
    if (!form.weight) {
        errors.weight = "The weight field is required."
        errors.key = true
    } else if (form.weight <= 0 || form.weight >= 1000) {
        errors.weight = "The value must be greater than zero and less than 1000."
        errors.key = true
    }

    return errors
}

export default validationErrors;