const validatorType = {
    required: 'required',
    invalidEmail: 'invalidEmail',
    minLength: 'minLength'
};
const messages = {
    required:  `This field is required.`,

}
const getErrorMessage = (validatorName, validatorValue) => {
    const messages = {
        required:  `This field is required.`,
        invalidEmail: `Invalid email address.`,
        // minLength: `Minimum length is ${}`
    }
}
export default validatorType;