import React, { useState, useEffect } from 'react'
import hljs from "highlight.js";

import Tab from './components/Tab'
import TabContainer from './components/TabContainer';

const code = {

"C++": `
/*
* Copyright (c) 
* Siddhartha Chatterjee 
* 2020
*/
#include <iostream>
#include <functional>
#include <algorithm>
#include <vector>

using std::vector;
template <class T>
using CompareFunc = std::function<bool(T, T)>;

template <class T>
struct Heap {
    vector<T> A; // the heap array
    int size;
    CompareFunc<T> compare = [](T a, T b) { return a > b; }; // defaults to Max Heap 
    Heap(vector<T> arr = {}, CompareFunc<T> compare = [](T a, T b) { return a > b; }):
        A(arr), size(arr.size()), compare(compare)
        // for Min-Heap, set compare function to [](T a, T b) { return a < b; }
    {
        buildHeap();
    };
    int left(int i) {
        return 2 * i + 1;
    }
    int right(int i) {
        return 2 * i + 2;
    }
    int parent(int i) {
        return (i + 1) / 2 - 1;
    }
    void shiftUp(int i) {
        while (i > 0 && !compare(A[parent(i)], A[i])) {
            std::swap(A[parent(i)], A[i]);
            i = parent(i);
        }
    }
    void shiftDown(int i) {
        int max = i, l = left(i), r = right(i);
        if (l < size && compare(A[l], A[max])) {
            max = l;
        }
        if (r < size && compare(A[r], A[max])) {
            max = r;
        }
        if (max != i) {
            std::swap(A[i], A[max]);
            shiftDown(max);
        }
    }
    void insert(T p) {
        A.push_back(p);
        size++;
        shiftUp(size - 1);
    }
    T extractRoot() {
        if (size > 0) {
            T root = A[0];
            A[0] = A[size - 1];
            A.pop_back();
            size--;
            shiftDown(0);
            return root;
        }
    }
    void buildHeap() {
        for (int i = (size - 1) / 2; i >= 0; --i)
            shiftDown(i);
    }
    bool empty() {
        return !size;
    }
};

vector<int> heapSort(vector<int> arr) {
    Heap<int> H(arr); 
    vector<int> sorted(arr.size());
    for (int i = arr.size() - 1; i >= 0; --i) {
        sorted[i] = H.extractRoot();
    }
    return sorted;
}

int main() {
    std::cout << "Heap Sort \\n";
    for (int val : heapSort({ 1, 4, 2, 5, 3, 6 })) {
        std::cout << val << " ";
    }
    return 0;
}
    `,
"TypeScript": `
/*
* Copyright (c) 
* Siddhartha Chatterjee 
* 2020
*/

type CompareFunc<T> = (a: T, b: T) => boolean;

class Heap<T> {
    A: T[];
    compare: CompareFunc<T>;

    constructor(arr: T[] = [], compare: CompareFunc<T> = (a: T, b: T) => a > b) { // defaults to Max-Heap
        this.A = arr;
        this.compare = compare;
        this.buildHeap();
    }
    get size() {
        return this.A.length;
    }
    left(i: number) {
        return 2 * i + 1;
    }
    right(i: number) {
        return 2 * i + 2;
    }
    parent(i: number) {
        return Math.floor((i + 1) / 2) - 1;
    }
    shiftUp(i: number) {
        while (i > 0 && !this.compare(this.A[this.parent(i)], this.A[i])) {
            [this.A[i], this.A[this.parent(i)]] = [this.A[this.parent(i)], this.A[i]];
            i = this.parent(i);
        }
    }
    shiftDown(i: number) {
        let max = i, l = this.left(i), r = this.right(i);
        if (l < this.size && this.compare(this.A[l], this.A[max])) {
            max = l;
        }
        if (r < this.size && this.compare(this.A[r], this.A[max])) {
            max = r;
        }
        if (max !== i) {
            [this.A[i], this.A[max]] = [this.A[max], this.A[i]];
            this.shiftDown(max);
        }
    }
    insert(p: T) {
        this.A.push(p);
        this.shiftUp(this.size - 1);
    }
    buildHeap() {
        for (let i: number = Math.floor((this.size - 1) / 2); i >= 0; --i) {
            this.shiftDown(i);
        }
    }
    extractRoot(): T {
        const root: T = this.A[0];
        this.A[0] = this.A[this.size - 1];
        this.A.pop();
        this.shiftDown(0);
        return root;
    }
}

function heapSort(arr: number[]): number[] {
    const H: Heap<number> = new Heap<number>(arr);
    const sorted = [];
    while (H.size) {
        sorted.unshift(H.extractRoot());
    }
    return sorted;

}
console.log(heapSort([1, 4, 2, 3, 5, 6]))
`,  
"JavaScript": `
/*
* Copyright (c)
* Siddhartha Chatterjee
* 2020
*/
class Heap {
    constructor(arr = [], compare = (a, b) => a > b) {
        this.A = arr;
        this.compare = compare;
        this.buildHeap();
    }
    get size() {
        return this.A.length;
    }
    left(i) {
        return 2 * i + 1;
    }
    right(i) {
        return 2 * i + 2;
    }
    parent(i) {
        return Math.floor((i + 1) / 2) - 1;
    }
    shiftUp(i) {
        while (i > 0 && !this.compare(this.A[this.parent(i)], this.A[i])) {
            [this.A[i], this.A[this.parent(i)]] = [this.A[this.parent(i)], this.A[i]];
            i = this.parent(i);
        }
    }
    shiftDown(i) {
        let max = i, l = this.left(i), r = this.right(i);
        if (l < this.size && this.compare(this.A[l], this.A[max])) {
            max = l;
        }
        if (r < this.size && this.compare(this.A[r], this.A[max])) {
            max = r;
        }
        if (max !== i) {
            [this.A[i], this.A[max]] = [this.A[max], this.A[i]];
            this.shiftDown(max);
        }
    }
    insert(p) {
        this.A.push(p);
        this.shiftUp(this.size - 1);
    }
    buildHeap() {
        for (let i = Math.floor((this.size - 1) / 2); i >= 0; --i) {
            this.shiftDown(i);
        }
    }
    extractRoot() {
        const root = this.A[0];
        this.A[0] = this.A[this.size - 1];
        this.A.pop();
        this.shiftDown(0);
        return root;
    }
}
function heapSort(arr) {
    const H = new Heap(arr);
    const sorted = [];
    while (H.size) {
        sorted.unshift(H.extractRoot());
    }
    return sorted;
}
console.log(heapSort([1, 4, 2, 3, 5, 6]));
`,
"Python": `
# Copyright (c)
# Siddhartha Chatterjee
# 2020


class Heap:
    def __init__(self, arr = [], compare = lambda a, b : a > b): # Defaults to Max-Heap
        self.A = arr
        self.compare = compare
        self.build_heap()

    def left(self, i):
        return 2 * i + 1

    def right(self, i):
        return 2 * i + 2

    def parent(self, i):
        return (i + 1) // 2 - 1

    def shift_up(self, i):
        while i > 0 and not self.compare(self.A[self.parent(i)], self.A[i]):
            self.A[self.parent(i)], self.A[i] = self.A[i], self.A[self.parent(i)]
            i = self.parent(i)

    def shift_down(self, i):
        maxi = i
        l = self.left(i)
        r = self.right(i)
        if l < len(self.A) and self.compare(self.A[l], self.A[maxi]):
            maxi = l
        if r < len(self.A) and self.compare(self.A[r], self.A[maxi]):
            maxi = r
        if i != maxi:
            self.A[i], self.A[maxi] = self.A[maxi], self.A[i]
            self.shift_down(maxi)

    def build_heap(self):
        for i in range((len(self.A) - 1) // 2, -1, -1):
            self.shift_down(i)

    def insert(self, p):
        self.A.append(p)
        self.shift_up(len(self.A) - 1)

    def extract_root(self):
        root = self.A[0]
        self.A[0] = self.A[len(self.A) - 1]
        self.A.pop()
        self.shift_down(0)
        return root

def heap_sort(arr):
    h = Heap(arr)
    sortedarr = [0 for _ in range(len(arr))]
    for i in range(len(arr) - 1, -1, -1):
        sortedarr[i] = h.extract_root()
    return sortedarr

print(heap_sort([1, 4, 2, 5, 3, 6]))
`,

}

