const validateType = {
    email: 'email',
    required: 'required',
    number: 'number'
};

const emailValidator = (value) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value || value.match(re)) {
        return null;
    } else {
        return { invalid: true, type: 'email' };
    }
};

const requiredValidator = (value) => {
    if (value) {
        return null;
    } else {
        return { invalid: true, type: 'required' };
    }
};

const valid = (type, value) => {
    let validate = null;
    switch(type) {
        case validateType.email:
            validate = emailValidator(value);
            break;
        case validateType.required:
            validate = requiredValidator(value);
            break;
        default:
            return validate;
    }
    return validate;
};
const Validations = {
    valid
};
export default Validations;