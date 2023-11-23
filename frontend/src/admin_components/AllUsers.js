import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import adminStore from '../store/AdminStore';
import { Button } from "react-bootstrap";
import ConfirmationModal from '../components/ConfirmationModal';
import "./Admin.css";


const AllUsers = observer(() => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        adminStore.getUsers();

    }, []);

    const handleSearch = () => {
        adminStore.filterUsersByEmail(searchTerm);
    };

    if (adminStore.isLoading) return <p>Loading...</p>;
    if (adminStore.error) return <p>Error: {adminStore.error.message}</p>;

    const handleShowModal = (action, userId) => {
        setCurrentAction(action);
        setSelectedUserId(userId);
        setShowModal(true);
    };
    
    const handleConfirmAction = () => {
        if (currentAction === 'ban') {
            adminStore.banUser(selectedUserId);
        } else if (currentAction === 'unban') {
            adminStore.unbanUser(selectedUserId);
        }
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setCurrentAction(null);
        setSelectedUserId(null);
        setShowModal(false);
    };

    return (
        <div>
            <h2 className="profile-h">All Users</h2>
            <input 
                type="text"  
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Email..."
                className="search-input scrollable-container"
            />
            <Button className="search-btn" onClick={handleSearch}>Search</Button>
            <table className='scrollable-container'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {adminStore.filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                            {user.role === "ADMIN" ? <></> : user.isbanned ? 
                                <button className="unban-btn" onClick={() => handleShowModal('unban', user.id)}>Unban</button> :
                                <button className="ban-btn" onClick={() => handleShowModal('ban', user.id)}>Ban</button>
                            }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ConfirmationModal 
                show={showModal}
                handleClose={handleCloseModal}
                confirmAction={handleConfirmAction}
                title="Confirmation"
                message={currentAction === 'ban' ? 'Do you really want to ban this user?' : 'Do you really want to unban this user?'}
            />   
        </div>
    );
});

export default AllUsers;