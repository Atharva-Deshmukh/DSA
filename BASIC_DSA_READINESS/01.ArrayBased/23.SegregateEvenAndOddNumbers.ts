/* Segregate Even and Odd numbers (GFG, sorted version)

Given an array arr, put all EVEN numbers first in sorted order, then all ODD numbers in sorted order.
Modify the array in-place (returns nothing).

Input : [12, 34, 45, 9, 8, 90, 3]
Output: [8, 12, 34, 90, 3, 9, 45]

Input : [0, 1, 2, 3, 4]
Output: [0, 2, 4, 1, 3]

Input : [10, 22, 4, 6]
Output: [4, 6, 10, 22]

Constraints: 1 <= n <= 10^6, 0 <= arr[i] <= 10^5   (non-negative values, 0 is even)

Note: the simpler version (no sorting needed) is just a Hoare partition on parity, O(n) time, O(1) space.
      Here we additionally need each group sorted.

Way-1: Brute force => two arrays   TC: O(n log n), SC: O(n)
       collect evens, collect odds, sort both, write back evens then odds

Way-2: One sort with a custom comparator   TC: O(n log n)
       compare by parity first (even before odd), then by value
       compare(x, y) = (x % 2 - y % 2) || (x - y)
       Shortest code, good for an interview if time is short

Way-3: Partition by parity + sort both parts  <-- Interview expected   TC: O(n log n), SC: O(1) extra*
       1. Hoare partition (l, r pointers) => evens on left, odds on right, k = number of evens
       2. sort a[0...k-1] and sort a[k...n-1]
       Same O(n log n), but partitioning first makes both sorts smaller.
       (*) in C++ std::sort(a.begin(), a.begin() + k) sorts the range in-place,
           JS has no range sort, so here we slice, sort and copy back

Way-4: Counting sort, because values are small (<= 10^5)   TC: O(n + maxVal), SC: O(maxVal)   <-- Optimal here
       count[v] = occurrences of v
       write every even v in increasing order (count[v] times), then every odd v in increasing order
       For n = 10^6 and values <= 10^5 this beats O(n log n)

       Dry run: a = [12, 34, 45, 9, 8, 90, 3]
       count has 1 at indices 3, 8, 9, 12, 34, 45, 90
       evens in increasing order: 8, 12, 34, 90
       odds in increasing order : 3, 9, 45
       result = [8, 12, 34, 90, 3, 9, 45]

       Works only because the values are non-negative and bounded, otherwise use Way-3.

Dry run of Way-3: a = [12, 34, 45, 9, 8, 90, 3]      l = 0, r = 6

       l skips evens 12, 34 and stops at 45 (index 2, odd)
       r skips 3 (odd) and stops at 90 (index 5, even)
       swap(45, 90) => [12, 34, 90, 9, 8, 45, 3],  l = 3, r = 4

       l stops at 9 (index 3, odd)
       r stops at 8 (index 4, even)
       swap(9, 8)   => [12, 34, 90, 8, 9, 45, 3],  l = 4, r = 3  => crossed, loop ends

       l = 4 is the first odd, so k = 4 evens => a[0...3] = evens, a[4...6] = odds
       sort a[0...3] => [8, 12, 34, 90],  sort a[4...6] => [3, 9, 45]
       result = [8, 12, 34, 90, 3, 9, 45]

*/

// Way-1: two arrays
function segregateEvenOdd_ExtraArrays(a: number[]): void {
    const even: number[] = [];
    const odd: number[] = [];

    for (const x of a) {
        if (x % 2 === 0) even.push(x);
        else odd.push(x);
    }

    even.sort((x, y) => x - y);
    odd.sort((x, y) => x - y);

    let idx = 0;
    for (const x of even) a[idx++] = x;
    for (const x of odd) a[idx++] = x;
}

// Way-2: single sort with comparator
function segregateEvenOdd_Comparator(a: number[]): void {
    a.sort((x, y) => (x % 2 - y % 2) || (x - y));
}

// Way-3: Hoare partition on parity, then sort both parts
function sortRange(a: number[], l: number, r: number): void {
    const part = a.slice(l, r + 1).sort((x, y) => x - y);
    for (let i = 0; i < part.length; i++) a[l + i] = part[i];
}

function segregateEvenOdd_PartitionAndSort(a: number[]): void {
    let l = 0, r = a.length - 1;

    while (l < r) {
        while (l < r && a[l] % 2 === 0) l++;   // stop at first odd from left
        while (l < r && a[r] % 2 === 1) r--;   // stop at first even from right

        if (l < r) {
            [a[l], a[r]] = [a[r], a[l]];
            l++;
            r--;
        }
    }

    // l now points to the first odd element (or past the end if all are even)
    const k = (l < a.length && a[l] % 2 === 0) ? l + 1 : l;

    sortRange(a, 0, k - 1);
    sortRange(a, k, a.length - 1);
}

// Way-4: counting sort, O(n + maxVal)
function segregateEvenOdd_CountingSort(a: number[]): void {
    let max = 0;
    for (const x of a) if (x > max) max = x;

    const count = new Array<number>(max + 1).fill(0);
    for (const x of a) count[x]++;

    let idx = 0;
    for (let v = 0; v <= max; v += 2) {          // evens in increasing order
        for (let c = count[v]; c > 0; c--) a[idx++] = v;
    }
    for (let v = 1; v <= max; v += 2) {          // odds in increasing order
        for (let c = count[v]; c > 0; c--) a[idx++] = v;
    }
}
