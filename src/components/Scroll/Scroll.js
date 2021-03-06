import React from 'react';
import { shape, string } from 'prop-types';
import { FILM_NUMBERS } from '../../helpers/constants';

import './Scroll.css';

const Scroll = ({ scrollFilm }) => {
  return (
    <section className='scroll-container star-wars'>
      <div className="crawl">
        <div className="title">
          <p>Episode {FILM_NUMBERS[scrollFilm.episode_id]}</p>
          <h1>{scrollFilm.title}</h1>
        </div>
        <p className='scroll-crawl'>{scrollFilm.opening_crawl}</p>
        <p className='scroll-release-date'>{scrollFilm.release_date}</p>
      </div>
    </section>
  );
};

const scrollFilm = shape({
  opening_crawl: string,
  title: string,
  release_date: string,
});

Scroll.propTypes = {
  scrollFilm,
};

export default Scroll;
