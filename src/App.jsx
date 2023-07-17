import { useEffect, useState } from "react";
import "./App.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Markerposition from "./components/Makerposition";
import './TableStyles.css'


const App = () => {
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");

  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  window.addEventListener("load", placeholderTextFunc);
  window.addEventListener("resize", placeholderTextFunc);

  function placeholderTextFunc() {
    if (window.innerWidth < 800) {
      setPlaceholderText("IP address");
    } else {
      setPlaceholderText("Search for any IP address or domain");
    }
  }

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_9nbKezmmrCFD7RW4Lrrr59fdqFmc5&`
        );
        const data = await res.json();
        setAddress(data);
      };

      getInitialData();
    } catch (error) {
      console.trace(error);
    }
  }, []);

  const getEnteredData = async () => {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_9nbKezmmrCFD7RW4Lrrr59fdqFmc5&${
        checkIpAddress.test(ipAddress)
          ? `ipAddress=${ipAddress}`
          : checkDomain.test(ipAddress)
          ? `domain=${ipAddress}`
          : ""
      }`
    );
    const data = await res.json();
    setAddress(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getEnteredData();
    setIpAddress("");
  };

  return (
    <div className="App">
      <h1>IP Address Tracker</h1>

      <div className="searchBox">
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="ipaddress"
            id="ipaddress"
            placeholder={placeholderText}
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <button type="submit">
            <ArrowForwardIosIcon
              sx={{
                color: "#FFFFFF",
                fontSize: "30px",
              }}
            />
          </button>
        </form>
      </div>
      {address && (
        <>
          {window.innerWidth < 800 ? (
            <div className="dataWrapper">
              <div className="dataInfo">
                <p>IP ADDRESS</p>
                <h3>{address.ip}</h3>
              </div>

              <div className="dataInfo">
                <p>LOCATION</p>
                <h3>
                  {address.location.city}, {address.location.region}
                </h3>
              </div>

              <div className="dataInfo">
                <p>TIMEZONE</p>
                <h3>{`UTC ${address.timezone}`}</h3>
              </div>

              <div className="dataInfo">
                <p>ISP</p>
                <h3>{address.isp}</h3>
              </div>
            </div>
          ) : ( 
          <>
            <table>
              <thead>
                  <tr>
                      <th>IP ADDRESS</th>
                      <th>LOCATION</th>
                      <th>TIMEZONE</th>
                      <th>ISP</th>
                  </tr>
              </thead>

              <tbody>
                  <tr>
                      <td>{address.ip}</td>
                      <td>{address.location.city}, {address.location.region}</td>
                      <td>{`UTC ${address.timezone}`}</td>
                      <td>{address.isp}</td>
                  </tr>
              </tbody>
            </table>
          </>
         )}

        


          <MapContainer
            center={[address.location.lat, address.location.lng]}
            zoom={13}
            scrollWheelZoom={true}
            className="mapContainer"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Markerposition address={address} />
          </MapContainer>
        </>
      )}
    </div>
  );
};

export default App;
