/* Used for data set uniformly distributed from [0 - 1]

a = [0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94]

ALGO:
- Create 10 buckets to denote digits [0-9]
- Iterate the array, extract the first digit after decimal, store it in the corresponding bucket
  Ex: 0.12 => first digit after decimal = 1, so it will be stored in bucket 1.
- Now, keep pushing all digits in their corresponding buckets
- Sort every individual bucket, apply a sorting algo (insertion sort)
- join all buckets and return as final answer

                                    Segregate into buckets:

0      -        []
1      -        [0.12, 0.17]
2      -        [0.21, 0.23, 0.26]
3      -        [0.39]
4      -        []
5      -        []
6      -        [0.68]
7      -        [0.72, 0.78]
8      -        []
9      -        [0.94]

                                    Sort individual buckets

0      -        []
1      -        [0.12, 0.17]
2      -        [0.21, 0.23, 0.26]
3      -        [0.39]
4      -        []
5      -        []
6      -        [0.68]
7      -        [0.72, 0.78]
8      -        []
9      -        [0.94]

Merge all buckets and return as answers => [0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94]


Worst Case TC: O(n^2) 
The worst case happens when one bucket gets all the elements. In this case, we will be running insertion 
sort on all items which will make the time complexity as O(n^2). We can reduce the worst case time complexity 
to O(n Log n) by using a O(n Log n) algorithm like Merge Sort or Heap Sort to sort the individual buckets, 
but that will improve the algorithm time for cases when buckets have small number of items as insertion sort 
works better for small arrays.

Best Case TC : O(n) The best case happens when every bucket gets equal number of elements. 

let each bucket have k elements, insertion sort takes O(k^2) worst case
Now, best case comes when all buckets just have 1 element =>  WHEN K = 1
k = (n / (no of buckets))
k = n/b

Now, worst case of insertion sort = O(k^2)

Total TC = no of buckets * worst/best TC for each bucket
                       b * O((n/b) ^ 2)

when k = 1 => n = b

=> b OR O(b) = O(n)

Auxiliary Space: O(n + b)
Max space when all n elements are in single bucket, SC =>  (b buckets + n elements) + output array: O(n)  => O(n)*/

function insertionSortIterative(a: number[]): number[] {
    let n: number = a.length;

    // corner case
    if(n <= 1) return a;

    for(let i = 1; i < n; i++) {
        let j: number = i;

        while(((j - 1) >= 0) && (j >= 0) && (a[j] < a[j - 1])) {
            [a[j], a[j - 1]] = [a[j - 1], a[j]];
            j--;
        }
    }

    return a;
}

function bucketSort(a: number[]): number[] {
    let ans: number[] = [];
    let n: number = a.length;

    if(n <= 1) return a;  // already sorted 

    let bucket: number[][] = Array.from({length: 10}, () => []);

    // extract first digit after decimal and store the element in corresponding bucket
    a.forEach((ele) => {
        let digitExtracted: number = Math.floor(ele * 10);
        bucket[digitExtracted].push(ele);
    });

    // sort individual buckets using insertion sort
    for(let i = 0; i < bucket.length; i++) {
        // sort bucket if it is non-empty
        if(bucket[i].length) bucket[i] = insertionSortIterative(bucket[i]);
    }

    // join all buckets and return the ans[]
    bucket.forEach((ele) => {
        if(ele.length) ans.concat(ele);
    });

    return ans;
}