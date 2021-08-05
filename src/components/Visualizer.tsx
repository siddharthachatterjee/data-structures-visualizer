import React from 'react';
import { useParams } from "react-router-dom"

import Heap from "../Heap.jsx";
import BinarySearchTree from "../BinarySearchTree.jsx";


const dataStructures: {[name: string]: () => JSX.Element} = {
    Heap,
    BinarySearchTree,
};


export default (): JSX.Element => {
    const { dataStructure }: {dataStructure: string} =  useParams();
    return (
        <>
        {dataStructure in dataStructures && dataStructures[dataStructure]()}
        </>
    )
}