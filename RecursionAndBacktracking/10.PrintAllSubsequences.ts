/*Generating all possible Subsequences using Recursion including the empty one.

Input : [1, 2]
Output : 
[
   []
   [1]        --> 2^2
   [2]
   [1,2]
]


Input : [1, 2, 3]
Output : 
[
   []
   [1]        --> 2^3
   [2]
   [3]
   [1,2]
   [2,3]
   [1,3]
   [1,2,3]
]

Using recursion:

At every step while iterating the array, we have 2 choices, 
1: include the current element
2: exclude the current element

Thinking/Pseudocode: (in terms of recursion)

FUNC(index, arr[])
{
    //I have to go till end of the array, so base case 
    // base case: return the subsequence generated till now
    if(index >= n) { print arr[]; return; }

    // add the current element
    arr.push(arr[index]);

    // now iterate/recurse further by including this element 
    FUNC(index+1, arr);   --> this recursion will go and then also be back
    
    // Now exclude the current element
    arr.remove(arr[index]);

    // now iterate/recurse further by excluding this element 
    FUNC(index+1, arr);   --> this recursion will go and then also be back
}

Dry run: arr[] = [a,b,c]

F(0, [])
    i = 0 
    i<3 --> base case skipped

    //ADDED a
    F(1, [a])
        i = 1
        i<3 --> base case skipped

        //ADDED b
        F(2, [a,b])
            i = 2
            i<3 --> base case skipped 

            //ADDED c
            F(3, [a,b,c])
                i === 3 
                PRINT [a,b,c] and return
        
            //REMOVED c
            F(3, [a,b])
                i === 3 
                PRINT [a,b] and return


        //REMOVED b
        F(2, [a])
            i = 2
            i<3 --> base case skipped 

            //ADDED c
            F(3, [a,c])
                i === 3 
                PRINT [a,c] and return

            //REMOVED c
            F(3, [a])
                i === 3 
                PRINT [a] and return 

    
    // REMOVED a
    F(1, [])
        i = 1
        i<3 --> base case skipped

        //ADDED b
        F(2, [b])
            i = 2
            i<3 --> base case skipped
            
            //ADDED c
            F(3, [b,c])
                i === 3 
                PRINT [b,c] and return
            
            //REMOVED c
            F(3, [b])
                i === 3 
                PRINT [b] and return

        //REMOVED b
        F(2, [])
            i = 2
            i<3 --> base case skipped

            //ADDED c
            F(3, [c])
                i === 3 
                PRINT [c] and return
            
            //REMOVED c
            F(3, [])
                i === 3 
                PRINT [] and return
        

    i = 0
    i<3 --> base case skipped

    //REMOVED a
    F(1, [])
        i = 1
        i<3 --> base case skipped

        ADDED b
        F(2, [b])
            i = 2
            i<3 --> base case skipped

    .....this continues and we get duplicate solutions,
    hence use sets       


//Subsequences:
[a,b,c]
[a,b]
[a,c]
[a]
[b,c]
[b]
[c]
[]

Number of subsequences to generate = 2^n
Time required to generate each subsequence = O(n) to print/store it
TC: n * O(2^n) since we are making choices to include the current character or not
SC: O(n)

let s = aba

                                        f(0, "")
                                            \
                                           f(1, "a")
                                               \
                                              f(2, "ab")
                                                /    \ 
                                        f(2)            f(3, "aba") {"aba"}
*/

/* Way-1 to write for an array input 
   Wrap inside a function to avoid passing input array again and again
   The input[] in the outer function is referred inside the inner function
*/
function genrateAllPossibleSubsequences(inputArr: string[], n: number): void {

    function generateSubsequencesOfArray(arr: string[], n: number, currIndex: number): void {
        // Base case: Return the array generated till now
        if (currIndex >= n) {
            console.log(arr);
            return;
        }

        // include the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        arr.push(inputArr[currIndex]);
        generateSubsequencesOfArray(arr, n, currIndex + 1);

        // exclude the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        arr.pop();
        generateSubsequencesOfArray(arr, n, currIndex + 1);
    }

    generateSubsequencesOfArray([], n, 0);
}

