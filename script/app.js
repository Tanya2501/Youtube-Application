import variables from './utils';
import { getRequest } from './request';
import { showResults, clearSearchSection, renderResultsOfPage } from './render';

class Application {
    render() {
        const header = document.createElement('header');
        document.body.appendChild(header);

        const input = document.createElement('input');
        input.id = 'query';
        input.placeholder = 'Search videos';
        input.type = 'search';
        header.appendChild(input);
        const resultSection = document.createElement('section');
        resultSection.id = 'search-results';
        document.body.appendChild(resultSection);

        const footer = document.createElement('footer');
        footer.id = 'footer';
        document.body.appendChild(footer);

        document.addEventListener('DOMContentLoaded', () => {
            input.onkeypress = (e) => {
                let query = '';
                if (e.keyCode === 13) {
                    query = e.target.value;
                    clearSearchSection();
                    getRequest(query, variables.nextPage)
                    .then((response) => {
                        const result = JSON.parse(response);

                        showResults(result);
                        renderResultsOfPage(1, query);
                    });
                }
            };
        });
        return this;
    }
}
const myYoutube = new Application();
myYoutube.render();
