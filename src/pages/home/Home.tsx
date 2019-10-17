import React from 'react';

import PackageList from '../../components/PackageList';
import { PackageInterface } from '../../components/Package/Package';

interface Props {
  isUserLoggedIn: boolean;
  packages: PackageInterface[];
}

const Home: React.FC<Props> = ({ packages }) => <PackageList packages={packages} />;

export default Home;
