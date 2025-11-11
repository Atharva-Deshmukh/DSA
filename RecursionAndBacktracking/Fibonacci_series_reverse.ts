/*  
Input: N = 5    Output: 3 2 1 1 0

Input: N = 10   Output: 34 21 13 8 5 3 2 1 1 0

Iterative: get the series first and then simply reverse it


TC: O(n) + O(n) = O(n)
SC: O(1) 
*/

function N_FiboncacciREV_it(n: number): number[] {
    if(n <= 1) return [0];
    if(n === 2) return [0, 1];

    let ans = [0,1];

    for(let i = 2; i < n; i++) {
        let next: number = ans[i-2] + ans[i-1];
        ans.push(next);
    }

    ans.reverse();
    return ans;
 }
 
 /* Recursive                 0,1,1,2,3,5,8,13,21,34,55,89

    f(5, 0, 1)                  --> [3,2,1,1,0]
          \
       f(4, 1, 1)               --> [3,2,1,1]
            \
        f(3, 1, 2)              --> [3,2,1]
              \
            f(2, 2, 3)          --> [3,2]
                \
                f(1, 3, 5)      --> [3] 

    TC: O(n)
    SC: O(n) 
 */

    function N_Fibonacci_REV_rec(n: number, f1: number, f2: number): number[] {
      if (n === 1) {
        return [f1];
      }

      let prevArr: number[] = N_Fibonacci_REV_rec(n - 1, f2, f1 + f2);
      prevArr.push(f1)
      return prevArr;
    }

    let n: number = 5;
    console.warn(N_Fibonacci_REV_rec(n, 0, 1));

