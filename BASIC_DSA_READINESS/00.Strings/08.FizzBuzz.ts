/* 412. Fizz Buzz

Given an integer n, return a string array answer (1-indexed) where:

answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
answer[i] == "Fizz" if i is divisible by 3.
answer[i] == "Buzz" if i is divisible by 5.
answer[i] == i (as a string) if none of the above conditions are true.
 

Input: n = 3
Output: ["1","2","Fizz"]

Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]

Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
 

Constraints:
    1 <= n <= 10^4


Way-1:
- Start checking each number from 1 to n
- If a number is divisible by both 3 and 5, append "FizzBuzz" into result.
- If it's only divisible by 3, append "Fizz" into result.
- If it's only divisible by 5, append "Buzz" into result.
- Otherwise, append the number itself into result.

TC: O(n)
SC: O(n)


But here there are many if and else conditions

Way-2:
- Optimisation to way-1
- We check (i % 3) && (i % 5)
  then we again check these both separately, we don't need to
- We can simply check only these 3 conditions
  
        // Initialize an empty string for the current result
        let s = ""; 

        // Divides by 3, add Fizz
        if (i % 3 === 0) s += "Fizz";
        
        // Divides by 5, add Buzz
        if (i % 5 === 0) s += "Buzz";
        
        // Not divisible by 3 or 5, add the number
        if (s === "") s += i;
        
		// Append the current result to the array
        res.push(s); 

    3 and 5 are automatically getting covered in 3 then 5 because concatenation is there

TC: O(n)
SC: O(1)

Way-3: Interview Followup
- The above two approaches can get very messy and complicated when conditions increase
  ex: 4 = 'Jazz'...
- Hence, we can make this code more extensible to accommodate future adaptions

TC: O(n)
SC: O(n)

*/

function fizzBuzz_Way3(n: number): string[] {
    let ans: string[] = [];

    const map: Map<number, string> = new Map<number, string>(); /* Stores divisors and corresponding strings */
    map.set(3, 'Fizz');
    map.set(5, 'Buzz');

    const divisors: number[] = [3, 5];

    for(let i = 1; i <= n; i++) {

        let res: string = ""; 

        for(const d of divisors) {
            if(i % d === 0) res += map.get(d)!;
        }

        /* if Not divisble to any of the above divisors */
        if(res === "") res += i;

        ans.push(res);

    }


    return ans;
}