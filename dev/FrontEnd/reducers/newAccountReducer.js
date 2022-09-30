const newAccountReducer = (state = false, action) => {
    switch(action.type){
        case 'CREATE_ACCOUNT':
            return true;
        default:
            return false;
    }
};

export default newAccountReducer;

