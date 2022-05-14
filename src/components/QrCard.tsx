import { useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import { Input, Button } from "@chakra-ui/react";

function QrCard() {
  const [book, setBook] = useState({
    name: "",
    isbn: "",
    url: "",
    api: { title: "" },
  });

  const ApiFetch: any = () => {
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + book.isbn)
      .then((response) => {
        //setIsbnApi(response.data.items[0].volumeInfo.title);
        const res = response.data.items[0].volumeInfo;
        setBook({ ...book, api: { title: res.title } });
      });
    setBook({ ...book, url: baseUrl + book.isbn });
  };

  const baseUrl =
    "https://www.lib.city.ota.tokyo.jp/detailresult?3&target1=1&isbn=";

  function handleSubmit(e: any) {
    console.log(book);
  }

  const handleChange: any = (e: any) => {
    setBook({ ...book, isbn: e.target.value.replace("-", "") });
  };
  return (
    <div>
      <form>
        ISBN:<Input type="text" id="isbn" onChange={handleChange}></Input>
        <Button onClick={(e) => ApiFetch()}>Search</Button>
        <Button onClick={(e) => handleSubmit(e)}>Debug</Button>
        {book.api.title != "" ? (
          <div>
            <QRCode value={book.url}></QRCode>
            <br />
            <table>
              <thead>
                <tr>
                  <td>label</td>
                  <td>content</td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(book.api).map(([key, value]) => {
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            Image:
            <img src={"https://iss.ndl.go.jp/thumbnail/" + book.isbn}></img>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default QrCard;
