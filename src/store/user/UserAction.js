import UserActionType from "./UserActionType";

const logInUser = (currentUser) => {
    return {
        type: UserActionType.Login,
        payload: currentUser
    }
}

const logOutUser = () => {
    return {
        type: UserActionType.Logout
    }
}

export {logOutUser, logInUser};