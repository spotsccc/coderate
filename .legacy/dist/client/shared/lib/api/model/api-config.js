import { option as O } from 'fp-ts';
import { createEvent, restore } from 'effector';
export var Methods;
(function (Methods) {
    Methods["GET"] = "GET";
    Methods["POST"] = "POST";
    Methods["PUT"] = "PUT";
    Methods["DELETE"] = "DELETE";
})(Methods || (Methods = {}));
export const setApiConfig = createEvent();
export const $apiConfig = restore(setApiConfig.map(O.some), O.none);
//# sourceMappingURL=api-config.js.map