/*  Intersection of two Arrays - Arrays may have duplicates, but answer should have unique values
    349. Intersection of Two Arrays

Input: a[] = [1, 2, 1, 3, 1], b[] = [3, 1, 3, 4, 1]
Output: [1, 3]

Input: a[] = [1, 1, 1], b[] = [1, 1, 1, 1, 1]
Output: [1]

Input: a[] = [1, 2, 3], b[] = [4, 5, 6]
Output: []

Way-1: Brute Force
- for each element in first array -> check all elements in second array
- if a[i] === b[j] intersection.push(a[i])
- answer should be a Set()

TC: O(m * n)
SC: O(k)

Way-2: Sorting + 2 pointers
- Sort both arrays - duplicates are not consequtive
- Use two pointers and iterate both arrays

    const intersection: number[] = [];

    while (i < a.length && j < b.length) {
    
        if (a[i] === b[j]) {

            // push only if not already pushed (duplicates are consecutive)
            if (intersection[intersection.length - 1] !== a[i]) {
                intersection.push(a[i]);
            }

            i++;j++;

        } else if (a[i] < b[j]) {
            i++;
        } else {
            j++;
        }
    }

TC: O(m * logm) + O(n * logn)
SC: O(1)

---------------------------------------------------------------------------------------------
Variant here: When both arrays are already sorted

Way-1: Way-2 above => Sorting + two pointers

Optimial way: Binary search
- Search each element of array1 in array2 using binary search
- Put in ans only if not already inserted

            if (intersection[intersection.length - 1] !== a[i]) {
                intersection.push(a[i]);
            }

TC: O(n log m)
SC: O(1)
---------------------------------------------------------------------------------------------

Way-3: Set
- Iterate first array and populate set
- Iterate second array and log those values which repeat
- After logging, delete that key from set so that duplicates won't be printed again

    const set = new Set(a);
    const result: number[] = [];
    for (const x of b) {
        if (set.has(x)) {
            result.push(x);
            set.delete(x);   // prevents duplicate output
        }
    }

TC: O(m + n)
SC: O(min(m, n)) - If the first array taken is the smaller

-----------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------
Intersection of two Arrays - Arrays may have duplicates, answer can also have duplicates
350. Intersection of Two Arrays II
We can also say the exact common part is to be returned

Given two integer arrays nums1 and nums2, return an array of their intersection. 
Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Explanation: [9,4] is also accepted.

Way-1: Brute Force
- Run outer loop over smaller array always
- For each element in a[], search it in b[] and the moment first instance of a[] is found in b[] - push in ans[]
- Note: maintain a visited[] for larger array so that exact number of elements are considered always

    function intersect(a: number[], b: number[]): number[] {
        
        // outer loop over the smaller array
        // if a > b, put b[] in a[] and put a[] in b[] 
        if (a.length > b.length) [a, b] = [b, a];

        const n1 = a.length; 
        const n2 = b.length; 

        let ans = [];
        let visited = new Array(n2).fill(false);

        for (let i = 0; i < n1; i++) {
            for (let j = 0; j < n2; j++) {
                if ((a[i] === b[j]) && (visited[j] === false)) {
                    ans.push(a[i]);
                    visited[j] = true;
                    break;
                }
            }
        }

        return ans;
    }

TC: O(m * n)
SC: O(max(m, n))

Way-2: Sort + 2 pointers

    function intersect(a: number[], b: number[]): number[] {
        const n1 = a.length; 
        const n2 = b.length; 
        let ans = [];

        a = a.sort((m, n) => m - n);
        b = b.sort((m, n) => m - n);
        
        let i = 0, j = 0;
        while((i < n1) && (j < n2)) {
            if(a[i] === b[j]) {
                ans.push(a[i]);
                i++;
                j++;
            }
            else if(a[i] < b[j]) i++;
            else j++;
        }

        return ans;
    };

TC: O(mlogm + nlogn)
SC: O(1)

Way-3: Map
- Just take care when value becomes 0

    function intersect(a: number[], b: number[]): number[] {
        const n1 = a.length; 
        const n2 = b.length; 
        let ans = [];
        let map = new Map();

        // populate map with a[]
        for(let val of a) {
            if(!map.has(val)) map.set(val, 1);
            else map.set(val, map.get(val)! + 1);
        }

        // Iterate b and whenever we find b's value in map
        // put in answer and mapCount-- in map to avoid duplicate
        // take care of map's 0 value
        for(let val of b) {
            if(map.get(val) > 0) {
                ans.push(val);
                map.set(val, map.get(val)! - 1);
            }
        }

        return ans;
    };

TC: O(m + n)
SC: O(max(m, n))

*/