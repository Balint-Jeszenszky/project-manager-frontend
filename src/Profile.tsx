import React from 'react';

const Profile: React.FC = () => {
    return (
        <div className="container">
            <div className="col-12 col-lg-6">
                <h1 className="mt-3"> Profile:</h1>
                <form>
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td className="align-middle"><label htmlFor="name_input">Name:</label></td>
                                <td><input type="text" className="form-control" id="name_input" name="name" value="Jeszenszky Bálint" /></td>
                            </tr>
                            <tr>
                                <td className="align-middle"><label htmlFor="email_input">Email:</label></td>
                                <td><input type="email" className="form-control" id="email_input" name="email" value="mail@example.com" /></td>
                            </tr>
                            <tr>
                                <td className="align-middle"><label htmlFor="old_pass_input">Old password:</label></td>
                                <td><input type="password" className="form-control" id="old_pass_input" name="old_password" placeholder="••••••••" /></td>
                            </tr>
                            <tr>
                                <td className="align-middle"><label htmlFor="new_pass_input">New password:</label></td>
                                <td><input type="password" className="form-control" id="new_pass_input" name="new_password" /></td>
                            </tr>
                            <tr>
                                <td className="align-middle"><label htmlFor="new_pass_input">Confirm password:</label></td>
                                <td><input type="password" className="form-control" id="new_pass_confirm" name="new_password_confirm" /></td>
                            </tr>
                            <tr>
                                <td className="text-center" colSpan={2}><button className="btn btn-primary">Mentés</button></td>
                            </tr>
                            <tr>
                                <td className="text-center" colSpan={2}><button className="btn btn-outline-danger">Profil törlése</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default Profile;
