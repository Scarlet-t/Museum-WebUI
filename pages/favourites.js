//!!! NOT TESTED!!!
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import ArtworkCard from '@/components/ArtworkCard';
import Layout from '@/components/Layout';


export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;

    function makeArtworkList() {
        if (favouritesList.length < 1) {
            return <>No Favourites.</>
        }
        let render = [];
        favouritesList.forEach(id => {
            render.push(<Col lg={3} key={id}><ArtworkCard objectID={id}/></Col>);
        });
        return render;

    }

    return <>
    <Layout>
        <Container>
        <Row className="gy-4">
            <br/>
            {makeArtworkList()}
        </Row>
        </Container>
    </Layout>
    </>
    
}