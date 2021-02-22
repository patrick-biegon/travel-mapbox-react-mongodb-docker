const API_URL = 'http://localhost:8081';


export async function listLogEntries(){
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}