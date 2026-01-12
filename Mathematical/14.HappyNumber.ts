/* 202. Happy Number

Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of the squares of its digits.

Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a 
cycle which does not include 1.

Those numbers for which this process ends in 1 are happy.

Return true if n is a happy number, and false if not.


Input: n = 19                   Output: true

Explanation:
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1


Input: n = 2                    Output: false
 
Constraints: 1 <= n <= 2^31 - 1

OBSERVATIONS:

// bake your code here
Input: n = 19
Output: True

19 is Happy Number,
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
As we reached to 1, 19 is a Happy Number.

Input: n = 20

2^2 + 0^2 = 4
4^2 = 16
1^2 + 6^2 = 37
3^2 + 7^2 = 58
5^2 + 8^2 = 89
8^2 + 9^2 = 145
1^2 + 4^2 + 5^2 = 42
4^2 + 2^2 = 20
2^2 + 0^2 = 4 --> REPEAT!!


Output: False

Input: n = 2

2^2 = 4
4^2 = 16
1^2 + 6^2 = 37
3^2 + 7^2 = 58
5^2 + 8^2 = 89
8^2 + 9^2 = 145
1^2 + 4^2 + 5^2 = 42
4^2 + 2^2 = 20
2^2 + 0^2 = 4 --> REPEAT!!

Output: False

LOGIC: Use a map, and if sequence repeats, return false
       If the sequence don't repeat, we will at some point reach 1, so return true


In practice and theory: Number of iterations ≤ ~20 --> k
This is independent of input size.

TC: O(k * log(n)) -> log(n) for digit iteration     --> O(log(n))
SC: O(k) -> Since only 20 max values will be stored --> O(1)  */

function armstrongOfOrder2(n: number): number {
    let sum: number = 0;

    while(n > 0) {
        const lastDigit: number = n % 10;
        sum += Math.pow(lastDigit, 2);
        n = Math.floor(n / 10);
    }

    return sum;
}

function isHappy(n: number): boolean {
    let sumMap: Map<number, number> = new Map<number, number>();

    while(n !== 1) {
        const newN: number = armstrongOfOrder2(n);
        if(sumMap.has(newN)) return false;
        if(!sumMap.has(newN)) sumMap.set(newN, 1);
        n = newN;
    }

    return true;
};

// Little extension - Next happy number

function nextHappy(n: number) {
    // code here
    let candidate = n + 1;

    while (true) {
        if (isHappy(candidate)) {
            return candidate;
        }
        candidate++;
    }

}