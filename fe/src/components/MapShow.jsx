import React, { useState, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import axios from "axios";
import { Modal, Form } from "react-bootstrap";
import ReactPannellum from "react-pannellum";
import mainImage from "./images/main.jpg";

function MapShow() {
  const [pictures, setPictures] = useState([]);
  const [map, setMap] = useState({ name: "", areas: [] });
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [filterColor, setFilterColor] = useState("all");
  const stages = {
    "red": "Elv.: 0-1500 mm",
    "blue": "Elv.: 1500-3000 mm",
    "yellow": "Elv.: 3000-4500 mm",
    "brown": "Elv.: 4500-6000 mm",
    "green": "Elv.: 6000-7500 mm",
    "orange": "Elv.: 7500-9000 mm6"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/picture/pictures/");
        const fetchedPictures = response.data;

        setPictures(fetchedPictures);

        const mapData = {
          name: "image-map",
          areas: fetchedPictures.map((pic) => {
            const coords = [parseInt(pic.x_cor), parseInt(pic.y_cor), parseInt(pic.z_cor)];
            return {
              name: pic.Img_name,
              shape: pic.shape,
              coords,
              preFillColor: pic.Prefillcolor,
            };
          }),
        };

        setMap(mapData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (area) => {
    const selectedImage = pictures.find((pic) => pic.Img_name === area.name);
    if (selectedImage) {
      setCurrentImage(selectedImage.Image);
      setModalTitle(`${selectedImage.Img_name} at ${selectedImage.Date}`);
      setShowModal(true);
    }
  };

  const filteredAreas = filterColor === "all" ? map.areas : map.areas.filter(area => area.preFillColor === filterColor);

  return (
    <div style={{ position: "relative", paddingBottom: "50px" }}>
      <div style={{ overflow: "auto", maxHeight: "85vh", width: "95vw", marginTop: "20px", borderRadius: "20px" }}>
        {filteredAreas.length > 0 ? (
          <ImageMapper
            src={mainImage}
            name={map.name}
            areas={filteredAreas}
            width={2500}
            height={2000}
            onClick={(area) => handleImageClick(area)}
          />
        ) : (
          <p>Loading map...</p>
        )}
      </div>

      <div style={{ position: "fixed", bottom: "40px", right: "50px", background: "blue", padding: "10px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", zIndex: 1000 }}>
        <Form.Select value={filterColor} onChange={(e) => setFilterColor(e.target.value)}>
          <option value="all">All Elevations</option>
          {Object.entries(stages).map(([color, stage]) => (
            <option key={color} value={color}>{stage}</option>
          ))}
        </Form.Select>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            padding: 0,
            overflow: "hidden",
          }}
        >
          {currentImage && (
            <ReactPannellum
              id="1"
              sceneId="firstScene"
              imageSource={currentImage}
              config={{
                autoLoad: true,
                compass: true,
                haov: 360,
                vaov: 120,
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MapShow;
