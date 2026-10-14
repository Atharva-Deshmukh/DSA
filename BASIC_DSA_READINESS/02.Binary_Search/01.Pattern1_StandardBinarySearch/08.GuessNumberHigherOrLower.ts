/* Leetcode: 374. Guess Number Higher or Lower

We are playing the Guess Game. The game is as follows:

I pick a number from 1 to n. You have to guess which number I picked 
(the number I picked stays the same throughout the game).

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API int guess(int num), which returns three possible results:
    -1: Your guess is higher than the number I picked (i.e. num > pick).
    1: Your guess is lower than the number I picked (i.e. num < pick).
    0: your guess is equal to the number I picked (i.e. num == pick).

Return the number that I picked.

Input: n = 10, pick = 6                             Output: 6

Input: n = 1, pick = 1                              Output: 1

Input: n = 2, pick = 1                              Output: 1
 
Constraints:
    1 <= n <= 2^31 - 1
    1 <= pick <= n


Though Process:
---------------

We are already being hinted whether the number guessed is equal, smaller or greater than the actual number.
Using this we can eliminate the possible search space [1----INT_MAX]
Hence we can directly use BS here

*/

/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */


function guessNumber(n: number): number {
    let low: number = 1;
    let high: number = n;

    while(low <= high) {
        const mid: number = low + Math.floor((high - low) / 2);
        const guessResponse: number = guess(mid);  // Its a predefined API

        if(guessResponse === 0) return mid;
        else if(guessResponse === -1) high = mid - 1;
        else low = mid + 1; 
    }

    return -1;
};