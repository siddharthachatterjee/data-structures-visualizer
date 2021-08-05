import React, { useEffect, useState } from "react";
import CSS from "csstype";

import Tab, { TabProps } from "./Tab";
import { Elem } from "../elem.interface";

export interface TabContainerProps {
    tabs: JSX.Element[];
    initialTab: string;
    children?: (props: {activeTab: string, setActiveTab: React.Dispatch<string>}) => JSX.Element;
    style?: CSS.Properties;
    onTabChange?: (props: {activeTab: string, setActiveTab: React.Dispatch<string>}) => any;
};


/** Tab Container */
function TabContainer({style = {display: "flex", width: "max-content"}, tabs, children, onTabChange, initialTab = tabs[0].props.name}: TabContainerProps): JSX.Element {
    const [active, setActive]: [string, React.Dispatch<string>] = useState(initialTab);
    useEffect(() => {
        if (onTabChange)
        onTabChange({activeTab: active, setActiveTab: setActive});
    }, [active])
    return (
        <>
       <div style = {style}>
           {tabs.map((tab: Elem<TabProps>) => (
               <Tab 
                    {...tab.props} 
                    active = {active === tab.props.name} 
                    setActive = {setActive}
              />
           ))}
           {/* {children.map((tab: Elem<TabProps>) => (active === tab.props.name) && tab.props.content)} */}
       </div>
        {children && children({activeTab: active, setActiveTab: setActive})}
       </>
    )
}

export default TabContainer;