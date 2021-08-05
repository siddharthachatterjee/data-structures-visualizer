import React from "react";
import CSS from "csstype";

const a: string[] = ["hi", "a"];

export interface TabProps {
    name: string;
    title?: (props: {active: boolean | undefined, name: string}) => JSX.Element;
    active?: boolean;
    id?: number;
    children?: JSX.Element[];
    setActive?: React.Dispatch<string>;
   // content?: JSX.Element
}


function Tab({name, setActive = () => null, active, title = (props) => <span style = {{cursor: "pointer", margin: 10, marginLeft: 0, color: props.active? "black" : "gray", fontWeight: props.active? "bold" :"normal"}}> {props.name} </span> }: TabProps): JSX.Element {
    return (
        <>
        <div onClick = {() => setActive(name)}> 
            {title({active, name})}
        </div>
        </>
    )
}

export default Tab;