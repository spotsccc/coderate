import { reflect } from '@effector/reflect';
import { flow } from 'fp-ts/function';
import { Input, InputType } from '@client/shared/ui/input';
import { $authState, $email, $emailHasError, $login, $loginHasError, $password, $passwordHasError, $repeatPassword, $repeatPasswordHasError, changeAuthState, changeEmail, changeLogin, changePassword, changeRepeatPassword, trySubmitForm, } from '@client/widgets/auth-form/model';
import { getValue } from '@client/shared/lib/fp';
import { Button } from '@client/shared/ui/button';
import { getOptionById, getOptionText, options, optionsById, } from '@client/widgets/auth-form/auth-state-options';
import { TabBar } from '@client/shared/ui/tab-bar';
export const bindedViews = {
    AuthStateBar: reflect({
        view: TabBar,
        bind: {
            onButtonClick: changeAuthState,
            options,
            selectedOption: $authState,
        },
    }),
    Login: reflect({
        view: Input,
        bind: {
            value: $login,
            onChange: changeLogin.prepend(getValue),
            placeholder: 'your login',
            hasError: $loginHasError,
            errorText: 'invalid login',
        },
    }),
    RepeatPassword: reflect({
        view: Input,
        bind: {
            value: $repeatPassword,
            onChange: changeRepeatPassword.prepend(getValue),
            placeholder: 'repeat password',
            type: InputType.password,
            hasError: $repeatPasswordHasError,
            errorText: 'passwords should exist and be equals',
        },
    }),
    Email: reflect({
        view: Input,
        bind: {
            value: $email,
            onChange: changeEmail.prepend(getValue),
            placeholder: 'email@example.com',
            hasError: $emailHasError,
            errorText: 'invalid email',
        },
    }),
    Password: reflect({
        view: Input,
        bind: {
            value: $password,
            onChange: changePassword.prepend(getValue),
            placeholder: 'password',
            type: InputType.password,
            hasError: $passwordHasError,
            errorText: 'invalid password',
        },
    }),
    SubmitButton: reflect({
        view: Button,
        bind: {
            onClick: trySubmitForm.prepend(() => null),
            text: $authState.map(flow(getOptionById(optionsById), getOptionText)),
        },
    }),
};
//# sourceMappingURL=binded-views.js.map