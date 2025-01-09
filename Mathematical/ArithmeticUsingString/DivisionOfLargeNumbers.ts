/* Some observations: 

if (dividend.length <= divisor.length) && (Number(dividend) < Number(divisor)) return 0 since quotient = 0


Approach: School maths for divison
                                                   1 4
                                                   ---
                                               2  )3 8(
                                                   2
                                                   ---
                                                   1 8     --> for (3/2): carry = 1 for next division
                                                     8         hence next num x = (carry * 10) + currDigit
                                                   ---
                                                   0 0

  - Compare with 4 => it is divisible, divide and move ahead
  - Compare with 8 => it is divisible, divide and move ahead
  - String ends, return quotient

                                                    LOGIC:

    - Initialise a Carry = 0, this carry is the remainder we obtained from previous divison, we 
      do (carry * 10) + current digit to get new number x to divide by current digit of a
    - Process each digit of a from i = 0 to n1
    - Update the value being divided by appending the current digit of a to the carry (x = carry * 10 + digit).
    - Calculate the quotient digit by performing integer division: Math.floor(x / b).
    - Update carry with the remainder of this division: carry = x % b.
    - Append the quotient digit to the result string res.
    - Remove Leading Zeros using regex


                                                    DRY RUN:

    a = "9999";         b = "11";

    Initial Values:

    res = ""
    carry = 0
    b = 11
    Iterate Over Digits of a:

    1st Digit (9):

    x = carry * 10 + 9 = 0 * 10 + 9 = 9
    Quotient: Math.floor(9 / 11) = 0
    Carry: 9 % 11 = 9
    res = "0"

    2nd Digit (9):

    x = carry * 10 + 9 = 9 * 10 + 9 = 99
    Quotient: Math.floor(99 / 11) = 9
    Carry: 99 % 11 = 0
    res = "09"

    3rd Digit (9):

    x = carry * 10 + 9 = 0 * 10 + 9 = 9
    Quotient: Math.floor(9 / 11) = 0
    Carry: 9 % 11 = 9
    res = "090"

    4th Digit (9):

    x = carry * 10 + 9 = 9 * 10 + 9 = 99
    Quotient: Math.floor(99 / 11) = 9
    Carry: 99 % 11 = 0
    res = "0909"

    Remove Leading Zeros using regex
    res = "0909" -> "909"

    RETURN Final Result => res = "909"

    TC: O(n1)  we iterate whole a
    SC: O(n1)  output string of max length of n1 in case b = 1  */

//                        dividend     divisor
function divideTwoStrings(a: string, b: string): string {
    let res: string = '';

    // corner case:
    if(b === '0') return 'Infinity';  // write this first, case a === 0 and b === 0, b should be considered
    if(a === '0') return '0';

    let n1: number = a.length;
    let n2: number = b.length;

    if((n1 <= n2) && (BigInt(a) < BigInt(b))) return '0';  // bigint is used since it is known that numbers are large

    let carry: number = 0;
    for(let i = 0; i < n1; i++) {
        let x: number = (carry * 10) + Number(a[i]);
        res = res + Math.floor(x / Number(b));
        carry = (x % Number(b));
    }

    // remove all leading zeros
    res = res.replace(/^0+/, "");

    return res;
}