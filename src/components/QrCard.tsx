import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import axios from "axios";

function QrCard() {
  const [isbn, setIsbn] = useState("");
  const [isbnApi, setIsbnApi] = useState("");

  interface apiJsonType {}

  const ApiFetch: any = () => {
    console.log("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn);
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn)
      .then((response) => {
        setIsbnApi(response.data.items[0].volumeInfo.title);
      });
    console.log(isbnApi);
  };

  const baseUrl =
    "https://www.lib.city.ota.tokyo.jp/detailresult?3&target1=1&isbn=";

  function handleSubmit(e: any) {
    console.log(isbn);
  }

  const handleChange: any = (e: any) => {
    setIsbn(e.target.value);
  };
  return (
    <div>
      <form>
        <input type="text" id="isbn" onChange={handleChange}></input>
        <QRCode value={baseUrl + isbn}></QRCode>
        <input type="button" onClick={(e) => handleSubmit(e)}></input>
        <input type="button" onClick={(e) => ApiFetch()} value="Search"></input>
        <br />
        Title: {isbnApi}
        Image:{" "}
        <img src={isbn ? "https://iss.ndl.go.jp/thumbnail/" + isbn : ""}></img>
      </form>
    </div>
  );
}

export default QrCard;
