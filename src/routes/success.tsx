import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Success = () => {
  const [session, setSession] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch(`/checkout-session?sessionId=${sessionId}`);
      const data = await res.json();
      setSession(data);
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  return (
    <div>
      <h1 style={{color:'green'}}>Payment Success</h1>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  );
};

export default Success;
