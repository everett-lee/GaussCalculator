import React from 'react';
import FcontainerTop from './FcontainerTop';

function FunctionContainer(props) {
  return (
    <div className="functionContainer">
      <FcontainerTop rows={props.rows} getMatrix={props.getMatrix}
                      setMatrix={props.setMatrix} />
      <div className="fContainer">
        <div className="fDiv"> hi </div>
        <input className="fInput" />
        <div className="opButtonContainer">
          <button className="opButton" />
          <button className="opButton" />
        </div>
        <input className="fInput" />
        <div className="fDivLong"> hi </div>
        <button className="fButton" />
      </div>
    </div>
  );
}

export default FunctionContainer;