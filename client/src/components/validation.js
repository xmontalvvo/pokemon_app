const validationErrors = (form) => {

    let errors = {
        key: false
    }

    //:::::::: NOMBRE :::::::::::::
    if(!form.name.trim()){
        errors.name = "El campo nombre es requerido."
        errors.key = true
    }else if(!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(form.name.trim())){
        errors.name = "El campo nombre solo puede contener letras."
        errors.key = true
    }

    //:::::::::: IMAGEN ::::::::::::
    if(!form.img){
        errors.img = "El campo imagen es requerido."
        errors.key = true
    }

    //::::::::::: ATAQUE ::::::::::::
    if(!form.attack){
        errors.attack = "El campo ataque es requerido"
        errors.key = true
    }

    //::::::::::: DEFENSA :::::::::::
    if(!form.defense){
        errors.defense = "El campo defensa es requerido"
        errors.key = true
    }

    //:::::::::::: VELOCIDAD ::::::::::::
    if(!form.speed){
        errors.speed = "El campo velocidad es requerido"
        errors.key = true
    }

    //::::::::::::: VIDA ::::::::::::::::
    if(!form.hp){
        errors.hp = "El campo vida es requerido"
        errors.key = true
    }

    //::::::::::::::: ALTURA :::::::::::::
    if(!form.height){
        errors.height = "El campo altura es requerido"
        errors.key = true
    }

    //:::::::::::::::: PESO :::::::::::::::::
    if(!form.weight){
        errors.weight = "El campo peso es requerido"
        errors.key = true
    }

    return errors
}

export default validationErrors;