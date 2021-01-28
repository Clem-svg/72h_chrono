const checkImage = (image) => {
  if (image == null){
    return './src/images/no-image.jpg'
  } else {
    return image
  }
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

export {checkImage, findPlatforms};