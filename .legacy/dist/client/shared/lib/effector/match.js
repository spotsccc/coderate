import { guard } from 'effector';
export const splitFt = ({ source, cases, match, }) => Object.entries(match).forEach(([name, store]) => guard({
    source: source,
    filter: store,
    target: cases[name],
}));
//# sourceMappingURL=match.js.map