import { cloneDeep } from 'lodash';
const initialstate = {
    users: [],
    userDetails: {
        name: '',
        email: '',
        id: ''
    }
}

const setusers = (state, action) => {
    return { ...state, users: JSON.parse(localStorage.getItem('userDetails')) }
}

const resetuser = (state, action) => {
    let obj = {
        name: '',
        email: ''
    }
    return { ...state, userDetails: obj }
}
const adduser = (state, action) => {
    let userDetails = cloneDeep(state.userDetails)
    let users = cloneDeep(state.users)
    userDetails.id = users.length + 1
    if (localStorage.getItem('userDetails') === null) {
        users.push(userDetails)
        localStorage.setItem('userDetails', JSON.stringify(users))
    } else {
        let user = JSON.parse(localStorage.getItem('userDetails'))
        user.push(userDetails)
        localStorage.setItem('userDetails', JSON.stringify(user))
    }
    let obj = {
        name: '',
        email: '',
        id: ''
    }
    return { ...state, users: JSON.parse(localStorage.getItem('userDetails')), userDetails: obj }
}
const edituser = (state, action) => {
    let users = cloneDeep(state.users)
    users.map(us => {
        if (us.id === action.payload.id) {
            us.name = action.payload.name
            us.email = action.payload.email
        }
        else {
            return us
        }
    })
    localStorage.setItem('User', JSON.stringify(users))
    // console.log(datas, action.payload.id,'datas')
    return { ...state, users: users }
}
const setuser = (state, action) => {
    let user = cloneDeep(state.userDetails)
    user.name = action.payload.name
    user.email = action.payload.email
    user.id = action.payload.id
    return { ...state, userDetails: user }
}
const deleteuser = (state, action) => {
    const datas = JSON.parse(localStorage.getItem('userDetails'))
    console.log(datas, action.payload.id, 'datas')
    datas.splice(action.payload.id - 1, 1)
    datas.map(da => {
        if(action.payload.id < da.id){
            return da.id = da.id - 1
        } else {
            return da.id = da.id 
        }
     } )
    localStorage.setItem('userDetails', JSON.stringify(datas))
    return { ...state, users: datas }
}

const updateuser = (state,action) => {
    let userDetails = cloneDeep(state.userDetails)
    const datas = JSON.parse(localStorage.getItem('userDetails'))
    datas.map(da => {
        if(da.id === userDetails.id){
            da.id = userDetails.id
            da.name = userDetails.name
            da.email = userDetails.email
        }else{
            return da
        }
    })
    localStorage.setItem('userDetails', JSON.stringify(datas))
    let obj = {
        name: '',
        email: '',
        id: ''
    }
    return {...state, users: datas, userDetails: obj}
}

const changefield = (state, action) => {
    let user = cloneDeep(state.userDetails)
    Object.keys(user).map(key => {
        if (key === action.payload.key) {
            user[key] = action.payload.value
        }
    })
    return { ...state, userDetails: user }
}
export default function Reducer(state = initialstate, action) {
    switch (action.type) {
        case 'CHANGE_FIELD': {
            return changefield(state, action)
        }
        case 'FETCH_USERS': {
            return setusers(state, action)
        }
        case 'ADD_USERS': {
            return adduser(state, action)
        }
        case 'EDIT_USERS': {
            return edituser(state, action)
        }
        case 'DELETE_USER': {
            return deleteuser(state, action)
        }
        case 'SET_USER': {
            return setuser(state, action)
        }
        case 'RESET_USER': {
            return resetuser(state, action)
        }
        case 'UPDATE_USER' : {
            return updateuser(state,action)
        }
        default: {
            return state
        }
    }
}