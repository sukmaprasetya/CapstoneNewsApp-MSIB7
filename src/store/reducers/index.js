export const NEWS_REDUCER_CASES = {
  INSERT_NEWS: "INSERT_NEWS",
  FETCHING_NEWS: "FETCHING_NEWS",
  DONE_FETCHING_NEWS: "DONE_FETCHING_NEWS",
  SAVE_NEWS: "SAVE_NEWS",
  UNSAVE_NEWS: "UNSAVE_NEWS",
  SEARCH_NEWS: "SEARCH_NEWS",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
};

const newsState = {
  news: [],
  savedNews: [],
  searchResults: [],
  searchTerm: "",
  loading: false,
  totalResults: 0,
};

const newsReducer = (state = newsState, action) => {
  switch (action.type) {
    case NEWS_REDUCER_CASES.INSERT_NEWS: {
      return {
        ...state,
        news: action.news,
        totalResults: action.totalResults,
        loading: false,
      };
    }

    case NEWS_REDUCER_CASES.SEARCH_NEWS: {
      return {
        ...state,
        searchResults: action.news,
        totalResults: action.totalResults,
        loading: false,
      };
    }

    case NEWS_REDUCER_CASES.SET_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.searchTerm, 
      };
    }    

    case NEWS_REDUCER_CASES.FETCHING_NEWS: {
      return {
        ...state,
        loading: true,
      };
    }

    case NEWS_REDUCER_CASES.DONE_FETCHING_NEWS: {
      return {
        ...state,
        loading: false,
      };
    }

    case NEWS_REDUCER_CASES.SAVE_NEWS: {
      // Prevent duplicate saves
      const isSaved = state.savedNews.some((news) => news._id === action.news._id);
      if (isSaved) return state;

      return {
        ...state,
        savedNews: [...state.savedNews, action.news],
      };
    }

    case NEWS_REDUCER_CASES.UNSAVE_NEWS: {
      // Remove news from savedNews by ID
      const updatedSavedNews = state.savedNews.filter((news) => news._id !== action.newsId);
      return {
        ...state,
        savedNews: updatedSavedNews,
      };
    }

    default:
      return state;
  }
};

export { newsReducer };
