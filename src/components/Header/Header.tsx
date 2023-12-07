import {Link} from 'react-router-dom';
import {HOME_PAGE} from '../../constansts/routes';

const Header = () => {
  return (
    <div className="bg-emerald-600">
      <div className="container mx-auto py-5">
        <div className="text-center">
          <Link to={HOME_PAGE}>
            <h1 className="font-bold text-3xl text-white">Calomate Tracker</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;