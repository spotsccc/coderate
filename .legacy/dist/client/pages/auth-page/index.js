import React from 'react';
import { AuthForm } from '@client/widgets/auth-form';
import { useGate } from 'effector-react';
import { useHistory } from 'react-router-dom';
import { gate } from './model';
export const AuthPage = () => {
    const history = useHistory();
    useGate(gate, history);
    return React.createElement(AuthForm, null);
};
//# sourceMappingURL=index.js.map