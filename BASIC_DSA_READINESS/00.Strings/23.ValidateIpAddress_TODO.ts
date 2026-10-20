/* 468. Validate IP Address

Given a string queryIP, return "IPv4" if IP is a valid IPv4 address, "IPv6" if IP is a 
valid IPv6 address or "Neither" if IP is not a correct IP of any type.

A valid IPv4 address is an IP in the form "x1.x2.x3.x4" where 0 <= xi <= 255 and xi cannot contain leading zeros. 
For example, "192.168.1.1" and "192.168.1.0" are valid IPv4 addresses while "192.168.01.1", "192.168.1.00", and "192.168@1.1" 
are invalid IPv4 addresses.

A valid IPv6 address is an IP in the form "x1:x2:x3:x4:x5:x6:x7:x8" where:

1 <= xi.length <= 4
xi is a hexadecimal string which may contain digits, lowercase English letter ('a' to 'f') and upper-case English letters ('A' to 'F').
Leading zeros are allowed in xi.
For example, "2001:0db8:85a3:0000:0000:8a2e:0370:7334" and "2001:db8:85a3:0:0:8A2E:0370:7334" are valid IPv6 addresses, 
while "2001:0db8:85a3::8A2E:037j:7334" and "02001:0db8:85a3:0000:0000:8a2e:0370:7334" are invalid IPv6 addresses.

Input: queryIP = "172.16.254.1"
Output: "IPv4"
Explanation: This is a valid IPv4 address, return "IPv4".

Input: queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334"
Output: "IPv6"
Explanation: This is a valid IPv6 address, return "IPv6".

Input: queryIP = "256.256.256.256"
Output: "Neither"
Explanation: This is neither a IPv4 address nor a IPv6 address.
 

Constraints:
    queryIP consists only of English letters, digits and the characters '.' and ':'.

*/

function validIPAddress(queryIP: string): string {
    if (queryIP.includes('.') && isIPv4(queryIP)) return "IPv4";  /* includes() stops at the first match */
    if (queryIP.includes(':') && isIPv6(queryIP)) return "IPv6";
    return "Neither";
}

function isIPv4(s: string): boolean {
    const n = s.length;
    let i = 0;
    let parts = 0;

    while (i <= n) {                              // <= so a trailing '.' creates an empty last part "1.2.3.4."
        const start = i;
        let num = 0;

        while ((i < n) && (s[i] !== '.')) {
            const digit = s.charCodeAt(i) - '0'.charCodeAt(0);
            if (digit < 0 || digit > 9) return false;   // non-digit
            num = num * 10 + digit;
            if (num > 255) return false;                // out of range
            i++;
        }

        const len = i - start;
        if (len === 0) return false;                    // empty part: "255..255", "1.2.3.4."
        if (len > 1 && s[start] === '0') return false;  // leading zero: "01", "00"

        parts++;
        i++;                                            // skip the '.'
    }
    return parts === 4;
}

function isIPv6(ip: string): boolean {
    const parts = ip.split(':');
    if (parts.length !== 8) return false;

    for (const p of parts) {
        if (p.length < 1 || p.length > 4) return false;       // 1 to 4 chars
        for (const ch of p) {
            const isHex = (ch >= '0' && ch <= '9') ||
                          (ch >= 'a' && ch <= 'f') ||
                          (ch >= 'A' && ch <= 'F');
            if (!isHex) return false;
        }
    }
    return true;
}