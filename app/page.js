import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>
      <p>
        <Link href="week-2">Week 2</Link>
      </p>  
      <p>
      <Link href="week-3">Week 3</Link>  
      </p>  
      
    </div>
  );
};

export default HomePage;
