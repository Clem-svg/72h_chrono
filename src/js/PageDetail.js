import dayjs from 'dayjs';
import {checkImage, findPlatforms} from './functions';


const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");


    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          let { website, clip, name, released, description, background_image, rating, ratings_count, developers, platforms, publishers, tags, genres} = response;

          let articleDOM = document.querySelector(".page-detail .article");

          articleDOM.querySelector("#h1").innerHTML =  name;
          articleDOM.querySelector("#h2").innerHTML =  `${rating}/5 - ${ratings_count} votes`;
          articleDOM.querySelector("p.release-date span").innerHTML = released.replaceAll("-", "/");

          let boldDescrition = description.replace(/Plot/g,"<br><p class='descriptionTitle'>Plot</p>");
          articleDOM.querySelector("p.description").innerHTML = boldDescrition.replace(/Gameplay/g,"<br><p class='descriptionTitle'>Gameplay</p>");

          articleDOM.querySelector("div.jumbotron").style.backgroundImage= `url(${background_image})`;
          articleDOM.querySelector("p.developers span").innerHTML = developers.map(dev => dev.name ).join(", ");;
          articleDOM.querySelector("p.platforms span").innerHTML = platforms.map( platform => `  <a href='#PageList/${platform.platform.id}'>${platform.platform.name}</a>`);
          articleDOM.querySelector("p.publishers span").innerHTML = publishers.map(publisher => publisher.name ).join(", ");
          articleDOM.querySelector("p.genres span").innerHTML = genres.map(genre => genre.name ).join(", ");
          articleDOM.querySelector("p.tags span").innerHTML = tags.map(tag => tag.name ).join(", ");
          articleDOM.querySelector("video").setAttribute('src', clip.clip);
          articleDOM.querySelector("#buttonToWebsite").setAttribute('href', website);




          fetch(`${finalURL}/screenshots?page_size=4`)
          .then((response) => response.json())
          .then((response) => {
            let screenshots = response.results;
            screenshots.forEach(image =>
              articleDOM.querySelector("p.screenshots span").innerHTML += `
              <img class='col-6 mb-3' src="${image.image}">
              `)
          });

          fetch(`${finalURL}/youtube?page_size=4`)
          .then((response) => response.json())
          .then((response) => {
            let youtube = response.results;
            console.log(youtube)
            insertYoutube(articleDOM.querySelector("p.youtube span"), youtube)

          });


          fetch(`${finalURL}/suggested?page_size=6`)
          .then((response) => response.json())
          .then((response) => {
            let suggestions = response.results;
            suggestions.forEach((article) => {
              articleDOM.querySelector("p.similarGames span").innerHTML += `
              <div class="card mb-4 col-4 gameCard" style="width: 18rem;">
                <img class="card-img-top" src="${checkImage(article.background_image)}" alt="${article.name} cover">
                <a href = "#pagedetail/${article.id}">
                  <h5>${article.name}</h5>
                  <p>${findPlatforms(article.parent_platforms)}</p>
                  </a>
              </div>
                  `;
            });

          });



        });


    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const insertYoutube = (selector, arrayYT) => {

    if (arrayYT.length > 0) {

      const first = arrayYT.shift()

      selector.innerHTML += `<h2 class="col-12">Youtube</h2>`

      selector.innerHTML += `
      <br>
        <div class="col-6">
          <a href=https://youtu.be/${first.external_id}>
          <img class='img-fluid' src="${first.thumbnails.high.url}">
          </a>
        </div>

          <div class="col-6">
            <h3>${first.name}</h3>
            <p class="text-red"> ${first.channel_title + " - " + dayjs(first.created).format('MMMM DD, YYYY')}</p>
          </div>

      `

      arrayYT.map( video =>

      selector.innerHTML += `
      <br>
        <div class="mt-3 col-4">
          <a href=https://youtu.be/${video.external_id}>
          <img class='img-fluid' src="${video.thumbnails.high.url}">
          </a>

            <h3>${video.name}</h3>
            <p class="text-red"> ${video.channel_title + " - " + dayjs(video.created).format('MMMM DD, YYYY')}</p>
          </div>

      `
      )

    }

  }

  const render = () => {
    pageContent.innerHTML = `

      <section class="page-detail">
        <div class="article">

        <div class=" jumbotron ">
          <a id="buttonToWebsite" class='btn bottom'>Check WebSite
            <img class='float-right' src="./src/images/gothere.png">
          </a>
        </div>
        <br>

        <div class="d-flex justify-content-between">
          <h1 id='h1'"></h1>
          <h2 id='h2'></h2>
        </div>

        <div class="container-fluid row">


          <p class ="descriptionTitle col-12 ">Description</p>
          <p class="description"></p>

          <div class="container-fluid row">


          <p class="release-date col-3">
            <b>Release Date </b>
            <br>
            <span>Unknown</span>
          </p>


          <p class="developers col-3">
            <b>Developers </b>
            <br>
            <span>Anonymous</span>
          </p>

          <p class="platforms  col-3">
            <b>Platforms </b>
            <br>
            <span>We coudn't find any</span>
          </p>

          <p class="publishers  col-3">
          <b>Publishers </b>
          <br>
          <span>Anonymous</span>
          </p>

          <p class="genres  col-6">
          <b>Genre </b>
          <br>
          <span>Do we really need to classify everything ?</span>
          </p>

          <p class="tags  col-6">
          <b>Tags </b>
          <br>
          <span>Do we really need to classify everything ?</span>
          </p>
          </div>

          <h2>Trailer</h2>
          <video controls width="100%" class="mb-3">
            <source src=""
                    type="video/mp4">
            Sorry, your browser doesn't support embedded videos.
          </video>

          <h2>Screenshots</h2>
          <p class="screenshots  col-12">
          <span class=row></span>
          </p>


          <p class="youtube ">
          <span class="row"></span>
          </p>

          <h2>Similar games</h2>
          <p class="similarGames ">
          <span class="row"></span>
          </p>


        </div>


        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageDetail };