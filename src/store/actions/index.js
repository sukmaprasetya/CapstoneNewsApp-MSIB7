import qs from "qs";
import { NEWS_REDUCER_CASES } from "../reducers";

const BASE_API_URL =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

const getImageUrl = (multimedia) => {
  const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d";
  if (multimedia && multimedia.length > 0) {
    return `https://www.nytimes.com/${multimedia[0].url}`;
  }
  return DEFAULT_IMAGE_URL;
};

export function fetchNews(query, page = 0, pageSize = 12) {
  return async function (dispatch) {
    try {
      dispatch({ type: NEWS_REDUCER_CASES.FETCHING_NEWS });

      const queryStringPage1 = qs.stringify({
        ...query,
        page: page,
        "api-key": {process.env.REACT_APP_API_KEY},
      });

      const queryStringPage2 = qs.stringify({
        ...query,
        page: page + 1,
        "api-key": process.env.REACT_APP_API_KEY,
      });

      const [response1, response2] = await Promise.all([
        fetch(`${BASE_API_URL}${queryStringPage1}`),
        fetch(`${BASE_API_URL}${queryStringPage2}`),
      ]);

      const responseJSON1 = await response1.json();
      const responseJSON2 = await response2.json();

      if (!response1.ok || !response2.ok) {
        throw new Error("Error fetching news");
      }

      const combinedNews = [
        ...responseJSON1.response.docs,
        ...responseJSON2.response.docs,
      ].slice(0, pageSize);

      const newsWithImages = combinedNews.map((article) => ({
        ...article,
        imageUrl: getImageUrl(article.multimedia),
      }));

      dispatch({
        type: NEWS_REDUCER_CASES.INSERT_NEWS,
        news: newsWithImages,
        totalResults: responseJSON1.response.meta.hits,
      });
    } catch (error) {
      console.error("[actions-fetchNews]:", error);
    } finally {
      dispatch({ type: NEWS_REDUCER_CASES.DONE_FETCHING_NEWS });
    }
  };
}

export function setSearchTerm(searchTerm) {
  return { type: NEWS_REDUCER_CASES.SET_SEARCH_TERM, searchTerm };
}

export function searchNews(searchTerm) {
  return async function (dispatch) {
    try {
      dispatch({
        type: NEWS_REDUCER_CASES.FETCHING_NEWS,
      });

      const queryString = qs.stringify(
        {
          q: searchTerm,
          "api-key": process.env.REACT_APP_API_KEY,
        },
        { encode: true }
      );

      const response = await fetch(`${BASE_API_URL}${queryString}`);
      const responseJSON = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(responseJSON));
      }

      const newsWithImages = responseJSON.response.docs.map((article) => {
        const imageUrl = getImageUrl(article.multimedia);

        return {
          ...article,
          imageUrl: imageUrl,
        };
      });

      dispatch({
        type: NEWS_REDUCER_CASES.SEARCH_NEWS,
        news: newsWithImages,
      });
    } catch (error) {
      console.error("[actions-searchNews]:", error);
    } finally {
      dispatch({
        type: NEWS_REDUCER_CASES.DONE_FETCHING_NEWS,
      });
    }
  };
}
