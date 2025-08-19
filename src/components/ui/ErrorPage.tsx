

import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Oops! Something went wrong.</h1>
      <p>We're sorry, but an unexpected error occurred.</p>
      <pre>{error?.statusText || error?.message}</pre>
    </div>
  );
};

export default ErrorPage;
