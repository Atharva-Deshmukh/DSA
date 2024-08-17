/*Find position of the only set bit

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