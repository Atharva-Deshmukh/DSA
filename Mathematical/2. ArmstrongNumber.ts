/* Armstrong number is a number that is equal to the sum of cubes of its digits.
And armstrong number of order n means the number is equal to sum of the no. of digits 

Input:153           Output: Yes
1*1*1 + 5*5*5 + 3*3*3 = 153

Input: 1634         Output: Yes
1*1*1*1 + 6*6*6*6 + 3*3*3*3 + 4*4*4*4 = 163

U can use ** or Math.pow() to get Power in JS


Logic: 
- get no. of digits (d, say) using direct mathematical formula
- now perform result + digit^d in a loop, 

TC: O(no. of digits * k), k is constant time for multiplication
SC: O(1)

No.of digits in a number = Math.floor(log10(n)) + 1
*/

// TC is O(1)
function countDigits(n: number): number {
    return Math.floor(Math.log10(n)) + 1;
}

function isArmstrong(n: number): boolean {
    let nPreserved: number = n;
    let order = countDigits(n);
    let sum: number = 0;

    while(n > 0) {
        sum += Math.pow((n%10), order);
        n = Math.floor(n / 10); // to get proper decimal value
    }

    return (nPreserved === sum)? true: false;
}

/*Q)) Nth Armstrong Number

iterate from 1 to max number and check for every number, thats the only way
*/

