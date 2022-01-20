import {useParams} from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import style from '../assets/css/Detail.module.css'

function Detail(){
  const {id} = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovie = useCallback( async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
    setMovie(json.data.movie);
    setLoading(false);
  },[id]);
  useEffect(() => {
    getMovie();
  },[getMovie]);

  console.log(movie);
  
  return (
    <div style={{margin: "0",padding:"0", height: "100vh" , backgroundImage : `url(${movie.background_image}`,backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
      <h1 className={style.white}>Movie</h1>
      {loading ? <h1>loading...</h1> : (
        <div>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <h1 className={style.white} >{movie.title}</h1>
          <p className={`${style.white} ${style.fontBig}`}>{movie.description_intro}</p>
          <ul className={style.white}>
            {movie.genres.map((genre) => <li key={genre}>{genre}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;