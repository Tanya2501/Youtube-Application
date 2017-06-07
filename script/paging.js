import variables from './utils';
import { getRequest } from './request';
import { showResults, renderResultsOfPage } from './render';

const numberVideos = Math.floor(document.documentElement.clientWidth / variables.widthDivForResult);

export function setPage(newPage, newPageId) {
    const pageNewPageId = newPageId;
    let pageForCount = newPage;
    const pages = document.querySelectorAll('footer>a');
    pages.forEach((number) => {
        number.innerHTML = (Number(pageForCount) - pageNewPageId) + 1;
        pageForCount = Number(pageForCount) + 1;
    });
    pages.forEach((item) => {
        if (Number(item.innerHTML) !== Number(newPage)) {
            item.classList.remove('activePage');
        } else {
            item.classList.add('activePage');
        }
    });
    renderResultsOfPage(newPage);
}

const changePageByClick = (e) => {
    const pageForComparing = variables.currentPage;
    variables.currentPageId = e.target.id;
    variables.currentPage = e.target.innerHTML;
    const variable = variables.currentPage;
    if ((variable % 5 === 0 || variable % 5 === 1) && Number(variable) > 4) {
        variables.currentPageId = '3';
    } else {
        variables.currentPageId = variables.currentPage % 5;
    }
    let idPage;
    const pages = document.querySelectorAll('footer>a');
    pages.forEach((item) => {
        if (item.classList.contains('activePage')) {
            idPage = item.id;
        }
    });
    setTimeout(() => {
        if (idPage !== e.target.id) {
            if (pageForComparing < e.target.innerHTML) {
                variables.component.forEach((comp) => {
                    comp.classList.remove('withTransformAppearOutRight');
                    comp.classList.remove('withTransformAppearRight');
                    comp.classList.remove('withTransformAppearLeft');
                    comp.classList.remove('withTransformAppearOutLeft');
                });
                variables.component.forEach((comp) => {
                    if (comp.style.display === 'inline-block') {
                        comp.classList.add('withTransformAppearOutLeft');
                    } else {
                        comp.classList.add('withTransformAppearRight');
                    }
                });
            } else {
                variables.component.forEach((comp) => {
                    comp.classList.remove('withTransformAppearOutRight');
                    comp.classList.remove('withTransformAppearRight');
                    comp.classList.remove('withTransformAppearLeft');
                    comp.classList.remove('withTransformAppearOutLeft');
                });
                variables.component.forEach((comp) => {
                    if (comp.style.display === 'inline-block') {
                        comp.classList.add('withTransformAppearOutRight');
                    } else {
                        comp.classList.add('withTransformAppearLeft');
                    }
                });
            }
        }
        setPage(variables.currentPage, variables.currentPageId);
    }, 50);
};

export function newRequest(query) {
    for (let i = 0; i < variables.component.length; i += 1) {
        if (variables.component[i].style.display === 'inline-block') {
            if (i + 2 >= variables.component.length - (2 * numberVideos)) {
                getRequest(query, variables.nextPage)
                .then((response) => {
                    const result = JSON.parse(response);
                    showResults(result);
                });
            }
            break;
        }
    }
}

const showNumberOfPage = function (e) {
    e.target.style.color = '#ccc8d7';
    setTimeout(() => {
        e.target.style.color = 'transparent';
    }, 200);
};

let startX = 0;
let stopX = 0;
export function swipeStart(e) {
    startX = e.x;
}

export function swipeStop(e) {
    stopX = e.x;
    if (stopX - startX > 50 && variables.currentPage > 1) {
        variables.component.forEach((comp) => {
            comp.classList.remove('withTransformAppearOutRight');
            comp.classList.remove('withTransformAppearRight');
            comp.classList.remove('withTransformAppearLeft');
            comp.classList.remove('withTransformAppearOutLeft');
        });
        variables.component.forEach((comp) => {
            if (comp.style.display === 'inline-block') {
                comp.classList.add('withTransformAppearOutRight');
            } else {
                comp.classList.add('withTransformAppearLeft');
            }
        });
        variables.currentPage = String(Number(variables.currentPage) - 1);
        const varib = variables.currentPage;
        if ((varib % 5 === 0 || varib % 5 === 1) && Number(varib) > 4) {
            variables.currentPageId = '3';
        } else {
            variables.currentPageId = variables.currentPage % 5;
        }
    } else if (startX - stopX > 50 && variables.currentPage < variables.videos.length) {
        variables.component.forEach((comp) => {
            comp.classList.remove('withTransformAppearOutRight');
            comp.classList.remove('withTransformAppearRight');
            comp.classList.remove('withTransformAppearLeft');
            comp.classList.remove('withTransformAppearOutLeft');
        });
        variables.component.forEach((comp) => {
            if (comp.style.display === 'inline-block') {
                comp.classList.add('withTransformAppearOutLeft');
            } else {
                comp.classList.add('withTransformAppearRight');
            }
        });
        variables.currentPage = String(Number(variables.currentPage) + 1);
        const varib = variables.currentPage;
        if ((varib % 5 === 0 || varib % 5 === 1) && Number(varib) > 4) {
            variables.currentPageId = '3';
        } else {
            variables.currentPageId = variables.currentPage % 5;
        }
    }
    setPage(variables.currentPage, variables.currentPageId);
}

