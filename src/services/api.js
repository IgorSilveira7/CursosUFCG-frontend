const BASEURL = "https://api-cursosufcg.herokuapp.com/api";

const api = (url, config) => {
    let repsonse = await  fetch(url, config);
    if (!response.ok) {
        throw response;
    }
    let data = await response.json();

    return data;
}

export { BASEURL, api };