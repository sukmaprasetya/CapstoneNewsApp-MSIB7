import { useSelector, useDispatch } from "react-redux";
import { NewsCard } from "../components/NewsCard";
import { NEWS_REDUCER_CASES } from "../store/reducers";

function SavedNewsPage() {
  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <main>
      <section className="container mt-4" style={{ paddingBottom: '20px' }}>
      <h1 className="mb-4 text-left" style={{ fontSize: '35px' }}>Saved News</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {newsReducer.savedNews.map((n) => {
            const { headline, abstract, source, byline, _id, imageUrl, web_url } = n;
            return (
              <div className="col" key={_id}>
                <NewsCard
                  headline={headline.main}
                  abstract={abstract}
                  source={source}
                  author={byline.original}
                  imageUrl={imageUrl}
                  fullArticleUrl={web_url}
                  onSave={() => {
                    dispatch({
                      type: NEWS_REDUCER_CASES.SAVE_NEWS,
                      news: n,
                    });
                  }}
                  onUnsave={() => {
                    dispatch({
                      type: NEWS_REDUCER_CASES.UNSAVE_NEWS,
                      newsId: _id,
                    });
                  }}
                  isSaved={true}
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default SavedNewsPage;
