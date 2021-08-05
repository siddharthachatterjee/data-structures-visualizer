/* Copyright (c) Siddhartha Chatterjee 2020-2021
 */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

/** Heap Implementation */
class Heap {
    constructor(A = [], compare = (a, b) => a > b) {
        this.H = A;
        this.built = "Not built";
        this.processed = Array(A.length).fill(false);
        this.highlighted = Array(A.length).fill(false);
        this.compare = compare;
        this.speed = 900;
      
    }
    leftChild(i) {
        return 2 * i + 1;
    }
    rightChild(i) {
        return 2 * i + 2;
    }
    parent(i) {
        return Math.floor((i + 1) / 2) - 1;
    }
    shiftUp(i) {
        return new Promise((res, rej) => {
            
            this.highlighted[i] = true;
            this.built += ` [Shifting up ${this.H[i]}]`
            const shift = setInterval(() => { 
              //  setTimeout(() => {
    
                if (i <= 0 || this.compare(this.H[this.parent(i)], this.H[i])) {
                    clearInterval(shift);
                    this.built = "Not built"
                    this.highlighted[i] = false;
                     res();
                } else {
              
                [this.H[this.parent(i)], this.H[i]] = [this.H[i], this.H[this.parent(i)]];
                this.highlighted[i] = false;
                this.processed[i] = true;
                i = this.parent(i);
                this.highlighted[i] = true;
            
                }
               // }, 500)
            }, 1000 - this.speed)
        })
    }
    remove(n) {
        this.H = this.H.filter(val => val != n);
        this.buildHeap();
    }
    shiftDown(i) {
        return new Promise((res, rej) => {

            let maxi = i;
            const left = this.leftChild(i), right = this.rightChild(i);
            if (left < this.H.length && this.compare(this.H[left], this.H[maxi])) {
                maxi = left;
            }
            if (right < this.H.length && this.compare(this.H[right], this.H[maxi])) {
                maxi = right;
            }
            this.highlighted[i] = true;
            
            this.built = this.H[i]? `Shifting down ${this.H[i]}` : "" 
            if (i !== maxi) {
                setTimeout(() => {
                    [this.H[maxi], this.H[i]] = [this.H[i], this.H[maxi]];
                    this.highlighted[i] = false;
                    
                    this.shiftDown(maxi).then(() => {
                        res();
                    });
                }, 1000 - this.speed)
            } else {
                this.built += " ... Done"
                setTimeout(() => {
    
                    this.highlighted[i] = false;
                    this.built = "Built"
                    res();
                }, 1000 - this.speed)
            }
        })
    }
    drawLines() {
        if (document.getElementById("lines"))
        document.getElementById("lines").innerHTML = "";
        this.H.forEach((_, i) => {
            if (i != 0) {
                createLine(i, this.parent(i));
            }
        });
    }
    buildHeap() {
       return new Promise((res, rej) => {

           let i = Math.floor((this.H.length - 1) / 2);
           let prev = null;
           this.built = "Building... 0%" 
          const build  = setInterval(() => {
              // setTimeout(() => {
               if (i < 0) {
                   clearInterval(build);
                   this.built = "Built";
                   this.drawLines();
                   res();
               }
               if (i != prev && this.H[i]) {
                   this.shiftDown(i).then(() => {
                       // this.built = `Building... ${Math.round(100 * (i + 1) / this.H.length)}%`
                       i--;
                   });
               }
               prev = i;
               //A.pop();
             //  })
           }, 10)
       });
      
    }
    buildAsMaxHeap() {
        this.compare = (a, b) => a > b;
        this.buildHeap();
    }
    buildAsMinHeap() {
        this.compare = (a, b) => a < b;
        this.buildHeap();
    }
    insert(p) {
        return new Promise((res, rej) => {

            this.H.push(p);
            setTimeout(() => {
                this.drawLines();
            }, 10)
            this.highlighted.push(false);
            this.processed.push(false);
            this.shiftUp(this.H.length - 1).then(() => res());
        })
    }
    extractRoot() {
        return new Promise((res, rej) => {

            let root = this.H[0];
            this.H[0] = this.H[this.H.length - 1];
            this.H.pop();
            this.drawLines();
            this.shiftDown(0).then(() => {
                res(root);
                
            })
        })
    }
    get empty() {
        return !this.H.length;
    }
    get tree() {
        return this.H;
    }
    level(i) {
        let cnt = 0;
        let cur = i;
        while (cur > 0 && cur < this.H.length) {
            cur = this.parent(cur);
            cnt++;
        }
        return cnt;
    }
    get levels() {
        const res = [];
        this.H.forEach((val, i) => {
            res.push(this.level(i));
        })
        return res;
    }
}

