import { useRouter } from "next/router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import Layout from "@/components/Layout";

export default function ArtworkById() {
  const router = useRouter();
  const objectId = router.query.objectID;

  return (
    <>
      <Layout>
        <Row>
          <Col>
            <ArtworkCardDetail objectID={objectId} />
          </Col>
        </Row>
      </Layout>
    </>
  );
}
