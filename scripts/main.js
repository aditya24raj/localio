const BASE_URL = "https://api.imdbapi.dev";

let results = [];

async function search(clearCache) {
    try {
        const resultsElement = document.querySelector("#results");

        const query = encodeURIComponent(document.querySelector("#imdb-search").value);
        if (!query) {
            alert("Enter a search term");
            return;
        }

        if (clearCache) {
            resultsElement.innerHTML = "Removing cache...<br/>Loading...";
            await caches.delete("localio-cache");
        } else {
            resultsElement.innerHTML = "Loading...";
        }

        const url = `${BASE_URL}/search/titles?query=${query}`;
        let response = await cachedFetch(url);

        if (response.status !== 200) {
            error = JSON.stringify(await response.json());
            resultsElement.innerHTML = `<div style="color: red"> <p>STATUS CODE: ${response.status}</p> <p>ERROR: ${error}</p></div>`;
            return;
        }

        results = await response.json();

        resultsElement.innerHTML = "";
        let resultsHtml = `<h3 style='color: gray;'>search results</h3>`;
        let index = 0;
        let movieIds = [];
        for (const r of results.titles) {
            if (r?.primaryImage?.url) {
                index += 1;
                resultsHtml += `
                    <div onhover="alert()" class="result-card" style='background-color: black; padding: 12px; border-radius: 12px; margin: 10px 0px; max-width: 500px;' data-type="${r?.type}" data-imdbId="${r?.id}">
                        <div style="font-weight:900; color: gray; margin-bottom: 6px;"># ${`${index}`.padStart(3, 0)}</div>
                        
                        <div class="original-title" style="font-weight:bolder;">${r?.originalTitle}</div> 
                        <div style="color: gray; font-size: small; font-weight: bold;">
                            ${r?.startYear ? r?.startYear : ''} 
                            &nbsp;&nbsp;&nbsp; 
                            ${r?.rating?.aggregateRating != null ? '⭐ ' + r?.rating?.aggregateRating : ''}
                        </div>
                        <br/>

                        <img src="${r?.primaryImage?.url}" width="100%" height="auto" style="border-radius: 6px;" />
                        <div>
                            ${r?.type === 'movie'
                        ?
                        `<div id="movie-magnets-${r?.id}">Loading...</div>`
                        :
                        `<br/>
                                    <div style="display: flex; gap: 10px; max-width: 300px">
                                        <div>
                                            <label for="seasons-${r?.id}">Season</label>
                                            <br/>
                                            <select style="max-width: 50px; min-width: 50px;" id="seasons-${r?.id}" onclick="getSeasons('${r?.id}')" onchange="getEpisodes(event, '${r?.id}')">
                                                <option value="">-</option>
                                                <option value="">Loading...</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label for="episodes-${r?.id}">Episode</label>
                                            <br/>
                                            <select style="max-width: 300px; min-width: 100px" id="episodes-${r?.id}" onchange="getMagnetsTv('${r?.id}', '${r?.type}')">
                                                <option value="">-</option>
                                                <option value="">Loading...</option>                                                
                                            </select>
                                        </div>
                                    </div>
                                    <br/>
                                    <div id="tv-magnets-${r?.id}"></div>
                                    `
                    }
                        </div>
                    </div>
                    
                `;

                if (r?.type === "movie") {
                    movieIds.push(r.id);
                }
            }
        }
        resultsElement.innerHTML += resultsHtml;

        for (const id of movieIds) {
            getMagnetsMovie(id, "movie");
        }

    } catch (error) {
        alert("search failed: ", JSON.stringify(error.stack));
    }
}

