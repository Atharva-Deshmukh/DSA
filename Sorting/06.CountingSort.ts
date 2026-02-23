/*  Counting Sort is a non-comparison-based sorting algorithm. It is particularly efficient when the
range of input values is small compared to the number of elements to be sorted. 

ALGO:
- Count frequencies of all unique elements
- Keep printing each element its frequency times in a sorted manner.

                                    There are two approaches to implement this:

1. Using a map to store frequencies and sorting the map
- Use a map (e.g., a hash map) to count the frequency of each unique element.
- Sort the map based on the keys (the unique elements).
- Print the sorted elements based on their frequencies.

TC: O(n + klogk)

Counting frequencies: 
𝑂(n), n is the size of the input array.

Sorting the map: 
O(klogk), where k is the number of unique elements.

Generating the sorted array: 
O(n), since you iterate through the map and write values.

SC:
Map to store frequencies: 
O(k)

2. Using a range-based array to count frequencies

- Define a range array (bucket array) that spans the minimum to the maximum value of the input data.
- Count frequencies directly into the array.
- Iterate through the array to print the sorted elements.

TC: O(n+m)

Counting frequencies: O(n)

Iterating through the range array to generate the sorted array: 

O(m), where m is the size of the range 
m = (max−min+1).

SC:

Range array to count frequencies: 
O(m), where m=max−min+1.

                                            Which is better?

Map-Based Implementation:

Better for: Sparse data, i.e., when the range (m) is very large, but the number of unique elements 
(k) is relatively small.
Drawback: Sorting the map adds O(klogk) to the complexity.


Range-Based Implementation:

Better for: Dense data, i.e., when the range of values (m) is not much larger than the number of elements 
(n).
Drawback: High space usage for large ranges, even if the actual data is sparse. */

function countingSortMapBased(a: number[]): number[] {
    let ans: number[] = [];

    let n: number = a.length;

    // corner case
    if(n <= 1) return a;

    let map: Map<number, number> = new Map<number, number>();

    // Fill the map
    a.forEach((ele) => {
        if(!map.has(ele)) map.set(ele, 1);
        else map.set(ele, map.get(ele)! + 1);
    });

    // Sort the map
    let sortedMap: Map<number, number> = new Map<number, number>(Array.from(map).sort((a, b) => a[0] - b[0]));

    /* When input = string => Sort the map by keys (lexicographical order for strings)

    let sortedMap = new Map(Array.from(map).sort((a, b) => a[0].localeCompare(b[0]))); */

    // Iterate the map and fill answer array
    for(let [key, value] of sortedMap) {
        while(value > 0) {
            ans.push(key);
            value--;
        }
    }

    return ans;
}

/* For count[] based approach: 

STRING INPUT

Here, instead of map, maintain an array where index = element in input array. 

charCodeAt() does not help during nonAscii characters or array of strings like ["aa", "abcd"]
we need to use localeCompare() here like above

Things to know:
'a'.charCodeAt(0)) = 97

count[] = Array(26) // holds from index 0 = a to index 25 = z 

NUMBER INPUT : this is easy, just number = index of count[] */
