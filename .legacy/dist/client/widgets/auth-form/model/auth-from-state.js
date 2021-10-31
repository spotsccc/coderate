import { createEvent, restore, combine, guard, split, createStore, } from 'effector';
import { login, signUp } from '@client/shared/lib/api';
import { checkEmail, checkLogin, checkPassword, checkRepeatPassword, validateForm, } from '@client/widgets/auth-form/model/check-valid-helpers';
import { flow } from 'fp-ts/function';
import { not } from '@client/shared/lib/fp';
import { splitFt } from '@client/shared/lib/effector/match';
export var AuthState;
(function (AuthState) {
    AuthState["login"] = "login";
    AuthState["signUp"] = "signUp";
})(AuthState || (AuthState = {}));
export const changePassword = createEvent();
const setPasswordHasError = createEvent();
export const changeEmail = createEvent();
const setEmailHasError = createEvent();
export const changeRepeatPassword = createEvent();
const setRepeatPasswordHasError = createEvent();
export const changeLogin = createEvent();
const setLoginHasError = createEvent();
export const changeAuthState = createEvent();
export const trySubmitForm = createEvent();
export const submitForm = createEvent();
export const $password = restore(changePassword, '');
export const $repeatPassword = restore(changeRepeatPassword, '').reset(changeAuthState);
export const $login = restore(changeLogin, '');
export const $email = restore(changeEmail, '');
export const $authState = restore(changeAuthState, AuthState.login);
export const $loginHasError = createStore(false);
export const $passwordHasError = createStore(false);
export const $emailHasError = createStore(false);
export const $repeatPasswordHasError = createStore(false);
$emailHasError
    .reset(changeEmail)
    .reset(changeAuthState)
    .on(setEmailHasError, () => true);
$repeatPasswordHasError
    .reset(changeRepeatPassword)
    .reset(changeAuthState)
    .on(setRepeatPasswordHasError, () => true);
$passwordHasError
    .reset(changePassword)
    .reset(changeAuthState)
    .on(setPasswordHasError, () => true);
$loginHasError
    .reset(changeLogin)
    .reset(changeAuthState)
    .on(setLoginHasError, () => true);
export const $authFormState = combine({
    login: $login,
    email: $email,
    password: $password,
    repeatPassword: $repeatPassword,
    authState: $authState,
});
splitFt({
    source: trySubmitForm,
    match: {
        loginHasError: $authFormState.map(flow(checkLogin, not)),
        repeatPasswordHasError: $authFormState.map(flow(checkRepeatPassword, not)),
        emailHasError: $authFormState.map(flow(checkEmail, not)),
        passwordHasError: $authFormState.map(flow(checkPassword, not)),
    },
    cases: {
        loginHasError: setLoginHasError,
        passwordHasError: setPasswordHasError,
        repeatPasswordHasError: setRepeatPasswordHasError,
        emailHasError: setEmailHasError,
    },
});
guard({
    clock: trySubmitForm,
    source: $authFormState,
    filter: validateForm,
    target: submitForm,
});
split({
    source: submitForm,
    match: $authState,
    cases: {
        [AuthState.login]: login.prepend((payload) => ({ body: payload })),
        [AuthState.signUp]: signUp.prepend((payload) => ({ body: payload })),
    },
});
//# sourceMappingURL=auth-from-state.js.map