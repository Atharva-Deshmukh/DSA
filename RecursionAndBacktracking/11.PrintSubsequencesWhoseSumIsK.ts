function genrateAllSubsequencesWithSumK(inputArr: number[], n: number, k: number): number[][] {

    let subsequencesWithSumK: Set<number[]> = new Set<number[]>();

    function generateSubsequencesOfArray(arr: number[], n: number, currIndex: number, sumTillNow: number): void {
        // Base case: Return the array generated till now
        if (currIndex >= n) {
            if (sumTillNow === k) subsequencesWithSumK.add([...arr]);// send a copy, due to reference duplication
            sumTillNow = 0; // reset the sum for the next combination
            return;
        }

        // include the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        const currentElement: number = inputArr[currIndex];
        arr.push(currentElement);
        sumTillNow += currentElement;
        generateSubsequencesOfArray(arr, n, currIndex + 1, sumTillNow);

        // exclude the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        sumTillNow -= currentElement;
        arr.pop();
        generateSubsequencesOfArray(arr, n, currIndex + 1, sumTillNow);
    }

    generateSubsequencesOfArray([], n, 0, 0);

    return Array.from(subsequencesWithSumK);
}

let arr: number[] = [1, 2, 3, 4];
let n: number = arr.length
let k: number = 7;
console.log(genrateAllSubsequencesWithSumK(arr, n, k));

/* Output:
[1, 2, 4] 
[3, 4] 

TC: O(n * (2^n))  
SC: O(n)
*/

/* To print any one subsequence, use boolean return strategy */
function genrateAllSubsequencesWithSumK(inputArr: number[], n: number, k: number): number[][] {

    let subsequencesWithSumK: Set<number[]> = new Set<number[]>();
    let isOnePrinted: Boolean = false;

    function generateSubsequencesOfArray(arr: number[], n: number, currIndex: number, sumTillNow: number): void {
        // Base case: Return the array generated till now
        if (currIndex >= n) {
            if ((sumTillNow === k) && (isOnePrinted === false)) {
                subsequencesWithSumK.add([...arr]); // send a copy, due to reference duplication
                isOnePrinted = true;}
            sumTillNow = 0; // reset the sum for the next combination
            return;
        }

        // include the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        const currentElement: number = inputArr[currIndex];
        arr.push(currentElement);
        sumTillNow += currentElement;
        generateSubsequencesOfArray(arr, n, currIndex + 1, sumTillNow);

        // exclude the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        sumTillNow -= currentElement;
        arr.pop();
        generateSubsequencesOfArray(arr, n, currIndex + 1, sumTillNow);
    }

    generateSubsequencesOfArray([], n, 0, 0);

    return Array.from(subsequencesWithSumK);
}