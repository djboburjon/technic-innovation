import React, { useEffect, useState } from "react";
import "./Services.css";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { BsBuildings } from "react-icons/bs";

function Services() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLogin, setisLogin] = useState(false);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
   const [loader, setLoader] = useState(false);


  const [token, setToken] = useState("");

  const [korxonaId, setKorxonaId] = useState()

  const [korxonaDocs, setKorxonaDocs] = useState()
  const [error, setError] = useState();



  const getData = () => {
    setLoader(true)
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    fetch(
      "https://teknikinnavatsion.pythonanywhere.com/korxona/all/?category_id=" +
        id,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setData(JSON.parse(result).data);
        setLoader(false);
      })
      .catch((error) => {
         setLoader(false);
        console.log("error", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);


  const getDocs = (token) => {
     setLoader(true);
   var requestOptions = {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
     redirect: "follow",
   };

   fetch(
     `https://teknikinnavatsion.pythonanywhere.com/korxona/get/?korxona_id=${korxonaId}`,
     requestOptions
   )
     .then((response) => response.text())
     .then((result) => {
        if(JSON.parse(result).message){
            setError(JSON.parse(result).message)
               setLoader(false);
        }
        
       setKorxonaDocs(JSON.parse(result).data);
        setLoader(false);
       // setCarCategory(JSON.parse(result).data);
     })
     .catch((error) => {
      console.log("error", error);
         setLoader(false);
     });
  };

  const apiUrl =
    "https://teknikinnavatsion.pythonanywhere.com/user/korxona_token/";

  const handleSubmit = (e)=>{
    e.preventDefault();
    if (!korxonaId) {
      alert("avval korxonani tanlang")
    }else{
      if (!login.length || !password.length) {
        alert("ma'lumotlar to'ldirilganiga ishonch hozil qiling");
      } else {
        const userData = {
          username: login,
          password: password,
        };
        console.log(userData);

        fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("API response:", data.access);
            getDocs(data.access);
            setisLogin(true);
            // navigate("/");
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Login yoki parol xato kiritildi!")
          });
      }
      
    }
    
  }




  return (
    <div className="services">
      {loader && <Loading />}
      <div className="services_left">
        <ul>
          {data.length ? (
            data.map((item) => {
              return (
                <li
                  className={korxonaId == item.id ? "item active" : "item"}
                  onClick={() => {
                    setKorxonaId(item.id);
                    setisLogin(false);
                    setError(false);
                    setKorxonaDocs();
                    setLogin("");
                    setPassword("");
                  }}
                >
                  <BsBuildings />
                  {item.name}
                </li>
              );
            })
          ) : (
            <h2 style={{ color: "white", textAlign: "center" }}>
              Ma'lumot yo'q
            </h2>
          )}
        </ul>
      </div>
      <div className="services_right">
        <div className="modal">
          {!isLogin && (
            <form onSubmit={handleSubmit} action="">
              <label htmlFor="login">Login:</label>
              <input
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
                id="login"
                type="text"
                placeholder="login..."
              />
              <label htmlFor="password">Password:</label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type="password"
                placeholder="password..."
              />
              <button>login</button>
            </form>
          )}
          {korxonaDocs && (
            <a
              className="doc"
              target="_blank"
              href={`https://teknikinnavatsion.pythonanywhere.com${korxonaDocs.file}`}
            >
              <h2>Открыть документ</h2>
            </a>
          )}
          {error && (
            <h2
              style={{
                color: "white",
                backgroundColor: "black",
                padding: "4px 20px",
              }}
            >
              {error}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Services;
