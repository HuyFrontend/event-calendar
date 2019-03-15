import REST_API from './restAPI';
const getBookListService = (categoryName) => {
    const url = `https://www.reddit.com/r/${categoryName}.json`;
    return REST_API.getDataObservable(url);
};
const SERVICES = {
    getBookListService: (categoryName) => getBookListService(categoryName),
}
export default SERVICES;