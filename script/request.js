export function getRequest(searchTerm, nextPageF) {
    let nextPage = nextPageF;
    if (nextPage) {
        nextPage = `&pageToken=${nextPage}`;
    } else {
        nextPage = '';
    }
    return new Promise((resolve, reject) => {
        const XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        const xhr = new XHR();
        xhr.open('GET', `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&type=video&key=AIzaSyDDFIjNyqjHvS9w7cZyEj27sw_M_-buQLQ&q=${searchTerm}${nextPage}`, true);
        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                const error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error(''));
        };
        xhr.send();
    });
}

export function searchStatistics(id) {
    return new Promise((resolve, reject) => {
        const XHRStatistic = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        const xhrStatistic = new XHRStatistic();
        xhrStatistic.open('GET', `https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyDDFIjNyqjHvS9w7cZyEj27sw_M_-buQLQ&id=${id}`);
        xhrStatistic.onload = function () {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                const error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhrStatistic.onerror = function () {
            reject(new Error(''));
        };
        xhrStatistic.send();
    });
}
