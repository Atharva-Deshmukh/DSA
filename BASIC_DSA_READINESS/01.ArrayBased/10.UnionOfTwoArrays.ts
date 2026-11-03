/* Unsorted elements with Distint/Duplicates


Input: a[] = [1, 2, 3, 2, 1], b[] = [3, 2, 2, 3, 3, 2]
Output: [1, 2, 3]

Input: a[] = [1, 2, 3], b[] = [4, 5, 6] 
Output: [1, 2, 3, 4, 5, 6]

Input: a[] = [1, 2, 1, 1, 2], b[] = [2, 2, 1, 2, 1] 
Output: [1, 2]

Way-1: Set()
- Iterate both arrays and put everything in a Set
- print the set

TC: O(m + n)
SC: O(m + n) - when arrays have nothing in common

Way-2: Sorting + 2 pointers - Merging two sorted arrays logic
       This is also the merge step of merge sort

- Iterate both arrays and put everything in a Set
- print the set

TC: O(mlogm + nlogn)
SC: O(1) - if ans[] is not considered

        findUnion(a, b) {
            
            const n1 = a.length;
            const n2 = b.length;
            
            a = a.sort((m, n) => m - n);
            b = b.sort((m, n) => m - n);
            
            let ans = [];
            
            let i = 0, j = 0;
            while((i < n1) && (j < n2)) {
                
                if(a[i] === b[j]) {
                    if(ans[ans.length - 1] !== a[i]) ans.push(a[i]);
                    i++;
                    j++;
                }
                else if(a[i] < b[j]) {
                    if(ans[ans.length - 1] !== a[i]) ans.push(a[i]);
                    i++;
                }
                else {
                    if(ans[ans.length - 1] !== b[j]) ans.push(b[j]);
                    j++;
                }
                
            }
            
            while(i < n1) {
                if(ans[ans.length - 1] !== a[i]) ans.push(a[i]);
                i++;
            }
            
            while(j < n2) {
                if(ans[ans.length - 1] !== b[j]) ans.push(b[j]);
                j++;
            }
            
            return ans;
            
        }

When questions = Union of two sorted arrays => way-2 above becomes best approach for it


*/