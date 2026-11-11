/* Given an array, arr[] and an integer x, return true if there exists a pair of elements 
in the array whose absolute difference is x,  otherwise, return false.

Input: arr[] = [5, 20, 3, 2, 50, 80], x = 78
Output: true
Explanation: The pair (2, 80) has an absolute difference of 78.

Input: arr[] = [90, 70, 20, 80, 50], x = 45
Output: false
Explanation: No pair of elements has an absolute difference of 45.

Way-1: Brute force
- Two loops and try out each pair

TC: O(n^2)
SC: O(1)

Way-2: Sort + two pointers
- Sort in asc >> leftPointer = 0 && rightPointer = (n - 1)
- difference = (rightPointer - leftPointer)
- if(difference === target) return true
- if(difference < target) leftPointer++ 
- if(difference > target) rightPointer-- 

TC: O(nlogn)
SC: O(n)

Way-3: Hash set
- Iterate the array
- if set.has(target + a[i]) return true
- else set.add(a[i]);

NOTE: Sum is symmetric, Subtraction is not symmetric
      There are two conditions here

      Problem	        Condition	 Partners for a given num
      ----------------------------------------------
      Two Sum	        a + num = x	   a = (x - num)
      Pair difference   |a - num| = x  a =  (num + x) OR (num - x)


TC: O(n)
SC: O(n)
*/

function findPair(arr, x) {
    
    let st = new Set();
    
    for (let num of arr) {
        
        // Check if complement exists
        if (st.has(num + x) || st.has(num - x)) {
            return true;
        }
        
        st.add(num);
    }
    
    return false;
}