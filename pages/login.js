import { useState } from "react";
import { Card, Form, Alert, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { authenticateUser } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { searchHistoryAtom,  favouritesAtom} from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";

export default function Login(props){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favourites, setFavourites] = useAtom(favouritesAtom);

    async function updateAtoms() {
        setFavourites(getFavourites());
        setSearchHistory(getHistory());
    }

    
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await authenticateUser(user, password);
            await updateAtoms();
            router.push('/favourites');
        }
        catch(err) {
            setWarning(err.message);
        }
    }


  return (
    <>
      <Card bg="dark">
        <Card.Body><h2>Login</h2><span class="text-secondary">Enter your login information below:</span></Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label><Form.Control type='text' value={user} id='userName' name='userName' onChange={e => setUser(e.target.value)}/>
          
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />

        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
      { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}
    </>
  );
}