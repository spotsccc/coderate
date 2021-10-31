export const setCookies = (cookies) => (rep) => () => {
    Object.entries(cookies).forEach((cookie) => {
        //@ts-ignore
        rep.setCookie(cookie[0], cookie[1], { httpOnly: true, path: '/' });
        rep.header('access-control-expose-headers', 'Set-Cookie');
    });
    return cookies;
};
//# sourceMappingURL=set-cookies.js.map