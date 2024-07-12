/* You are given a sorted array ‘arr’ of length ‘n’, which contains positive integer positions of ‘n’ gas 
stations on the X-axis. You are also given an integer ‘k’. You have to place 'k' new gas stations on the X-axis. 
You can place them anywhere on the non-negative side of the X-axis, even on non-integer positions. Let 'dist' be 
the maximum value of the distance between adjacent gas stations after adding k new gas stations. 
Find the minimum value of ‘dist’.

 N = 5, arr[] = {1,2,3,4,5}, k = 4                                  Result: 0.5

One of the possible ways to place 4 gas stations is {1,1.5,2,2.5,3,3.5,4,4.5,5}. 
Thus the maximum difference between adjacent gas stations is 0.5. Hence, the value of ‘dist’ is 0.5. 
It can be shown that there is no possible way to add 4 gas stations in such a way that the value of ‘dist’ 
is lower than this. 

 N = 10, arr[] = {1,2,3,4,5,6,7,8,9,10}, k = 1                      Result: 1

 One of the possible ways to place 1 gas station is {1,1.5,2,3,4,5,6,7,8,9,10}. 
 Thus the maximum difference between adjacent gas stations is still 1. Hence, the value of ‘dist’ is 1. 
 It can be shown that there is no possible way to add 1 gas station in such a way that the value of ‘dist’ is lower 
 than this. 

The gas stations need not be consequetive always

N = 10, arr[] = [3,6,12,19,33,44,67,72,89,95], k = 2               Result: 14.00 
Explanation: Construction of gas stations at 8th(between 72 and 89) and 6th(between 44 and 67) locations.

LOGIC: (BRUTE FORCE)

let arr[] = [1, 2, 3, 4], k = 3  Result = 0.5
Ways to add gas stations
way 1: [1, 2, 3, 4, 5, 6, 7]          -> the max distance = 1 always
way 1: [1, 1.25, 1.50, 1.75, 2, 3, 4] -> the max distance = 1 always
way 1: [1, 1.5, 2, 2.5, 3, 3.5, 4]    -> the max distance = 0.5 always --> THIS IS ANSWER

Note here that, ideally placing new gas stations between the existing ones actually reduce the max distance
instead of placing them before or after the existing gas stations

let arr[] = [1, 7], k = 2
Now, see that we cannot place the two new gas stations randomly at any index between 1 and 7, 
there would be 4 elements => 3 consequtive distances

[1, x, x, 7]

If by chance, any one of min distance is maximum, it will become answer, hence divide the distances equally
so (7 - 1) = 6 / 3 => 3
[1, 3, 5, 7] -> ans => 2 now


Let arr[] = [1, 13, 17, 23] and k = 5

there are 3 gaps, lets denote them with gaps[] = [-1, -1, -1];
Don't try to put all 5 at once, place them one by one in any gap

let diff = [12, 4, 6]

let's place 1/5  (1 of the 5ks)
Its best to place this 1/5 in gaps[0] since difference is max here and we have to MINIMISE the max difference overall

Now when we place 1/5 between [1, 13]
there will be two sections created with differences = (13-1)/(1+1)
diff[] = [6, 6, 4, 6]  if we ACTUALLY place the elements in between the existing elements, but we are not placing them

just calculate the max difference between the sections denoted by gaps[] and store it in gaps[i]

So, our code becomes
gaps[] = [1, -1, -1]
diff[] = [6, 4, 6]

for 2/5:
 
we can place it between any gaps with diff 6, so  new difference between [17, 23] becomes
(23 - 17)/(1 + 1) -> 3
gaps[] = [1, -1, 1]
diff[] = [6, 4, 3]


for 3/5: 

we will place it between the gaps with 6 since we need to MINIMISE the MAX difference

(13 - 1)/(2 + 1) -> 4
gaps[] = [2, -1, 1]
diff[] = [4, 4, 3]

for 4/5:

place it between any of the gap with difference 4, I will place it in sector 1st OR diff[1]
(17 - 13)/(1 + 1) -> 2
gaps[] = [2, 1, 1]
diff[] = [4, 2, 3]

for 5/5:

Its obvious to place it in the section[0] since it has max difference
(13 - 1)/(3 + 1) -> 3
gaps[] = [3, 1, 1]
diff[] = [3, 2, 3]

TC: o(k * n)
SC: O(1) */

function maxEleIndex(arr: number[]): number {
    let maxIndex: number = -1
    let maxEle: number = Number.MIN_SAFE_INTEGER;

    arr.forEach((ele, index) => {
        if(ele > maxEle) {
            maxEle = ele;
            maxIndex = index;
        }
    });

    return maxIndex;
}

function fillDiff(arr: number[]): number[] {
    let n: number = arr.length;

    let diff: number[] = Array(n - 1).fill(1);

    for(let i = 1; i < n; i++) diff[i] = diff[i] - diff[i - 1];

    return arr;
}

