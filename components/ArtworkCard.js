import useSWR from "swr";
import Error from "next/error";
import Card from 'react-bootstrap/Card'
import Link from "next/link";
import Button from 'react-bootstrap/Button';


export default function ArtworkCard({objectID = null}) {
    const fetcher = (url) => {
        return fetch(url).then((res) => res.json());
    }

    const {data, error} = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher);
    if (error) {
        return <Error statusCode={404} />
    }
    else if (!data) {
        return null;
    }

    //console.log(data);

    function render() {
        let card = [data].map((item) => {
            let image = item.primaryImageSmall? item.primaryImageSmall : 'https://i.imgur.com/4U3cZmx.jpeg';
            let url = `/artwork/${objectID}`
            return <>
            <Card border='light' style={{width: '18rem'}}>
                <Card.Img variant="top" src={image}/>
                <Card.Body>
                    <Card.Title>{item.title? item.title : "N/A"}</Card.Title>
                    <Card.Text>
                        Date: {item.objectDate? item.objectDate : 'N/A'} <br/>
                        Classification: {item.classification? item.classification : 'N/A'} <br/>
                        Medium: {item.medium? item.medium : 'N/A'} <br/>
                    </Card.Text>
                </Card.Body>
                <Link href={url} passHref legacyBehavior>
                    <Button variant='secondary'>{objectID}</Button>
                </Link>
                
            </Card>
            </>
        });
        return card;
    }

    return <>{render()}</>;
}