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
*/
let s = 'ab';
function printAllSubsequences(str) {
    let len = str.length;
    function generateSubsequenceRecursively(currentIndex, currentString) {
        // Base case
        if (currentIndex >= len) {
            console.warn(currentString);
            return;
        }
        // Add the currentIndex element
        currentString = currentString + s[currentIndex];
        generateSubsequenceRecursively(currentIndex + 1, currentString);
        // Remove the currentIndex element from the currentString
        currentString = currentString.substring(0, currentString.length - 1);
        generateSubsequenceRecursively(currentIndex + 1, currentString);
    }
    // Call the function
    generateSubsequenceRecursively(0, "");
}
printAllSubsequences(s);
