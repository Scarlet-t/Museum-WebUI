import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { getDecodedToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  // atom start
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  //atom edn
  const [searchField, setSearchField] = useState("");

  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    let queryString = `/artwork?title=true&q=${searchField}`;
    router.push(queryString);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    toggleNavbar();
  }

  const [isExpanded, setIsExpanded] = useState(false);

  function toggleNavbar() {
    setIsExpanded(!isExpanded);
  }

  let token = getDecodedToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar
        expanded={isExpanded}
        expand="lg"
        className="fixed-top navbar-dark bg-primary"
      >
        <Container>
          <Navbar.Brand>Museum Thing</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toggleNavbar}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!token && (
                <Nav.Link
                active={router.pathname === "/login"}
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(false);
                  router.push("/login");
                }}
              >
                Advanced Search
              </Nav.Link>
              )}
              {!token && (
                <Nav.Link
                active={router.pathname === "/register"}
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(false);
                  router.push("/register");
                }}
              >
                Advanced Search
              </Nav.Link>
              )}
              <Nav.Link
                active={router.pathname === "/"}
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(false);
                  router.push("/");
                }}
              >
                Home
              </Nav.Link>
              {token && (
                <Nav.Link
                  active={router.pathname === "/search"}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsExpanded(false);
                    router.push("/search");
                  }}
                >
                  Advanced Search
                </Nav.Link>
              )}
            </Nav>
            {token && 
            (
              <Form inline onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button type="submit">Search</Button>
                </Col>
              </Row>
            </Form>
            )
            }
            
            <Nav>
              {token && (
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                <NavDropdown.Item
                  active={router.pathname === "/favourites"}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsExpanded(false);
                    router.push("/favourites");
                  }}
                >
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Item
                  active={router.pathname === "/history"}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsExpanded(false);
                    router.push("/history");
                  }}
                >
                  History
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={logout}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}
