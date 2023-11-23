import { makeAutoObservable } from 'mobx';
import { getAllUsers, banUserById, unbanUserById, setRoleById } from '../http/adminAPI';

class AdminStore {
    filteredUsers = [];
    users = [];
    bannedUsers = [];
    showModal = false;
    selectedUserId = null;
    isLoading = true;
    error = null;
    selectedUserId = null;
    selectedRole = null;
    allUsers = JSON.parse(localStorage.users || "[]");

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedUserId(id) {
        this.selectedUserId = id;
    }

    setSelectedRole(role) {
        this.selectedRole = role;
    }

    setShowModal = (value) => {
        this.showModal = value;
    }

    setSelectedUserId = (id) => {
        this.selectedUserId = id;
    }

    async setRoleForUser() {
        if (this.selectedUserId && this.selectedRole) {
            try {
                await setRoleById(this.selectedUserId, this.selectedRole);
                alert("Role updated successfully");
            } catch (error) {
                console.error("Failed to set role", error);
            }
        } else {
            alert("Please select a user and a role");
        }
    }

    async getUsers() {
        try {
            const response = await getAllUsers();
            if (response && response.data) {
                this.users = response.data.sort((a, b) => a.id - b.id);
                this.filteredUsers = this.users;
                this.isLoading = false;
            }
        } catch (error) {
            this.error = error;
            console.error("Error getting users:", error);
        }
    }

    filterUsersByEmail(email) {
        if (email) {
            this.filteredUsers = this.users.filter(user => user.email.includes(email));
        } else {
            this.filteredUsers = this.users;
        }
    }

    async banUser(id) {
        try {
            await banUserById(id);
            this.getUsers(); 
        } catch (error) {
            this.error = error;
            console.error("Error when banning user:", error);
        }
    }
    
    async unbanUser(id) {
        try {
            await unbanUserById(id);
            this.getUsers();
        } catch (error) {
            this.error = error;
            console.error("Error when unbanning a user:", error);
        }
    }

    async getBannedUsers() {
        try {
            const response = await getAllUsers();
            if (response && response.data) {
                this.bannedUsers = response.data.filter(user => user.isbanned);
                this.isLoading = false;
            }
        } catch (error) {
            this.error = error;
            console.error("Error getting banned users:", error);
        }
    }

    handleModalClose = () => {
        this.showModal = false;
        this.selectedUserId = null;
    };

    confirmUnban = async () => {
        if (this.selectedUserId) {
            try {
                await unbanUserById(this.selectedUserId);
                this.getBannedUsers();
            } catch (error) {
                this.error = error;
                console.error("Error when unbanning the user:", error);
            }
        }
        this.handleModalClose();
    }
}




export default new AdminStore();