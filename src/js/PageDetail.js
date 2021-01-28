const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");


    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          let { clip, name, released, description, background_image, rating, ratings_count, developers, platforms, publishers, tags, genres} = response;

          let articleDOM = document.querySelector(".page-detail .article");

          articleDOM.querySelector("h1.title").innerHTML = name;
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

        });

        fetch(`${finalURL}/screenshots?page_size=4`)
        .then((response) => response.json())
      .then((response) => {
        console.log(response)

      });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `

      <section class="page-detail">
        <div class="article">

        <div class=" jumbotron ">
          <button class='btn bottom'>Check WebSite
            <img class='float-right' src="./src/images/gothere.png">
          </button>
        </div>
        <br>
        <div class="container-fluid row">
          <h1 class="title"></h1>
          <p class ="descriptionTitle col-12 pl-0">Description</p>
          <p class="description"></p>

          <p class="release-date pl-0 col-3">
            <b>Release Date </b>
            <br>
            <span>Unknown</span>
          </p>

          <p class="developers pl-0 col-3">
            <b>Developers </b>
            <br>
            <span>Anonymous</span>
          </p>

          <p class="platforms pl-0 col-3">
            <b>Platforms </b>
            <br>
            <span>We coudn't find any</span>
          </p>

          <p class="publishers pl-0 col-3">
          <b>Publishers </b>
          <br>
          <span>Anonymous</span>
          </p>

          <p class="genres pl-0 col-6">
          <b>Genre </b>
          <br>
          <span>Do we really need to classify everything ?</span>
          </p>

          <p class="tags pl-0 col-6">
          <b>Tags </b>
          <br>
          <span>Do we really need to classify everything ?</span>
          </p>

          <h2>Trailer</h2>
          <video controls width="100%">
            <source src=""
                    type="video/mp4">
            Sorry, your browser doesn't support embedded videos.
          </video>

          <p class="screenshots pl-0 col-6">
          <b>Tags </b>
          <br>
          <span>Do we really need to classify everything ?</span>
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