genrateAllPossibleSubsequences(["a", "b", "c"], 3);

/* Way-2 to write for an array input 
*/
function generateSubsequencesOfArray(inputArr: string[], generatedSubSeq: string[], n: number, currIndex: number): void {
    // Base case: Return the array generated till now
    if (currIndex >= n) {
        console.log(generatedSubSeq);
        return;
    }

    // include the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
    generatedSubSeq.push(inputArr[currIndex]);
    generateSubsequencesOfArray(inputArr, generatedSubSeq, n, currIndex + 1);

    // exclude the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
    generatedSubSeq.pop();
    generateSubsequencesOfArray(inputArr, generatedSubSeq, n, currIndex + 1);
}

generateSubsequencesOfArray(["a", "b", "c"], [], 3, 0);

/* Generating distinct subsequences using set
   Note: We need to pass copied array to the set as input since arrays are reference types and set 
   will consider different references as same elements
*/
function genrateAllPossibleSubsequences(inputArr: string[], n: number): Set<string[]> {

    let distinctSubsequencesGenrated: Set<string[]> = new Set<string[]>();

    function generateDistinctSubsequencesOfArray(arr: string[], n: number, currIndex: number): void {
        // Base case: Return the array generated till now
        if (currIndex >= n) {
            distinctSubsequencesGenrated.add([...arr]); // Use a copy
            return;
        }

        // include the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        arr.push(inputArr[currIndex]);
        generateDistinctSubsequencesOfArray(arr, n, currIndex + 1);

        // exclude the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        arr.pop();
        generateDistinctSubsequencesOfArray(arr, n, currIndex + 1);
    }

    generateDistinctSubsequencesOfArray([], n, 0);

    return distinctSubsequencesGenrated;
}

/* Another way: input is a string instead of an Array */
function genrateAllPossibleSubsequences(inputString: string, n: number): Set<string> {

    let distinctSubsequencesGenrated: Set<string> = new Set<string>();

    function generateDistinctSubsequencesOfArray(generatedStr: string, n: number, currIndex: number): void {
        
        // Base case: Return the subsequence generated till now
        if (currIndex >= n) {
            distinctSubsequencesGenrated.add(generatedStr);
            return;
        }

        // include the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        generatedStr += inputString.charAt(currIndex);
        generateDistinctSubsequencesOfArray(generatedStr, n, currIndex + 1);

        // exclude the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        generatedStr = generatedStr.substring(0, generatedStr.length-1);
        generateDistinctSubsequencesOfArray(generatedStr, n, currIndex + 1);
    }

    generateDistinctSubsequencesOfArray("", n, 0);

    return distinctSubsequencesGenrated;
}

console.log(genrateAllPossibleSubsequences("ab", 2));

/* To get the lexicographically sorted subsequences, simply generate distinct subsequences and sort them
 */
function genrateAllPossibleSubsequences(inputString: string, n: number): string[] {

    let distinctSubsequencesGenrated: Set<string> = new Set<string>();

    function generateDistinctSubsequencesOfArray(generatedStr: string, n: number, currIndex: number): void {
        
        // Base case: Return the subsequence generated till now
        if (currIndex >= n) {
            distinctSubsequencesGenrated.add(generatedStr);
            return;
        }

        // include the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        generatedStr += inputString.charAt(currIndex);
        generateDistinctSubsequencesOfArray(generatedStr, n, currIndex + 1);

        // exclude the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        generatedStr = generatedStr.substring(0, generatedStr.length-1);
        generateDistinctSubsequencesOfArray(generatedStr, n, currIndex + 1);
    }

    generateDistinctSubsequencesOfArray("", n, 0);

    // Convert to array and sort lexicographically
    return Array.from(distinctSubsequencesGenrated).sort();
}

console.log(genrateAllPossibleSubsequences("abc", 3));
/* Output:  
   ["", "a", "ab", "abc", "ac", "b", "bc", "c"] 

TC: O(m * log m)     // where m = number of unique subsequences (≤ 2^n)
Mathematically: O(n² · 2ⁿ)
*/


