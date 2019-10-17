import React, { Fragment, ReactElement } from 'react';
import Divider from '@material-ui/core/Divider';
import styled from 'react-emotion';

import Package from '../Package';
import Help from '../Help';
import { formatLicense } from '../../utils/package';
import { PackageInterface } from '../Package/Package';

import * as classes from './styles';

interface Props {
  packages: PackageInterface[];
}

const StyledDiv = styled('div')({
  width: '100%',
});

export default class PackageList extends React.Component<Props, {}> {
  public render(): ReactElement<HTMLElement> {
    return (
      <StyledDiv>
        <div className={classes.pkgContainer}>{this.hasPackages() ? this.renderPackages() : <Help />}</div>
      </StyledDiv>
    );
  }

  private hasPackages(): boolean {
    const { packages } = this.props;
    return packages.length > 0;
  }

  private renderPackages = () => {
    return <>{this.renderList()}</>;
  };

  private renderList = () => {
    const { packages } = this.props;
    return packages.map((pkg, i) => {
      const { name, version, description, time, keywords, dist, homepage, bugs, author } = pkg;
      // TODO: move format license to API side.
      const license = formatLicense(pkg.license);
      return (
        <Fragment key={i}>
          {i !== 0 && <Divider />}
          <Package {...{ name, dist, version, author, description, license, time, keywords, homepage, bugs }} />
        </Fragment>
      );
    });
  };
}
