import {Route, Routes} from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import {HOME_PAGE} from '../../constansts/routes';
import HomePage from '../HomePage/HomePage';
import Layout from '../../components/Layout/Layout';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={HOME_PAGE} element={<HomePage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Layout>
  );
};

export default App;