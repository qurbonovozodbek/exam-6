import React from "react";
import { Outlet, Routes, useNavigate, Route} from "react-router-dom";
import logo from "../../assets/Movie.svg";
import { MdOutlineLiveTv } from "react-icons/md";
import { MdLocalMovies } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import "./home.css";
import Movie from './links/movies'
import Series from "./links/series";
import Bookmarks from "./links/bookmarks";


function Layout() {
  const navigate = useNavigate();

  
  return (
    <>
        <div className="card">
          <div className="sidebar">
            <div className="logo">
              <img src={logo} alt="logo"/>
            </div>
            <div className="links">
              <div className="link">
                <TbCategory className="icons" onClick={() => navigate('/')} />
              </div>
              <div className="link">
                <MdLocalMovies className="icons" onClick={() => navigate('/movies')} />
              </div>
              <div className="link">
                <MdOutlineLiveTv className="icons" onClick={() => navigate('/series') }/>
              </div>
              <div className="link">
                <MdOutlineBookmarkBorder
                  className="icons"
                  onClick={() => navigate('/bookmarks')}
                />
              </div>
            </div>
          </div>
          <div className="menu">
              <Outlet></Outlet>
          </div>
        </div>
    </>
  );
}

export default Layout;
