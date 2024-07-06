import "./SearchResult.css";

export const SearchResult = ({ result, onResultClick }) => {
  const handleClick = () => {
    const drinkId = result._id;
    const element = document.getElementById(drinkId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    onResultClick(result);
  };
  return (
    <button
      style={{
        width: "100%", // Đảm bảo mỗi kết quả có chiều rộng 100%
        textAlign: "left", // Căn chữ sang trái
        padding: "8px 16px", // Thêm padding để dễ nhìn hơn
        borderBottom: "1px solid #ddd", // Thêm đường kẻ giữa các kết quả
        background: "white", // Màu nền cho mỗi kết quả
        borderBottom: "1px solid lightgrey", //
        cursor: "pointer", // Thêm con trỏ kiểu pointer khi di chuột qua
      }}
      onClick={(e) => handleClick()}
    >
      {result.Name}
    </button>
  );
};
