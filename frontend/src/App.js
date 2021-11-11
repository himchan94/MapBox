import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";

import "./app.css";

function App() {
  const currentUser = "test";
  const [pins, setPins] = useState([]);
  const [currentPlacedId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");

        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    console.log(e);
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const newPin = {
    //   username: currentUsername,
    //   title,
    //   desc,
    //   rating: star,
    //   lat: newPlace.lat,
    //   long: newPlace.long,
    // };
    // try {
    //   const res = await axios.post("/pins", newPin);
    //   setPins([...pins, res.data]);
    //   setNewPlace(null);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onDblClick={handleAddClick}
        transitionDuration="200"
      >
        {pins.length !== 0 &&
          pins.map((p) => (
            <div>
              <Marker
                latitude={p.lat}
                longitude={p.long}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <div>
                  <Room
                    style={{
                      fontSize: viewport.zoom * 7,
                      color:
                        p.username === currentUser ? "tomato" : "slateblue",
                      cursor: "pointer",
                    }}
                    onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                  />
                </div>
              </Marker>
              {p._id === currentPlacedId && (
                <Popup
                  latitude={p.lat}
                  longitude={p.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor="left"
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Review</label>
                    <p>{p.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                    </div>
                    <label>Infromation</label>
                    <span className="username">
                      Created by <b>{p.username}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </Popup>
              )}
            </div>
          ))}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
          >
            {" "}
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setStar(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit" className="submitButton">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
