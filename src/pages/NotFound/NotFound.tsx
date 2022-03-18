import { Link } from 'react-router-dom';
import Page from '../Page/Page';

const NotFound = () => {
  return (
    <Page title="Not Found">
      <div className="text-center">
        <h2>We cannot find that page</h2>
        <p className="lead text-muted">
          You can always visit a <Link to="/">homepage</Link>
        </p>
      </div>
    </Page>
  );
};

export default NotFound;
