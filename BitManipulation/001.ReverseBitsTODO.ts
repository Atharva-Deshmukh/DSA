/*

                1 0 1 0 
                
                1 0 1
                
                

 */

function reverseBits(n: number): number {
    let ans: number = 0;
    
    if(n === 0) return 0;
    
    // trailing zeros in original number = leading zeros in reversed reversed bits 
    while((n > 0) && ((n & 1) === 0)) n = n >> 1;
    
    while(n > 0) {
        ans = ans << 1;
        
        if((n & 1) === 1) ans = (ans ^ 1);
        
        n = n >> 1;
    }
    
    return ans;
}

console.log(reverseBits(4));   // 0100 -> 0010
console.log(reverseBits(5));   // 0101 -> 1010
console.log(reverseBits(11));  // 1011 -> 1101
console.log(reverseBits(10));  // 1010 -> 0101