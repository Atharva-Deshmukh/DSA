/* This is a new pattern of BS problem -> find max of min OR min of max

You are given an array consisting of n integers which denote the position of a stall. You are also given an integer 
k which denotes the number of aggressive cows. You are given the task of assigning stalls to k cows such that the 
minimum distance between any two of them is the maximum possible.
The first line of input contains two space-separated integers n and k.
The second line contains n space-separated integers denoting the position of the stalls.

n=5 
k=3
stalls = [1 2 4 8 9]   --> Its a distance array
Output: 3

The first cow can be placed at stalls[0],  the second cow can be placed at stalls[2] and the third cow can be placed at 
stalls[3]. The minimum distance between cows, in this case, is 3, which also is the largest among all possible ways.

n=5 
k=3
stalls = [10 1 2 7 5]
Output: 4

The first cow can be placed at stalls[0], the second cow can be placed at stalls[1] and the third cow can be placed at 
stalls[4]. The minimum distance between cows, in this case, is 4, which also is the largest among all possible ways.

Expected Time Complexity: O(n*log(10^9)).
Expected Auxiliary Space: O(1). 

                                                  Way-1: Brute Force
                                                  ------------------

- let stalls = [0, 3, 4, 7, 10, 9] and cows = 4
  We have to place ALL 4 cows in such a way that min dist between any two of them is max possible 
  of all possibilities

  --> Since its a coordinate/distance array, sort it first --> stalls = [0, 3, 4, 7, 9, 10]

  --> Try all possible distance from 1 to INT_MAX (say currMinDist) and check if any two cows 
  have (distBetweenThem >= currMinDist)

  let dry run (Note that all k cows should be placed)
  
  currMinDist = 1     first cow should always be placed at 0th index since that is the min coordinate after sorting
  place cows only in those places where currentDistBetThem >= currMinDist
  [0,  3,  4,  7,  9,  10]
   c1  c2  c3  c4             --> min distace overall = 1 POSSIBLE

  currMinDist = 2
  place cows only in those places where currentDistBetThem >= currMinDist
  [0,  3,  4,  7,  9,  10]
   c1  c2      c3  c4        --> min distace overall = 2 POSSIBLE  

  currMinDist = 3
  place cows only in those places where currentDistBetThem >= currMinDist
  [0,  3,  4,  7,  9,  10]
   c1  c2      c3      c4    --> min distace overall = 3 POSSIBLE  

  currMinDist = 4
  place cows only in those places where currentDistBetThem >= currMinDist
  [0,  3,  4,  7,  9,  10]
   c1      c2      c3       --> min distace overall = 4  NOT POSSIBLE since all 4 cows cannot be placed at this distance
   

                                                  Way-2: Binary Search
                                                  --------------------
    
  Thought Process:
  - Note that we stop getting the solution after certain point.
  - And our search space is sorted since we are trying all min distances from [1---INT_MAX]
  
  1 ✓
  2 ✓
  3 ✓        ----> Recall, this is a BS pattern
  4 X
  5 X


we can use binary search here.
low = 1
high = stalls[n - 1] - stalls[0];  since this is the max possible distance between any two cows
                                   and our min distance will always between 1 and this high

if(mid === false) go left
if(mid === true) go right to get max possiblity

*/

function isThisMinDistPossible(dist: number[], cows: number, currMinDist: number) {
    
    const n: number = dist.length;
    
    let lastCoordinateValue = dist[0];   // store the coordinate of the last placed cow
    cows--;                              // first cow is already placed at 0th index
    
    for(let i = 1; i < n; i++) {
        if((dist[i] - lastCoordinateValue) >= currMinDist) {
            cows--;
            lastCoordinateValue = dist[i];
            
             if(cows === 0) return true;   // if we exhaust all the cows, we are done, return true
        }
    }
    
    return false;  // cows are still there but we finished the array traversal, return false
}

function missingCowsBruteForce(stalls: number[], cows: number): number {
  let n: number = stalls.length;
  let ans: number = 0;

  // no. of cows should be always <= stalls length OR stalls length should be atleast 2
  if((n < cows) || (n < 2)) return -1;

  stalls = stalls.sort((a, b) => a - b);
  
  for(let currMinDist = 1; currMinDist <= Number.MAX_SAFE_INTEGER; currMinDist++) {

     // since we are going from 1 to N, we will get the last true element as the max automatically 
      if(isThisMinDistPossible(stalls, cows, currMinDist) === true) {
        ans = currMinDist; 
      }
      else break;
  }

  return ans;
}

function missingCowsBinarySearch(stalls: number[], cows: number): number {
  let n: number = stalls.length;

  // no. of cows should be always <= stalls length OR stalls length should be atleast 2
  if((n < cows) || (n < 2)) return -1;

  // sort array numerically
  stalls = stalls.sort((a, b) => a - b);

  let low: number = 1;
  let high: number = stalls[n - 1] - stalls[0];

  while(low <= high) {
    let mid: number = low + Math.floor((high - low) / 2);

    if(isThisMinDistPossible(stalls, cows, mid) === true) low = mid + 1; // explore higher possibilities
    else high = mid - 1;
  }
  
  // while loop breaks with high pointing at the max possible value and low at first not possible value
  return high;
}