/* 904. Fruit Into Baskets

You are visiting a farm that has a single row of fruit trees arranged from left to right. 
The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

- You only have two baskets, and each basket can only hold a single type of fruit. 
  There is no limit on the amount of fruit each basket can hold.

- Starting from any tree of your choice, you must pick exactly one fruit from every 
  tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.

- Once you reach a tree with fruit that cannot fit in your baskets, you must stop.

Given the integer array fruits, return the maximum number of fruits you can pick.

 
Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick from all 3 trees.

Input: fruits = [0,1,2,2]
Output: 3
Explanation: We can pick from trees [1,2,2].
If we had started at the first tree, we would only pick from trees [0,1].

Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: We can pick from trees [2,3,2,2].
If we had started at the first tree, we would only pick from trees [1,2].
 

Constraints:
    1 <= fruits.length <= 10^5
    0 <= fruits[i] < fruits.length


This can be converted to -> Length of longest subarray with at most k distinct characters
                            k = 2 here

*/

function totalFruit(a: number[]): number {
    const n = a.length;const k = 2;

    let l = 0, r = 0, maxLen = -1; /* keep maxLen = -1, because return -1 if maxLen never updates */
    let map = new Map();

    while (r < n) {
        
        /* Add the character to the map */
        if(!map.has(a[r])) map.set(a[r], 1);
        else map.set(a[r], map.get(a[r]) + 1);

        /* shrink the window if map size exceeds k */
        while ((l <= r) && (map.size > k)) {
            if(map.get(a[l]) === 1) map.delete(a[l]);
            else map.set(a[l], map.get(a[l]) - 1);

            l++;
        }

        /* If map size <= k, update maxLen */
        if (map.size <= k) maxLen = Math.max(maxLen, (r - l + 1));

        r++;
    }

    return maxLen;
};