/* Algo:

- radix = base of a number
- We basically sort the array of numbers based on their digits placewise
  RELATIVE ORDER will be same if digits are same
- First, iterate units place and sort the array based on digits
- Repeat with tens place, then with hundreds place....

- Radix sort is a non-comparative integer sorting algorithm that sorts data with integer keys by grouping 
  the keys by the individual digits which share the same significant position and value.
- In practical implementations, radix sort is often faster than other comparison-based sorting algorithms, 
  such as quicksort or merge sort, for large datasets, especially when the keys have many digits. However, 
  its time complexity grows linearly with the number of digits, and so it is not as efficient for small datasets.
- Works best when numbers are non-negative integers. For negative numbers, additional handling is required.


TC: 
O(d * (n + b)), where d is the number of digits, n is the number of elements, and b is the base of the number
system being used.

SC:
O(n + b), where n is the number of elements and b is the base of 
the number system. This space complexity comes from the need to create buckets for each digit value and to copy 
the elements back to the original array after each digit has been sorted. 

Implementation:

    Trick to know no of digits in the largest number:

    console.log(Math.floor(Math.log10(1234)) + 1) // 4
    console.log(Math.floor(Math.log10(123)) + 1)  // 3
    console.log(Math.floor(Math.log10(12)) + 1)   // 2
    console.log(Math.floor(Math.log10(1)) + 1)    // 1 

Example Walkthrough:

- Maintain separate buckets for each place, worst case, we need d buckets for maxDigits = d unique
- buckets will be corresponding to digits , ex: bucket 0 = digit 0
                                                bucket 1 = digit 1
- Simply push numbers inside these buckets based on current digit                             
- Buckets help us to preserve relative order

Input Array => [170, 45, 75, 90, 802, 24, 2, 66]

Step 1: Sort by Ones Place

            Buckets:

            0: [170, 90]
            2: [802, 2]
            4: [24]
            5: [45, 75]
            6: [66]

            Collected: [170, 90, 802, 2, 24, 45, 75, 66]

Step 2: Sort by Tens Place

            Buckets:

            0: [802, 2]
            2: [24]
            4: [45]
            6: [66]
            7: [170, 75]
            9: [90]

            Collected: [802, 2, 24, 45, 66, 170, 75, 90]

Step 3: Sort by Hundreds Place

            Buckets:

            0: [2, 24, 45, 66, 75, 90]
            1: [170]
            8: [802]

            Collected: [2, 24, 45, 66, 75, 90, 170, 802]

Final Output => [2, 24, 45, 66, 75, 90, 170, 802]

*/

function getDigitsInLargestNumber(a: number[]): number {
    let maxDigits: number = Number.MIN_SAFE_INTEGER;

    a.forEach((ele) => {
        if((Math.floor(Math.log10(Math.abs(ele))) + 1) >= maxDigits) maxDigits = Math.floor(Math.log10(Math.abs(ele))) + 1;
    });

    return maxDigits;
}

function getDigitAtPlace(n: number, place: number): number {
    return (Math.floor(Math.abs(n) / Math.pow(10, place)) % 10);
}

function radixSort(a: number[]): number[] {

    let maxDigits: number = getDigitsInLargestNumber(a);
    let combinedBucket: number[] = [];

    // outer loop represents digit positions from units --- till we have
    for(let place = 0; place < maxDigits; place++) {

        // Create 10 buckets for digits 0-9, we need to initialise buckets for every digit iteration
        let buckets: number[][] = Array.from({ length: 10 }, () => []); // each element is an array of array

        // Iterate the input array and fill the buckets with respective elements
        for(let num of a) {
            let digit: number = getDigitAtPlace(num, place);
            buckets[digit].push(num);
        }

        // join the buckets together each time
        combinedBucket = buckets.flat();
        // Another way => combinedBucket = ([] as number[]).concat(...buckets); 
        // Spread operator used here to pass elements of buckets, which are arrays to concatenate them
    }

    return combinedBucket;
}