export function setPagesAfterResizing() {
    const varibl = variables.widthDivForResult;
    const numberVideosOnPageNew = Math.floor(document.documentElement.clientWidth / varibl);
    for (let i = 0; i < variables.component.length; i += 1) {
        if (variables.component[i].style.display === 'inline-block') {
            variables.countVideo = i + 1;
            break;
        }
    }
    const newCurrentPage = Math.ceil(variables.countVideo / numberVideosOnPageNew);
    if (newCurrentPage % 5 === 0) {
        variables.currentPageId = '3';
    } else {
        variables.currentPageId = String(newCurrentPage % 5);
    }
    setPage(newCurrentPage, variables.currentPageId);
}

const startPoint = {};
let nowPoint;

document.addEventListener('touchstart', (event) => {
    startPoint.x = event.changedTouches[0].pageX;
}, false);
document.addEventListener('touchmove', (event) => {
    const otk = {};
    nowPoint = event.changedTouches[0];
    otk.x = nowPoint.pageX - startPoint.x;
    nowPoint = event.changedTouches[0];
}, false);
document.addEventListener('touchend', () => {
    const xAbs = startPoint.x - nowPoint.pageX;
    if (xAbs < 50 && variables.currentPage > 1) {
        variables.component.forEach((comp) => {
            comp.classList.remove('withTransformAppearOutRight');
            comp.classList.remove('withTransformAppearRight');
            comp.classList.remove('withTransformAppearLeft');
            comp.classList.remove('withTransformAppearOutLeft');
        });
        variables.component.forEach((comp) => {
            if (comp.style.display === 'inline-block') {
                comp.classList.add('withTransformAppearOutRight');
            } else {
                comp.classList.add('withTransformAppearLeft');
            }
        });
        variables.currentPage = String(Number(variables.currentPage) - 1);
        const variable = variables.currentPage;
        if ((variable % 5 === 0 || variable % 5 === 1) && Number(variable) > 4) {
            variables.currentPageId = '3';
        } else {
            variables.currentPageId = variables.currentPage % 5;
        }
    } else if (xAbs > 50 && variables.currentPage < variables.videos.length) {
        variables.component.forEach((comp) => {
            comp.classList.remove('withTransformAppearOutRight');
            comp.classList.remove('withTransformAppearRight');
            comp.classList.remove('withTransformAppearLeft');
            comp.classList.remove('withTransformAppearOutLeft');
        });
        variables.component.forEach((comp) => {
            if (comp.style.display === 'inline-block') {
                comp.classList.add('withTransformAppearOutLeft');
            } else {
                comp.classList.add('withTransformAppearRight');
            }
        });
        variables.currentPage = String(Number(variables.currentPage) + 1);
        const variable = variables.currentPage;
        if ((variable % 5 === 0 || variable % 5 === 1) && Number(variable) > 4) {
            variables.currentPageId = '3';
        } else {
            variables.currentPageId = variables.currentPage % 5;
        }
    }
    setPage(variables.currentPage, variables.currentPageId);
}, false);

window.onresize = function () {
    variables.component.forEach((comp) => {
        comp.classList.remove('withTransformAppearRight');
        comp.classList.remove('withTransformAppearOutRight');
        comp.classList.remove('withTransformAppearLeft');
        comp.classList.remove('withTransformAppearOutLeft');
    });
    setPagesAfterResizing();
};

export function paging() {
    for (let i = 1; i < 6; i += 1) {
        const page = document.createElement('a');
        page.id = i;
        if (page.id === '1') {
            page.classList.add('activePage');
        }
        page.innerHTML = +i;
        page.addEventListener('click', changePageByClick);
        page.addEventListener('mousedown', showNumberOfPage);
        const footerS = document.getElementById('footer');
        footerS.appendChild(page);
    }
}
