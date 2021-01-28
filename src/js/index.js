import '../sass/style.scss';
import 'bootstrap';
import {routes} from './routes';

const userSearch = document.getElementById('gameSearch')
const link = document.getElementById("myLink");



document.getElementById("searchForm")
  .addEventListener("keyup", function(e) {
    if (e.code === 'Enter') {
        console.log(userSearch.value.split(" ").join('+'))
        link.setAttribute('href', `#pagelist/${userSearch.value.split("/").join('+')}`);
        window.open(
          link.href, "_self"
        );
    }
    }
  );


let pageArgument ;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

