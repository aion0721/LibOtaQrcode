import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import { Input, Button, Box, Center } from "@chakra-ui/react";
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

type Props = {
  isbn?: string;
};

const QrCard = (props: Props) => {
  const propsIsbn = props.isbn ?? "";
  console.log(props.isbn);
  const [book, setBook] = useState({
    name: "",
    isbn: propsIsbn,
    url: "",
    api: {
      書籍名: "",
      副書籍名: "",
      著者: "",
      詳細: "",
      発行日: "",
      書影: "",
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
            書籍名: res.title,
            副書籍名: res.subtitle,
            著者: res.authors,
            詳細: res.description,
            発行日: res.publishedDate,
            書影: res.imageLinks.thumbnail,
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

  useEffect(() => {
    book.isbn ? ApiFetch() : "";
  }, []);
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
        {book.api.書籍名 != "" ? (
          <div>
            <Center>
              <QRCode value={book.url}></QRCode>
            </Center>
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
                          {key === "書影" ? <img src={value}></img> : value}
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
};

export default QrCard;
