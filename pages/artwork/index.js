import { useRouter } from 'next/router'
import{useState, useEffect} from 'react'
import useSWR from "swr";
import Error from "next/error";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, Pagination } from 'react-bootstrap';
import validObjectIDList from '@/public/data/validObjectIDList.json'
import ArtworkCard from '@/components/ArtworkCard';
import Layout from '@/components/Layout';


const PER_PAGE = 12;


export default function Artwork() {
    const router = useRouter();
    const finalQuery = router.asPath.split('?')[1];
    const fetcher = (url) => {
        console.log('here');
        return fetch(url).then((res) => res.json());
    }

    const {data, error} = useSWR(finalQuery ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}` : null, fetcher);

    
    function previousPage() {
        if (page > 1)
            setPage(page - 1);
    }

    function nextPage() {
        console.log(Math.floor(data?.objectIDs?.length/PER_PAGE) + 1);
        if (page < (Math.floor(data?.objectIDs?.length/PER_PAGE) + 1)) {
            setPage(page + 1)
        }
    }

    const [artworkList, setArtworkList] = useState(null);
    const [page, setPage] = useState(1);


    useEffect(() => {
        if (data) {
            console.log(data);
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
            let results = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                let chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
              }
              setArtworkList(results);

              setPage(1);
        } else if (error) {
            return <Error statusCode={404} />
        }
        
    }, [data, error]);

    const makeArtworkList = () => {
        let render = [];
        if (artworkList.length > 0) {
            artworkList[page - 1].forEach((objectId) => {
                render.push(<Col lg={3} key={objectId}><ArtworkCard objectID={objectId}/></Col>);
            });
        }
        else {
            render.push(<h4>Nothing Here</h4>);
        }
        return render;
    }
    const makePagination = ()  => {
        if (artworkList.length > 0) {
            return<>
            <Col md="auto">
            <Pagination size='lg'>
            <Pagination.Prev onClick={previousPage}></Pagination.Prev>
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage}></Pagination.Next>
            </Pagination>
            </Col>

            </>
        }
    }

    function makePage() {
        let rendered;
        if (artworkList) {
            return <>
            <Container>
            <Row className="gy-4">
                    {makeArtworkList()}
                </Row>
                <Row className="justify-content-md-center">
                    {makePagination()}
                </Row>
            </Container>

            </>
        }
        else {
            return <>null</>
        }
    }


    return <><Layout>{makePage()}</Layout>
    </>
}