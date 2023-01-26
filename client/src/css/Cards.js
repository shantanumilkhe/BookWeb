import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Services</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/47.jpg'
              
              label='book'
              path='/book'
            />
            <CardItem
              src='images/47.jpg'
              
              label='GR'
              path='/services'
            />
            <CardItem
              src='images/47.jpg'
             
              label='Paid Consultation'
              path='/products'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/47.jpg'
              
              label='book'
              path='/book'
            />
            <CardItem
              src='images/47.jpg'
              
              label='GR'
              path='/services'
            />
            <CardItem
              src='images/47.jpg'
             
              label='Paid Consultation'
              path='/products'
            />
          </ul>
          
        </div>
      </div>
    </div>
  );
}

export default Cards;
