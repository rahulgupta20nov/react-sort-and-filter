import React from 'react';

const tableRow = (props) => props.filteredPerson.map((person) => {
    const {
      id,
      first_name,
      last_name,
      email,
      gender,
      show
    } = person;
    if (show === undefined || show) {
      return (
            <tr key={id}>
            <td>{id}</td>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{email}</td>
            <td>{gender}</td>
            </tr>
        );
    }
    return (<tr key={id}></tr>);
  });
export default tableRow;