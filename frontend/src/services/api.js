const BASE = import.meta.env.VITE_API_BASE || 'https://localhost:5000/api';

export async function post(path,body,token){
    const res = await fetch(
        BASE+path,{
            method:'POST',
            headers:{
                'content-type':'application/json',
                ...(token?{Authorization:'Bearer'+token}:{})
            },
            body: JSON.stringify(body)
        });
        return res.json();
}


export async function get(path,token){
    const res = await fetch(
        BASE+path,{
            headers:{
                ...(token ? { Authorization: 'Bearer ' + token } : {})
            }
        }
    );
    return res.json();
}