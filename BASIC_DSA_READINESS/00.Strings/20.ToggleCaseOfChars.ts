/* Toggle case of each character:
    If char === its uppercase form, use lowercase, else uppercase.
    XOR the char code with 32.
*/

function toggleCase(s: string): string {
    let result = '';
    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i);
        const isUpper = code >= 65 && code <= 90;   // 'A'-'Z'
        const isLower = code >= 97 && code <= 122;  // 'a'-'z'

        if (isUpper || isLower) {
            result += String.fromCharCode(code ^ 32);
        } else {
            result += s[i]; // digits, spaces, symbols stay unchanged
        }
    }
    return result;
}

console.log(toggleCase("Hello World 123!")); // "hELLO wORLD 123!"