import Header from "../components/layout/Header";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function nosotros() {
  return (
    <div>
      <Header></Header>
      <Container>
        <Row>
          <Col lg={7} md={7}>
            <h2 class="mbr-section-title mbr-fonts-style mb-3 display-2">
              <strong>About us</strong>
            </h2>
            <p class="mbr-text mbr-fonts-style mb-3 display-7">
              At 2U Ibiza, we are dedicated to offering luxury experiences in
              villa rentals with exclusive services. Our villas are designed to
              provide you with maximum comfort and entertainment.
            </p>
            <p class="mbr-text mbr-fonts-style mb-3 display-7">
              Immerse yourself in Ibiza's nightlife, explore the most beautiful
              beaches and enjoy delicious local cuisine. Your adventure starts
              here!
            </p>
            <p class="mbr-text mbr-fonts-style display-7">
              With a team dedicated to your service, we are ready to make your
              stay an unforgettable experience.
            </p>
          </Col>
          <Col lg={5} md={5}>
            <div className="d-flex flex-row-reverse">
              <Image src="AboutUs.png" rounded></Image>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default nosotros;
