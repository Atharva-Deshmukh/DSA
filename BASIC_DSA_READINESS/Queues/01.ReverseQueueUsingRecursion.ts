/* Given a queue, write a recursive function to reverse it. 

Standard operations allowed : 
    enqueue(x) 
    dequeue()
    empty()

Input : Q = [5, 24, 9, 6, 8, 4, 1, 8, 3, 6]
Output : Q = [6, 3, 8, 1, 4, 8, 6, 9, 24, 5]

Input : Q = [8, 7, 2, 5, 1]
Output : Q = [1, 5, 2, 7, 8]

Way-1: Naive
- pop recursively and put everything in stack
- Add everything from stack to the queue again

TC: O(n) + O(n) for queue and stack iteration
SC: O(n) for recursion stack + O(n) for stack

Way-2: recursion directly in the given queue

    Take out front
    recurse
    when length 0 -> push back the last front
    This way, the last element dequeued is enqueued which in turn reverses the order

let queue = [1, 2, 3, 4]

                reverseQueue([1,2,3,4]) - frontEle = 4        => return [4, 3, 2, 1]
                                \
                    reverseQueue([1,2,3]) - frontEle = 3      => return [3, 2, 1]
                                    \
                        reverseQueue([1,2]) - frontEle = 2    => return [2, 1]
                                        \
                            reverseQueue([1]) - frontEle = 1  => return [1]
                                           \
                               reverseQueue([]) - Queue empty => return []
                                                  

*/

function reverseQueue(queue: number[]): number[] {

    if(queue.length === 0) return [];

    let frontEle: number = queue[queue.length - 1];
    queue.pop();

    let reversedQueue = reverseQueue(queue)
    reversedQueue.unshift(frontEle)

    return reversedQueue
}

let queue = [1,2,3,4];
console.warn('reversed queue -> ', reverseQueue(queue));