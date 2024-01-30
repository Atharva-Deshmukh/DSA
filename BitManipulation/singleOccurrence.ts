/*
Find the element that appears once in an array where every other element appears twice

LOGIC:  (b ^ b) -> 0  AND (a ^ 0) -> a [XOR of a number with 0 is number itself.]

Since XOR is associative and commutative
res = 7 ^ (3 ^ 3) ^ (4 ^ 4) ^ (5 ^ 5)  
    = 7 ^ 0 ^ 0 ^ 0
    = 7 ^ 0
    = 7 
*/

function findSingle(ar, ar_size) 
	{ 
		// Do XOR of all elements and return 
		let res = ar[0]; 
		for (let i = 1; i < ar_size; i++) res = res ^ ar[i]; 
		return res; 
	} 

		let ar = [2, 3, 5, 4, 5, 3, 4]; 
		let n = ar.length; 
		console.warn(findSingle(ar, n)); 

