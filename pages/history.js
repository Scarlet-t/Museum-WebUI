import { useRouter } from "next/router";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import styles from "@/styles/History.module.css";
import Layout from "@/components/Layout";
import { removeFromHistory } from "@/lib/userData";

export default function History() {
  // routing
  const router = useRouter();
  //jotai
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  if(!searchHistory) return null;

  let parsedHistory = [];
  searchHistory.forEach((search) => {
    let parsed = new URLSearchParams(search);
    let entries = parsed.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    e.preventDefault();
    router.push(`${searchHistory[index]}`);
  }

  async function removeHistoryClicked(e, index) {
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  function renderPage() {
    if (searchHistory.length < 1) {
      return (
        <>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Text>
                Nothing Here. Try searching for some artwork.
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      );
    }
    let render = parsedHistory.map((historyItem, index) => {
      return (
        <>
          <ListGroup.Item
            className={styles.historyListItem}
            onClick={(e) => historyClicked(e, index)}
          >
            {Object.keys(historyItem).map((key) => (
              <>
                {key}: <strong>{historyItem[key]}</strong>&nbsp;
              </>
            ))}
          </ListGroup.Item>
          <Button
              className="float-end"
              variant="danger"
              size="sm"
              onClick={(e) => removeHistoryClicked(e, index)}
            >
              &times;
            </Button>
        </>
      );
    });

    return render;
  }
  return (
    <>
      <Layout>
        <ListGroup>{renderPage()}</ListGroup>
      </Layout>
    </>
  );
}
