import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import EditMovie from "./Movies/EditMovie"
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [movieList]); //runs getMovieList whenever movieList changes

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/" render={props=> <MovieList {...props} movies={movieList} setMovies={setMovieList}/>}/>
        
      <Route path="/edit-movie/:id" render={()=> <EditMovie getMovieList={getMovieList} movies={movieList} setMovies={setMovieList}/>}/>

      <Route path="/movies/:id" render={props=> <Movie {...props} getMovieList={getMovieList}setMovies={setMovieList} addToSavedList={addToSavedList} />}/>
        
      
    </>
  );
};

export default App;
