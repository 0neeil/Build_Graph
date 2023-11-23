import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import adminStore from '../store/AdminStore';
import ConfirmationModal from '../components/ConfirmationModal';
import "./Admin.css";

const BannedUsers = observer(() => {

  const handleUnbanClick = (id) => {
      adminStore.setSelectedUserId(id);
      adminStore.setShowModal(true);
  };

  useEffect(() => {
    adminStore.getBannedUsers();
  }, []);

  return (
      <div className="scrollable-container">
        <h2 className="profile-h">Banned Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminStore.bannedUsers.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        {user.role === "ADMIN" ? "GOD" :
                            <Button className="unban-btn" onClick={() => handleUnbanClick(user.id)}>Unban</Button>
                        }
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
        <ConfirmationModal 
            show={adminStore.showModal} 
            handleClose={adminStore.handleModalClose} 
            confirmAction={adminStore.confirmUnban}
        />
      </div>
  );
});

export default BannedUsers;