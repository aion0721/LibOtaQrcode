import { useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import { Input, Button, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useQRCode } from "next-qrcode";

function QrCard() {
  const [book, setBook] = useState({
    name: "",
    isbn: "",
    url: "",
    api: {
      title: "",
      subtitle: "",
      authors: "",
      description: "",
      publishedDate: "",
      thumbnail: "",
    },
  });
  const { Canvas } = useQRCode();

  const baseUrl =
    "https://www.lib.city.ota.tokyo.jp/detailresult?3&target1=1&isbn=";

  const issThumbnailBaseUrl = "https://iss.ndl.go.jp/thumbnail/";

  const ApiFetch: any = () => {
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + book.isbn)
      .then((response) => {
        //setIsbnApi(response.data.items[0].volumeInfo.title);
        const res = response.data.items[0].volumeInfo;
        setBook({
          ...book,
          url: baseUrl + book.isbn,
          api: {
            title: res.title,
            subtitle: res.subtitle,
            authors: res.authors,
            description: res.description,
            publishedDate: res.publishedDate,
            thumbnail: res.imageLinks.thumbnail,
          },
        });
        console.log(response.data.items[0]);
      });
  };

  function handleSubmit(e: any) {
    console.log(book);
    console.log(<Canvas text="aaa"></Canvas>);
  }

  const handleChange: any = (e: any) => {
    setBook({ ...book, isbn: e.target.value.replace("-", "") });
  };
  return (
    <Box>
      <form>
        ISBN:<Input type="text" id="isbn" onChange={handleChange}></Input>
        <Button
          colorScheme="teal"
          rightIcon={<SearchIcon />}
          onClick={(e) => ApiFetch()}
        >
          Search
        </Button>
        <Button onClick={(e) => handleSubmit(e)}>Debug</Button>
        {book.api.title != "" ? (
          <div>
            <QRCode value={book.url}></QRCode>
            <br />
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Td>label</Td>
                    <Td>content</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.entries(book.api).map(([key, value]) => {
                    return (
                      <Tr key={key}>
                        <Td>{key}</Td>
                        <Td>
                          {key === "thumbnail" ? (
                            <img src={value}></img>
                          ) : (
                            value
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          ""
        )}
      </form>
    </Box>
  );
}

export default QrCard;
