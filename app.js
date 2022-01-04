const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyBOldwIRuzqE0PJyacMBeyXBIpkc8mPB4Y";
let video_http = "https://www.googleapis.com/youtube/v3/videos?"
let channel_https = "https://www.googleapis.com/youtube/v3/channels?"

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 10000,
    regionCode: 'IN'
}))
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        data.items.forEach(item => {
            getChannelIcon(item);
        })
    })
    .catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_https + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
            console.log(video_data)
        })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
<div class="video">
            <img style="cursor: pointer;" class="thumbnail" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'" src="${data.snippet.thumbnails.high.url}" alt="">
            <div class="content">
                <img style="cursor: pointer;" src="${data.channelThumbnail}" class="channel-icon" alt="">
                <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name">
                    ${data.snippet.channelTitle}
                    </p>
                </div>
            </div>
        </div>
`
}

// Search bar

const searchTnput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');

let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if (searchTnput.value.length) {
        location.href = searchLink + searchTnput.value;
    }
})