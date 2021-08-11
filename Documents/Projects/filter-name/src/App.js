import React from "react";
import "./App.css";

function App() {
  const [bookTitles, setBookTitles] = React.useState("");

  const [searTerm, setSearchTerm] = React.useState([]);

  const url =
    "https://www.googleapis.com/books/v1/volumes?q=%22bond+financial+technologies%22";

  const bookTitle = bookTitles?.items?.map((item) => item.volumeInfo.title);
  const filteredBookTitles = bookTitle?.filter((val) =>
    val.toLowerCase().includes(searTerm)
  );

  React.useEffect(() => {
    async function getBookTitle() {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setBookTitles(result);
      } catch (error) {
        throw new Error(error);
      }
    }
    getBookTitle();
  }, []);

  // console.log("bookTitle", bookTitle);
  // console.log("filteredBookTitles", filteredBookTitles);

  const handleOnChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };
  return (
    <div className='App'>
      <h1>Filter Name</h1>
      <input onChange={handleOnChange} />
      {!bookTitle ? (
        <p>Loading.....</p>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ul
            style={{
              display: "flex",
              alignItems: "baseline",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {filteredBookTitles?.map((title, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
