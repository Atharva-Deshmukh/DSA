/* 1404. Number of Steps to Reduce a Number in Binary Representation to One

Given the binary representation of an integer as a string s, return the number 
of steps to reduce it to 1 under the following rules:

If the current number is even, you have to divide it by 2.
If the current number is odd, you have to add 1 to it.
It is guaranteed that you can always reach one for all test cases.

Input: s = "1101"           Output: 6
Explanation: "1101" corressponds to number 13 in their decimal representation.
Step 1) 13 is odd, add 1 and obtain 14. 
Step 2) 14 is even, divide by 2 and obtain 7.
Step 3) 7 is odd, add 1 and obtain 8.
Step 4) 8 is even, divide by 2 and obtain 4.  
Step 5) 4 is even, divide by 2 and obtain 2. 
Step 6) 2 is even, divide by 2 and obtain 1.  

Input: s = "10"             Output: 1
Explanation: "10" corresponds to number 2 in their decimal representation.
Step 1) 2 is even, divide by 2 and obtain 1.  

Input: s = "1"              Output: 0

Constraints:

- 1 <= s.length <= 500
- s consists of characters '0' or '1'
- s[0] == '1'  

Brute force:
- Convert the binary string to integer and perform the given ops using a while(n !== 1), we will definitely get ans
- This will not work if s is very large, number will be too large to store and also difficult to manipulate,
   hence reduce it whil still in string form itself

TC: O(len)
SC: O(1)

function solution_1(s: string): number {
    let ans: number = 0;
    let n: number = s.length;

    if((n === 1) && (s[0] === '1')) return 0; 

    // convert the string to decimal
    let num: number = 0;
    for(let i = n - 1; i >=0; i--) if(s[i] === '1') num += (1 << (n - i - 1));

    while(num !== 1) {
        if((num & 1) === 0)  num >>= 1;  // n = n / 2
        else num += 1;
        ans++;
    }

    return ans;
}


////////////////////////////////////////////////////////////////////////////////////////

Approach - 1:
- We can do this in the string format itself!
- See, s[0] === 1 always (given constraints), we need to make other bits 0 except the rightmost one

                                                OBSERVATIONS:

if(s[n - 1] === 1) no. is odd
else no is even
---------------------------------------------------------
  divide by 2:  n / 2 => n >> 1, so in this binary string, simply so pop()
          
                ex: 1 1 0 1
                      1 1 0  -> last 1 is popped

---------------------------------------------------------
  add 1:  ex: 1 1 0 1         
              0 0 0 1
              -------           WHEN 1 IS ADDED IN BINARY REPRESENTATION,
              1 1 1 0           the bits before the first 0 from right = 0 and rest remains same
                                and that 1st 0 becomes 1 now
              1 0 1 1
              0 0 0 1
              -------
              1 1 0 0

continue the add 1 and divide by 2 opns till we are left with s.length === 1, Its guranteed that s[0] === 1,
hence we are just removing the other elements

TC: O(n ^ 2) since for addOne(), we need to iterate again 
SC: O(1) */

function addOne(s: string, n: number): string {
    let binaryArr: string[] = s.split('');

    let i: number = n - 1;
    while((i > 0) && (binaryArr[i] !== '0')) {      // Scenario: 11110111 + 1, 0 is in somewhere middle
        binaryArr[i] = '0';
        i--;
    }

    if((i >= 0) && (binaryArr[i] === '0')) binaryArr[i] = '1';
    else if((i === 0) && (binaryArr[i] !== '0')) {
        binaryArr[i] = '0';                       // Scenario: 11111111 + 1, All 1s
        binaryArr.unshift('1');
    }

    return binaryArr.join('');
}

function solution_2(s: string): number {
    let ans: number = 0;

    let n: number;
    while(s.length !== 1) {
        n = s.length;
        if(s[n - 1] === '0') s = s.substring(0, n - 1); // pop() ke baraabar in string
        else s = addOne(s, s.length);
        ans++;
    }

    return ans;
}

/* Optimised Approach:
- we can reduce the extra O(n) of the addOne() by not actually adding one, but simulating the addition of 1
- Observe:
   1101 --> 1110 --> 111 --> 1000 --> 100 -> 10 -> 1

   For even number, no of operations = 1 and then pop()
   For odd number, no of operations = 2 (one extra while adding one) and then pop()

     0 1 2 3
ex: "1 1 0 1"

let count = 0; len = 4 and carry = 0;
we will simulate this transformation:

   1101 --> 1110 --> 111 --> 1000 --> 100 -> 10 -> 1

len = 4:  ("1101")
    carry + s[n - 1] === 1 === odd
    s = "1101" on simulating addition
    count += 2
    carry = 1;
    pop();
    s becomes = "110"

len = 3:  ("110")
    carry + s[n - 1] === 1 === odd 
    s = "111" on simulating addition
    count += 2
    carry = 1;
    pop();
    s becomes = "11"

len = 2: ("11")
    carry + s[n - 1] === 2 === even, means, after adding carry, it will become '0'
    s = "10" on simulating addition
    count += 1 since it is even
    carry = 1;
    pop();

len = 1: ("1")
    STOP !!

But, we still have carry = 1 left, so add that to the ans since that denotes we deal with the last remaining '1' in 
string */

function solution_3(s: string): number {
    let count: number = 0;
    let carry: number = 0;
    let n: number = s.length;

    while(n > 1) {
        if(((carry + Number(s[n - 1])) & 1) === 1) {  // sum odd aaraha hai, matlab yaha pe 1 bit raha hoga after simulation
            count += 2;
            carry = 1;
            s = s.substring(0, n - 1); // pop() ke baraabar in string
            n = s.length;
        } 
        else if(((carry + Number(s[n - 1])) & 1) === 0) { // sum even aaraha hai, matlab yaha pe 0 bit raha hoga after simulation
            count += 1;
            s = s.substring(0, n - 1); // pop() ke baraabar in string
            n = s.length;
        }
    }

    return count + carry;
}