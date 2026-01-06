/* Input: a = 15, b = 25     Output: 75

Way 1: Extreme brute force
- A simple solution is to find all prime factors of both numbers, then find union of 
  all factors present in both numbers.  Finally, return the product of elements in union.

Way 2:  based on the formula ((LCM * HCF) = Product of the two numbers)
        NOTE: THIS RELATION HOLDS ONLY FOR 2 NUMBERS

 a x b = LCM(a, b) * GCD (a, b) => LCM(a, b) = (a x b) / GCD(a, b)

TC: O(min(a,b))  // for GCD
SC: O(1)         // Tail optimisation of tail recursion by JS engine  */

function EuclideanGCD(a: number, b: number): number { 
    if (a === 0) return b; 
    return EuclideanGCD(b % a, a); 
}

function LCM(a: number, b: number): number {
    return Math.floor((a * b) / EuclideanGCD(a,b));
}

/* To get LCM(Array()), one by one use this formula for each array element

TC: O( N * min(a,b))  // for GCD + array iteration
SC: O(1)         // Tail optimisation of tail recursion by JS engine */

function LCM_Array(nums: number[]): number {
    let lcm: number = nums[0];

    nums.forEach((n: number) => {
        lcm = Math.floor((lcm * n) / EuclideanGCD(lcm, n));
    });

    return lcm;
}