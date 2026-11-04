/* It is a variation of insertion sort.
Instead of comparing all elements in inner loop of insertion sort, we compare the distant elements
away by 'gap'. Standard gap = Math.floor(n/2)

There are many other optimised gaps but here just to know the algo, gap = n/2 is taken
Also, i - gap check is not there in the standard algo

Note: When gap = 1, shell sort = insertion sort only but when n = 1, till that time,
      elements have been sorted mostly, so we need relatively less swaps

DRY RUN:
          0   1   2   3  4   5  6  7  8
let a = [23, 29, 15, 19, 31, 7, 9, 5, 2]  n = 9

gap = 9/2 = 4
i = 0,  j = (0 + 4) = 4

           0   1   2   3   4   5   6   7   8
         [23, 29, 15, 19, 31, 07, 09, 05, 02]   a[i] <= a[j] => no swap needed
           i               j


           0   1   2   3   4   5   6   7   8
         [23, 29, 15, 19, 31, 07, 09, 05, 02]  a[i] > a[j] => swap
               i               j

           0   1   2   3   4   5   6   7   8
         [23, 07, 15, 19, 31, 29, 09, 05, 02]  a[i] > a[j] => swap
                   i               j

           0   1   2   3   4   5   6   7   8
         [23, 07, 09, 19, 31, 29, 15, 05, 02]  a[i] > a[j] => swap
                       i               j

           0   1   2   3   4   5   6   7   8
         [23, 07, 09, 19, 02, 29, 15, 05, 31]  a[i] > a[j] => swap
                           i               j
         when (i - gap) >= 0 && (swap happened), we also check if i can be swapped with (i - gap)

           0   1   2   3   4   5   6   7   8
         [23, 07, 09, 19, 02, 29, 15, 05, 31]  a[i-gap] > a[i] => swap
    (i - gap)             i               j 

         We check after swap only to ensure we swap updated value again, not existing one
    
    
           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 19, 23, 29, 15, 05, 31]  
     (i - gap)             i               j      



gap = 4/2 = 2
i = 0,  j = (0 + 2) = 2

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 19, 23, 29, 15, 05, 31]   a[i] <= a[j] => no swap needed
           i       j

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 19, 23, 29, 15, 05, 31]   a[i] <= a[j] => no swap needed
               i       j

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 19, 23, 29, 15, 05, 31]   a[i] <= a[j] => no swap needed
                   i       j

         (i - gap) >= 0, but no swap, so don't check (i - gap)

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 19, 23, 29, 15, 05, 31]   a[i] <= a[j] => no swap needed
                       i       j

        (i - gap) >= 0, but no swap, so don't check (i - gap)

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 19, 23, 29, 15, 05, 31]   a[i] > a[j] => swap
                           i       j

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 19, 15, 29, 23, 05, 31]   a[i] > a[j] => swap
             (i - gap)     i       j

        when (i - gap) >= 0 && (swap happened), we also check if i can be swapped with (i - gap),
        15 > 9 here, so no swap needed as such

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 19, 15, 29, 23, 05, 31]   a[i] > a[j] => swap
                               i       j

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 19, 15, 05, 23, 29, 31]   a[i - gap] > a[i] => swap
                    (i - gap)  i       j

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 05, 15, 19, 23, 29, 31]   
                    (i - gap)  i       j

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 05, 15, 19, 23, 29, 31]   a[i] < a[j] => no swap
                                   i       j
gap = 2/2 = 1
i = 0,  j = (0 + 1) = 1

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 05, 15, 19, 23, 29, 31]   a[i] < a[j] => no swap
           i   j

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 05, 15, 19, 23, 29, 31]   a[i] < a[j] => no swap
               i   j

           0   1   2   3   4   5   6   7   8
         [02, 07, 09, 05, 15, 19, 23, 29, 31]   a[i] > a[j] => swap
                   i   j

           0   1   2   3   4   5   6   7   8
         [02, 07, 05, 09, 15, 19, 23, 29, 31]   a[i-gap] > a[i] => swap
           (i - gap)i   j

           0   1   2   3   4   5   6   7   8
         [02, 05, 07, 09, 15, 19, 23, 29, 31]   a[i] < a[j] => no swap 
                       i   j

           0   1   2   3   4   5   6   7   8
         [02, 05, 07, 09, 15, 19, 23, 29, 31]   a[i] < a[j] => no swap 
                           i   j

           0   1   2   3   4   5   6   7   8
         [02, 05, 07, 09, 15, 19, 23, 29, 31]   a[i] < a[j] => no swap 
                               i   j

           0   1   2   3   4   5   6   7   8
         [02, 05, 07, 09, 15, 19, 23, 29, 31]   a[i] < a[j] => no swap 
                                   i   j

           0   1   2   3   4   5   6   7   8
         [02, 05, 07, 09, 15, 19, 23, 29, 31]   a[i] < a[j] => no swap 
                                       i   j
gap = 1/2 = 0 STOP, since gap = 0 now

TC: O(nlogn)
    - outer loop -> logn since we halve till n = 1
    - inner loop -> when gap = 1, we traverse full array of len = n

    when gap = 1 restricted, worst case = O(n ^ 2)
   
SC: O(1) since no additional space is used */

function shellSort(a: number[]): number[] {
    let n: number = a.length;
    
    // corner case
    if(n <= 1) return a;

    let gap: number;
    for(gap = Math.floor(n/2); gap >= 1; gap = Math.floor(gap/2)) {

        let i: number = 0;
        let j: number = i + gap;

        while(j < n) {

            if(a[i] > a[j]) {
                
                [a[i], a[j]] = [a[j], a[i]];  //swap

                // possibility of checking (i - gap) only if there is a swap
                if((i - gap) >= 0) {
                    if(a[i - gap] > a[i]) [a[i - gap], a[i]] = [a[i], a[i - gap]];  //swap
                }
            }

            i++;
            j++;
        }

    }

    return a;
}