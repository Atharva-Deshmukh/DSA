/*  Way 1: Normal Brute force method
Input: a = 20, b = 28     Output: 4
Input: a = 0,  b = 28     Output: 28, because any non-zero number divides 0 without leaving a remainder.
Input: a = 0, b = 0       Output: 0,  because 0 divides 0 without leaving a remainder.

Logic: Normal Looping
- Loop till the minimum of two numbers and then check for divisors of both, get the maximum

TC: O(min(a,b))
SC: O(1) 


                                    PRACTICAL USE OF GCD / HCF:
                                    ---------------------------

Lets say we have 9 candies and 6 chocolates.
What are Max NUMBER OF GROUPS that can be formed such that each group has equal number of both items.

Here, we need such a max number that can divide both 9 and 6 -> 3

Group-1 --> 3 candies 2 chocolates
Group-2 --> 3 candies 2 chocolates
Group-3 --> 3 candies 2 chocolates

*/

function GCD(a: number, b: number): number {
    if( a === 0 && b === 0) return 0;
    if(a === 0) return b;       
    if(b === 0) return a;

    /* Optimisation Possible here:  else if (a === 0 || b === 0) return a + b; */

    let res: number = 1;

    let min: number = Math.min(a,b);
    for(let i = 1; i <= min; i++) {
        if((a % i === 0) && (b % i === 0)) res = Math.max(i, res);
    }

    return res;
}

/* Way 2: Euclidean method

The logic relies on the mathematical property ==> GCD(a, b) = GCD(b % a, a)

- Uses result: GCD(0,b) = b
- keep reducing a to 0 and when its 0, return b
- u can do a-b if(a>b) or simply (b % a)
- but when u do a-b, u need to do it if (a>b), else do b-a
- hence better to use (b % a) to avoid if else

TC: O(min(a,b)) recursion goes on till any one (minimum one) becomes 0

Reusing Stack Frame: In traditional recursive functions, each recursive call creates a new stack frame, 
consuming additional memory. However, in tail-recursive functions, the compiler or interpreter can optimize 
by reusing the current stack frame for the recursive call since the enclosing function doesn't need to preserve 
any local state after the call returns.Because each recursive call reuses the same stack frame, TCO prevents stack 
overflow errors that might occur with deeply nested recursive calls. This is why SC = O(1)
SC: O(1)  THIS DOES NOT happen with all the engines by the way  */

function EuclideanGCD(a: number, b: number): number { 
        if (a === 0) return b; 
        return EuclideanGCD(b % a, a); 
}

/* GCD OF ARRAY of numbers

Concept: The GCD of three or more numbers can be calculated by repeatedly taking the GCDs of pairs of numbers. 
gcd(a, b, c) = gcd(a, gcd(b, c)) 
             = gcd(gcd(a, b), c) 
             = gcd(gcd(a, c), b)

TC: O(length * min(a,b)) recursion goes on till any one (minimum one) becomes 0 */

function GCD_Array(nums: number[]): number {
    let gcd: number = nums[0];

    nums.forEach((n: number) => {
        gcd = EuclideanGCD(gcd, n);
    });

    return gcd;
}
