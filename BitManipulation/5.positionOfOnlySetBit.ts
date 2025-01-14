/*Find position of the only set bit

Way 1: (NOT WORKING) we can think of using direct formula

console.log(Math.floor(Math.log(1)));  // 0001  Log's output: 0
console.log(Math.floor(Math.log(2)));  // 0010  Log's output: 0
console.log(Math.floor(Math.log(4)));  // 0100  Log's output: 1
console.log(Math.floor(Math.log(8)));  // 1000  Log's output: 2

hence directly using Math.log() is slightly unreliable

Way 2: Create a mask by normal Iteration

1 set bit === a power of two 

Create a mask = 1 and left shift till u get 1, pos++ on the way 

TC: O(log n)
SC: O(1) */

function isPowOf2(n: number): boolean {
    return ((n > 0) && ((n & (n-1)) === 0));
}

function findSetBitPos(n): number { 
    let pos = 1, mask = 1;
	if(isPowOf2(n) === true) {
        while((mask & n) === 0) {
            pos++;
            mask = mask << 1;
        }
    }
    

    return pos;
}  

console.warn('bit position from right', findSetBitPos(8));