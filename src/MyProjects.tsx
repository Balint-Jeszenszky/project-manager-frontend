import React from 'react';

const MyProjects: React.FC = () => {
    return (
        <div className="container">
            <table className="table mt-2 mt-md-3 mt-lg-4 table-hover projects">
                <thead>
                    <tr>
                        <th>Project name</th>
                        <th>Description</th>
                        <th className="text-right">Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            asd
                        </td>
                        <td>
                            lol
                        </td>
                        <td className="text-right">
                            <button className="btn btn-warning mr-2"><i className="fas fa-edit" /></button>
                            <button className="btn btn-danger"><i className="fas fa-trash" /></button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            asd
                        </td>
                        <td>
                            lol
                        </td>
                        <td className="text-right">
                            <button className="btn btn-warning mr-2"><i className="fas fa-edit" /></button>
                            <button className="btn btn-danger"><i className="fas fa-trash" /></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MyProjects;
