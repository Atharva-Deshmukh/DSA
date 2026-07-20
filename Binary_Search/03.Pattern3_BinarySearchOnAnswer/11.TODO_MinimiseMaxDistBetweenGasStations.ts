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
 It can be shown that there is no possible way to add 1 gas station in such a way that the value of ‘dist’ 
 is lower than this. 

The gas stations need not be consequetive always

N = 10, arr[] = [3,6,12,19,33,44,67,72,89,95], k = 2               Result: 14.00 
Explanation: Construction of gas stations at 8th(between 72 and 89) and 6th(between 44 and 67) locations.

-----------------------------------------------------------------------------------------------------------

This is one of the hardest binary search on answers problems.
The problem is not about binary search initially. It's about understanding the greedy/brute force first. 
Once that is clear, BS becomes almost obvious.

-----------------------------------------------------------------------------------------------------------

                                                Way-1: Brute Force
                                                ------------------

What are we minimizing? --> the maximum gap after adding k stations.

Also Note here that, ideally placing new gas stations between the existing ones actually 
reduce the max distance instead of placing them before or after the existing gas stations.

Approach that must be remembered:
---------------------------------

If a gap contains m inserted stations, it gets divided into (m + 1) smaller sections.

        0 inserted stations --> A-----------B --> 1 section
        1 inserted stations --> A-----x-----B --> 2 sections
        2 inserted stations --> A---x---x---B --> 3 sections
        3 inserted stations --> A--x--x--x--B --> 4 sections

We always place the new gas station in the middle of the CURRENT LARGEST section
to minimise the maximum distance.

Suppose the original gap is:

        1---------------------------13

Original gap length = (13 - 1) = 12

0 inserted stations:
--------------------
        1-----------13

        Sections = 1

        Max gap = (13 - 1) / (0 + 1)
                = 12 / 1
                = 12


1 inserted station:
-------------------
        1-----x-----13

        Sections = 2

        Max gap = (13 - 1) / (1 + 1)
                = 12 / 2
                = 6


2 inserted stations:
--------------------
        1---x---x---13

        Sections = 3

        Max gap = (13 - 1) / (2 + 1)
                = 12 / 3
                = 4


3 inserted stations:
--------------------
        1--x--x--x--13

Sections = 4

Max gap = (13 - 1) / (3 + 1)
        = 12 / 4
        = 3


Hence, Current Maximum Gap ==> Original Gap / (m + 1) --> This is the only formula that needs to be remembered.

Let arr[] = [1, 13, 17, 23] and k = 5

lets denote the gaps between stations by gaps[] = [12, 4, 6]
lets denote the new stations placed between these gaps by stations[] = [0, 0, 0]

let's place 1/5  (1 of the 5ks)
    Its best to place this 1/5 in gaps[0] since the gap is MAX here and we have to MINIMISE 
    the MAX difference overall

    stations[] = [1, 0, 0] +1 as we are going to add a station here

    12/(1+1) -> 6

    So, our code becomes
    stations[] = [1, 0, 0]
    gaps[] = [6, 4, 6]

for 2/5: Largest gap = 6
 
    we can place it between any gaps with diff 6, we choosed last 6 [17, 23]

    stations[] = [1, 0, 1] +1 as we are going to add a station here

    6/(1 + 1) -> 3

    stations[] = [1, 0, 1]
    gaps[] = [6, 4, 3]


for 3/5:  Largest gap = 6

    we will place it between the gaps with 6 since we need to MINIMISE the MAX difference

    Gap (1,13) already contains 1 inserted station

    stations[] = [2, 0, 1] +1 as we are going to add a station here
    Now inserted stations in this gap = 2.

    (13 - 1)/(2 + 1) -> 4
    stations[] = [2, 0, 1]
    gaps[] = [4, 4, 3]

for 4/5:  Largest gap = 4

    place it between any of the gap with difference 4, we chose first 4, say

    stations[] = [3, 0, 1] +1 as we are going to add a station here

    4/(3 + 1) -> 1
    stations[] = [3, 0, 1]
    gaps[] = [1, 4, 3]

for 5/5:  Largest gap = 4

    Its obvious to place it in the stations[1] since it has max difference

    stations[] = [3, 1, 1] +1 as we are going to add a station here

    4/(1 + 1) -> 2
    gaps[] = [3, 1, 1]
    gaps[] = [1, 2, 3]


Algo
----
1. Find the gap having the maximum current gap.
2. Insert ONE station into that gap.
3. Increment the inserted-station count for that gap.
4. Recalculate only that gap using:

        currentGap = originalGap / (insertedStations + 1)

Repeat until all k stations are placed.

TC: o(k * n)  --> For each k, we are finding largest gap index
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

function bruteForce(stations: number[], k: number): number {
    let n = stations.length;
    let additionalStationsAdded = Array(n - 1).fill(0);  // fill with 0 initially since we have to ++ it later
    let originalGaps = Array(n - 1).fill(0);
    
    for(let i = 1; i < n; i++) originalGaps[i - 1] = stations[i] - stations[i - 1];
    
    let gaps = [...originalGaps]; // initially

    /* place every k */
    while(k > 0) {

        let largestGapIndex = maxEleIndex(gaps);  /* Get the max gap */

        /* increment the count to keep track of further sections created */
        additionalStationsAdded[largestGapIndex]++;

         gaps[largestGapIndex] = (originalGaps[largestGapIndex] / (additionalStationsAdded[largestGapIndex] + 1));

        k--;
    }

    return Math.max(...gaps);
}

/*                                              Way-2: Binary Search
                                                --------------------

We need to think of BS here since arr[] is sorted and we need to find max, min..

in normal BS, we generally do low = mid + 1 or high = mid - 1, but here, 
we require to do +0.1 or +0.11.
So BS needs slight modification here

The pattern for all the BS problems with double and float comparisions have the below pattern:

while((high - low) > 10^-6)   // for difference acceptable upto 6 decimal places
{
    mid = (low + high) / 2;
    low = mid;
    high = mid;
}


In most of the BS problems, we have some check() which helps us to determine 
the direction of elimination of half

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
function kRequired(stations: number[], currentMaxDiff: number): number {
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
        let requiredKs: number = kRequired(stations, mid);

        if(requiredKs > k) low = mid;
        else high = mid;
    }

    // here we are not doing low = mid + 1 like stuff, so polarity will not change as expected after loop
    // high will be the least possible Max difference here.
    return high;
}