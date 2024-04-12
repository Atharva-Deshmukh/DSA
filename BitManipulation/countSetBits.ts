/* Count Total Bits Set i.e bits with 1 value

way 1:
right shift the bits and & with 1 till the number is 0

complexity: O(logn)
 For a number n, the number of bits in its binary representation is roughly log₂(n). 
 Therefore, traversing a number bitwise has a time complexity of O(log n), not O(log₂ n).

Way 2:
Brian Kernighan’s Algorithm:
Subtracting 1 from a decimal number flips all the bits after the rightmost set bit(which is 1) 
including the rightmost set bit. 
for example : 
10 in binary is 00001010 
9 in binary is 00001001 
8 in binary is 00001000 
7 in binary is 00000111 
So if we subtract a number by 1 and do it bitwise & with itself (n & (n-1)), 
we unset the rightmost set bit. If we do n & (n-1) in a loop and count the number 
of times the loop executes, we get the set bit count. 
The beauty of this solution is the number of times it loops is equal to the number 
of set bits in a given integer. 

Time Complexity: O(log n)
Auxiliary Space: O(1)
*/

function countSetBits1_Iterative(n: number) {
    let count = 0;
    while(n) {
        if((n & 1) === 1) count++;
        n = n>>1;
    }

    return count;
}

/* Recursion tree

    f(101)       --> 1 + f(10) --> 2
        \
        f(10)     --> 0 + f(1) --> 1 
          \
          f(1)    --> 1 + f(0) --> 1
            \
            f(0)    --> return 0
         

    */
function countSetBits1_Recursive(n: number) {
    if(n === 0) return 0;
    else {
        // if last bit set add 1 else add 0
        return (n & 1) + countSetBits1_Recursive(n>>1);
    }
}

function countSetBits2(n: number) {
    var count = 0;
    while (n > 0)
    {
        n &= (n - 1);
        count++;
    }
    return count;
}

console.warn('way 1 Iterative-->', countSetBits1_Iterative(3));
console.warn('way 1 Recursive-->', countSetBits1_Recursive(3));
console.warn('way 2 -->', countSetBits2(3));