/* 1371. Find the Longest Substring Containing Vowels in Even Counts

Given the string s, return the size of the longest substring containing each vowel 
an even number of times. That is, 'a', 'e', 'i', 'o', and 'u' must appear an even 
number of times.


Input: s = "eleetminicoworoep"          Output: 13
Explanation: The longest substring is "leetminicowor" which contains two each of the 
vowels: e, i and o and zero of the vowels: a and u.


Input: s = "leetcodeisgreat"            Output: 5
Explanation: The longest substring is "leetc" which contains two e's.

Input: s = "bcbcbc"                     Output: 6
Explanation: In this case, the given string "bcbcbc" is the longest because 
all vowels: a, e, i, o and u appear zero times.

string       l e e t c o d e i s g r e a t

Way-1: Since substring is asked, we can think of a sliding window here
- but there is a problem
  ex: l e e t c o d e i s g r e a t
      i         j     
        e - 2
        o - 1
    Now, how to shrink the window from either side, if i++, no change, we still have odd o
    if j--, we will have e=2, But it is not guaranteed as to which side we need to shrink, that is not the case
    with a sliding window problem.

Way-2: 
let s = e l e e
Maintain a map with counts of each vowel vowelCount = [0, 0, 0, 0, 0]
                                                       a  e  i  o  u

whenever we encounter a vowel, voweCount[vowel]++ and then %2 to keep track of even or odd number of 
times each vowel appear

Store the state of vowelCount[] in a map with latest index of where this array state was found
and whenever the state of vowelCount[] repeats, do currentIndex - prev.Index recorded in a map
ans = Max(ans, currCount)

We are doing % instead of directly voweCount[vowel]++ and totalCount++, because then we need to check
when total count is even or odd 


s = e l e e  
ans = INT_MIN;

i = -1:                          store the initial state, to compare later
vowelCount = [0, 0, 0, 0, 0] 
              a  e  i  o  u

map[0, 0, 0, 0, 0] = -1          store vowelCount in map with key = vowelCount state & latest index as value

i = 0:                         
vowelCount = [0, 1, 0, 0, 0]   totalCount = 1
              a  e  i  o  u

map[0, 0, 0, 0, 0] = -1
map[0, 1, 0, 0, 0] = 0

i = 1:                         
vowelCount = [0, 1, 0, 0, 0]  totalCount = 1           // See, even though, till i=1, we have "l" as answer, 
              a  e  i  o  u                            // but we cannot figure that out using totalCount



                                            DRY RUN
                                            -------

TC: O(n), need to iterate every element
SC: O(n) for map with key space = 5, vowel count 


s = e l e e  
ans = INT_MIN;

i = -1:                          store the initial state, to compare later
vowelCount = [0, 0, 0, 0, 0] 
              a  e  i  o  u

map[0, 0, 0, 0, 0] = -1

i = 0:                         
vowelCount = [0, 1, 0, 0, 0] 
              a  e  i  o  u

map[0, 0, 0, 0, 0] = -1
map[0, 1, 0, 0, 0] = 0

i = 1:                         
vowelCount = [0, 1, 0, 0, 0] 
              a  e  i  o  u

map[0, 0, 0, 0, 0] = -1
map[0, 1, 0, 0, 0] = 0

currState = [0, 1, 0, 0, 0] which is already in map, so ans = (1 - 0) = 1 => "l";

i = 2:                         
vowelCount = [0, 2, 0, 0, 0] 
              a  e  i  o  u

map[0, 0, 0, 0, 0] = -1  after doing % 2 => [0, 2, 0, 0, 0] -> [0, 0, 0, 0, 0] found at index -1
map[0, 1, 0, 0, 0] = 0

so ans = (2 - (-1)) = 3 => "ele";

i = 3:                         
vowelCount = [0, 3, 0, 0, 0] 
              a  e  i  o  u

map[0, 0, 0, 0, 0] = -1  after doing % 2 => [0, 3, 0, 0, 0] -> [0, 1, 0, 0, 0] found at index 0
map[0, 1, 0, 0, 0] = 0

so ans = (3 - 0) = 3 => "ele" OR "lee" ONLY; */

/* NOTE: For MAPS IN JS
In JS, arrays are compared by reference, not by value. This means that two arrays with the same 
content will not be treated as equal unless they are the exact same object in memory. In your case, 
you're updating vowelCount at each iteration, but the Map won't recognize it as the same key because 
the reference changes with every update. */

function findTheLongestSubstring(s: string): number {
    let n: number = s.length;
    let vowels: string = 'aeiou';

    // corner case
    if (n === 1) return 0;  // even if there is one vowel, ans substring = 0 length

    let ans: number = Number.MIN_SAFE_INTEGER;

    // store corresponding indices in another map first
    let vowelIndexMap = new Map<string, number>();
    vowelIndexMap.set('a', 0);
    vowelIndexMap.set('e', 1);
    vowelIndexMap.set('i', 2);
    vowelIndexMap.set('o', 3);
    vowelIndexMap.set('u', 4);

    let vowelCount: number[] = [0, 0, 0, 0, 0]
    let vowelCountMap = new Map<string, number>();

    vowelCountMap.set(vowelCount.toString(), -1);

    for(let i = 0; i < n; i++) {
        if(vowels.includes(s[i])) {
            let eleIndex: number = vowelIndexMap.get(s[i]);
            vowelCount[eleIndex] = (vowelCount[eleIndex] + 1) % 2;
            if(!vowelCountMap.has(vowelCount.toString())) vowelCountMap.set(vowelCount.toString(), i);
        }

        if(vowelCountMap.has(vowelCount.toString())){
            ans = Math.max(ans, (i - vowelCountMap.get(vowelCount.toString())));
        }
    }

    return ans;
}

/* Some improvements using Bit Manipulation:
we were doing +1 and then %2, do ^1 instead, since xor of 1 even number of times automatically = 0

another thing is, we are continously changing array to string and vice-versa, this can be optimised if
we use a bit mask to represent vowelCountMap[]. mask will be an integer only

           aeiou
let mask = 00000

make vowelIndexMap --> vowelShiftMap to represent number of shifts for modifying that bit  */

function findTheLongestSubstringBitManipulation(s: string): number {
    let n: number = s.length;
    let vowels: string = 'aeiou';

    // corner case
    if (n === 1) return 0;  // even if there is one vowel, ans substring = 0 length since single occurrence === ODD

    let ans: number = Number.MIN_SAFE_INTEGER;
    /*
               aeiou
    let mask = 00000 */

    let mask: number = 0;
    let vowelShiftMap = new Map<string, number>();
    vowelShiftMap.set('a', 4);
    vowelShiftMap.set('e', 3);
    vowelShiftMap.set('i', 2);
    vowelShiftMap.set('o', 1);
    vowelShiftMap.set('u', 0);

    let vowelCountMap = new Map<number, number>();

    // store initial state of mask to compare later
    vowelCountMap.set(mask, -1);

    for(let i = 0; i < n; i++) {
        if(vowels.includes(s[i])) {
            let shift: number = vowelShiftMap.get(s[i]);
            mask = (mask ^ (1 << shift));
    
            if(!vowelCountMap.has(mask)) vowelCountMap.set(mask, i);
        }

        if(vowelCountMap.has(mask)){
            ans = Math.max(ans, (i - vowelCountMap.get(mask)));
        }
    }

    return ans;
}