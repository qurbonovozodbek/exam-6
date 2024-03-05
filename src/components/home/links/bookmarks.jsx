import React, { useEffect, useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "../home.css";
import { MdLocalMovies } from "react-icons/md";
import { FaImdb } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { FaPlayCircle } from "react-icons/fa";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function Bookmarks() {

  const [items, setItems] = useState([])
  useEffect(() => {
    const data = localStorage.getItem('bookmarkedProducts');
    if (data) {
      setItems(JSON.parse(data));
    }
  }, []);

  const [single, setSingle] = useState([]);
  const [close, setClose] = useState(false);
  const detailPage = (Product) => {
    setSingle([{ ...Product }]);
    setClose(true);
  };

  const [error, setError] = useState(false);
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  function removeBookmark(idToRemove) {
    const updatedItems = items.filter(item => item.id !== idToRemove);
    setItems(updatedItems);
    localStorage.setItem('bookmarkedProducts', JSON.stringify(updatedItems));
    setError(true)
  }


  
  return (
    <>

    <div>
      <Snackbar open={error} autoHideDuration={1500} onClose={handleCloseError}>
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
                <div className="single-page-info">
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
                        onClick={() => navigate("https://www.youtube.com/")}
                        className="btn-icon"
                      />{" "}
                      trailer{" "}
                    </button>
                    <div className="desc">
                      <p> {x.shortDescription} </p>
                    </div>
                  </div>
                </div>
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
          placeholder="Search saved's movie"
        />
        </div>

      <div className="recommend">
        <h2 className="recommend-title-head">Saved movies</h2>
        <div className="recommend-cards">
          {items.map((ul, ind) => {
            return (
              <div key={ind} className="recommend-card">
                <div
                  id="addBookMark"
                  className="recommend-save"
                  onClick={() => removeBookmark(ul.id)}
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
                    <h2 onClick={() => detailPage(ul)}>
                      {" "}
                      {ul.alternativeName}{" "}
                    </h2>
                  ) : (
                    <h2 onClick={() => detailPage(ul)}> {ul.name} </h2>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default Bookmarks