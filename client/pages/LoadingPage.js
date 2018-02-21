import React from 'react';
import FontAwesome from 'react-fontawesome';

const LoadingPage = () => (
  <div className="loader">
   <FontAwesome
        className='spinner'
        name='spinner'
        size='5x'
        spin
        // style={{ color: 'red' }}
      />

  </div>
);

export default LoadingPage;