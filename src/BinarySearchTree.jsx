import React, {useEffect, useState} from 'react'
import {createLine} from "./Heap";

class BST {
    constructor(nodes) {
        this.root = null;
        this.key = [];
        this.p = [];
        this.left = [];
        this.right = [];
        this._inOrder = [];
        this._preOrder = [];
        this._postOrder = [];
        nodes.forEach((node) => {
            this.insert(node);
        });
        this.processing = null;
        this.processed = null;
        this.display = Array(this.height() + 1).fill(null).map((_, i) => Array(Math.pow(2, i)).fill("hi"));
      //  console.log(this.display)
        this.inOrderTrav();
    }
    insert(z) {
        let y = null;
        let x = this.root;
        while (x !== null) {
            y = x;
            if (z < this.key[x]) {
                x = this.left[x];
            }
            else {
                x = this.right[x];
            }
        }
        this.p.push(y);
        this.key.push(z);
        this.left.push(null);
        this.right.push(null);
        
        if (y == null) {
            //this.key.push(z)
            this.root = this.key.length - 1;
        }
        else if (z < this.key[y]) {
           this.left[y] = this.key.length - 1;
            this.key[this.left[y]] = z;
        }
        else {
            this.right[y] = this.key.length - 1;
            this.key[this.right[y]] = z;
        }
      
        // this.key.push(null);
        // this.key.push(null);
       // this.inOrderTrav();
    }
    inOrderTrav(node = this.root, level = 0, pos = 0) {
        this.processing = null;
        if (node === this.root) this._inOrder = [];
     //   this.processed = null;
        return new Promise((res, rej) => {

            if (node === null) {
                res();
                return;
            }
            this.display[level][pos] = node;
            this.processing = node;
            setTimeout(() => {

                this.inOrderTrav(this.left[node], level + 1, pos * 2).then(() => {
    
                    this._inOrder.push(this.key[node]);
                    this.inOrderTrav(this.right[node], level + 1, pos * 2 + 1).then(() => {
                       // this.processed = node;
                        res();
                    });
                });
            }, 100)
        })
       // this.display[level][pos] = "NIL";
    }
    preOrderTrav(node = this.root) {
        if (node === null) return;
        this._preOrder.push(this.key[node]);
        this.preOrderTrav(this.left[node]);
        this.preOrderTrav(this.right[node])
    }
    postOrderTrav(node = this.root) {
        if (node === null) return;
        this.postOrderTrav(this.left[node]);
        this.postOrderTrav(this.right[node]);
        this._postOrder.push(this.key[node]);
    }
    inOrder() {
        this._inOrder = [];
        this.inOrderTrav().then(() => {

            return this._inOrder;
        });
    }
    get preOrder() {
        this._preOrder = [];
        this.preOrderTrav();
        return this._preOrder;
    }
    get postOrder() {
        this._postOrder = [];
        this.postOrderTrav();
        return this._postOrder;
    }
    level(node) {
        let cnt = 0;
        while (node !== null) {
            node = this.p[node];
            cnt++;
        }
        return cnt;
    }
    height() {
        const q = [this.root];
        while (q.length) {
            const n = q.shift();
            if (this.left[n] !== null)
                q.push(this.left[n]);
              
            if (this.right[n] !== null)
                q.push(this.right[n]);
             
            if (!q.length) {
                return this.level(n);
            }
        }
    }
    drawLines() {
        
        const q = [this.root];
        while (q.length) {
            const n = q.shift();
            if (this.left[n] !== null) {
                q.push(this.left[n]);
                createLine(n, this.left[n], "blue", 3);
            }
            if (this.right[n] !== null) {
                q.push(this.right[n]);
                createLine(n, this.right[n], "red", 3);
            }
            
        }
    }
}


