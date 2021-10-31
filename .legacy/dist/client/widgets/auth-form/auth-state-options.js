import { AuthState } from '@client/widgets/auth-form/model';
export const options = [
    {
        id: AuthState.login,
        text: 'Login',
    },
    {
        id: AuthState.signUp,
        text: 'Sign up',
    },
];
export const optionsById = {
    [AuthState.login]: {
        id: AuthState.login,
        text: 'Login',
    },
    [AuthState.signUp]: {
        id: AuthState.signUp,
        text: 'Sign up',
    },
};
export const getOptionById = (options) => (id) => options[id];
export const getOptionText = (option) => option.text;
//# sourceMappingURL=auth-state-options.js.map