import React, {ReactNode} from 'react';
import { Link } from 'react-router-dom';

interface AuthProps {
    setLoggedin(params: boolean): void;
}

const Auth: React.FC<AuthProps> = props => {
    
    const login = (): ReactNode => {
        return (
            <div className="col-12 col-lg-4 border border-dark rounded mt-2 mt-lg-5">
                <h1 className="text-center">Login</h1>
                <form>
                    <div className="form-group">
                        <input type="email" className="form-control" name="login_mail" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="login_password" placeholder="Password" />
                    </div>
                    <div className="text-center form-group">
                        <button className="btn btn-link">Forgot password</button>
                    </div>
                    <div className="text-center form-group">
                        <Link className="btn btn-primary" to="/projects" onClick={() => props.setLoggedin(true)}>Login</Link>
                    </div>
                </form>
            </div>
        );
    };

    const register = (): ReactNode => {
        return (
            <div className="col-12 col-lg-4 border border-dark rounded mt-2 mt-lg-5">
                <h1 className="text-center">Register</h1>
                <form>
                    <div className="form-group">
                        <input type="email" className="form-control" name="reg_mail" placeholder="Email" />
                    </div>
                        <div className="form-group">
                        <input type="text" className="form-control" name="reg_name" placeholder="Name" />
                    </div>
                        <div className="form-group">
                        <input type="password" className="form-control" name="reg_password" placeholder="Password" />
                    </div>
                    <div className="text-center form-group">
                        <button  className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="row justify-content-around mt-0 mt-lg-5">
                {login()}
                {register()}
            </div>
        </div>
    );
};

export default Auth;
