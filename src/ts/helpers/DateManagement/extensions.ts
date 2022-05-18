import { DateManagement } from "./DateManagement";

// https://youtu.be/foMymmSGM6Q
// https://stackoverflow.com/questions/39877156/how-to-extend-string-prototype-and-use-it-next-in-typescript
if (!("toStandardDateString" in Date.prototype)) {
    Object.defineProperty(Date.prototype, "toStandardDateString", {
        value: function () {
            return this != undefined ? DateManagement.toStandardDateString(this) : ""
        },
        writable: false,
        configurable: false,
        enumerable: false
    });
}
// Date.prototype.toStandardDateString = function() {
// 	console.log("call");
//     return this != undefined ? DateManagement.toStandardDateString(this) : ""
// };

export {}