function bruteForce(stations: number[], k: number): number {
    let n: number = stations.length;
    let sections: number[] = Array(n - 1).fill(0);  // fill with 0 initially since we have to ++ it later
    let diff: number[] = fillDiff(stations);

    // place every k
    while(k > 0) {
        // decide the section where to add this k (its the one with max difference)
        let sectionIndex: number = maxEleIndex(diff);

        // increment the count to keep track of further sections created
        sections[sectionIndex]++;

        // since the sections[] and diff[] are dynamic based on the input, there size differs and it is difficult
        // to track the indices corresponding to any section, hence loop over the array every time to update diff[]
        for(let i = 1; i < n; i++) {
            diff[i-1] = (stations[i] - stations[i-1])/(1 + sections[i-1]);
        }

        k--;
    }

    return Math.max(...diff);
}

/* In the above brute force approach, we cannot avoid looping k since our entire logic depends on that
But now, we can optimise the inner loop,
We need to iterate the diff[] to get the max index every time, that can be optimised if we use a maxheap
max heap stores the largest element on top and TC for extracting it is O(log n)

It will have some space complexity and also, anyway we have to iterate whole array to get the diff[]
----------------------------------------------------------------------------------------------------------

We need to think of BS here since arr[] is sorted and we need to find max, min..

in normal BS, we generally do low = mid + 1 or high = mid - 1, but here, we require to do +0.1 or +0.11 depending
on situation, so BS needs slight modification here

The pattern for all the BS problems with double and float comparisions have the below pattern:

while((high - low) > 10^-6)   // for difference acceptable upto 6 decimal places
{
    mid = (low + high) / 2;
    low = mid;
    high = mid;
}


In most of the BS problems, we have some check() which helps us to determine the direction of elimination of half

while(low <= high) {

    mid = (low + high) / 2;

    if(check()) low = mid + 1
    else high = mid - 1
}

So, we now don't do +1 and -1, but we still need to determine on what we will apply check()

Determine the range in which we need to apply BS
low = 0 (for stations = [1, 1, 1, 1], k = 2) gas stations can also be placed on the same coordinates
high = MAX_DIFF for that array

see, we will always place the ks between the existing stations to minimise the existing max difference
so for ex stations = [1, 13, 17, 23]    --> our ans cannot be beyond 12 here
                       12   4   6

Similarly, if we take another example
so for ex stations = [1, 2, 3, 4]    --> our ans cannot be beyond 1 here 
                        1  1  1

So, for range [0, 1] for this problem, we would iterate linearly 
for(let currMax = 0; currMax <= 1; currMax++) 
BUT BUT, here we need precision upto 10^-6,
so Iterate for(let currMax = 0; currMax <= 1; currMax = currMax + 10^-6) 

Lets iterate for this example -> 
stations = [1, 2, 3, 4], k = 4

Linear search space = [0, 0.1, 0.2, 0.3, ..... 1]

0: 
 we need almost infinite gas stations here, since then only the max difference of the arr[] = 0

0.1: 
 we still need infinite gas stations (basically beyond k) if we place 1.1, 1.2, 1.3, ....
 the max difference of 1 should be reduced to 0.1

.
.
.
.
0.5:
 we can make it possible within 4 ks [1, 1.5, 2, 2,5, 3, 3.5, 4]

0.6 and beyond: 
  It is still possible, but we need minimum, so eliminate half after 0.5 to look for possibilities o 0.4999.. something  
  like this

SO, BS PATTERN HERE

if(req_gas_stations > k) 
    low = mid;       // eliminate left part
else 
    high = mid       // eliminate right part


NEXT, how to determine the number of ks requred to get the max distance of say 0.4 on the above arr[]
[1, 2, 3, 4], k = 4

[1, 1.4, 1.8, 2, 2.4, 2.8, 3, 4]

so No of gas stations to place between 1 and 2 = (2 - 1)/(0.4) = 2..something, consider only integer part

But for 0.5, (2 - 1)/(0.5) = exact 2.0 but we cannot place 2 numbers actually between 1 and 2, 
we can only place [1, 1.5, 2...]    
hence reduce 1 in this case                   

*/

// we will find the no of stations that can be placed in between every section and then add them up
// to get total no. of stations required
function kRequired(stations: number[], k: number, currentMaxDiff: number): number {
    let count: number = 0;
    let n: number = stations.length;

   for (let i = 1; i < n; i++) {
        let nosInBetween = Math.floor((stations[i] - stations[i - 1]) / currentMaxDiff);

        // Check if it's exactly divisible
        if (((stations[i] - stations[i - 1]) / currentMaxDiff )=== nosInBetween) {
            nosInBetween--;
        }

        count += nosInBetween;
    }

    return count;
}

function BS_Approach(stations: number[], k: number): number {
    let n: number = stations.length;

    let low: number = 0;
    let high: number = Number.MIN_SAFE_INTEGER;

    for(let i = 1; i < n; i++) high = Math.max(high, (stations[i] - stations[i - 1]));


    let diff: number = 1e-6;
    
    while((high - low) > diff) {
        let mid: number = (low + high) / (2.0);
        let requiredKs: number = kRequired(stations, k, mid);

        if(requiredKs > k) low = mid;
        else high = mid;
    }

    // here we are not doing low = mid + 1 like stuff, so polarity will not change as expected after loop
    // high will be the least possible Max difference here.
    return high;
}