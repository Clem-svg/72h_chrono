import {checkImage, findPlatforms} from './functions';

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
            <div class="card mb-4 col-4" style="width: 18rem;">
              <img class="card-img-top" src="${checkImage(article.background_image)}" alt="${article.name} cover">
              <a href = "#pagedetail/${article.id}">
                <h5>${article.name}</h5>
                <p>${findPlatforms(article.parent_platforms)}</p>
              </a>

              <div class="more-info">
                <p>&#128197; ${article.released}</p>
                <p>&#11088; ${article.rating} / 5</p>
                <p>&#128100; ${article.tags[0].name}</p>
                <p>&#128126; ${article.genres[0].name} </p>
              </div>

            </div>`;
          });

          document.querySelector(".page-list .articles").innerHTML = articles;

          //mouseover to get more info
          const cards = document.querySelectorAll(".card");

          cards.forEach((card) => {
            card.addEventListener('mouseover', () => {
              card.classList.add("card--hovered");
            });
            card.addEventListener('mouseout', () => {
              card.classList.remove("card--hovered");
            });
          });
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument +"&page_size=9");
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
      <div id="intro">
      <br>
        <h1>Welcome,</h1>
        <p> The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
          the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
          brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
          groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
          with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure
        </p>
      <br>
      </div>
      <div class="articles row mx-2 my-2"> Loading...</div>
      <button id"next">Show more</button>
      </section>

    `;

    preparePage();
  };

  render();
};

export {PageList};