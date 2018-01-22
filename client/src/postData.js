export function PostData(type, userData) {
    // need to add url here after launched
    let BaseURL = '';
    
    return new Promise((resolve, reject) =>{
    fetch(BaseURL+type, {
        method: 'POST',
        body: JSON.stringify(userData)
    })
    .then((response) => response.json())
    .then((res) => {
        resolve(res);
    })
    .catch((error) => {
       reject(error);
    });
    
    });
    }