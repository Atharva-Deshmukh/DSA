/* 8. String to Integer (atoi) - ASCII to Integer:

Given a string s, convert it into a 32-bit signed integer (similar to the atoi() function) 
without using any built-in conversion functions.

The conversion follows these rules:
- Ignore Leading Whitespaces: Skip all leading whitespace characters.
- Check Sign: If the next character is either '+' or '-', take it as the sign of the number. 
              If no sign is present, assume the number is positive.
- Read Digits: Read the digits and ignore any leading zeros. 
               Stop reading when a non-digit character is encountered or the end of the string is reached. 
               If no digits are found, return 0.
- Handle Overflow: If the number exceeds the range of a 32-bit signed integer:
                    Return 2³¹ − 1 (i.e., 2147483647) if it is greater than the maximum value.
                    Return −2³¹ (i.e., -2147483648) if it is smaller than the minimum value.
                
Return the final integer value.

Input: s = "-123"
Output: -123
Explanation: It is possible to convert -123 into an integer so we returned in the form of an integer

Input: s = " -"
Output: 0
Explanation: No digits are present, therefore the returned answer is 0.

Input: s = " 1231231231311133"
Output: 2147483647
Explanation: The converted number will be greater than 231 – 1, therefore print 231 – 1 = 2147483647.

Input: s = "-999999999999"
Output: -2147483648
Explanation: The converted number is smaller than -231, therefore print -231 = -2147483648.

Input: s = "  -0012gfg4"
Output: -12
Explanation: Nothing is read after -12 as a non-digit character ‘g’ was encountered.

Constraints:
    1 ≤ s.size() ≤ 10^3

*/

function myAtoi(s: string) {
    const n = s.length
    let sign = 1, res = 0, i = 0;

    // Ignore leading whitespaces
    while ((i < n) && (s[i] === ' ')) {
        i++;
    }

    // Store the sign of number and move ahead
    if ((i < n) && ('-+'.includes(s[i]))) {
        if (s[i] === '-') {
            sign = -1;
        }
        i++;
    }

    /* Now, Construct the number digit by digit
    
       We build number by --> res = res * 10 + currentDigit
    
       32-bit signed integer range [-2^31, 2^31 - 1]
                                   LIMIT = 2^31 - 1 = 2147483647

       So check if our res after (res * 10) > LIMIT
       Dividing both sides by 10        res > LIMIT / 10

    
    */
    while ((i < n) && (s[i] >= '0' && s[i] <= '9')) {
        const digit = s.charCodeAt(i) - '0'.charCodeAt(0);
        const LIMIT = 2 ** 31 - 1;
        const limitDiv10 = Math.floor(LIMIT / 10);

        // Handling overflow/underflow test case            // LIMIT % 10 = 7
        if (res > limitDiv10 || (res === limitDiv10 && digit > LIMIT % 10)) {
            return (sign === 1) ? (Math.pow(2, 31) - 1) : -Math.pow(2, 31);
        }

        // Append current digit to the result
        res = 10 * res + digit;
        i++;
    }
    return (res * sign == -0 ? 0 : res * sign);
}

// Driver code
const s = " -0012g4";
console.log(myAtoi(s));