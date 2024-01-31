/*
Find the element that appears once in an array where every other element appears twice

LOGIC:  (b ^ b) -> 0  AND (a ^ 0) -> a [XOR of a number with 0 is number itself.]

Since XOR is associative and commutative
res = 7 ^ (3 ^ 3) ^ (4 ^ 4) ^ (5 ^ 5)
    = 7 ^ 0 ^ 0 ^ 0
    = 7 ^ 0
    = 7
*/
function findSingle(ar, ar_size) {
    // Do XOR of all elements and return 
    let res = ar[0];
    for (let i = 1; i < ar_size; i++)
        res = res ^ ar[i];
    return res;
}
let ar = [2, 3, 5, 4, 5, 3, 4];
let n = ar.length;
console.warn(findSingle(ar, n));
////////////////////////////////////////////////////////////////////////////////////////////////
/* If there are two non-repeating integers:

Logic:  let a = [1, 2, 3, 4, 3, 4]

        1 (0001)
        2 (0010)
        3 (0011)
        4 (0100)
        3 (0011)
        4 (0100)
        ________
XOR ->  3 (0011)  --> this XOR is of (1 & 2) and also of (1, 2, 3, 4, 3, 4)

wherever XOR bit is set, it means there is odd ocurrence of any bit and other occurred even times
wherever XOR bit is unset, it means there is equal (even) ocurrence of that bit.

now make two sets viz.
set 1 -> numbers with those bits set where the rightmost xor bit is set
         [1, 3, 3]

set 2 -> numbers other than set 1
         [2, 4, 4]

NOTE that the distinct elements are in different sets over here since the bits will be different
for them at the position of rightmost set bit in XOR

now xor the individual set and u get answers
*/
function findTwoSingle(a) {
    let xor;
    a.forEach((element) => {
        xor = xor ^ element;
    });
    // create mask for rightmost set bit of XOR
    let mask = 1;
    while ((mask & xor) !== 1) {
        mask = mask << 1;
    }
    let set1 = [];
    let set2 = [];
    let n1, n2;
    a.forEach((element) => {
        if ((element & mask) === 1)
            set1.push(element);
        else
            set2.push(element);
    });
    set1.forEach((element) => {
        n1 = n1 ^ element;
    });
    set2.forEach((element) => {
        n2 = n2 ^ element;
    });
    return [n1, n2];
}
let arr = [2, 3, 5, 4, 5, 3, 9, 4];
console.warn('two single occurrences -> ', findTwoSingle(arr));
