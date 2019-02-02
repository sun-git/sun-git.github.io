(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers:{
                Authorization:'Client-ID 6c06c19417aa3135f7963406c52963e369860e531232a99ca005b9e1caf15b71'
            }
        }).done(addImage)
        .fail(function(err){
            requestError(err, 'image');
        });


        function addImage(images){
            let htmlContent = '';

            if(images && images.results && images.results.length >= 1){
                const firstImage = images.results[0];
                htmlContent = `<figure>
                    <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                    </figure>`;


            } else {
                htmlContent = '<div class="error-no-image">No images available</div>'
            }
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        $.ajax({
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=kHaaQo8GCgKWAGK5uthIUH2Y4UyTItFK`
        }
        ).done(addArticles)
        .fail(function(err){
            requestError(err, 'articles');
        });


        function addArticles(article){

            let htmlContent = '';

            if(article.response && article.response.docs && article.response.docs.length > 1){
                htmlContent = '<ul>' + article.response.docs.map(article => `<li class="article">
                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                <li>`
                ).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles">No articles available</div>';
            }
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);

        }
    });
})();