export function createLine(i, j, color = "black", width = 1) {
    let node1 = document.getElementById(`node${i}`);
    let node2 = document.getElementById(`node${j}`);
    if (node1 && node2) {
    let fT = node1.offsetTop + node1.offsetHeight / 2;
    let tT = node2.offsetTop + node2.offsetHeight / 2;
    let fL = node1.offsetLeft + node1.offsetWidth / 2;
    let tL = node2.offsetLeft + node2.offsetWidth / 2;

    let CA = Math.abs(tT - fT);
    let CO = Math.abs(tL - fL);
    let H = Math.sqrt(CA*CA + CO*CO);
    var ANG  = 180 / Math.PI * Math.acos( CA/H );

    if(tT > fT){
        var top  = (tT-fT)/2 + fT;
    }else{
        var top  = (fT-tT)/2 + tT;
    }
    if(tL > fL){
        var left = (tL-fL)/2 + fL;
    }else{
        var left = (fL-tL)/2 + tL;
    }

    if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
        ANG *= -1;
    }
    top-= H/2;
    let line = document.createElement("div");
    line.style.height = `${H}px`;
    line.style.position = "absolute";
    line.style.top = `${top}px`;
    line.style.left = `${left}px`;
    line.id = `${j} to ${i}`
    line.className = "line";
    line.style.background = color;
    line.style.transform = `rotate(${ANG}deg)`;
    line.style.width = `${width}px`;
    line.style.zIndex = -5;
  //  line.style.zIndex = 10;
  if (document.getElementById("lines"))
    document.getElementById("lines").appendChild(line);
}
};

