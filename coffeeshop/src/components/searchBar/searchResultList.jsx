//import "./SearchResultsList.css";
import { SearchResult } from "./searchResult";

export const SearchResultsList = ({ results, onResultClick }) => {
  return (
    <div
      className="results-list"
      style={{
        marginTop: "-15px",
        paddingTop: "5px",
        backgroundColor: "white",
        position: "absolute",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        width: "100%", // Đảm bảo danh sách kết quả có chiều rộng 100%
      }}
    >
      {results.map((result, id) => (
        <SearchResult result={result} key={id} onResultClick={onResultClick} />
      ))}
    </div>
  );
};
