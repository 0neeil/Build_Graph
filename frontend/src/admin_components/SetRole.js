import React from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import "./Admin.css";
import { observer } from 'mobx-react-lite';
import adminStore from '../store/AdminStore';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: '#559c64f6',
        '&:hover': { borderColor: '#559c64f6' }, 
        boxShadow: state.isFocused ? '0 0 5px #173a1ef6' : null,
        outline: 'none',
        margin: '10px 0 10px 32px',
    }),
    option: (provided) => ({
        ...provided,
        color: 'black'
    }),
    menu: (provided) => ({
        ...provided,
        marginLeft: '32px',
        width: '755px'
    })
};

const SetRole = observer(() => {
    const userOptions = adminStore.allUsers.map(user => ({
        value: user.id,
        label: user.email,
    }));

    const roleOptions = [
        { value: "USER", label: "USER" },
        { value: "ADMIN", label: "ADMIN" },
    ];

    return (
        <div>
            <div className='profile-h'>
                <h2>Set Role for User</h2>
            </div>
            
            <div className='profile-ul'>
                <Select
                    classNamePrefix="react-select"
                    placeholder="Select User by Email..."
                    options={userOptions}
                    onChange={(option) => adminStore.setSelectedUserId(option ? option.value : null)}
                    isSearchable={true}
                    styles={customStyles}
                />

                <Select
                    classNamePrefix="react-select"
                    placeholder="Select Role"
                    options={roleOptions}
                    onChange={(option) => adminStore.setSelectedRole(option ? option.value : null)}
                    styles={customStyles}
                /> 
            </div>  
            <Button className='changePassword-btn' onClick={() => adminStore.setRoleForUser()}>Set Role</Button>
        </div>
    );
});

export default SetRole;