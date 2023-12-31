import React, {PropsWithChildren} from 'react';
import Header from '../Header/Header';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <Header/>
      <div className="container mx-auto my-5">
        {children}
      </div>
    </>
  );
};

export default Layout;