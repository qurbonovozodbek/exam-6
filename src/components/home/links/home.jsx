import React from "react";
import { LuSearch } from "react-icons/lu";
import "../home.css";
import image from "../../../assets/Rectangle1.png";
import { MdLocalMovies } from "react-icons/md";
import { useState, useEffect } from "react";

function Home() {
  const [product, setProduct] = useState([]);

  // useEffect(() => {
  //   fetch(https://api.kinopoisk.dev/v1.4/movie?page=2&limit=10", {
  //     method: "GET",
  //     headers: {
  //       "X-API-KEY": "EKZ2PCB-NB1MDNN-K93KJBZ-59D7X9Y",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // const names = data.docs.map(movie => movie.name);
  //       setProduct(data.docs);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  const [recommend, setRecommend] = useState([]);
  useEffect(() => {
    fetch("https://api.kinopoisk.dev/v1.4/movie?page=8&limit=200", {
      method: "GET",
      headers: {
        "X-API-KEY": "V7TF96X-HAN49AR-JCXKHDY-3YMC3A5",
      },
    })
    .then((res) => res.json())
    .then((data) => {
        setRecommend(data.docs);
      })
    .catch((err) => {
        console.log(err);
      });
  }, [])

  const detailPage = (Product) => {
    setProduct([{...Product}])
  }
  console.log(product);

  return (
    <>
      <div className="search">
        <LuSearch className="search-icon" />
        <input
          className="movie-search"
          type="text"
          placeholder="Search for movies or TV series"
        />
      </div>
      {/* <div className="trending">
        <h2 className="movie-title-head">Trending</h2>
        <div className="trending-movies">
          {product.map((el, index) => {
            return (
              <div key={index} className="movie-card">
              <img className="movie-img" src={el.backdrop.previewUrl} alt="movie picture" />
              <div className="movie-title">
                <div className="movie-info">
                  <span> {el.year} </span> ●{" "}
                  <MdLocalMovies className="info-movie-icon" />
                  <span> {el.type} </span> ● <span> {el.ageRating} </span>
                </div>
                <h2> {el.alternativeName} </h2>
              </div>
            </div>
            )
          })}
        </div>
      </div> */}
      <div className="recommend">
        <h2 className="recommend-title">Recommended for you</h2>
        <div className="recommend-cards">

          {
            recommend.map((ul, ind) => {
              return (
                <div key={ind} onClick={() => detailPage(ul)} className="recommend-card">
                  <img className="recommend-img" src={ul.backdrop.url} alt="movie picture" />
                  <div className="recommend-title">
                    <div className="recommend-info">
                      <span> {ul.year} </span> ●{" "}
                      <MdLocalMovies className="info-movie-icon" />
                      <span> {ul.type} </span> ● <span> {ul.ageRating} </span>
                    </div>
                    {(ul.alternativeName && ul.alternativeName.length < 20) ? <h2> {ul.alternativeName} </h2> : <h2> {ul.name} </h2> }
                  </div>
                </div>
              )
            })
          }
          
        </div>
      </div>
    </>
  );
}

export default Home;
