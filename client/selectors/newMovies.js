export default (movieList, favoritesList) => {
  return movieList.filter(movie => compareId(movie.id, favoritesList));
}

function compareId(id, favoritesList) {
  const match = favoritesList.find(favorite => (favorite.movieid === id.toString()));
  if(match === undefined) { return true; }
  return false;
}