import { AuthState, } from '@client/widgets/auth-form/model/auth-from-state';
export const checkPassword = ({ password }) => password.length > 6;
export const checkEmail = ({ email }) => email.length > 3;
export const checkRepeatPassword = ({ password, repeatPassword, }) => password === repeatPassword && password.length > 6;
export const checkLogin = ({ login }) => login.length > 3;
export const validateForm = (formState) => formState.authState === AuthState.login
    ? checkEmail(formState) &&
        checkPassword(formState) &&
        checkLogin(formState)
    : checkEmail(formState) &&
        checkRepeatPassword(formState) &&
        checkPassword(formState) &&
        checkLogin(formState);
//# sourceMappingURL=check-valid-helpers.js.map