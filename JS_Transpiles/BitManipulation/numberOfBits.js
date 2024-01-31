/* Count total bits in a number

Method 1 (Using Log):
the expression  ⌊log2(n)⌋+1  gives you the minimum number of bits needed to represent the integer
n in binary. The floor function ensures that if the result of the logarithm is not a whole number,
it is rounded down to the nearest integer.

Time Complexity : O(logn)
Auxiliary Space : O(1)

Method 2 (Using Bit Traversal): simply do bit traversal here

Time Complexity : O(logn)
Auxiliary Space : O(1)
*/
function countBits_Way1(n) {
    return (Math.floor(Math.log2(n)) + 1);
}
function countBits_Way2(n) {
    let count = 0;
    while (n > 0) {
        count++;
        n = n >> 1;
    }
    return count;
}
console.warn('countBits_Way1 -> ', countBits_Way1(4));
console.warn('countBits_Way2 -> ', countBits_Way2(4));
