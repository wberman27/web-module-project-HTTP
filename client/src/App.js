import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import AddMovieForm from './components/AddMovieForm'
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);


  useEffect(()=>{
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id)=> {
    setMovies(movies.filter(item =>(item.id !== Number(id))));
  }

  const addToFavorites = (movie) => {
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>

            <Route 
            exact 
            path="/movies/add" 
            render={(props) =>{
              //gives prop setMovies to EditMovieForm
              return (<AddMovieForm  {...props} setMovies={setMovies}/>)
            }}>
            </Route>

            <Route 
            exact 
            path="/movies/edit/:id" 
            render={(props) =>{
              //gives prop setMovies to EditMovieForm
              return (<EditMovieForm  {...props} movies={movies} setMovies={setMovies}/>)
            }}>
            </Route>

            <Route 
            exact 
            path="/movies/" 
            render={(props) =>{
              //gives prop setMovies to EditMovieForm
              return (<MovieList  {...props} movies={movies}/>)
            }}>
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

