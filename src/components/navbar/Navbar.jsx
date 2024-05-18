import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import { FaTelegramPlane, FaInstagram, FaYoutube } from "react-icons/fa";

function Navbar() {
  const [data, setData] = useState([]);

  const getData = () => {
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    fetch("https://teknikinnavatsion.pythonanywhere.com/user/address/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData(JSON.parse(result).data);
        setLoader(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <h1>
            <Link to={"/"}>TEKNIK INNAVATSION MCHJ</Link>
          </h1>
        </div>
        <ul className="links">
          <li>
            <a href={`tel:${data.tel}`}>{data.tel}</a>
          </li>
          <li>
            <a target="_blank" href={`https://${data.telegram}`}>
              <FaTelegramPlane />
            </a>
          </li>
          <li>
            <a target="_blank" href={`https://${data.instagram}`}>
              <FaInstagram />
            </a>
          </li>
          <li>
            <a target="_blank" href={`https://${data.youtube}`}>
              <FaYoutube />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
