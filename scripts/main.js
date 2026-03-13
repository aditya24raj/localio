const BASE_URL = "https://api.imdbapi.dev";
const BASE_URL_TORRENTIO = "https://torrentio.strem.fun/providers=yts,eztv,rarbg,1337x%7Cqualityfilter=brremux,hdrall,dolbyvision,dolbyvisionwithhdr,threed,4k,other,scr,cam,unknown%7Climit=1";

// let results = {
//     "titles": [
//         {
//             "id": "tt0120737",
//             "type": "movie",
//             "primaryTitle": "The Lord of the Rings: The Fellowship of the Ring",
//             "originalTitle": "The Lord of the Rings: The Fellowship of the Ring",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_.jpg",
//                 "width": 1978,
//                 "height": 2936
//             },
//             "startYear": 2001,
//             "rating": {
//                 "aggregateRating": 8.9,
//                 "voteCount": 2192492
//             }
//         },
//         {
//             "id": "tt7631058",
//             "type": "tvSeries",
//             "primaryTitle": "The Lord of the Rings: The Rings of Power",
//             "originalTitle": "The Lord of the Rings: The Rings of Power",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BNmVmZGQ2ZTctYzE4NC00YzkxLThhNjYtNGIyZjJmZGEwMjUzXkEyXkFqcGc@._V1_.jpg",
//                 "width": 2000,
//                 "height": 3000
//             },
//             "startYear": 2022,
//             "rating": {
//                 "aggregateRating": 6.9,
//                 "voteCount": 437531
//             }
//         },
//         {
//             "id": "tt0167260",
//             "type": "movie",
//             "primaryTitle": "The Lord of the Rings: The Return of the King",
//             "originalTitle": "The Lord of the Rings: The Return of the King",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BMTZkMjBjNWMtZGI5OC00MGU0LTk4ZTItODg2NWM3NTVmNWQ4XkEyXkFqcGc@._V1_.jpg",
//                 "width": 800,
//                 "height": 1185
//             },
//             "startYear": 2003,
//             "rating": {
//                 "aggregateRating": 9,
//                 "voteCount": 2151308
//             }
//         },
//         {
//             "id": "tt0167261",
//             "type": "movie",
//             "primaryTitle": "The Lord of the Rings: The Two Towers",
//             "originalTitle": "The Lord of the Rings: The Two Towers",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BMGQxMDdiOWUtYjc1Ni00YzM1LWE2NjMtZTg3Y2JkMjEzMTJjXkEyXkFqcGc@._V1_.jpg",
//                 "width": 964,
//                 "height": 1500
//             },
//             "startYear": 2002,
//             "rating": {
//                 "aggregateRating": 8.8,
//                 "voteCount": 1944235
//             }
//         },
//         {
//             "id": "tt32328070",
//             "type": "movie",
//             "primaryTitle": "The Lord of the Rings: The Hunt for Gollum",
//             "originalTitle": "The Lord of the Rings: The Hunt for Gollum",
//             "startYear": 2027
//         },
//         {
//             "id": "tt14824600",
//             "type": "movie",
//             "primaryTitle": "The Lord of the Rings: The War of the Rohirrim",
//             "originalTitle": "The Lord of the Rings: The War of the Rohirrim",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BOTg4OTgyMDYtMDA0NC00ZjJhLWJiOGMtMjlkM2ZjNTgxNGI0XkEyXkFqcGc@._V1_.jpg",
//                 "width": 675,
//                 "height": 1000
//             },
//             "startYear": 2024,
//             "rating": {
//                 "aggregateRating": 6.3,
//                 "voteCount": 39292
//             }
//         },
//         {
//             "id": "tt0077869",
//             "type": "movie",
//             "primaryTitle": "The Lord of the Rings",
//             "originalTitle": "The Lord of the Rings",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BZmI4ZmIxOGQtMGY2ZS00Y2Y5LTllMDItYzllOWFmMTNlMmY2XkEyXkFqcGc@._V1_.jpg",
//                 "width": 1908,
//                 "height": 2862
//             },
//             "startYear": 1978,
//             "rating": {
//                 "aggregateRating": 6.2,
//                 "voteCount": 39142
//             }
//         },
//         {
//             "id": "tt9386672",
//             "type": "movie",
//             "primaryTitle": "The Lord of the Rings: The Empire of Saruman",
//             "originalTitle": "The Lord of the Rings: The Empire of Saruman",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BNTQxYzJmYzctNzA3NC00YzBjLTliNTctNDdmZjZjOTAzOTUwXkEyXkFqcGc@._V1_.jpg",
//                 "width": 675,
//                 "height": 1000
//             }
//         },
//         {
//             "id": "tt0301246",
//             "type": "tvMovie",
//             "primaryTitle": "A Passage to Middle-earth: The Making of 'Lord of the Rings'",
//             "originalTitle": "A Passage to Middle-earth: The Making of 'Lord of the Rings'",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BOTc3NjA5MDYxNF5BMl5BanBnXkFtZTcwMTY4MzEyMQ@@._V1_.jpg",
//                 "width": 322,
//                 "height": 500
//             },
//             "startYear": 2001,
//             "rating": {
//                 "aggregateRating": 7.6,
//                 "voteCount": 586
//             }
//         },
//         {
//             "id": "tt35882707",
//             "type": "movie",
//             "primaryTitle": "The Lord of the Rings: The Two Towers",
//             "originalTitle": "The Lord of the Rings: The Two Towers",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BYjc4NzMyZTEtNzI3My00NWZiLTkxMzQtM2U2OWYyYTVkZTAxXkEyXkFqcGc@._V1_.jpg",
//                 "width": 667,
//                 "height": 1000
//             },
//             "startYear": 1954
//         },
//         {
//             "id": "tt35882865",
//             "type": "movie",
//             "primaryTitle": "The Lord of the Rings: The Return of the King",
//             "originalTitle": "The Lord of the Rings: The Return of the King",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BNmMyYTUwMzctMzY4OS00NjA0LWFiYzQtZTRmMmNmZGJhYWE0XkEyXkFqcGc@._V1_.jpg",
//                 "width": 667,
//                 "height": 1000
//             },
//             "startYear": 1955
//         },
//         {
//             "id": "tt9810488",
//             "type": "movie",
//             "primaryTitle": "The Lord of the Rings - The Appendices Part 1: From Book to Vision",
//             "originalTitle": "The Lord of the Rings - The Appendices Part 1: From Book to Vision",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BZWZlNWIzNzQtZTdlZi00Y2Q5LWI4NzEtNjg2ZjQ3ZTY5NmVjXkEyXkFqcGc@._V1_.jpg",
//                 "width": 317,
//                 "height": 475
//             },
//             "startYear": 2002,
//             "rating": {
//                 "aggregateRating": 8.8,
//                 "voteCount": 91
//             }
//         },
//         {
//             "id": "tt3342322",
//             "type": "movie",
//             "primaryTitle": "The Lord of the Rings Symphony",
//             "originalTitle": "The Lord of the Rings Symphony",
//             "startYear": 2003,
//             "rating": {
//                 "aggregateRating": 6.7,
//                 "voteCount": 24
//             }
//         },
//         {
//             "id": "tt0405185",
//             "type": "tvMovie",
//             "primaryTitle": "National Geographic: Beyond the Movie - The Lord of the Rings: Return of the King",
//             "originalTitle": "National Geographic: Beyond the Movie - The Lord of the Rings: Return of the King",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BNmM1ZDdmZTYtMDQ0NS00Y2VlLTkzMzgtYzgyNzA4MTMxZDdjXkEyXkFqcGc@._V1_.jpg",
//                 "width": 284,
//                 "height": 405
//             },
//             "startYear": 2003,
//             "rating": {
//                 "aggregateRating": 6.3,
//                 "voteCount": 383
//             }
//         },
//         {
//             "id": "tt11656828",
//             "type": "movie",
//             "primaryTitle": "J.R.R. Tolkien and the Birth of Lord of the Rings",
//             "originalTitle": "J.R.R. Tolkien and the Birth of Lord of the Rings",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BZWJlNmRjMmUtZjYzOS00Y2NjLWJjYWYtZDQ0YjNiNDZiMDZhXkEyXkFqcGc@._V1_.jpg",
//                 "width": 333,
//                 "height": 500
//             },
//             "startYear": 2004,
//             "rating": {
//                 "aggregateRating": 5.5,
//                 "voteCount": 25
//             }
//         },
//         {
//             "id": "tt10127200",
//             "type": "tvMovie",
//             "primaryTitle": "National Geographic: Beyond the Movie - The Lord of the Rings: The Fellowship of the Ring",
//             "originalTitle": "National Geographic: Beyond the Movie - The Lord of the Rings: The Fellowship of the Ring",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BZDQ1OWU2YTAtNGVmNC00MGUwLWJlMzItOGIwNjM2MmVjYjMwXkEyXkFqcGc@._V1_.jpg",
//                 "width": 384,
//                 "height": 500
//             },
//             "startYear": 2001,
//             "rating": {
//                 "aggregateRating": 7.3,
//                 "voteCount": 54
//             }
//         },
//         {
//             "id": "tt0382814",
//             "type": "tvShort",
//             "primaryTitle": "The Lord of the Rings: The Quest Fulfilled",
//             "originalTitle": "The Lord of the Rings: The Quest Fulfilled",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BOGM4ZGNmNzQtMjZkZi00YTg0LWEwZTYtNjE5NDJjMGRkMzU0XkEyXkFqcGc@._V1_.jpg",
//                 "width": 1440,
//                 "height": 810
//             },
//             "startYear": 2003,
//             "rating": {
//                 "aggregateRating": 6.6,
//                 "voteCount": 194
//             }
//         },
//         {
//             "id": "tt10107410",
//             "type": "movie",
//             "primaryTitle": "Music of the Lord of the Rings",
//             "originalTitle": "Music of the Lord of the Rings",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BNjMxYmMwMDQtOWVlOC00NzBmLTlkZDEtN2ZlYzdiYTE0ZTYyXkEyXkFqcGc@._V1_.jpg",
//                 "width": 3300,
//                 "height": 5100
//             },
//             "startYear": 2019,
//             "rating": {
//                 "aggregateRating": 7.3,
//                 "voteCount": 14
//             }
//         },
//         {
//             "id": "tt1956682",
//             "type": "tvMovie",
//             "primaryTitle": "Tolkien's the Lord of the Rings: A Catholic Worldview",
//             "originalTitle": "Tolkien's The Lord of the Rings: A Catholic Worldview",
//             "primaryImage": {
//                 "url": "https://m.media-amazon.com/images/M/MV5BMWQyZWViOTUtMjY0MC00YjU5LWI1MzEtOTZmNWU4NGM4YjI2XkEyXkFqcGc@._V1_.jpg",
//                 "width": 405,
//                 "height": 568
//             },
//             "startYear": 2011,
//             "rating": {
//                 "aggregateRating": 6.9,
//                 "voteCount": 47
//             }
//         },
//         {
//             "id": "tt15072316",
//             "type": "tvMiniSeries",
//             "primaryTitle": "Stellar and Snow Review Lord of the Rings: Conquest",
//             "originalTitle": "Stellar and Snow Review Lord of the Rings: Conquest",
//             "startYear": 2021,
//             "endYear": 2021
//         }
//     ]
// }
let results = [];

async function search(e) {
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
            <div class="result-card" style='display:flex; margin: 20px 0px; cursor:pointer; min-width: 100%;' data-type="${r?.type}" data-imdbId="${r?.id}">
                <a href="pages/${r?.type === 'movie' ? 'movie' : 'tv-series'}?q=${r?.id}" style="text-decoration:none; display: flex; gap: 10px; align-items: center">
                    <div>
                        <div style="font-weight:bolder; color: gray; margin-bottom: 3px;"># ${`${index}`.padStart(3, 0)}</div>
                        <img src="${r?.primaryImage?.url}" width="100px" height="auto" />
                    </div>
                    
                    <div style="">
                        <div class="original-title" style="font-weight:bolder">${r?.originalTitle}</div> 
                        <div style="color: gray;">
                            ${r?.startYear ? r?.startYear : ''} &nbsp;&nbsp;&nbsp; ${r?.rating?.aggregateRating != null ? '⭐ ' + r?.rating?.aggregateRating : ''}
                        </div>
                        <br/>
                    </div>
                </a>
            </div>`;
        }
    }

    document.querySelector("#results").innerHTML = resultsHtml;
}


