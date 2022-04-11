export default function isRef(data: any) {
    if (
        typeof data == "object" &&
        "current" in data
    ) return true
    return false
}