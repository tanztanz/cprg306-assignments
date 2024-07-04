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
      <p>
      <Link href="week-4">Week 4</Link>  
      </p>  
      <p>
      <Link href="week-5">Week 5</Link>  
      </p>
      <p>
      <Link href="week-6">Week 6</Link>  
      </p>
    </div>
  );
};

export default HomePage;
