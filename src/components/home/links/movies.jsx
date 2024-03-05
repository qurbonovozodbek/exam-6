import React from "react";
import { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { MdLocalMovies } from "react-icons/md";
import { FaImdb } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { FaPlayCircle } from "react-icons/fa";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {PropagateLoader} from 'react-spinners'


function Movie() {
  const [recommend, setRecommend] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("https://api.kinopoisk.dev/v1.4/movie?type=movie", {
      method: "GET",
      headers: {
        "X-API-KEY": "D9126XD-40SMEH1-NPFQ50A-A6WX9D5",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecommend(data.docs);
         console.log(data.docs);
         setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 3500)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [single, setSingle] = useState([]);
  const [close, setClose] = useState(false);
  const detailPage = (Product) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000)
    setSingle([{ ...Product }]);
    setClose(true);
  };

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  // add localStorage saved's
  const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
  const addBookmark = (product) => {
    const existingBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedProducts")) || [];
    const isBookmarked = existingBookmarks.some(
      (item) => item.id === product.id);

    if (!isBookmarked) {

      setOpen(true);

      const updatedBookmarks = [...existingBookmarks, product];
      localStorage.setItem(
        "bookmarkedProducts",
        JSON.stringify(updatedBookmarks));
      setBookmarkedProducts(updatedBookmarks);

    } else {

      setError(true)

      const updatedBookmarks = existingBookmarks.filter(
        (item) => item.id !== product.id);
      localStorage.setItem(
        "bookmarkedProducts",
        JSON.stringify(updatedBookmarks));
      setBookmarkedProducts(updatedBookmarks);

    }
  };
 console.log(bookmarkedProducts);
  return (
    <>

    <div>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          save
        </Alert>
      </Snackbar>
    </div>

    <div>
      <Snackbar open={error} autoHideDuration={1000} onClose={handleCloseError}>
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Unsaved
        </Alert>
      </Snackbar>
    </div>

      {close ? (
        <div className="single">
          <button className="single-btn" onClick={() => setClose(false)}>
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
          {single.map((x, ind) => {
            return (
              <>
                {loading ? <PropagateLoader className='loader-single' color="#fff700"/> : 
                  <div key={ind} className="single-page-info">
                  <div className="single-img">
                    <img src={x.poster.url} alt="movie picture" />
                  </div>
                  <div className="single-info">
                    {x.alternativeName && x.alternativeName.length ? (
                      <h2> {x.alternativeName} </h2>
                    ) : (
                      <h2> {x.genres.name} </h2>
                    )}
                    <div className="single-ratings">
                      <div className="rating-box">
                        <div className="mini-info">
                          <FaImdb className="mini-icon" />
                          <span> {x.rating.imdb} </span>
                        </div>
                        <div className="mini-info">
                          <i className="fa-solid fa-calendar-days"></i>{" "}
                          <span> {x.year} </span>
                        </div>
                      </div>
                      <div className="rating-box">
                        <div className="mini-info">
                          <FaRegStar className="mini-icon" />{" "}
                          <span> {x.rating.filmCritics} </span>
                        </div>
                        <div className="mini-info">
                          <RiMovie2Fill className="mini-icon" />{" "}
                          <span> {x.movieLength} minute </span>
                        </div>
                      </div>
                    </div>
                    <button className="trailer">
                      {" "}
                      <FaPlayCircle
                        onClick={() => navigate()}
                        className="btn-icon"
                      />{" "}
                      trailer{" "}
                    </button>
                    <div className="desc">
                      <p> {x.shortDescription} </p>
                    </div>
                  </div>
                </div>
              }
              </>
            );
          })}
        </div>
      ) : null}
      <div className="search">
        <LuSearch className="search-icon" />
        <input
          className="movie-search"
          type="text"
          placeholder="Search for movies"
        />
      </div>
      {loading ? <PropagateLoader className='loader' color="#ff0055" /> : 
      <div className="recommend">
      <h2 className="recommend-title-head">Movies</h2>
      <div className="recommend-cards">
        {recommend.map((ul, ind) => {
          return (
            <div
              key={ind}
              className="recommend-card"
            >
              <div
                id="addBookMark"
                className="recommend-save"
                onClick={() => addBookmark(ul)}
              >
                <i  className="fa-regular fa-bookmark"></i>
              </div>
              <img
                className="recommend-img"
                src={ul.backdrop.url}
                alt="movie picture"
              />
              <div className="recommend-title">
                <div className="recommend-info">
                  <span> {ul.year} </span> ●{" "}
                  <MdLocalMovies className="info-movie-icon" />
                  <span> {ul.type} </span> ● <span> {ul.ageRating} </span>
                </div>
                {ul.alternativeName && ul.alternativeName.length < 20 ? (
                  <h2 onClick={() => detailPage(ul)}> {ul.alternativeName} </h2>
                ) : (
                  <h2 onClick={() => detailPage(ul)}> {ul.name} </h2>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
      }
    </>
  );
}

export default Movie;