export default () => {
    const [T, setT] = useState(new BST(Array(Math.floor(Math.random() *   7) + 3).fill(null).map(() => Math.floor(Math.random() * 99) + 1)));
    const [timer, setTimer] = useState(0);
    const [output, setOutput] = useState([]);
    const [val,setVal] = useState("");
    const [last,setLast] = useState(null);
    useEffect(() => {
      //  if (timer === 0 && document.getElementById(`node0`)) {
            //console.log( document.getElementById(`node0`))
            document.getElementById("lines").innerHTML = "";
            T.drawLines();
    //   }
        setTimeout(() => { setTimer(prev => prev + 1)}, 10)
      //  T.drawLines();
    }, [timer])
    // useEffect(() => {
    //     const newT = new BST();
    //     newT.insert(5);
    //     newT.insert(1);
    //     newT.insert(3);
    //     setT(newT);
    // }, [])
    return (
        <div>
            {/* {JSON.stringify(T._inOrder)} */}
            <div className = "operations">
                <div>
                    <button onClick = {() => {
                        setT(new BST(Array(Math.floor(Math.random() *  7) + 3).fill(null).map(() => Math.floor(Math.random() * 99) + 1)));
                        
                    }}>
                        Generate Random BST
                    </button>
                </div>
                <div>

                    <button onClick = {() => setOutput(T.preOrder)}> Print Pre-Order </button>
                </div>
                <div>
                    <button onClick = {async () => {
                        setOutput([]);
                        T.inOrderTrav().then(() => {
                        setOutput(T._inOrder)
                     //   console.log("hi")
                    })}}> Print In-Order/Tree Sort </button>
                </div>
                <div>
                    <button onClick = {() => setOutput(T.postOrder)}> Print Post-Order </button>

                </div>
                <div>
                    <input type = "number" value = {val} onChange = {e => setVal(e.target.value)} />
                    <button style = {{marginLeft: 5}}onClick = {() => {
                        T.insert(val)
                        setVal("")
                        T.inOrderTrav().then(() => {

                        });
                     //   T.drawLines();
                    }}>
                        Insert
                    </button>
                </div>
            </div>
            <div style = {{margin: 10}}>
            NOTE: Blue edges represent left edges, and red edges represent right edges.
            </div>
            {/* <Tree T = {T}  /> */}
            {/* {T.display.map((level, j) => (
                <div style = {{margin: "auto", display: "flex", justifyContent: "center", width: Math.pow(2, T.height) * (60)}}>

                {level.map(node => (
                    <div style = {{ border: "1px solid", width: 10, height: 10, borderRadius: 10, padding: 5}}>
                        {T.key[node] || ""}
                    </div>
                ))}
                </div>
            ))} */}
            {<div style = {{display: "flex", marginTop: 20, flexDirection: "column",alignItems: "center"}}>         
                {T.display.map((_, i) => (
                    <div key = {Math.pow(2, i)} style = {{margin: "auto", flexWrap: "wrap", maxWidth: "100vw", zIndex: 10, marginTop:  10, display: "flex", minWidth: (i + 1) * 100,justifyContent: i == 0? "center" : "space-between" }}>
                        {T.display[i].map((node, k) => (
                            <>
                            <div key = {Math.pow(2, i) + k - 1} id = {`node${node}`} style = {{display: "block", backgroundColor: T.processed === node? "purple" : T.processing === node ? "skyblue" : (T.key[node] || node === "NIL")? "white" : "inherit", fontSize: "small",padding: "5px 10px", border: (T.key[node] || node === "NIL")? "1px solid" : "none", borderRadius: "100%", textAlign: "left"}}>

                            {T.key[node] ? T.key[node] :  node === "NIL"? "NIL" : ""} 
                            </div>
                        
                            </>
                        ))} 
                        {/* {H.H
                        .map((node, j) => H.level(j) == i && (
                            
                            <div style = {{display: "inline-block", backgroundColor: H.highlighted == j? "skyblue" : "white", padding: "5px 10px", border: "1px solid", borderRadius: "100%", textAlign: "left"}}>
                            {node + " "} 
                            </div>
                        ))} */}
                    </div>
                ))}
            </div>}
            <hr />
            <div>
                <h2> Output: </h2>
                {output.map(node => (
                    <div style = {{padding: "5px 10px", border: "1px solid", display: "inline-block", borderRadius: "50%", margin: 5}}>
                        {node}
                    </div>
                ))}
            </div>
        </div>
    )
}