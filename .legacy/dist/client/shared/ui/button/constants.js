import { Size, fonts, colors } from '@client/shared/ui/constants';
import { ButtonColor } from './types';
export const buttonColors = {
    [ButtonColor.white]: {
        backgroundColor: colors.white,
        borderColor: colors.black,
    },
    [ButtonColor.green]: {
        backgroundColor: colors.white,
        borderColor: colors.green,
    },
    [ButtonColor.red]: {
        backgroundColor: 'white',
        borderColor: colors.red,
    },
};
export const buttonSizes = {
    [Size.s]: {
        minWidth: '60px',
        maxWidth: '120px',
        height: '24px',
        fontSize: fonts.s.size,
        borderRadius: '4px',
    },
    [Size.m]: {
        minWidth: '140px',
        maxWidth: '200px',
        height: '32px',
        fontSize: fonts.m.size,
        borderRadius: '6px',
    },
    [Size.l]: {
        minWidth: '220px',
        maxWidth: '280px',
        height: '44px',
        fontSize: fonts.l.size,
        borderRadius: '8px',
    },
};
//# sourceMappingURL=constants.js.map