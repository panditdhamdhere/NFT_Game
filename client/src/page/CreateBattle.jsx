import React from 'react';
import { PageHOC } from '../components';

const CreateBattle = () => {
  return (
    <div>
    <h1 className='text-white text-xl'>Hello From CreateBattle</h1>
    </div>
  )
};

export default PageHOC(
  CreateBattle,
  <>Create <br /> a new battle</>,
  <>Create a new battle and wait for others to join you</>,
);