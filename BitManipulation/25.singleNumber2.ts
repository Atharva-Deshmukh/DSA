/*  Given an integer array nums where every element appears three times except for one, 
    which appears exactly once. Find the single element and return it.

Input: nums = [2,2,3,2]             Output: 3
Input: nums = [0,1,0,1,0,1,99]      Output: 99

Way 1: 
- use map to store frequency and return element with frequency one but this uses an extra space
TC: O(length of array)
SC: O(no.of.unique elements) */

// just to revise Map
function singleNumberMapSolution(arr: number[]): number {

    /* Remember: In JS and TS, Map objects do not support direct indexing like arrays or objects. 
       Therefore, you cannot use map[key]++  
       Use Map.set() and Map.get() instead */

    let map = new Map<number, number>();
    arr.forEach((num) => {
        if(!map.has(num)) map.set(num, 1);
        else map.set(num, map.get(num)! + 1);  // we are telling TS that the value always exist
    });

    for(let [key, val] of map) {
        if(val === 3) return key;
    }

    return -1;
}

/* Way 2:
- We can see an observation related to bit manipulation
- let arr = [5,5,5,6,4,4,4]

- in binary, they would look like
  positions                   2  1  0
                              -------
  Binary representations      1  0  1  -> 5
                              1  0  1
                              1  0  1
                              1  1  0  -> 6
                              1  0  0   
                              1  0  0
                              1  0  0  -> 4

- for position 0, number of set bits = 3 = multiple of 3, it indicates that our single number have that bit postion = 0
  had it be set, the number of set bits would not be multiples of 3

- for position 1, number of set bits = 1 = NOT A multiple of 3, it indicates that our single number have that bit postion = 1
  had it be not set, the number of set bits would be multiples of 3 

- for position 2, number of set bits = 7 = NOT A multiple of 3, it indicates that our single number have that bit postion = 1
  had it be not set, the number of set bits would be multiples of 3

- We can see that at max we need to iterate from [0th bit to 31st bit]

TC: O(len * 32)
SC: O(1)*/

function singleNumberBitSolution(a: number[]): number {
    let ans: number = 0;

    for(let bitPosition = 0; bitPosition < 32; bitPosition++) {
        let count: number = 0;

        // for this bit position, count how many numbers have that bit position set
        a.forEach((ele) => {
            if(ele & (1 << bitPosition)) count++;
        });

        // set that bit in the answer, OR is perfect as 0 ko 0 and 1 ko 1
        if(count % 3) ans = ans | (1 << bitPosition);
    }

    return ans;
}

/* OPTIMISED further using the CONCEPT OF BUCKETS, Its a MUST MEMORISE solution (Cannot derive during interview)

maintain three buckets = 0 initially

bucket 1 => ones for elements with count 1
bucket 2 => twos for elements with count 2
bucket 3 => threes

Note that, 
- If the element is not in twos already, it will go to ones
- If the element is in ones already, it will go to twos
- If the element is in twos already, it will go to threes

Now, we need to think of a bitwise operator we can use to add and remove elements as per our need from these buckets.
From (&, | and ^), & can't be used since it is not used for adding something, | or ^ can be used, but 
let twos = 2 is present, now we need to remove this 2 from twos bucket and add this into threes, this can't be done using |
since 2 | 2 will again add 2 in twos, instead 2 ^ 2 will remove this from twos and 0 ^ 2 will add 2 in threes
So finally, we will be using XOR operator 

DRY RUN:  let arr = [2,2,2,1]

- initially i = 0, the first element will ALWAYS be in ones bucket so ones = 0 ^ 2 = 2
b1 = 2
b2 = 0
b3 = 0

- i = 1, if element is not there in twos, it will go to ones, how to represent that, twos is 0 initially, so ~twos = 1
  ((nums[i] ^ ones) & (~twos))
  if it was in twos already, let nums[i] = 2 = 1 0
  So, (1 0 ^ 1 0) & ~(0 0) => (0 0) & (1 1) = 0, So, u don't push this element in twos, u push it in threes

  similarly, if the number is to be added in twos, it should be there in ones
  (nums[i] ^ twos) & (~ones)

  Note that we actually don't need threes during implentation

  return ones finally

  TC: O(len)
  SC: O(1) */

function singleNumberBucketSolution(a: number[]): number {
    let ones: number = 0;
    let twos: number = 0;

    a.forEach((num) => {
        // add it to ones if it is not in twos, for the next element in the array, if the element is same 
        // this ones line will automatically remove the element from ones since ones ^ ones = 0 and 0 & 0 = 0
        ones = (num ^ ones) & (~twos);

        // add it to twos if it is there in ones, but here we already removed it from ones, so this line works fine
        twos = (num ^ twos) & (~ones);
    });

    return ones;
}

