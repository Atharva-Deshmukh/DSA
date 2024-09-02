/* Power set is the set of all subsets of S. For example S = {a, b, c} 
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

For every power of 2, if we iterate from 0 to (2^n)-1, we find the bits are in proper power set permutation

0 -->  00000
1 -->  00001
2 -->  00010
3 -->  00011   ---- power set till here
4 -->  00100
5 -->  00101
6 -->  00110
7 -->  00111  ---- power set till here
8 -->  01000
9 -->  01001
10 --> 01010
11 --> 01011
12 --> 01100
13 --> 01101
14 --> 01110
15 --> 01111  ---- power set till here
16 --> 10000 

LETS GET back to problem,
here if string = "abc" n=3, 
u will require bits till [1 to n]

Just they are not sorted lexicographically
sort them later

TC: O(n*2^n + nlog(n)) */

function generatePowersetForUniqueElements(str: string): Set<string> {
    let powSet = new Set<string>();
    let n = str.length;

    // iterate from [0 to 2^n-1]
    for(let num=0; num<Math.pow(2, n); num++) {
        let subset: string = "";

        // iterate every num from [0 to n-1]. If n=3 iterate 0th, 1st and 2nd pos in bits
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

/* Power set for duplicate elements, here I am taking array of numbers, logic is same only

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

By bit manipulation, we will include [1, 2] two times, but we need it once only.

Steps:
- Note that we don't have [2, 1] and [1, 2], hence SORT the generated subset before stringifying,
- Stringifying generates identical strings which are compared by sets and only one string is stored

Why Stringify?
In JavaScript, arrays and objects are reference types. This means that when you compare two arrays, 
you're actually comparing their references (memory addresses), not their contents.

Even if two arrays have identical contents, they are considered different if they are different objects in memory.

Primitive types like strings, numbers, booleans, etc., are compared by their actual values, not by reference. 
This means that two strings with the same characters are considered identical.

Hence this behaviour:

let mySet = new Set();

mySet.add([1, 2]);
mySet.add([1, 2]);

console.log(mySet); // Outputs {[1, 2], [1, 2]}

mySet.add(JSON.stringify([1, 2]));
mySet.add(JSON.stringify([1, 2]));


console.log(mySet);  // Outputs {"[1,2]"}

*/

function subsetsWithDuplicates(nums: number[]): number[][] {
    let tempPowSet = new Set<string>(); // Use a Set to store string representations of subsets
    let n: number = nums.length;

    for (let num = 0; num < Math.pow(2, n); num++) {
        let subset: number[] = [];

        for (let i = 0; i < n; i++) {
            if (num & (1 << i)) subset.push(nums[i]);
        }

        // Convert subset to a string to store in the Set,
        // sort the subsets to consider them into one string
        tempPowSet.add(JSON.stringify(subset.sort((a, b) => a - b)));
    }

    let ans: number[][] = [];
    tempPowSet.forEach((ele) => {
        // Parse the string back into an array
        ans.push(JSON.parse(ele));
    });

    return ans;
};

/* For string output, and that too, lexicographically,

Sort the input string: This ensures that the subsets are generated in lexicographical order.
Generate subsets.
Convert the set to an array: Sort the array to ensure that the subsets themselves are ordered lexicographically.
Return this sorted array */

function AllPossibleStrings(str) {
    let powSet = new Set();
    let n = str.length;

    // Sort the string to ensure subsets are generated in lexicographical order
    str = str.split('').sort().join('');

    // Iterate from [0 to 2^n-1]
    for (let num = 0; num < Math.pow(2, n); num++) {
        let subset = "";

        // Iterate every num from [0 to n-1]. If n=3 iterate 0th, 1st and 2nd pos in bits
        for (let i = 0; i < n; i++) {
            if (num & (1 << i)) {
                subset += str[i];
            }
        }
        
        powSet.add(subset);  // Add the subset to the set
    }

    // Convert the set to an array and sort it
    let sortedPowerset = Array.from(powSet).sort();

    return sortedPowerset;
}

// Example usage:
console.log(AllPossibleStrings("bca"));
// Output: ["", "a", "ab", "abc", "ac", "b", "bc", "c"]