export default () => {
    const [language, setLanguage] = useState(null);
    useEffect(() => {
        hljs.highlightBlock(document.getElementById("heap-implementation"))
    }, [language])
    return (
        <div style = {{margin: 20,}}>
        
            Heaps are used mainly for sorting, Dijkstra's algorithm, and any time you need to get the minimum or maximum value from a set. 
            <br />
            <br />
            Heap Properties:
            <br />
            <ol>
                <li> All properties of a Full Binary Tree. </li>
                <li> Each node has greater priority than its children. For a Max-Heap, this means greater, for a Min-Heap it means less than. </li>
                <li> Because of property #2, the root has the greatest priority. </li>
            </ol>
            Below, I have implemented the Heap data structure as well as the Heap Sort Algorithm in several different popular programming languages.
            <br />
            For each, I have added a compare function property which compares the priority of two values. Therefore, you can use this Heap for Max-Heap, Min-Heap, or any kind of Priority Queue.
            <h3> Language: </h3>
            <TabContainer onTabChange = {({activeTab}) => setLanguage(activeTab)} 
                tabs = {Object.keys(code).map(lang => <Tab name = {lang} />)}>
                {({activeTab}) => (
                    <>
                    
                    <pre>
                        <code id = "heap-implementation"style = {{width: "90vw"}} className = {activeTab}>
                            {code[activeTab]}
                        </code>
                    </pre>
                    </>
                )}
            </TabContainer>
        </div>
    )
}