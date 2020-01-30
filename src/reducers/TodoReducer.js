import { cloneDeep } from 'lodash';
const initialstate = {
    userstodo: [],
    userDetailstodo: {
        event: '',
        date: new Date(),
        id: ''
    }
}

const setusers = (state, action) => {
    return { ...state, userstodo: JSON.parse(localStorage.getItem('Todos')) }
}

const resetuser = (state, action) => {
    let obj = {
        event: '',
        date: new Date(),
    }
    return { ...state, userDetailstodo: obj }
}
const addtodo = (state, action) => {
    let userDetailstodo = cloneDeep(state.userDetailstodo)
    let userstodo = cloneDeep(state.userstodo)
    userDetailstodo.id = userstodo.length + 1
    if (JSON.parse(localStorage.getItem('Todos')) === null) {
        userstodo.push(userDetailstodo)
        localStorage.setItem('Todos', JSON.stringify(userstodo))
    } else {
        let user = JSON.parse(localStorage.getItem('Todos'))
        userstodo.push(userDetailstodo)
        localStorage.setItem('Todos', JSON.stringify(userstodo))
    }
    let obj = {
        event: '',
        date: new Date(),
        id: ''
    }
    return { ...state, userstodo: JSON.parse(localStorage.getItem('Todos')), userDetailstodo: obj }
}
const edituser = (state, action) => {
    let userstodo = cloneDeep(state.userstodo)
    userstodo.map(us => {
        if (us.id === action.payload.id) {
            us.event = action.payload.event
            us.date = action.payload.date
        }
        else {
            return us
        }
    })
    localStorage.setItem('User', JSON.stringify(userstodo))
    return { ...state, userstodo: userstodo }
}
const setuser = (state, action) => {
    let usertodo = cloneDeep(state.userDetailstodo)
    usertodo.event = action.payload.event
    usertodo.date = action.payload.date
    usertodo.id = action.payload.id
    return { ...state, userDetailstodo: usertodo }
}
const deleteuser = (state, action) => {
    const datas = JSON.parse(localStorage.getItem('Todos'))
    datas.splice(action.payload.id - 1, 1)
    datas.map(da => {
        if (action.payload.id < da.id) {
            return da.id = da.id - 1
        } else {
            return da.id = da.id
        }
    })
    localStorage.setItem('Todos', JSON.stringify(datas))
    return { ...state, userstodo: datas }
}
const changefield = (state, action) => {
    let user = cloneDeep(state.userDetailstodo)
    Object.keys(user).map(key => {
        if (key === action.payload.key) {
            user[key] = action.payload.value
        }
    })
    return { ...state, userDetailstodo: user }
}
 
const updateuser = (state,action) => {
    let userDetails = cloneDeep(state.userDetailstodo)
    const datas = JSON.parse(localStorage.getItem('Todos'))
    datas.map(da => {
        if(da.id === userDetails.id){
            da.id = userDetails.id
            da.event = userDetails.event
            da.date = userDetails.date
        }else{
            return da
        }
    })
    localStorage.setItem('Todos', JSON.stringify(datas))
    let obj = {
        date: new Date(),
        event: '',
        id: ''
    }
    return {...state, userstodo: datas, userDetailstodo: obj}
}

export default function Reducer(state = initialstate, action) {
    switch (action.type) {
        case 'CHANGE_FIELD': {
            return changefield(state, action)
        }
        case 'FETCH_USERSTODO': {
            return setusers(state, action)
        }
        case 'ADD_USERSTODO': {
            return addtodo(state, action)
        }
        case 'EDIT_USERSTODO': {
            return edituser(state, action)
        }
        case 'DELETE_USERSTODO': {
            return deleteuser(state, action)
        }
        case 'SET_USERSTODO': {
            return setuser(state, action)
        }
        case 'RESET_USERSTODO': {
            return resetuser(state, action)
        }
        case 'UPDATE_USERTODO' : {
            return updateuser(state,action)
        }
        default: {
            return state
        }
    }
}