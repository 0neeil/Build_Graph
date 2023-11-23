import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Profile.css";
import { observer } from "mobx-react-lite";
import { Button, FormControl } from "react-bootstrap";
import { ErrorMessage } from "./Errors";
import { Context } from "..";
import profileStore from '../store/ProfileStore';


const ChangeEmail = observer((userinfo) => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const email = userinfo.userinfo.email;

    return (
        <div className="">
            <div className="profile-h">
                <h2 className="">Change E-mail</h2>
            </div>
            <ul className="profile-ul">
                <li className="profile-ul-li">
                    {profileStore.errorMessage.map((error, index) => (
                        <ErrorMessage className= {"profile-error-message"} key={index} text={error.msg} />
                    ))}
                    <div className="d-flex">
                        <div className="li-div-header">Old E-mail:</div>
                        <div className="li-div-content">
                            {email}
                        </div>
                    </div> 
                </li>
                <li className="profile-ul-li">
                    <div className="d-flex">          
                        <div className="li-div-header">New E-mail:</div>
                        <div className="li-div-content">
                            <FormControl
                                className="profile-inp input"
                                type="email"
                                value={profileStore.newEmail}
                                onChange={(e) => profileStore.setNewEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </li>
                <li className="profile-ul-li">
                    <div className="d-flex">
                        <div className="li-div-header">Password:</div>
                        <div className="li-div-content">
                            <FormControl
                                className="profile-inp input"
                                type="password"
                                value={profileStore.password}
                                onChange={(e) => profileStore.setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </li>
            </ul>
            <Button onClick={() => profileStore.handleSubmitEmailChange(user, navigate)} className="changePassword-btn">Send</Button>
        </div>
    );
})

export default ChangeEmail;