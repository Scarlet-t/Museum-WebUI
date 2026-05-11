import * as authlib from '@/lib/authenticate.js'

//- PUT request to /favourites/id 
export async function addToFavourites(id) {
    console.log(`${authlib.getToken()}`);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${authlib.getToken()}`
        }
    });

    if (res.status == 200) {
        const data = await res.json();
        console.log("got sent");
        //backend issue, with user-service.js (provided code)
        return data;
    }
    else {
        console.log("not sent :(");
        return [];
    }
}

//– DELETE request to /favourites/id 
export async function removeFromFavourites(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${authlib.getToken()}`
        }
    });

    if (res.status == 200) {
        const data = await res.json();
        return data;
    }
    else {
        return [];
    }
}

//– GET request to /favourites 
export async function getFavourites() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${authlib.getToken()}`
        }
    });


    if (res.status == 200) {
        const data = await res.json();
        return data;
    }
    else {
        return [];
    }
}

//– PUT request to /history/id 
export async function addToHistory(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${authlib.getToken()}`
        }
    });

    if (res.status == 200) {
        const data = await res.json();
        return data;
    }
    else {
        return [];
    }
}

//– DELETE request to /history/id 
export async function removeFromHistory(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${authlib.getToken()}`
        }
    });

    if (res.status == 200) {
        const data = await res.json();
        return data;
    }
    else {
        return [];
    }
}

//– GET request to /history
export async function getHistory() {
    console.log("wegothere");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${authlib.getToken()}`
        }
    });
    console.log(res);

    if (res.status == 200) {
        const data = await res.json();
        return data;
    }
    else {
        return [];
    }
}