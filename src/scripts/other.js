export function toTitleCase(str) {
    return str.replace("-", " ").replace(
        /\b\w+/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
