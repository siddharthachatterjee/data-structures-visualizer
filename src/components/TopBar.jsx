import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {Helmet} from "react-helmet";

export default (props) => {
   const {dataStructure} = useParams();
   const history = useHistory();
  return (
    <div className="top-bar">
      <Helmet>
        <title> {dataStructure} {props.text} </title>
      </Helmet>
      <div>
        <h2>
         
          {dataStructure} {props.text}
          {props.text === "Visualization" && <button onClick = {() => window.location = `/implementation/${dataStructure}`}className = "learn" style = {{
                  
                }}> Learn Implementation </button>}
                
        </h2>
        by Siddhartha Chatterjee
      </div>
    </div>
  );
};
