import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>services</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/2.png'
              text=''
              label='Book'
              path='/book'
            />
            <CardItem
              src='images/1.png'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='GR'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/3.png'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Experience Football on Top of the Himilayan Mountains'
              label='Adventure'
              path='/products'
            />
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
