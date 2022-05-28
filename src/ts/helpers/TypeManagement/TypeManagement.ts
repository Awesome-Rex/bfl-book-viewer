import "./types.d";
import "./extensions";

export namespace TypeManagement { // for managing type guards
    export type Type = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    export type PrimitiveType = Exclude<Type, "object" | "function">;

    export type Truthy<T> = Exclude<T, False>;
    export type Falsey<T> = Exclude<T, Truthy<T>>;
    type False = false | 0 | -0 | 0n | '' | null | undefined;

    export type Int = number;
    export type Float = number;
    
    export type EventType = ("abort" | "ended" | "addtrack" | "change" | "removetrack" | "messageerror" | "message" | "messageerror" | "message" | "animationcancel" | "animationend" | "animationiteration" | "animationstart" | "copy" | "cut" | "DOMContentLoaded" | "dragend" | "dragenter" | "dragleave" | "dragover" | "dragstart" | "drag" | "drop" | "fullscreenchange" | "fullscreenerror" | "gotpointercapture" | "keydown" | "keypress" | "keyup" | "lostpointercapture" | "paste" | "pointercancel" | "pointerdown" | "pointerenter" | "pointerleave" | "pointerlockchange" | "pointerlockerror" | "pointermove" | "pointerout" | "pointerover" | "pointerup" | "readystatechange" | "scroll" | "selectionchange" | "selectstart" | "touchcancel" | "touchend" | "touchmove" | "touchstart" | "transitioncancel" | "transitionend" | "transitionrun" | "transitionstart" | "visibilitychange" | "wheel" | "afterscriptexecute" | "auxclick" | "beforescriptexecute" | "blur" | "click" | "compositionend" | "compositionstart" | "compositionupdate" | "contextmenu" | "copy" | "cut" | "dblclick" | "DOMActivate" | "DOMMouseScroll" | "error" | "focusin" | "focusout" | "focus" | "fullscreenchange" | "fullscreenerror" | "gesturechange" | "gestureend" | "gesturestart" | "keydown" | "keypress" | "keyup" | "mousedown" | "mouseenter" | "mouseleave" | "mousemove" | "mouseout" | "mouseover" | "mouseup" | "mousewheel" | "msContentZoom" | "MSGestureChange" | "MSGestureEnd" | "MSGestureHold" | "MSGestureStart" | "MSGestureTap" | "MSInertiaStart" | "MSManipulationStateChanged" | "paste" | "scroll" | "select" | "show" | "touchcancel" | "touchend" | "touchmove" | "touchstart" | "webkitmouseforcechanged" | "webkitmouseforcedown" | "webkitmouseforceup" | "webkitmouseforcewillbegin" | "wheel" | "error" | "message" | "open" | "abort" | "error" | "loadend" | "loadstart" | "load" | "progress" | "webglcontextcreationerror" | "webglcontextlost" | "webglcontextrestored" | "toggle" | "cancel" | "close" | "animationcancel" | "animationend" | "animationiteration" | "animationstart" | "beforeinput" | "change" | "gotpointercapture" | "input" | "lostpointercapture" | "pointercancel" | "pointerdown" | "pointerenter" | "pointerleave" | "pointermove" | "pointerout" | "pointerover" | "pointerup" | "transitioncancel" | "transitionend" | "transitionrun" | "transitionstart" | "formdata" | "reset" | "submit" | "invalid" | "search" | "abort" | "canplaythrough" | "canplay" | "durationchange" | "emptied" | "ended" | "error" | "loadeddata" | "loadedmetadata" | "loadstart" | "pause" | "playing" | "play" | "progress" | "ratechange" | "seeked" | "seeking" | "stalled" | "suspend" | "timeupdate" | "volumechange" | "waiting" | "slotchange" | "cuechange" | "enterpictureinpicture" | "leavepictureinpicture" | "abort" | "close" | "error" | "versionchange" | "blocked" | "upgradeneeded" | "error" | "success" | "abort" | "complete" | "error" | "devicechange" | "error" | "addtrack" | "removetrack" | "ended" | "mute" | "unmute" | "messageerror" | "message" | "complete" | "merchantvalidation" | "paymentmethodchange" | "shippingaddresschange" | "shippingoptionchange" | "payerdetailchange" | "resourcetimingbufferfull" | "resize" | "bufferedamountlow" | "close" | "closing" | "error" | "message" | "open" | "error" | "tonechange" | "gatheringstatechange" | "selectedcandidatepairchange" | "statechange" | "addstream" | "connectionstatechange" | "datachannel" | "icecandidateerror" | "icecandidate" | "iceconnectionstatechange" | "icegatheringstatechange" | "negotiationneeded" | "removestream" | "signalingstatechange" | "track" | "audioprocess" | "message" | "activate" | "contentdelete" | "install" | "message" | "notificationclick" | "pushsubscriptionchange" | "push" | "connect" | "audioend" | "audiostart" | "end" | "error" | "nomatch" | "result" | "soundend" | "soundstart" | "speechend" | "speechstart" | "start" | "voiceschanged" | "boundary" | "end" | "error" | "mark" | "pause" | "resume" | "start" | "beginEvent" | "endEvent" | "repeatEvent" | "abort" | "error" | "load" | "resize" | "scroll" | "unload" | "copy" | "cut" | "paste" | "cuechange" | "addtrack" | "change" | "removeTrack" | "addtrack" | "change" | "removetrack" | "resize" | "scroll" | "close" | "error" | "message" | "open" | "afterprint" | "animationcancel" | "animationend" | "animationiteration" | "animationstart" | "appinstalled" | "beforeprint" | "beforeunload" | "blur" | "copy" | "cut" | "devicemotion" | "deviceorientation" | "DOMContentLoaded" | "error" | "focus" | "gamepadconnected" | "gamepaddisconnected" | "hashchange" | "languagechange" | "load" | "messageerror" | "message" | "offline" | "online" | "orientationchange" | "pagehide" | "pageshow" | "paste" | "popstate" | "rejectionhandled" | "resize" | "storage" | "transitioncancel" | "transitionend" | "transitionrun" | "transitionstart" | "unhandledrejection" | "unload" | "vrdisplayactivate" | "vrdisplayblur" | "vrdisplayconnect" | "vrdisplaydeactivate" | "vrdisplaydisconnect" | "vrdisplayfocus" | "vrdisplaypointerrestricted" | "vrdisplaypointerunrestricted" | "vrdisplaypresentchange" | "messageerror" | "message" | "languagechange" | "abort" | "error" | "loadend" | "loadstart" | "load" | "progress" | "timeout" | "reset" | "end" | "inputsourceschange" | "selectend" | "selectstart" | "select" | "squeezeend" | "squeezestart" | "squeeze" | "visibilitychange" | "devicechange");
    export type KeyboardEventType = ("Backspace" | "Tab" | "Enter" | "Shift" | "Shift" | "Control" | "Control" | "Alt" | "Alt" | "Pause" | "CapsLock" | "Escape" | "" | "" | "PageUp" | "PageDown" | "End" | "Home" | "ArrowLeft" | "ArrowUp" | "ArrowRight" | "ArrowDown" | "PrintScreen" | "Insert" | "Delete" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "Meta" | "Meta" | "ContextMenu" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "*" | "+" | "-" | "." | "/" | "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12" | "NumLock" | "ScrollLock" | "AudioVolumeMute" | "AudioVolumeDown" | "AudioVolumeUp" | "LaunchMediaPlayer" | "LaunchApplication1" | "LaunchApplication2" | ";" | "=" | "," | "-" | "." | "/" | "`" | "[" | "]" | "'");

