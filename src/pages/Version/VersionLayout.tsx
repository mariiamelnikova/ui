import React from 'react';
import Grid from '@material-ui/core/Grid';

import DetailContainer from '../../components/DetailContainer';
import DetailSidebar from '../../components/DetailSidebar';

const VersionLayout: React.FC = () => {
  return (
    <Grid className={'container content'} container={true} data-testid="version-layout" spacing={0}>
      <Grid item={true} md={8} xs={12}>
        <DetailContainer />
      </Grid>
      <Grid item={true} md={4} xs={12}>
        <DetailSidebar />
      </Grid>
    </Grid>
  );
};

export default VersionLayout;