async function getMagnets(id, type, season = null, episode = null) {
    if (!id || !type) {
        return `<br/><div style="color:red">invalid id "${id}" or type "${type}" </div><br/>`
    }

    const base_url = "https://torrentio.strem.fun/providers=yts,eztv,rarbg,1337x%7Cqualityfilter=brremux,hdrall,dolbyvision,dolbyvisionwithhdr,threed,4k,other,scr,cam,unknown%7Climit=1";
    let url;

    if (type === "movie") {
        url = `${base_url}/stream/movie/${id}.json`;
    } else {
        url = `${base_url}/stream/series/${id}:${season}:${episode}.json`;
    }

    try {
        let response = await cachedFetch(url);

        if (response.status !== 200) {
            let error = JSON.stringify(await response.json());
            return `<br/><div style="color: red"> <p>STATUS CODE: ${response.status}</p> <p>ERROR: ${error}</p></div><br/>`;
        }

        const data = await response.json();

        const streams = data.streams || [];

        if (streams.length === 0) {
            return "<br/>No streams found<br/>";
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

async function getMagnetsMovie(id, type) {
    try {
        const html = await getMagnets(id, type, null, null);
        const movieMagnetsElement = document.querySelector(`#movie-magnets-${id}`);
        movieMagnetsElement.innerHTML = html;
    } catch (error) {
        console.log("failed get magnets for ", type, id);
    }
}

async function getMagnetsTv(id, type) {
    const tvMagnetsElement = document.querySelector(`#tv-magnets-${id}`);
    tvMagnetsElement.innerHTML = "";

    const season = document.querySelector(`#seasons-${id}`).value;
    const episode = document.querySelector(`#episodes-${id}`).value;

    const html = await getMagnets(id, type, season, episode);
    tvMagnetsElement.innerHTML = html;
}

async function getSeasons(id) {
    if (!id) {
        return;
    }

    const select = document.querySelector(`#seasons-${id}`);

    if (select.dataset.loaded) {
        return;
    }

    select.innerHTML = `
    <option>-</option>
    <option>Loading...</option>
    `;

    let url = `${BASE_URL}/titles/${id}/seasons`;
    let response = await cachedFetch(url);

    if (response.status !== 200) {
        error = JSON.stringify(await response.json());
        alert("Failed to get seasons!");
        return;
    }

    const data = await response.json();

    let optionsHTML = "<option>-</option>"
    for (const s of data.seasons) {
        optionsHTML += `<option value="${s.season}">${s.season}</option>`;
    }

    select.innerHTML = optionsHTML;
    select.dataset.loaded = "true";
}

async function getEpisodes(event, id) {
    if (!id || !event.target.value) {
        return;
    }

    document.querySelector(`#tv-magnets-${id}`).innerHTML = '';

    const select = document.querySelector(`#episodes-${id}`);

    select.innerHTML = `
        <option>-</option>
        <option>Loading...</option>
    `;

    let url = `${BASE_URL}/titles/${id}/episodes?season=${event.target.value}&pageSize=50`;
    let response = await cachedFetch(url);

    if (response.status !== 200) {
        error = JSON.stringify(await response.json());
        alert("Failed to get episdoes!");
        return;
    }

    const data = await response.json();

    let optionsHTML = "<option>-</option>"
    for (const e of data.episodes) {
        optionsHTML += `
        <option value="${e?.episodeNumber}">
            ${e?.episodeNumber}. ${e?.title}
            ${e?.releaseDate?.day ? e?.releaseDate?.day + "/" : ""}${e?.releaseDate?.month ? e?.releaseDate?.month + "/" : ""}${e?.releaseDate?.year ? e?.releaseDate?.year : ""}
        </option>`;
    }

    select.innerHTML = optionsHTML;
}

async function cachedFetch(url) {
    const cache = await caches.open('localio-cache');

    let response = await cache.match(url);
    if (!response) {
        response = await fetch(url);
        if (response.status === 200) {
            await cache.put(url, response.clone());
        }
    }

    return response;
}


// Register the service worker
if ('serviceWorker' in navigator) {
    // Wait for the 'load' event to not block other work
    window.addEventListener('load', async () => {
        // Try to register the service worker.
        try {
            // Capture the registration for later use, if needed
            let reg;

            // Use ES Module version of our Service Worker in development
            //   if (import.meta.env?.DEV) {
            //     reg = await navigator.serviceWorker.register('/scripts/service-worker.js', {
            //       type: 'module',
            //     });
            //   } else {
            //     // In production, use the normal service worker registration
            //     reg = await navigator.serviceWorker.register('/scripts/service-worker.js');
            //   }

            // In production, use the normal service worker registration
            reg = await navigator.serviceWorker.register('/localio/scripts/service-worker.js');
            console.log('Service worker registered! 😎', reg);
        } catch (err) {
            console.log('😥 Service worker registration failed: ', err);
        }
    });
}