    export function isTruthy(value: unknown): boolean {
        return !!value;
    }
    export function isFalsey(value: unknown): boolean {
        return !value;
    }
    export function isUndefined(value: unknown): value is undefined {
        return value === undefined;
    }
    export function isNull(value: unknown): value is null {
        return value === null;
    }
    export function isNaN(value: unknown): boolean {
        return isNaN(value);
    }
    export function isError(value: unknown): value is Error {
        return value instanceof Error;
    }
    export function isNever(value: unknown): value is never {
        throw new Error("Not Implemented");
    }


    export function isPrimitive(value: unknown): value is PrimitiveType {
        //return value PrimitiveType;
        throw new Error("Not Implemented");
    }
    export function isObject(value: unknown): value is Object {
        return typeof value === "object";
    }
    export function isClass(value: unknown): value is Object {
        //return 
        throw new Error("Not Implemented");
    }
    // export function isInterface(value: unknown): value is Interface {
    //     //return 
    //     throw new Error("Not Implemented");
    // }


    export function ofType(value: unknown, T: Type): value is Type {
        return typeof value === T;
    }
    export function ofClass<T extends Object>(value: unknown): value is Object {
        //return T instanceof Object && value instanceof T;
        throw new Error("Not Implemented");
    }
    export function ofInterface(){

    }


    export function inObject() {

    }
    export function inClass() {

    }
    // export function inInterface(value: unknown, property: string): value is Interface {
    //     return typeof value === "object" && value != null && value as Interface && property in (value as Interface);
    // }

    export namespace ReactTypes {
        export type Ref<T> = React.MutableRefObject<T>;
        export type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];
        export type Reducer<T, A> = [T, React.Dispatch<A>];
    }
}
