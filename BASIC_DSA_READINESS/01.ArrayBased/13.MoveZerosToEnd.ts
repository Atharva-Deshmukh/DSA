/* 283. Move Zeroes

Input: arr[] = [1, 2, 0, 4, 3, 0, 5, 0]
Output: [1, 2, 4, 3, 5, 0, 0, 0]

Input: arr[] = [10, 20, 30]
Output: [10, 20, 30]

Input: arr[] = [0, 0]
Output: [0, 0]

Way-1: Brute force
- Iterate array and keep putting non-zeros in extra array
- Now after original array is fully traversed, fill all elements in extra array with 0s

TC: O(n)
SC: O(n)

Way-2: Two pass algo

    Pointer count = marks where the next non-zero belongs.
    Pointer i     = Iterates the array

    Pass 1: Scan with i. When arr[i] != 0, arr[i] = arr[count]; count++;
            After first pass, every non-zero element is moved left -> count is now at place from where 0s should start.
    Pass 2: Iterate from [count -- (n - 1)] and fill with 0s


    i = 0:

        [1, 2, 0, 4, 3, 0, 5, 0]  count = 0
         i

       a[i] != 0
       a[count] = a[i] = 1
       count++

    i = 1:

        [1, 2, 0, 4, 3, 0, 5, 0]  count = 1
            i

       a[i] != 0
       a[count] = a[i] = 2
       count++

    i = 2:

        [1, 2, 0, 4, 3, 0, 5, 0]  count = 2
               i

       a[i] === 0
       Simply i++

    i = 3:

        [1, 2, 0, 4, 3, 0, 5, 0]  count = 2
                  i

       a[i] != 0
       a[count] = a[i] = 4
       count++

    i = 4:

        [1, 2, 4, 4, 3, 0, 5, 0]  count = 3
                     i

       a[i] != 0
       a[count] = a[i] = 3
       count++

    i = 5:

        [1, 2, 4, 3, 3, 0, 5, 0]  count = 4
                        i

       a[i] === 0
       Simply i++

    i = 6:

        [1, 2, 4, 3, 5, 0, 5, 0]  count = 5
                           i

       a[i] != 0
       a[count] = a[i] = 5
       count++

    i = 7:

        [1, 2, 4, 3, 5, 0, 5, 0]  count = 5
                              i

       a[i] === 0
       Simply i++

    Pass-2: 
            [1, 2, 4, 3, 5, 0, 5, 0]
                            c --->|    
            fill with 0s    0  0  0


TC: O(n) + O(n) = O(n)
SC: O(1) 
*/

function moveZeroes(a: number[]): void {
    const n = a.length;
    let count = 0;

    for(let i = 0; i < n; i++) {
        if(a[i] !== 0) {
            a[count] = a[i];
            count++;
        }
    }

    for(let i = count; i < n; i++) {
        a[i] = 0;
    }
}

/* Way-3: One pass - Expected
   Leetcode Follow up: Could you minimize the total number of operations done?

   Same idea as before, but swap instead of overwrite. Then no second pass is needed.

       i = 0:

        [1, 2, 0, 4, 3, 0, 5, 0]  count = 0
         i

       a[i] != 0
       swap(a[count], a[0])   (self-swap, no change)
       count++

    i = 1:

        [1, 2, 0, 4, 3, 0, 5, 0]  count = 1
            i

       a[i] != 0
       swap(a[count], a[1])   (self-swap, no change)
       count++

    i = 2:

        [1, 2, 0, 4, 3, 0, 5, 0]  count = 2
               i

       a[i] === 0
       Simply i++

    i = 3:

        [1, 2, 0, 4, 3, 0, 5, 0]  count = 2
                  i

       a[i] != 0
       swap(a[count], a[3])   (swap a[2] and a[3])
       count++

    i = 4:

        [1, 2, 4, 0, 3, 0, 5, 0]  count = 3
                     i

       a[i] != 0
       swap(a[count], a[4])
       count++

    i = 5:

        [1, 2, 4, 3, 0, 0, 5, 0]  count = 4
                        i

       a[i] === 0
       Simply i++

    i = 6:

        [1, 2, 4, 3, 0, 0, 5, 0]  count = 4
                           i

       a[i] != 0
       swap(a[count], a[6])
       count++

    i = 7:

        [1, 2, 4, 3, 5, 0, 0, 0]  count = 5
                              i

       a[i] === 0
       Simply i++

    Final: [1, 2, 4, 3, 5, 0, 0, 0]

TC: O(n)
SC: O(1)
*/

function moveZeroes(a: number[]): void {
    const n = a.length;
    let count = 0;

    for(let i = 0; i < n; i++) {
        if(a[i] !== 0) {
            [a[count], a[i]] = [a[i], a[count]];
            count++;
        }
    }
}