import React from "react";

//type: h1, h2, h3
//children: title name

const TitleBs = ({ type, children }) => {

    if(type === 'h1') return <h1 className="m1-4">{children}</h1>
    if(type === 'h2') return <h2 className="m1-4">{children}</h2>
    if(type === 'h3') return <h3 className="m1-4">{children}</h3>
};

export default TitleBs;