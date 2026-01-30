/* 66. Plus One

Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].

Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].

Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0]. */

function plusOne(digits: number[]): number[] {

    const n: number = digits.length;
    let carry: number = 0;

    for(let i = (n - 1); i >= 0; i--) {
        let sum: number = 0;

        if(i === (n - 1)) sum = ((digits[i] + 1) + carry);
        else sum = (digits[i] + carry);
        const digitToPlace = sum % 10;
        carry = Math.floor(sum / 10);

        digits[i] = digitToPlace;
    }

    if(carry > 0) digits.unshift(carry);

    return digits;
    
};