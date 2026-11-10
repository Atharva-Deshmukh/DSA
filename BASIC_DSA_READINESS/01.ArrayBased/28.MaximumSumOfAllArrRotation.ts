/* Maximum value of Sum(i*arr[i]) with array rotations allowed

Input: arr[] = [4, 3, 2, 6, 1, 5]
Output: 60
Explanation: After rotating the array 3 times, we get [1, 5, 4, 3, 2, 6]. 
             Now, the sum of i*arr[i] = 0*1 + 1*5 + 2*4 + 3*3 + 4*2 + 5*6 = 0 + 5 + 8 + 9 + 8 + 30 = 60

Input: arr[] = [8, 3, 1, 2]
Output: 29
Explanation: After rotating the array 3 times, we get [3, 1, 2, 8]. 
             Now, the sum of i*arr[i] = 0*3 + 1*1 + 2*2 + 3*8 = 0 + 1 + 4 + 24 = 29.

Input: arr[] = [10, 1, 2, 7, 9, 3]
Output: 105

Way-1: Brute force
- Get all rotations and check value for each rotation

TC: O(n^2)
SC: O(1)

Way-2: Formula (calculate next rotation from the previous one, no need to start from scratch)

NOTE:
Answer will be same for both left and right rotations
Why?
The question asks for the maximum over all n rotations (0 to n−1). 
A left rotation by k gives the same array as a right rotation by n−k. 
Both directions produce the same set of arrays, so the maximum is identical.


                                0  1  2  3  4  5
  Example for each step: arr = [4, 3, 2, 6, 1, 5], n = 6, totalSum = 21, last = 5
      Before rotation: [4, 3, 2, 6, 1, 5]  (index 0..5)
      After  rotation: [5, 4, 3, 2, 6, 1]

      Contribution (value * index) of every element, before -> after:
          4 : 4*0 = 0   ->  4*1 = 4     change = +4   (index +1, so +1 copy of that element, 4 here)
          3 : 3*1 = 3   ->  3*2 = 6     change = +3   (+1 copy of 3)
          2 : 2*2 = 4   ->  2*3 = 6     change = +2   (+1 copy of 2)
          6 : 6*3 = 18  ->  6*4 = 24    change = +6   (+1 copy of 6)
          1 : 1*4 = 4   ->  1*5 = 5     change = +1   (+1 copy of 1)
          5 : 5*5 = 25  ->  5*0 = 0     change = -25  (last jumps to front, multiplier 5 -> 0)
                    --           --
                    54           45

      Step A) "Every element that moved right adds ONE extra copy of itself"
          4 + 3 + 2 + 6 + 1 = 16        (this is totalSum - last = 21 - 5)

      Step B) "The last element loses (n-1) * last"
          (6 - 1) * 5 = 25              (matches the -25 above)

      Put together: new sum = 54 + 16 - 25 = 45   (check: 5*0 + 4*1 + 3*2 + 2*3 + 6*4 + 1*5 = 45)

      Same thing with the short formula:
          newRotationSum = oldRotationSum + totalSum - (n * lastElement) = 54 + 21 - 6*5 = 45    (same answer)

Dry run: arr = [4, 3, 2, 6, 1, 5], n = 6
    totalSum = 4+3+2+6+1+5 = 21
    R0 (no rotation) = 0*4 + 1*3 + 2*2 + 3*6 + 4*1 + 5*5 = 54

    1st rotation, last element = arr[n-1] = 5 -> R1 = 54 + 21 - 6*5 = 45     array: [5,4,3,2,6,1]
    2nd rotation, last element = arr[n-2] = 1 -> R2 = 45 + 21 - 6*1 = 60     array: [1,5,4,3,2,6]
    3rd rotation, last element = arr[n-3] = 6 -> R3 = 60 + 21 - 6*6 = 45
    ... and so on, keep the biggest value seen = 60

Steps:
- Find totalSum and R0 in one loop.
- maxVal = R0
- For j = 1 to n-1: cur = cur + totalSum - n * arr[n-j]; update maxVal.

TC: O(n) -> two simple loops
SC: O(1) -> only few variables

*/

function maxRotateSum(arr: number[]): number {
    const n = arr.length;
    let totalSum = 0;
    let rotationSum = 0; // value of i * arr[i] for the current rotation

    /* get totalSum and rotationSum in one go for current rotation */
    for (let i = 0; i < n; i++) {
        totalSum += arr[i];
        rotationSum += i * arr[i];
    }

    let maxVal = rotationSum;

    /* calculate next rotationSum and update max */
    for (let j = 1; j < n; j++) {
        rotationSum = rotationSum + totalSum - (n * arr[n - j]);
        maxVal = Math.max(maxVal, rotationSum);
    }

    return maxVal;
}