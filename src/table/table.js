import React from 'react';
import axios from 'axios';
import TableRow from './tableRow';
import TableHeader from './tableHeader';

export class Table extends React.Component {
    header = ['id', 'first_name', 'last_name', 'email', 'gender'];
    state = {
        selectedSort: 'id',
        sortOrder: 1,
        persons: [],
        filteredPerson: [],
        filterText: {
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            gender: ''
        }
    };

    componentDidMount() {
        axios.get(`https://my.api.mockaroo.com/users.json?key=cde45810`)
            .then(res => {
                this.persons = res.data;
                this.setState({
                    filteredPerson: this.sortPerson(this.persons, 'id', 1)
                });
            });
    }

    selectSort = (key) => {
        if (this.state.selectedSort === key) {
            this.setState({
                sortOrder: this.state.sortOrder === -1 ? 1 : -1,
                filteredPerson: this.sortPerson(this.state.filteredPerson, key, this.state.sortOrder === -1 ? 1 : -1)
            });
        } else {
            this.setState({
                selectedSort: key,
                sortOrder: 1,
                filteredPerson: this.sortPerson(this.state.filteredPerson, key, 1)
            });
        }
    };

    sortPerson = (persons, key, sortOrder) => persons.sort((a, b) => {
        return (sortOrder === 1) ? (a[key] > b[key] ? 1 : -1) : (a[key] > b[key] ? -1 : 1);
    });

    filterPerson = (key, event) => {
        const filterText = event.target.value;
        this.setState({
            filterText: {
                id: key === 'id' ? filterText : this.state.filterText.id,
                first_name: key === 'first_name' ? filterText : this.state.filterText.first_name,
                last_name: key === 'last_name' ? filterText : this.state.filterText.last_name,
                email: key === 'email' ? filterText : this.state.filterText.email,
                gender: key === 'gender' ? filterText : this.state.filterText.gender,
            },
        }, () => {
            this.state.filteredPerson.forEach((val) => {
                const stringId = val.id.toString();
                val.show = this.isValueIncludes(this.state.filterText.id, stringId)
                    && this.isValueIncludes(this.state.filterText.first_name, val.first_name)
                    && this.isValueIncludes(this.state.filterText.last_name, val.last_name)
                    && this.isValueIncludes(this.state.filterText.email, val.email)
                    && this.isValueIncludes(this.state.filterText.gender, val.gender);
            });
            this.setState({
                filteredPerson: this.state.filteredPerson
            });
        });
    }

    isValueIncludes = (filterText, shellValue) => !filterText || shellValue.toLowerCase().includes(filterText.toLowerCase());

    render() {
        return (
            <table id='persons'>
                <tbody>
                    <TableHeader header={this.header} selectSort={this.selectSort} selectedSort={this.state.selectedSort} sortOrder={this.state.sortOrder} filterPerson={this.filterPerson} filterText={this.state.filterText} />
                    <TableRow filteredPerson={this.state.filteredPerson} />
                </tbody>
            </table>
        )
    }
}