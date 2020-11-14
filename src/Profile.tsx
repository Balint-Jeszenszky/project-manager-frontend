import React, {useState, useEffect} from 'react';

const Profile: React.FC = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [oldpass, setOldpass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');

    useEffect(() => {
        fetch('http://localhost:8888/api/user/1')
        .then(response => response.json())
        .then(response => {
            setName(response.name);
            setEmail(response.email);
            setLoaded(true);
        });
    }, [loaded]);

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onOldPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldpass(e.target.value);
    }
    const onNewPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPass(e.target.value);
    }
    const onConfirmPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPass(e.target.value);
    }

    const save = () =>{
        fetch('http://localhost:8888/api/user', {
            method: 'PATCH',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({id: 1, name, email, oldpass, newPass}),
        }).then();
    }
    const del = () =>{
        fetch('http://localhost:8888/api/user', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }).then(/* redirect to login */);
    }

    return (
        <div className="container">
            <div className="col-12 col-lg-6">
                <h1 className="mt-3"> Profile:</h1>
                <form>
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td className="align-middle"><label htmlFor="name_input">Name:</label></td>
                                <td><input
                                    type="text"
                                    className="form-control"
                                    id="name_input"
                                    name="name"
                                    value={name}
                                    onChange={onNameChange}
                                /></td>
                            </tr>
                            <tr>
                                <td className="align-middle"><label htmlFor="email_input">Email:</label></td>
                                <td><input
                                    type="email"
                                    className="form-control" 
                                    id="email_input" 
                                    name="email" 
                                    value={email}
                                    onChange={onEmailChange}
                                /></td>
                            </tr>
                            <tr>
                                <td className="align-middle"><label htmlFor="old_pass_input">Old password:</label></td>
                                <td><input
                                    type="password"
                                    className="form-control"
                                    id="old_pass_input"
                                    name="old_password"
                                    placeholder="••••••••"
                                    value={oldpass} 
                                    onChange={onOldPassChange}
                                /></td>
                            </tr>
                            <tr>
                                <td className="align-middle"><label htmlFor="new_pass_input">New password:</label></td>
                                <td><input
                                    type="password"
                                    className="form-control"
                                    id="new_pass_input"
                                    name="new_password"
                                    value={newPass} 
                                    onChange={onNewPassChange}
                                /></td>
                            </tr>
                            <tr>
                                <td className="align-middle"><label htmlFor="new_pass_confirm">Confirm password:</label></td>
                                <td><input
                                    type="password"
                                    className="form-control"
                                    id="new_pass_confirm"
                                    name="new_password_confirm"
                                    value={confirmPass} 
                                    onChange={onConfirmPassChange}
                                /></td>
                            </tr>
                            <tr>
                                <td className="text-center" colSpan={2}><button className="btn btn-primary" onClick={save}>Mentés</button></td>
                            </tr>
                            <tr>
                                <td className="text-center" colSpan={2}><button className="btn btn-outline-danger" onClick={del}>Profil törlése</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default Profile;
