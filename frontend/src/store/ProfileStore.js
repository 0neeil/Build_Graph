import { makeAutoObservable } from 'mobx';
import { changeEmail, changePassword, updateInformation, getUserById } from '../http/userAPI';
import { LOGIN_ROUTE } from "../utils/consts";

class ProfileStore {
    newEmail = '';
    password = '';
    errorMessage = [];
    previousPassword = '';
    newPassword = '';
    confirmPassword = '';
    companyName = "";
    phone = "";

    constructor() {
        makeAutoObservable(this);
    }

    setPreviousPassword(password) {
        this.previousPassword = password;
    }

    setNewPassword(password) {
        this.newPassword = password;
    }

    setConfirmPassword(password) {
        this.confirmPassword = password;
    }

    setNewEmail(email) {
        this.newEmail = email;
    }

    setPassword(pass) {
        this.password = pass;
    }
   
    setCompanyName(name) {
        this.companyName = name;
    }

    setPhone(enterphone) {
        this.phone = enterphone;
    }

    async updateInformation() {
        try {
            const response = await updateInformation(this.companyName, this.phone);
            if (response.status !== 200) {
                const errorData = response?.response?.data?.message;
                this.errorMessage = [{ msg: errorData || "Unknown error occurred." }];
            } else {
                await getUserById();
                this.errorMessage = [];
            }
        } catch (error) {
            this.errorMessage = [{ msg: error.message }];
        }
    }

    async handleSubmitPasswordChange() {
        let errors = [];

        if (this.newPassword.length < 8) {
            errors.push({ msg: "Password must be longer than 8 characters" });
        }

        if (this.newPassword === this.previousPassword) {
            errors.push({ msg: "New password should not be the same as the previous one" });
        }

        if (this.newPassword !== this.confirmPassword) {
            errors.push({ msg: "New password and confirmation do not match" });
        }

        this.errorMessage = errors;
        if(errors.length === 0){
            try {
                const response = await changePassword(this.previousPassword, this.newPassword)
                if(response.status===200){
                    alert("Password changed successfully")
                    this.newPassword = "";
                    this.previousPassword = "";
                    this.confirmPassword = "";
                }
                else{
                    errors.push({msg: response.response.data.message});
                    this.errorMessage = errors;
                }
            } catch (error) {
                console.error("Error while changing password:", error);
            } 
        }
    }

    async handleSubmitEmailChange(user, navigate) {
        let errors = [];
        try {
            const response = await changeEmail(this.newEmail, this.password);
            console.log(response)
            if(response.status === 200){
                alert("E-mail changed successfully! Please log in.");
                user.setIsAuth(false);
                user.setIsAdmin(false);
                user.setIsReg(true);
                localStorage.removeItem("user");
                navigate(LOGIN_ROUTE);
            } else {
                errors.push({ msg: response.response.data.message });
                this.errorMessage = errors;
            }
        } catch (error) {
            console.error("Error while changing email:", error);
        }
    }
}

export default new ProfileStore();