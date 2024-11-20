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

Final Output => [2, 24, 45, 66, 75, 90, 170, 802]  */

function getDigitsInLargestNumber(a: number[]): number {
    if (a.length === 0) return 0; // Handle empty array edge case

    let maxDigits: number = 0;

    a.forEach((ele) => {
        const digits = Math.floor(Math.log10(Math.abs(ele))) + 1;
        if (digits > maxDigits) maxDigits = digits;
    });

    return maxDigits;
}

function getDigitAtPlace(n: number, place: number): number {
    return Math.floor(Math.abs(n) / Math.pow(10, place)) % 10;
}

function radixSort(a: number[]): number[] {
    if (a.length <= 1) return a; // Handle small arrays (already sorted)

    const maxDigits: number = getDigitsInLargestNumber(a);
    let combinedBucket: number[] = a; // Start with the original array since in for loop we are iterating combined array only

    for (let place = 0; place < maxDigits; place++) {
        // Create 10 buckets for digits 0-9
        let buckets: number[][] = Array.from({ length: 10 }, () => []);

        // Fill the buckets based on the current digit
        for (let num of combinedBucket) {
            const digit: number = getDigitAtPlace(num, place);
            buckets[digit].push(num);
        }

        // Flatten the buckets into the combined bucket
        combinedBucket = buckets.flat();
    }

    // Separate negative and non-negative numbers for final output
    const negatives = combinedBucket.filter(num => num < 0).reverse(); // Reverse negatives for correct order
    const nonNegatives = combinedBucket.filter(num => num >= 0);

    return [...negatives, ...nonNegatives];
}

// STRING INPUTS:

function getMaxStringLength(arr: string[]): number {
    if (arr.length === 0) return 0; // Handle empty array edge case

    let maxLength = 0;

    arr.forEach((str) => {
        if (str.length > maxLength) maxLength = str.length;
    });

    return maxLength;
}

function getCharAtPlace(str: string, place: number, maxLength: number): string {
    // Treat shorter strings as having "empty" characters (less than any character)
    const adjustedIndex = maxLength - place - 1; // Start from the rightmost character
    return adjustedIndex >= 0 ? str[adjustedIndex] : ''; // Return '' if the index is out of bounds
}

function radixSortStrings(arr: string[]): string[] {
    if (arr.length <= 1) return arr; // Handle small arrays (already sorted)

    const maxLength = getMaxStringLength(arr);
    let combinedBucket = [...arr]; // Start with the original array

    for (let place = 0; place < maxLength; place++) {
        // Create 27 buckets (26 for 'a'-'z' and 1 for empty characters '')
        let buckets: string[][] = Array.from({ length: 27 }, () => []);

        for (const str of combinedBucket) {
            const char = getCharAtPlace(str, place, maxLength);
            const bucketIndex = char === '' ? 0 : char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
            buckets[bucketIndex].push(str);
        }

        // Flatten the buckets into the combined bucket
        combinedBucket = buckets.flat();
    }

    return combinedBucket;
}

console.log(radixSortStrings(['-12', '20', '200', '120']))