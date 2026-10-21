/* 67. Add Binary

Given two binary strings a and b, return their sum as a binary string.

Input: a = "11", b = "1"
Output: "100"

Input: a = "1010", b = "1011"
Output: "10101"
 
Constraints:
    1 <= a.length, b.length <= 10^4
    a and b consist only of '0' or '1' characters.
    Each string does not contain leading zeros except for the zero itself.


Sum logic is different here:
- 0 + 1 = 1 carry 0
- 1 + 0 = 1 carry 0
- 1 + 1 = 0 carry 1
- 0 + 0 = 0 carry 0

If previous carry is also added to sum

- 0 + 1 + (carry 0) = 0 ^ 1 ^ 0 = 1  (overall carry = 0)
- 1 + 0 + (carry 0) = 1 ^ 0 ^ 0 = 1  (overall carry = 0)
- 0 + 1 + (carry 1) = 0 ^ 1 ^ 1 = 0  (overall carry = 1)
- 1 + 0 + (carry 1) = 1 ^ 0 ^ 1 = 0  (overall carry = 1)

- 0 + 0 + (carry 0) = 0 ^ 0 ^ 0 = 0  (overall carry = 0)
- 0 + 0 + (carry 1) = 0 ^ 0 ^ 1 = 1  (overall carry = 0)
- 1 + 1 + (carry 0) = 1 ^ 1 ^ 0 = 0  (overall carry = 1)
- 1 + 1 + (carry 1) = 1 ^ 1 ^ 1 = 1  (overall carry = 1)

if(d1 ^ d2 = 0) (both digits are same)
    sum = (d1 ^ d2 ^ carry)
    carry = either of d1 or d2

if(d1 ^ d2 = 1) (both digits are different)
    sum = (d1 ^ d2 ^ carry)
    carry = carry


The above logic is correct when both numbers are not finished
But once any one of the number is exhausted, logic changes a bit

- 0 + (carry 0) = 0 ^ 0 = 0  (overall carry = 0)
- 1 + (carry 0) = 1 ^ 0 = 1  (overall carry = 0)
- 0 + (carry 1) = 0 ^ 1 = 1  (overall carry = 0)
- 1 + (carry 1) = 1 ^ 1 = 0  (overall carry = 1)

sum = (d_remaining ^ carry)
carry = d_remaining & carry

TC: O(n)
SC: O(1)

*/

function sumOfLargeNumbers(a: string, b: string): string {
    let sum: string = "";
    let carry: number = 0;

    let n1: number = a.length;
    let n2: number = b.length;

    // corner case: If any one is null, or 0, return the other
    if(n1 === 0) return b;
    if(n2 === 0) return a;

    let i: number = n1-1;
    let j: number = n2-1;

    while((i >= 0) && (j >= 0)) {
        let d1: number = Number(a[i]);
        let d2: number = Number(b[j]);

        if((d1 ^ d2) === 0) {
            sum = (d1 ^ d2 ^ carry) + sum;
            carry = d1; /* or d2 */
        }
        else if((d1 ^ d2) === 1) {
            sum = (d1 ^ d2 ^ carry) + sum;
            carry = carry;
        }

        i--;
        j--;
    }

    // if n1 > n2, n2 will be exhausted and n1 remains
    while(i >= 0) {
        let d1: number = Number(a[i]);

        sum = (d1  ^ carry) + sum;
        carry = d1 & carry;

        i--;
    }

    // if n2 > n1, n1 will be exhausted and n2 remains
        while(j >= 0) {
        let d2: number = Number(b[j]);

        sum = (d2  ^ carry) + sum;
        carry = d2 & carry;

        j--;
    }

    // if carry remains in last, add it to the sum itself at the beginning
    if(carry > 0) sum = carry.toString() + sum;

    // remove leading zeros if any, reusing same i
    i = 0;
    let count: number = 0;
    let n: number = sum.length;
    while((i < n) && (sum[i] === '0')) { 
        count++; 
        i++; 
    }

    if(count === n) return '0';
    sum = sum.substring(count, n);

    return sum;
}