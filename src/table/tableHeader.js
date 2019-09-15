import React from 'react';
import downArrow from './../down-arrow.svg';
import upArrow from './../up-arrow.svg';

const tableHeader = (props) => {
  const {header, selectSort, selectedSort, sortOrder, filterPerson, filterText} = props;
  return header.map((key, index) => {
    return <th key={index}>
    <div className="table-header">
        <span onClick={selectSort.bind(this, key)}>
        {key.split('_').join(' ').toUpperCase()}
        { selectedSort === key ?
            (sortOrder === 1 ?
                <img src={upArrow} alt="up-arrow"/> : <img src={downArrow} alt="down-arrow"/>) : ''
        }
        </span>
    </div>
    <input type="text" onChange={filterPerson.bind(this, key)} value={filterText[key]}/>
    </th>
  });
}

export default tableHeader;
