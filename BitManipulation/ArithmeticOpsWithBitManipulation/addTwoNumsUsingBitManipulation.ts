/* Given two integers a and b, return the sum of the two integers without using the operators + and -.

Input: a = 1, b = 2         Output: 3

Input: a = 9, b = 11         Output: 20

Observations regarding Addition:

     0           1
   + 0         + 1                   Same bits -> we get 0
    --          --
     0           0  (carry 1)                             | =>     just like XOR
                                                          | =>
     1           0
   + 0         + 1                    Different bits -> we get 1
    --          --
     1           1  

     How to take care of Carry?
     We get carry only when both bits are same, i.e (a & b) === 1
     and we left shift this, ((a & b) << 1)

     DRY RUN:
     a = 09 = 1 0 0 1
     b = 11 = 1 0 1 1

     sum = a ^ b    =   0 0 1 0
              carry = 1 0 0 1 0     Where,  carry = ((a & b) << 1) 

     Now, sum = sum ^ carry = 1 0 0 0 0
                      carry = 0 0 1 0 0    carry = ((sum & carry) << 1)

     Now, sum = sum ^ carry = 0 0 0 0 0, XOR = 0, STOP!!

     when (sum & carry) == 0, return sum ^ carry = 1 0 1 0 0 = 20 = Ans

     Focus on code now, implementation is important, dry run was just for concept

     The key insight here is that the number of times the loop iterates depends on how many times a carry occurs. 
     With each iteration, the carry bits (shifted left) reduce, eventually leading to b becoming zero.
     In the worst case, the number of iterations required is proportional to the number of bits in the 
     binary representation of the numbers. For n-bit integers, this could be O(n) iterations.
     Therefore, the time complexity of this function is O(n), where n is the number of bits required to
    represent the larger of the two numbers, a and b.

     TC: O(max(number of bits in a, number of bits in b))
     SC: O(1) */

function addUsingBitManipulation(a: number, b: number): number {

    // corner case: if any one of them is 0, return other
    if(b === 0) return a;
    if(a === 0) return b;

    // Iterate till there is no carry 
    while (b !== 0) {
        
        // carry contains common set bits of a and b, left shifted by 1
        let carry: number = (a & b) << 1;

        // Update a with (a + b without carry)
        a = a ^ b;
      
        // Update b with carry
        b = carry; 
    } 
    return a;
}