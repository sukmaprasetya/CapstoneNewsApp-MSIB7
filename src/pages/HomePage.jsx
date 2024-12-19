import { useSelector, useDispatch } from "react-redux";
import { NewsCard } from "../components/NewsCard";
import { useState, useEffect } from "react";
import { NEWS_REDUCER_CASES } from "../store/reducers";
import { fetchNews } from "../store/actions";

function HomePage() {
  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 12;

  const hasMore = newsReducer.totalResults > currentPage * newsPerPage;

  useEffect(() => {
    const query = {
      q: "indonesia" || "nusantara",
      fq: `glocations:("Indonesia")`,
    };
    dispatch(fetchNews(query, currentPage, newsPerPage));
  }, [currentPage, dispatch]);

  const handleNextPage = () => {
    if (hasMore) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <main>
      <section className="container mt-4" style={{ paddingBottom: '20px' }}>
        <h1 className="mb-4 text-left" style={{ fontSize: '35px' }}>Indonesian News</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {newsReducer.news.map((n) => {
          const { headline, abstract, source, byline, imageUrl, web_url } = n;
          return (
            <div className="col" key={n._id}>
              <NewsCard
                headline={headline.main}
                abstract={abstract}
                source={source}
                author={byline?.original}
                imageUrl={imageUrl}
                fullArticleUrl={web_url}
                onSave={() => {
                  dispatch({
                    type: NEWS_REDUCER_CASES.SAVE_NEWS,
                    news: n,
                  });
                }}
              />
            </div>
          );
        })}
      </div>
      {/* Pagination */}
        <div 
          className="d-flex justify-content-center mt-4 gap-2"
          style={{ 
            paddingTop: '20px'
          }}
        >
          <button
            className="btn btn-primary"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="align-self-center">Page {currentPage}</span>
          <button
            className="btn btn-primary"
            onClick={handleNextPage}
            disabled={!hasMore}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}

export default HomePage;