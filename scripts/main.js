const BASE_URL = "https://api.imdbapi.dev";

let results = [];

async function search(e) {
    try {
        document.querySelector("#results").innerHTML = "";

        const cache = await caches.open('localio-cache');

        const query = encodeURIComponent(document.querySelector("#imdb-search").value);
        const url = `/search/titles?query=${query}`;

        let response = await cache.match(url);
        if (!response) {
            response = await fetch(BASE_URL + url);
            await cache.put(url, response.clone());
        }

        if (response.status !== 200) {
            error = JSON.stringify(await response.json());
            document.querySelector("#results").innerHTML = `<div style="color: red"> <p>STATUS CODE: ${response.status}</p> <p>ERROR: ${error}</p></div>`;
            return;
        }

        results = await response.json();

        let resultsHtml = "<h3 style='text-decoration: underline;'>search results</h3>";
        let index = 0;
        for (const r of results.titles) {
            if (r?.primaryImage?.url) {
                index += 1;
                resultsHtml += `
            <div class="result-card" style='margin: 20px 0px; max-width: 500px;' data-type="${r?.type}" data-imdbId="${r?.id}">
                <div style="font-weight:bolder; color: gray; margin-bottom: 3px;"># ${`${index}`.padStart(3, 0)}</div>
                <img src="${r?.primaryImage?.url}" width="100px" height="auto" />
                    
                
                <div class="original-title" style="font-weight:bolder;">${r?.originalTitle}</div> 
                <div style="color: gray;">
                    ${r?.startYear ? r?.startYear : ''} 
                    &nbsp;&nbsp;&nbsp; 
                    ${r?.rating?.aggregateRating != null ? '⭐ ' + r?.rating?.aggregateRating : ''}
                </div>
                <div>
                    <span>${await getMagnets(r?.id, r?.type)}</span>
                </div>
                <br/>
            </div>`;
            }
        }

        document.querySelector("#results").innerHTML = resultsHtml;
    } catch (error) {
        alert("search failed: ", JSON.stringify(error.stack));
    }
}

async function getMagnets(id, type) {
    if (!id || !type) {
        return `<div style="color:red">invalid id "${id}" or type "${type}" </div>`
    }

    const base_url = "https://torrentio.strem.fun/providers=yts,eztv,rarbg,1337x%7Cqualityfilter=brremux,hdrall,dolbyvision,dolbyvisionwithhdr,threed,4k,other,scr,cam,unknown%7Climit=1";
    let url;

    if (type === "movie") {
        url = `${base_url}/stream/movie/${id}.json`;
    } else {
        return `TODO`;
    }

    try {
        const cache = await caches.open('localio-cache');
        
        let response = await cache.match(url);
        if (!response) {
            response = await fetch(url);
            await cache.put(url, response.clone());
        }

        if (response.status !== 200) {
            error = JSON.stringify(await response.json());
            return `<div style="color: red"> <p>STATUS CODE: ${response.status}</p> <p>ERROR: ${error}</p></div>`;
        }

        response = await fetch(url);
        const data = await response.json();

        const streams = data.streams || [];

        if (streams.length === 0) {
            return "No streams found";
        }

        let html = "<br/>";

        streams.forEach(s => {

            const magnet = s.infoHash
                ? `magnet:?xt=urn:btih:${s.infoHash}`
                : "#";
            
            html += `<a style="word-break: break-word;" href=${magnet}>${s.title}</a><br/><br/>`;
        });

        return html;

    } catch (err) {
       return "Error fetching streams";
    }
}


