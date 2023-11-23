import React from "react";
import { Button, FormControl } from "react-bootstrap";
import "../pages/Profile.css";
import { observer } from "mobx-react-lite";
import { ErrorMessage } from "./Errors";
import profileStore from '../store/ProfileStore';

const ChangePassword = observer(() => {
  return (
    <div className="">
      <div className="profile-h">
        <h2 className="">Change Password</h2>
      </div>
      <ul className="profile-ul">
        <li className="profile-ul-li">
            {profileStore.errorMessage.map((error, index) => (
                <ErrorMessage className= {"profile-error-message"} key={index} text={error.msg} />
            ))}
            <div className="d-flex">
                <div className="li-div-header">Old Password:</div>
                <div className="li-div-content">
                    <FormControl
                        className="profile-inp input"
                        aria-label="Old Password"
                        type="password"
                        value={profileStore.previousPassword}
                        onChange={(e) => profileStore.setPreviousPassword(e.target.value)}
                    />
                </div>
            </div> 
        </li>
        <li className="profile-ul-li">
            <div className="d-flex">          
                <div className="li-div-header">New Password:</div>
                <div className="li-div-content">
                    <FormControl
                        className="profile-inp input"
                        aria-label="New Password"
                        type="password"
                        value={profileStore.newPassword}
                        onChange={(e) => profileStore.setNewPassword(e.target.value)}
                    />
                </div>
            </div>
        </li>
        <li className="profile-ul-li">
            <div className="d-flex">
                <div className="li-div-header">Confirm New Password:</div>
                <div className="li-div-content">
                    <FormControl
                        className="profile-inp input"
                        aria-label="Confirm New Password"
                        type="password"
                        value={profileStore.confirmPassword}
                        onChange={(e) => profileStore.setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>
        </li>
      </ul>
      <Button onClick={() => profileStore.handleSubmitPasswordChange()} aria-label="Send" className="changePassword-btn">Send</Button>
    </div>
  );
})

export default ChangePassword;