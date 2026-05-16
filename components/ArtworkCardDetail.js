import useSWR from "swr";
import Error from "next/error";
import Card from 'react-bootstrap/Card'
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetail({objectID = null}) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    async function favouritesClicked() {
        if (showAdded) {
            console.log("showAdded is true");
            setFavouritesList(await removeFromFavourites(objectID));
            setShowAdded(false);
            console.log(favouritesList);
            //console.log(`removed from favouritesList:${favouritesList}`); (seems to be added but not showing in console??)
        }
        else {
            console.log("showAdded is false");
            console.log(objectID);
            setFavouritesList(await addToFavourites(objectID));
            setShowAdded(true);
            //console.log(`added to favouritesList:${favouritesList}`);
        }
    }

    const [buttonVariant, setButtonVariant] = useState("primary");
    const [buttonText, setButtonText] = useState("★ Favourited ✓");

    useEffect(() => {
        setShowAdded(favouritesList?.includes(objectID));
        if (showAdded) {                         
            setButtonVariant("primary");
            setButtonText("★ Favourited ✓")
        }
        else {
            setButtonVariant("outline-primary");
            setButtonText("☆ Favourite");
        }
    },[showAdded, setButtonVariant, setButtonText, favouritesList, objectID])

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
            //empty string wevaluates to false in js
            let image = item.primaryImage? item.primaryImage : 'https://i.imgur.com/4U3cZmx.jpeg';
            let url = `/artwork/${objectID}`
            return <>
            <Card border='light' style={{width: '100%'}}>
                <Card.Img variant="top" src={image}/>
                <Card.Body>
                    <Card.Title>{item.title? item.title : "N/A"}</Card.Title>
                    <Card.Text>
                        Date: {item.objectDate? item.objectDate : 'N/A'} <br/>
                        Classification: {item.classification? item.classification : 'N/A'} <br/>
                        Medium: {item.medium? item.medium : 'N/A'} <br/><br />

                        Artist: {item.artistDisplayName? item.artistDisplayName : 'N/A'}
                        <a href={item.artistWikidata_URL} target="_blank" rel="noreferrer" > {item.artistWikidata_URL ? item.artistWikidata_URL : ""}</a>
                        <br/>
                        Credit Line: {item.creditLine? item.creditLine : 'N/A'} <br/>
                        Dimensions: {item.dimensions ? item.dimensions : 'N/A'} <br/>
                        <Button variant={buttonVariant} onClick={favouritesClicked}>{buttonText}</Button>
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

    return <>
    <Layout>{render()}</Layout></>;
}