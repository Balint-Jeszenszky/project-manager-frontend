import React, {useState} from 'react';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const register = () => {
        fetch('http://localhost:8888/api/user/register', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({
                name,
                username,
                email,
                password
            }),
        })
        .then(() => setSuccess(true));
    } 

    return (
        <div className="col-12 col-lg-4 border border-dark rounded mt-2 mt-lg-5">
            <h1 className="text-center">Register</h1>
            {success && <p className="text-success text-center">Successful registration</p>}
            <form>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" onChange={onEmailChange} value={email} />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Name" onChange={onNameChange} value={name} />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" onChange={onUsernameChange} value={username} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" onChange={onPassChange} value={password} />
                </div>
                <div className="text-center form-group">
                    <button type="button" className="btn btn-primary" onClick={register}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;
