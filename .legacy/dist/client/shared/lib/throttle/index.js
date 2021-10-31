export const throttle = (fn, timeout) => {
    let lastTimeCall = null;
    return (...args) => {
        if (lastTimeCall === null || lastTimeCall + timeout < Date.now()) {
            lastTimeCall = Date.now();
            return fn(...args);
        }
        return null;
    };
};
//# sourceMappingURL=index.js.map