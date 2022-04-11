export default function isReducer(data: any) {
    if (
        Array.isArray(data) && 
        data.length == 2 && 
        typeof data[0] != "function" &&
        typeof data[2] == "function"
    ) return true
    return false
}