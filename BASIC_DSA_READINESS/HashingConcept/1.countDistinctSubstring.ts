/* Using sorting

we get same strings clubbed together, we then find how many times the current string is distinct from 
previous string, and add 1 to final count

TC: O(nlogn) due to sorting + O(n) = effectively O(nlogn)
SC: O(1) */
function countDistStrings(arr: string[]) {
    let sortedArr: string[] = arr.sort();
    let count: number = 0;

    // start from the first index
    for(let i = 1; i < sortedArr.length; i++) {
        if(sortedArr[i - 1] !== sortedArr[i]) count++;
    }

    return count + 1;
}

const arr: string[] = ["aa", "abc", "aa", "b", "c", "abc", "b"];
console.log(countDistStrings(arr));

function getHash(str: string): number {
    let hash: number = 0;
    let mod = 1e9 + 7;
    let P: number = 31;

    for(let i = 0; i < str.length; i++) {
        hash = hash + ((str.charCodeAt(i) - 'a'.charCodeAt(0)) * Math.pow(P, i)) % mod;
    }

    return hash;
}

/* Using hashing 
get hash for each and then count unique hashes */

/* Using Maps */

function countDistinct(arr: string[]): number {

    let map = new Map<string, number>();

    arr.forEach((ele) => {
        if(!map.has(ele)) map.set(ele, 1);
        else map.set(ele, map.get(ele)! + 1)
    });

    return map.size;
}








  