/* Power set P(S) of a set S is the set of all subsets of S. For example S = {a, b, c} 
then P(s) = {{}, {a}, {b}, {c}, {a,b}, {a, c}, {b, c}, {a, b, c}}.
If S has n elements in it then P(s) will have 2^n elements.

Note that in Binary representation of nos from [0-7], we have the power set
0 -->  000    {}
1 -->  001    {c}
2 -->  010    {b}
3 -->  011    {b, c}
4 -->  100    {a}
5 -->  101    {a, c}
6 -->  110    {a, b}
7 -->  111    {a, b, c}

SIMILARLY, if for every power of 2, if we iterate from 0 to 2^n-1, we find the bits are in proper power set permutation

0 -->  00000
1 -->  00001
2 -->  00010
3 -->  00011
4 -->  00100
5 -->  00101
6 -->  00110
7 -->  00111
8 -->  01000
9 -->  01001
10 --> 01010
11 --> 01011
12 --> 01100
13 --> 01101
14 --> 01110
15 --> 01111
16 --> 10000 

LETS GET back to problem,
here if string = "abc" n=3, 
u will require bits till [1 to n]

Just they are not sorted lexicographically
sort them later

TC: O(n*2^n + nlog(n))
*/

function generatePowerset(str: string): Set<string> {
    let powSet = new Set<string>();
    let n = str.length;

    // iterate from [0 to 2^n-1]
    for(let num=0; num<Math.pow(2, n); num++) {
        let subset: string = "";

        // iterate every num from [0 to n-1] as agar n=3 to u need to iterate 0th, 1st and 2nd pos in bits
        // jis position ki bit set hai, include it within the subset
        //  if((num & ((1 << i))) === 1) {subset += str[i];} DONT USE THIS SINCE RESULTS ARE ABSURD
        for(let i=0; i<n; i++) {
            if((num & ((1 << i)))) {subset += str[i];}
        }
        powSet.add(subset);
    }

    let sortedPoweSet = Array.from(powSet).sort();
    let sortedSet = new Set(sortedPoweSet);
    
    return sortedSet;
}

console.warn('power set -> ', generatePowerset("abc"));
console.warn('power set -> ', generatePowerset("abcd"));
console.warn('power set -> ', generatePowerset("abcdef"));