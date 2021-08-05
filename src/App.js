import React, { useEffect } from 'react'
import { useParams, useHistory, Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import logo from './logo.svg';
import './App.css';
import Heap from './Heap';
import TopBar from './components/TopBar';
import Visualizer from './components/Visualizer';
import HeapImplementation from './HeapImplementation';

function App() {
  const history = useHistory();

  // useEffect(() => {
  //   history.push("/Heap");
  // }, [])
  return (
    
   <div>
     
     <Switch>
      <Route exact path = "/">
        <Redirect to = "/visualize/Heap" />
      </Route>
      <Route path = "/visualize/:dataStructure">
        <TopBar  text = "Visualization"/>
        <Visualizer />
      </Route>
      <Route path = "/implementation/:dataStructure">
        <TopBar text = "Implementation" />
        <HeapImplementation />
      </Route>
     </Switch>
    
   </div>
  );
}

export default App;
