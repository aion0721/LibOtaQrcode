import { useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import { Input, Button } from "@chakra-ui/react";

function QrCard() {
  const [isbn, setIsbn] = useState("");
  const [url, setUrl] = useState("");
  const [isbnApi, setIsbnApi] = useState("");
  const [book, setBook] = useState({
    name: "",
    isbn: "",
    url: "",
    api: {},
  });

  const ApiFetch: any = () => {
    console.log("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn);
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn)
      .then((response) => {
        //setIsbnApi(response.data.items[0].volumeInfo.title);
        setBook({ ...book, api: response.data });
      });
    console.log(isbnApi);
    setBook({ ...book, url: baseUrl + isbn });

    setUrl(baseUrl + isbn);
  };

  const baseUrl =
    "https://www.lib.city.ota.tokyo.jp/detailresult?3&target1=1&isbn=";

  function handleSubmit(e: any) {
    console.log(book);
  }

  const handleChange: any = (e: any) => {
    setIsbn(e.target.value.replace("-", ""));
    setBook({ ...book, isbn: e.target.value.replace("-", "") });
  };
  return (
    <div>
      <form>
        ISBN:<Input type="text" id="isbn" onChange={handleChange}></Input>
        <Button onClick={(e) => ApiFetch()}>Search</Button>
        <Button onClick={(e) => handleSubmit(e)}>Debug</Button>
        {url ? <QRCode value={book.url}></QRCode> : ""}
        <br />
        Title: {isbnApi}
        Image:{" "}
        {url ? (
          <img
            src={
              book.isbn ? "https://iss.ndl.go.jp/thumbnail/" + book.isbn : ""
            }
          ></img>
        ) : (
          ""
        )}
        {url}
      </form>
    </div>
  );
}

export default QrCard;
