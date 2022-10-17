const loginReducer = (state = false, action) => {
    switch(action.type){
        case "SIGN_IN":
            console.log("allo");
            return true;
        default:
            return false;
    }
};

export default loginReducer;