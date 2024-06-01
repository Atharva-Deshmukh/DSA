/* We cannot go with O(n^2) solution since if n = 10^5, we get TC = O(10^10) which gives TLE

- we know that while finding LIS, our array will be sorted, we can use Binary Search Algo'

A Niave but different Logic:
- Iterate the array and at each time create a new LIS[] to store the possible LIS
- check every element in the array, if it fits the currently created LIS[]s, push in one of them, create a new LIS[]
- Finally, get the LIS[] with largest length

let arr = [-1, 3, 2, 4, 6, 5]
ele = -1
[-1]

ele = 3
[-1, 3] can be added to same LIS

ele = 2
[-1,3]
[-1, 2]  new LIS[] needs to be created

ele = 4
[-1,3,4] can be added to same LIS
[-1, 2]  

ele = 6
[-1,3, 4, 6] can be added to same LIS
[-1, 2]  

ele = 5
[-1,3, 4, 6]
[-1, 2, 5] need to be added hare

TC: O(n)
SC: O(n*k) k sized arrays are formed for each n elements, worst case

------------------------------------------------------------------------
BETTER APPROACH using Binary Search:
------------------------------------------------------------------------
- Note that this approach only gives the length since we are concerned only with the length, above approach can
  give LIS
- Instead of creating a new possible LIS[] every time, we can reuse the same LIS

let arr = [1,7,8,4,5,6,-1,9]

ele = 1
LIS = [1]

ele = 7
LIS = [1, 7]

ele = 8
LIS = [1, 7, 8]

ele = 4
we are just concerned about the length, so we can rewrite the same LIS to save some space
replace 7 with 4 since we can anyway figure out that 7 was there since we have 8 after it
NOTE: WE REPLACED smallest number arr[i] >= key => lower bound Binary Search
LIS = [1, 4, 8]

ele = 5
8 >= 5, hence replace 8
LIS = [1, 4, 5]

ele = 6, no lower bound present, so it can be added directly
LIS = [1, 4, 5, 6]

ele = -1
1 >= -1, hence replace 1
LIS = [-1, 4, 5, 6]

ele = 9 No,LB PRESENT, so can be added directly
LIS = [-1, 4, 5, 6, 9]

TC: O(n * log2(n))
SC: O(n) worst case, whole array is the LIS
*/

function lowerBoundIndexInLIS(LIS: number[], key: number): number {
    let n = LIS.length;
    if(n === 0) return -1;
    if(n === 1 && LIS[0] >= key) return 0;

    let low: number = 0;
    let high: number = n - 1;
    let ans: number = n;  //hypothetical initially

    while(low <= high) {
        let mid: number = low + Math.floor((high - low)/2);
        if(key <= LIS[mid]) {
            ans = (mid < ans)? mid: ans;
            high = mid - 1;
        }
        else if(key > LIS[mid]) low = mid + 1;
    }

    return ans;
}

function LIS_BinarySearch(arr: number[]): number {
    let LIS: number[] = [];

    arr.forEach((ele: number) => {

        // if the array is empty, push the current element
        if(LIS.length === 0) LIS.push(ele);

        // get lower bound index in the LIS[]
        let lbIndex: number = lowerBoundIndexInLIS(LIS, ele);
        if(lbIndex >= LIS.length) LIS.push(ele);  // if there is no element in the LIS[] to be replaced, simply add this element in the LIS[]
        else LIS.splice(lbIndex, 1, ele);         // else simply replace the lbIndex element of LIS[] with the current element
    });

    return LIS.length;
}