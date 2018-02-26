export default (filterText = '', favoritesList) => { 
  filterText = filterText.toLowerCase();

  return favoritesList.filter(favorite => {
    let title = favorite.title.toLowerCase();
    return ( title.indexOf(filterText) !== -1 );
  });
}

