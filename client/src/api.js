const API_URL = process.env.REACT_APP_API_URL;

export async function listLogEntries(type){
    const token = localStorage.getItem("token")
    let url = `${API_URL}/api/logs`
    if(type){
        url += `?type=${type}`
    }
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

export async function createLogEntry(entry){
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/api/logs`,{
        method: 'POST',
        headers:{
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(entry),
        
    });
    return response.json();
}

export async function login(email, password){
    const response = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })
    const data = await response.json();
    if(data.token){
        localStorage.setItem("token", data.token);
        return true;
    }
    else{
        return false;
    }
    
}

export async function register(name, email, password){
    const response = await fetch(`${API_URL}/api/user/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({name : name, email: email, password: password})
    })
    const data = await response.json();
    console.log(data)
    if(data.token){
        localStorage.setItem("token", data.token);
        return true;
    }
    else{
        return false;
    }
    
}