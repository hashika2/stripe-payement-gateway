import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Cancel = () => {
  const [session, setSession] = useState(null);
  const [searchParams] = useSearchParams();

  return (
    <div>
      <h1 style={{color:'Red'}}>Payment Failed</h1>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  );
};

export default Cancel;
