/* Given two numbers N and A, find N-th root of A.
Input : A = 81 N = 4
Output : 3  3^4 = 81

Way 1: Simple Linear Way
- Iterate from 1 to A and for every i, check if pow(i, n) <= A, ans = i;
- pow(i, n) > A, break
- return ans

TC: O(A * log2(n)) --> loop goes till A so A and we get TC of i ^ n using log2(n)
SC: O(1)

Way 2: USING BS using the same concept as we used in sqrt using binary search.
- there we did (mid * mid <= n) inside the if statement
- here we would need to do Math.pow(i, N)
- But, one thing to note here is that, we are calculating whole i ^ N, if i === 10 ^ 9, 
  it would be impossible to store the result

SOLUTION:
- Why do we need to calculate even the whole power, we can create a function like calc(base, N)
  keep multiplying till we reach >= M and return a flag based on that

  keep a local variable ans = 1 initially, iterate from 1 to M(the max possibility)
  at every i, ans = ans * i
  Best explained via code ;)

TC: O(N * log(M))
SC: O(1) */

// this function stops power calculation when result > M, helps when M or N is too large (10 ^ 9)
// returns custom flags to denote the situations
// This is also called binary exponentiation method
function calcPow(N: number, M: number, mid: number): number {
    let ans: number = 1;
    for(let i = 1; i <= N; i++) {
        ans = ans * mid;

        // if ans exceeds M, stop calculation 
        if(ans > M) return 2;
    }

    if(ans === M) return 1;
    // case remaining ans < M
    return 0;
}

function NthRootOfM_UsingBS(N: number, M: number): number {
    let low: number = 1;
    let high: number = M;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        if(calcPow(N, M, mid) === 1) return mid;
        else if(calcPow(N, M, mid) === 2) high = mid - 1;
        else if(calcPow(N, M, mid) === 0) low = mid + 1;
    }


    return -1;
}
