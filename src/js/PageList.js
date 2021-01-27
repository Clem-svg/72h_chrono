const PageList = (argument = "") => {
  const preparePage = () => {

    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            articles += `
            <div class="card mb-4 col-4 gameCard" style="width: 18rem;">
              <img class="card-img-top" src="${article.background_image}" alt="${article.name} cover">
                  <a href = "#pagedetail/${article.id}">
                    <h5>${article.name}</h5>
                   </a>
            </div>
                `;
          });




          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument +"&page_size=9");
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
      <div class="articles row mx-2 my-2"> Loading...</div>
      </section>
    `;

    preparePage();
  };

  render();
};

export {PageList};