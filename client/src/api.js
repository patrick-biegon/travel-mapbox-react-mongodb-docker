const API_URL = 'http://host.docker.internal:8083';

export async function listLogEntries(){
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}

export async function createLogEntry(entry){
    const response = await fetch(`${API_URL}/api/logs`,{
        method: 'POST',
        headers:{
            'content-type': 'application/json',
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
    const data = response.json();
    if(data.token){
        localStorage.setItem("token", data.token)
        return true;
    }
    return false;
}