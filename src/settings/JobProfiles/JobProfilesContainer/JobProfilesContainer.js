import React from 'react';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';
import {
  match as matchShape,
  history as historyShape,
  location as locationShape,
} from 'react-router-prop-types';

import { Route } from '@folio/stripes/core';
import { NoValue } from '@folio/stripes/components';
import {
  JobProfiles,
  getJobProfilesColumnProperties,
  DEFAULT_JOB_PROFILES_COLUMNS,
  getJobProfilesItemFormatter,
} from '@folio/stripes-data-transfer-components';

import { NewJobProfileRoute } from '../NewJobProfileRoute';
import tempData from './tempData';

const customProperties = getJobProfilesColumnProperties({
  columnWidths: { protocol: '70px' },
  columnMapping: { protocol: <FormattedMessage id="ui-data-export.protocol" /> },
  visibleColumns: [
    DEFAULT_JOB_PROFILES_COLUMNS.NAME,
    'protocol',
    DEFAULT_JOB_PROFILES_COLUMNS.UPDATED,
    DEFAULT_JOB_PROFILES_COLUMNS.UPDATED_BY,
  ],
});

const JobProfilesContainer = ({
  history,
  match,
  location,
}) => {
  return (
    <>
      <JobProfiles
        // TODO: temp solution to simulate mutators and resources that should be removed after integration with backend
        parentResources={{
          query: {
            sort: new URLSearchParams(window.location.search).get('sort') || '',
            query: new URLSearchParams(window.location.search).get('query') || '',
          },
          jobProfiles: {
            records: tempData.profiles,
            hasLoaded: true,
            isPending: false,
            other: { totalRecords: 4 },
          },
        }}
        parentMutator={{
          resultCount: { replace: noop },
          resultOffset: { replace: noop },
        }}
        formatter={getJobProfilesItemFormatter({ protocol: () => <NoValue /> })}
        {...customProperties}
      />
      <Route
        path={`${match.path}/create`}
        render={() => (
          <NewJobProfileRoute
            onSubmit={noop}
            onCancel={() => history.push(`${match.path}${location.search}`)}
          />
        )}
      />
    </>
  );
};

JobProfilesContainer.propTypes = {
  match: matchShape.isRequired,
  history: historyShape.isRequired,
  location: locationShape.isRequired,
};

export default JobProfilesContainer;
