/* Given two integers a and b, return the sum of the two integers without using the operators + and -.

Input: a = 2, b = 1         Output: 1

Input: a = 11, b = 09       Output: 2

Observations regarding Addition:

     0           1
   - 0         - 1                   Same bits -> we get 0
    --          --
     0           0                                        | =>     just like XOR
                                                          | =>
     1           0
   - 0         - 1                    Different bits -> we get 1
    --          --
     1           1  (borrow 1) 

     How to take care of Borrow?
     in addition, we checked where both bits are 1 using (a & b) and then left shifted it, carrying that to higher bit
     In subtraction, we need to see ONLY case 0 and 1, not 1 and 0, and then shift that borrow to higher bit
     to check 0 and 1 case, we need to make the 0 in a = 1 so that & becomes 1 and we detect the need for borrow

     DRY RUN:
     a = 11 = 1 0 1 1 
     b = 09 = 1 0 0 1

     borrow = ((0 1 0 0) & (1 0 0 1) << 1) = 0
     a = a ^ b = 0 0 1 0
     b = 0 0 0 0

     b = 0, stop!

     TC: O(max(number of bits in a, number of bits in b))
     SC: O(1) */

     function subtract(a: number, b: number) 
     { 
         // Iterate till there  is no carrb 
         while (b != 0) 
         { 
             // borrow contains common set bits of b and unset bits of a 
             let borrow: number = ((~a) & b) << 1; 
     
             // Subtraction of bits of a and b where at least one of the bits is not set 
             a = a ^ b; 
     
             // Borrow is shifted by one so that subtracting it from a gives the required sum 
             b = borrow; 
         } 
         return a; 
     } 