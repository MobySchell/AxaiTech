import React, { Component } from 'react'

export default class PractitionersTable extends Component {
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">HPCSA</th>
                            <th scope="col">Practice Number</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.practitioners.map((practitioners) => {
                            return (
                                <tr key={practitioners.id}>
                                    <td>{practitioners.firstName}</td>
                                    <td>{practitioners.surName}</td>
                                    <td>{practitioners.hpcsa}</td>
                                    <td>{practitioners.practiceNum}</td>
                                    <td>{practitioners.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