export default () => {
    const [H, setH] = useState(new Heap(Array(Math.floor(Math.random() *  62) + 1).fill(null).map(() => Math.floor(Math.random() * 99) + 1)));
    const [timer, setTimer] = useState(0);
    const [val, setVal] = useState("");
    const [click, setClick] = useState(0);
    const [arr,setArr]= useState([]);
    const [speed, setSpeed] = useState(900);
    const [last, setLast] = useState(null);
    const history = useHistory();
    function heapSort() {
        setArr([])
        const sorted = [];
        let prev = null;
        let i = 0;
        H.buildHeap().then(() => {

            const sort = setInterval(() => {
                if (H.empty) clearInterval(sort);
                if (i != prev) {
                    if (H.compare(1, 0)) {
                        sorted.unshift(H.H[0])
                    } else {
                        sorted.push(H.H[0])
                    }
                    setArr(sorted);
                    H.extractRoot().then(min => {
                        i++;
                    });
                    //  i++;
                }
                prev = i;
            }, 1)
        })
    }
    useEffect(() => {
        if (timer == 0) {
            H.drawLines();
        }
        setTimeout(() => {
            setTimer(prev => prev + 1)
        }, 1)
    }, [timer])
    useEffect(() => {
        H.speed = speed;
    }, [speed])
    return (
        <div>
            {(
        <div className = "operations">
            <div>

            <button disabled = {H.built != "Built" && H.built != "Not built"} onClick = {() => {
                H.H = Array(Math.floor(Math.random() * 62) + 1).fill(null).map(() => Math.floor(Math.random() * 99) + 1);
                H.built = "Not built";
                setTimeout(() => {

                    H.drawLines();
                }, 10)
            }}>
                Generate Random Full Binary Tree
            </button>
            </div>
            <div>
            <button className = {last == "EXTRACT_ROOT" && H.built != "Built" && H.built != "Not built"? "focused" : ""} disabled = {H.built != "Built" && H.built != "Not built"} onClick = {() => {
                setLast("EXTRACT_ROOT")
                H.extractRoot().then(min => {
                    setArr([min]);
                    //setLast(null);
                });
            }}>
                Extract Root
            </button>
            </div>
            <div>
            <button className = {last == "BUILD_MIN" && H.built != "Built"&& H.built != "Not built"? "focused" : ""} disabled = {H.built != "Built" && H.built != "Not built"} onClick = {() => {
                setLast("BUILD_MIN");
                H.buildAsMinHeap()
            }}>
                Build as Min Heap
            </button>

            </div>
            <div>
            <button className = {last == "BUILD_MAX" && H.built != "Built" && H.built != "Not built"? "focused" : ""} disabled = {H.built != "Built" && H.built != "Not built"} onClick = {() => {
                setLast("BUILD_MAX")
                H.buildAsMaxHeap()

            }}>
                Build as Max Heap
            </button>
            </div>
            <div>
            <button className = {last == "SORT" && H.built != "Built" && H.built != "Not built"? "focused" : ""}disabled = {H.built != "Built" && H.built != "Not built"} onClick = {() => {
                setLast("SORT")
                heapSort();
            }}>
                Heap Sort
            </button>
            </div>
            <div>
            <input value = {val} max = {999} onChange = {e => e.target.value <= 999 && setVal(e.target.value)} placeholder = "0" type = "number" />
            <button style = {{margin: "0 5px"}} className = {last == "INSERT" && H.built != "Built" && H.built != "Not built"? "focused" : ""}disabled = {H.built != "Built" && H.built != "Not built"} onClick = {() => {
                setLast("INSERT");
                setClick(prev => prev + 1)
                if (val)
                H.insert(val);
                setVal("")
            }}>
                Insert
            </button>
            <button className = {last == "REMOVE" && H.built != "Built" && H.built != "Not built"? "focused" : ""} disabled = {H.built != "Built" && H.built != "Not built"} onClick = {() => {
                setLast("REMOVE")
                H.remove(val);
            }}>
                Remove
            </button>
            </div>
        </div>)}
        <br />
        <div style = {{margin: "0 10px"}}>
            Speed(1 iteration per {1000 - speed}ms):
            <br />
            <input type = "range" min = "1" max = {999} value = {speed} onChange = {e => setSpeed(e.target.value)} />
        </div>
         {/*  <Tree tree = {H} /> */}
         <div>
            <div style = {{display: "flex", marginTop: 20, flexDirection: "column",alignItems: "center"}}>         
                {Array(H.level(H.H.length - 1) + 1).fill(null).map((_, i) => (
                    <div key = {Math.pow(2, i)} style = {{margin: "auto", flexWrap: "wrap", maxWidth: "100vw", zIndex: 0, marginTop:  10, display: "flex", minWidth: (i + 1) * 100,justifyContent: i == 0? "center" : "space-between" }}>
                        {Array(Math.pow(2, i)).fill(null).map((_, k) => (
                            <>
                            <div key = {Math.pow(2, i) + k - 1} id = {`node${Math.pow(2, i) + k - 1}`} style = {{display: "block", fontSize: "small", backgroundColor: H.highlighted[Math.pow(2, i) + k - 1]? "skyblue" : Math.pow(2, i) + k <= H.H.length? "white" : "inherit",padding: "5px 10px",  border: H.H.filter((node, m) => H.level(m) == i)[k]? "1px solid" : "none", borderRadius: "100%", textAlign: "left"}}>

                            {H.H.filter((node, m) => H.level(m) == i)[k] || ""} 
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
            </div>
            Tree status: {H.built}
            <hr />
            <div>        
                <h2> Output: </h2>
                {arr.map((val, i) => val && (
                <div key = {i} style = {{display: "inline-block", margin: 10, backgroundColor: "white",padding: "5px 10px",  border: "1px solid", width: "max-content", borderRadius: "100%", textAlign: "left"}}>

                {val} 
                </div>
                ))}
            </div>
         </div>
         
        </div>
    )
}