import React from 'react';
import * as utils from '../../utils';

function generateValue(element){
  if (utils.myIsObject(element)){
    return element.name.toString().trim();
  } else {
    return element.toString().trim();
  }
}

function Filter(props) {
    const {
      options = [],
      value = options.at(0),
      onChange = ()=>{},
    } = props;

    if (!Array.isArray(options)){
      throw new TypeError(`Error: options should be an array \n Received: ${options}`);
    }


  return (
    <select value={value} onChange={onChange} >
      {options && options.map((elem, index) => (
          <option key={index} value={generateValue(elem)} >
            {utils.myIsObject(elem) ? elem.name : elem}
          </option>
      ))}
    </select>
  )
}

export default Filter