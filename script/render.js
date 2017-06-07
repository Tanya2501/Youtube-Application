import { searchStatistics } from './request';
import { paging, swipeStart, swipeStop, newRequest } from './paging';
import variables from './utils';

export function showResults(results) {
    const elem = document.getElementById('search-results');
    let sectionName = '';

    let linkToImg = '';
    let sectionAuthor = 'Video by ';
    let sectionDescription = '';
    let sectionDateOfPublication = 'Published: ';
    let link = 'http://www.youtube.com/watch?v=';
    const entries = results.items;
    entries.forEach((item) => {
        variables.videos.push(item);
        const divForResult = document.createElement('div');
        divForResult.id = 'divForResult';
        elem.appendChild(divForResult);
        const divForName = document.createElement('div');
        divForResult.appendChild(divForName);

        const names = item.snippet.title;
        sectionName += names;
        link += item.id.videoId;
        const name = document.createElement('a');
        name.href = link;
        name.target = '_blank';
        name.innerHTML = sectionName;
        divForName.appendChild(name);

        const imgDiv = document.createElement('div');
        divForResult.appendChild(imgDiv);
        const previews = item.snippet.thumbnails.medium.url;
        linkToImg += previews;
        const preview = document.createElement('img');
        preview.width = '320';
        preview.height = '180';
        preview.src = linkToImg;
        imgDiv.appendChild(preview);

        const divInfo = document.createElement('div');
        divInfo.id = 'divInfo';
        divForResult.appendChild(divInfo);

        const authors = item.snippet.channelTitle;
        sectionAuthor += authors;
        const author = document.createElement('p');
        author.innerHTML = sectionAuthor;
        divInfo.appendChild(author);

        function showStatistics(result) {
            let viewCount = 'Number views: ';
            viewCount += result.items[0].statistics.viewCount;
            const count = document.createElement('p');
            count.innerHTML = viewCount;
            divInfo.appendChild(count);
            viewCount = 'Number views: ';
        }

        searchStatistics(item.id.videoId)
        .then((response) => {
            const result = JSON.parse(response);
            showStatistics(result);
        });

        const dateOfPublications = new Date(Date.parse(item.snippet.publishedAt));
        sectionDateOfPublication = `${sectionDateOfPublication}${(dateOfPublications.getDay() + 1)}.${(dateOfPublications.getMonth() + 1)}.${dateOfPublications.getFullYear()}`;
        const dateOfPublication = document.createElement('p');
        dateOfPublication.innerHTML = sectionDateOfPublication;
        divInfo.appendChild(dateOfPublication);

        const descriptions = item.snippet.description;
        sectionDescription += descriptions;
        const description = document.createElement('p');
        description.innerHTML = sectionDescription;
        divInfo.appendChild(description);

        variables.nextPage = results.nextPageToken;

        sectionName = '';
        linkToImg = '';
        sectionDescription = '';
        sectionAuthor = 'Video by ';
        sectionDateOfPublication = 'Published: ';
        link = 'http://www.youtube.com/watch?v=';

        variables.component.push(divForResult);
    });
    if (variables.component.length === 0) {
        alert('No results for your request.');
    }
    elem.addEventListener('mousedown', swipeStart);
    elem.addEventListener('mouseup', swipeStop);
}

export function clearSearchSection() {
    variables.videos = [];
    variables.component = [];
    const resultSec = document.getElementById('search-results');
    const fot = document.getElementById('footer');
    document.body.removeChild(resultSec);
    document.body.removeChild(fot);

    const resultSection = document.createElement('section');
    resultSection.id = 'search-results';
    document.body.appendChild(resultSection);

    const footer = document.createElement('footer');
    footer.id = 'footer';
    document.body.appendChild(footer);
    paging();
}

export function renderResultsOfPage(currentPage, query) {
    const varibl = variables.widthDivForResult;
    const numberVideosOnPage = Math.floor(document.documentElement.clientWidth / varibl);
    const endVideo = currentPage * numberVideosOnPage;
    variables.component.forEach((comp, index) => {
        if ((index + 1) <= endVideo && index >= endVideo - numberVideosOnPage) {
            comp.style.display = 'inline-block';
            comp.style.transform = `translateX(- ${document.documentElement.clientWidth}px`;
        } else {
            comp.style.display = 'none';
            comp.style.transform = `translateX(- ${document.documentElement.clientWidth}px`;
        }
    });
    newRequest(query);
}
