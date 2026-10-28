/* 468. Validate IP Address

Given a string queryIP, return "IPv4" if IP is a valid IPv4 address, "IPv6" if IP is a 
valid IPv6 address or "Neither" if IP is not a correct IP of any type.

A valid IPv4 address is an IP in the form "x1.x2.x3.x4" where 0 <= xi <= 255 and xi cannot contain leading zeros. 
"192.168.1.1" and "192.168.1.0"                      --> valid IPv4 addresses 
"192.168.01.1", "192.168.1.00", and "192.168@1.1"    --> invalid IPv4 addresses

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

    /* why <= 

       index:  0 1 2 3 4 5 6 7  
       char:   1 . 2 . 3 . 4 .

       Iteration	i at start	Part read	i after reading	i after i++ (skips .)	parts
       ----------------------------------------------------------------------------------
        1	            0	        1	        1	                2	              1
        2	            2	        2	        3	                4	              2
        3	            4	        3	        5	                6	              3
        4	            6	        4	        7	                8	              4
    */

    while (i <= n) {                           
        const start = i;
        let num = 0;

        while ((i < n) && (s[i] !== '.')) {
            const digit = s.charCodeAt(i) - '0'.charCodeAt(0);
            if (digit < 0 || digit > 9) return false;   // non-digit
            num = num * 10 + digit;
            if (num > 255) return false;                // out of range
            i++;
        }

        /*
            Input	    Where start lands	                            len	    Result
            -----------------------------------------------------------------------------
            "1.2.3.4"	always on a digit	                            ≥ 1	    passes this check
            "1..2.3"	2nd part starts at index 2, which is .	        0	    return false
            "1.2.3.4."	5th part starts at index 8, which equals n	    0	    return false
            ".1.2.3"	1st part starts at index 0, which is .	        0	    return false
        */

        const len = i - start;
        if (len === 0) return false;                    // empty part: "255..255", "1.2.3.4."
        if (len > 1 && s[start] === '0') return false;  // leading zero not allowed: "01", "00"

        parts++;
        i++;                                            // skip the '.'
    }
    return parts === 4;
}

function isHexChar(ch: string): boolean {
    return (ch >= '0' && ch <= '9') ||
           (ch >= 'a' && ch <= 'f') ||
           (ch >= 'A' && ch <= 'F');
}

/* why <= 

   index:  0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
    char:   1 : 2 : 3 : 4 : 5 : 6  :  7  :  8  :


    Iteration	i at start	Group read	i after reading	i after i++ (skips :)	parts
        1	        0	        1	           1                2	              1
        2	        2	        2	           3	            4	              2
        3	        4	        3	           5	            6	              3
        4	        6	        4	           7	            8	              4
        5	        8	        5	           9	            10	              5
        6	        10	        6	           11	            12	              6
        7	        12	        7	           13	            14	              7
        8	        14	        8	           15	            16	              8

*/
function isIPv6(s: string): boolean {
    const n = s.length;
    let i = 0;
    let parts = 0;

    while (i <= n) {                                    // <= so a trailing ':' creates an empty last group
        const start = i;

        while ((i < n) && (s[i] !== ':')) {
            if (!isHexChar(s[i])) return false;         // non-hex char
            i++;
        }

        /*
            Input	                                        Group	        start lands on	            len         	Result
            --------------------------------------------------------------------------------------------------------------------------------------------------
            2001:0db8:85a3:0000:0000:8a2e:0370:7334	        every group	    a hex digit	                4 each	        continues, parts = 8 → true
            1:2:3:4:5:6:7:8	                                every group	    a hex digit	                1 each	        continues, parts = 8 → true
            2001:db8:85a3::8a2e:370:7334	                4th group	    the 2nd : of ::	            0	            len === 0 → false
            :1:2:3:4:5:6:7	                                1st group	    index 0, which is :	        0	            len === 0 → false
            1:2:3:4:5:6:7:8:	                            9th group	    index 16, which equals n	0	            len === 0 → false
            12345:2:3:4:5:6:7:8	                            1st group	    1	                        5	            len > 4 → false
            g:2:3:4:5:6:7:8	                                1st group	    g	                        stops early	    isHexChar('g') fails → false
            1:2:3:4:5:6:7	                                last group	    7	                        1	            loop ends with parts = 7 → false
        */

        const len = i - start;

        /* 
        Each group is 16 bits, which is at most 4 hex digits (0000 to ffff). 
        Five or more digits can't fit --> "12345:2:3:4:5:6:7:8": 
        */

        if (len === 0 || len > 4) return false;         // empty group ("::", "1:2:") or more than 4 hex digits

        parts++;
        i++;                                            // skip the ':'
    }
    return parts === 8;
}