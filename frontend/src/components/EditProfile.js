import React from "react";
import { Button, FormControl } from "react-bootstrap";
import "../pages/Profile.css";
import { observer } from "mobx-react-lite";
import { ErrorMessage } from "./Errors";
import profileStore from '../store/ProfileStore';

const EditProfile = observer(() => {
    const fields = [
        { label: "Company:", value: profileStore.companyName, onChange: profileStore.setCompanyName },
        { label: "Phone:", value: profileStore.phone, onChange: profileStore.setPhone, type: "tel", placeholder: "+380123456789" },
    ];

    return (
        <div className="">
            <div className="profile-h">
                <h2 className="">Edit profile</h2>
            </div>

            <ul className="profile-ul">
                {profileStore.errorMessage.map((error, index) => (
                    <ErrorMessage className="profile-error-message" key={index} text={error.msg} />
                ))}
                {fields.map((field, index) => (
                    
                    <li key={index} className="profile-ul-li d-flex">
                        {console.log(field.value)}
                        <div className="li-div-header">{field.label}</div>
                        <div className="li-div-content">
                            <FormControl
                                type={field.type || "text"}
                                placeholder={field.placeholder || ""}
                                className="profile-inp input"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                            
                        </div>
                    </li>
                ))}
            </ul>
            <Button className="changePassword-btn" onClick={() => profileStore.updateInformation()}>Send</Button>
        </div>
    );
});

export default EditProfile;