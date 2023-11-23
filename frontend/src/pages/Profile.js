import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col } from "react-bootstrap";
import "./Profile.css";
import ChangePassword from "../components/ChangePassword";
import EditProfile from "../components/EditProfile";
import UserProfile from "../components/UserProfile";
import ChangeEmail from "../components/ChangeEmail";
import profileStore from "../store/ProfileStore";

const Profile = observer(() => {
  const profileButtonRef = useRef(null);
  const userinfo = localStorage.user ? JSON.parse(localStorage.user) : {};

  const [target, setTarget] = useState(0);
  const [companyName, setCompanyName] = useState(userinfo.lastName || "");
  const [phone, setPhone] = useState(userinfo.phone || "");

  const buttonsData = [
    { label: 'Profile', action: () => setTarget(0), ref: profileButtonRef },
    { label: 'Edit profile', action: () => setTarget(1) },
    { label: 'Change password', action: () => { setTarget(2); profileStore.errorMessage = []; } },
    { label: 'Change e-mail', action: () => { setTarget(3); profileStore.errorMessage = []; } }
  ];

  useEffect(() => {
    profileButtonRef.current.focus();
  }, []);


  let content;
  switch (target) {
    case 0:
      content = <UserProfile userinfo={userinfo} />
      break;
    case 1:
      content = (
        <EditProfile
          companyName={companyName}
          setCompanyName={setCompanyName}
          phone={phone}
          setPhone={setPhone}
        />
      );
      break;
    case 2:
      content = (<ChangePassword/>)
      break;

    case 3:
      content = (<ChangeEmail userinfo={userinfo} />)
      break;
    default:
      content = <div>Select an option</div>;
  }

  return (
    <div className="contain">
        <div className="d-flex justify-content-between"> 
            <Col sm="2" className="btn-container">
            {buttonsData.map((button, index) => (
              <div key={index} className="div">
                <Button 
                  className="custom-btn"
                  onClick={button.action}
                  ref={button.ref ? button.ref : null}
                >
                  {button.label}
                </Button>
              </div>
            ))}
            </Col>
            <Col sm="10" className="profile-info">
              {content}
            </Col>
        </div>  
    </div>
  );
});

export default Profile;