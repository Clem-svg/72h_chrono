const PageList = (argument = "") => {
  const preparePage = () => {

    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";


    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      }


    const findPlatforms = (platforms) => {
      let platformsAvailable = "";
      platforms.forEach(platform => {
        switch(platform.platform.name) {
          case "PC":
          platformsAvailable += `<img src="./src/images/windows.svg" class="pr-2" alt="icon-pc">`;
          break;
          case "Xbox":
          platformsAvailable += `<img src="./src/images/xbox.svg" class="pr-2" alt="icon-pc">`;
          break;
          case "PlayStation":
          platformsAvailable += `<img src="./src/images/ps4.svg" class="pr-2" alt="icon-pc">`;
          break;
          case "Nintendo":
          platformsAvailable += `<img src="./src/images/switch.svg" class="pr-2" alt="icon-pc">`;
          break;
          case "Linux":
          platformsAvailable += `<img src="./src/images/linux.svg" class="pr-2" alt="icon-pc">`;
          break;
          case "iOS":
          platformsAvailable += `<img src="./src/images/iphone.png" class="pr-2" alt="icon-pc">`;
          break;
          case "Android":
          platformsAvailable += `<img src="./src/images/android.png" class="pr-2" alt="icon-pc">`;
          break;
          case "Apple Macintosh":
          platformsAvailable += `<img src="./src/images/mac.png" class="pr-2" alt="icon-pc">`;
          break;
          case "Web":
          platformsAvailable += `<img src="./src/images/web.png" class="pr-2" alt="icon-pc">`;
          break;
          default: 
          break;
        }
      });
      return platformsAvailable;
    }

    const checkImage = (image) => {
      if (image == null){
        return './src/images/no-image.jpg'
      } else {
        return image
      }
    }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            articles += `
            <div class="card mb-4 col-4 gameCard" style="width: 18rem;">
              <img class="card-img-top" src="${checkImage(article.background_image)}" alt="${article.name} cover">
              <a href = "#pagedetail/${article.id}">
                <h5>${article.name}</h5>
                <p>${findPlatforms(article.parent_platforms)}</p>
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