/*  Given an integer array nums, in which exactly two elements appear only once and all the other elements appear 
    exactly twice. Find the two elements that appear only once. You can return the answer in any order.
    You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

    Input: nums = [1,2,1,3,2,5]     Output: [3,5]  || [5, 3] is also a valid answer.
    Input: nums = [-1,0]            Output: [-1,0]
    Input: nums = [0,1]             Output: [1,0]

Way 1: Map solution

TC: O(len)
SC: O(no.of unique elements) 

Way 2: Bit wise
- XOR all elements in the array, we are left with XOR(two distince elements in the array)
- Now, separate the two numbers from their XOR 
- get the rightmost set bit and create two buckets a & b.
- a stores all numbers that have this rightmost bit set
- b stores all numbers that have this rightmost bit NOT set
- now iterate the array again and now, and XOR while storing, so duplicates get eliminated and we are left with
  two unique numbers

TC: O(len)
SC: O(1) constant space for two buckets 
*/

function singleNumber3(a: number[]): number[] {
    let buckets: number[] = [0,0];  //first element stores all set bits 

    let XOR = a.reduce((acc, val) => acc = acc ^ val, 0);
    let rightMostSetBit = (XOR & (XOR - 1)) ^ XOR;

    a.forEach((num) => {
        // if the rightmost bit is set for the current number, put it in bucket 1, else in bucket 2
        if(num & rightMostSetBit) buckets[0] = buckets[0] ^ num;
        else buckets[1] = buckets[1] ^ num;;
    });

    return buckets;
}


