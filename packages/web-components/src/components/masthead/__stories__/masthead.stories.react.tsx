/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Provider } from 'react-redux';
import { select } from '@storybook/addon-knobs';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { USER_AUTHENTICATION_STATUS } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import DDSMastheadComposite from '../../../components-react/masthead/masthead-composite';
import DDSMastheadContainer, { store } from '../../../components-react/masthead/masthead-container';
import { mastheadLinks as links, l1Data } from './links';
import { authenticatedProfileItems, unauthenticatedProfileItems } from './profile-items';
// import readme from './README.stories.mdx';

const userStatuses = {
  [`Authenticated (${USER_AUTHENTICATION_STATUS.AUTHENTICATED})`]: USER_AUTHENTICATION_STATUS.AUTHENTICATED,
  [`Unauthenticated (${USER_AUTHENTICATION_STATUS.UNAUTHENTICATED})`]: USER_AUTHENTICATION_STATUS.UNAUTHENTICATED,
};

export const Default = ({ parameters }) => {
  const { brandName, userStatus, navLinks } = parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return useMock ? (
    <DDSMastheadComposite
      authenticatedProfileItems={authenticatedProfileItems}
      brandName={brandName}
      navLinks={navLinks}
      unauthenticatedProfileItems={unauthenticatedProfileItems}
      userStatus={userStatus}
    />
  ) : (
    <DDSMastheadContainer brandName={brandName} userStatus={userStatus} />
  );
};

export const withL1 = ({ parameters }) => {
  const { brandName, userStatus, navLinks } = parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return useMock ? (
    <DDSMastheadComposite
      authenticatedProfileItems={authenticatedProfileItems}
      brandName={brandName}
      l1Data={l1Data}
      navLinks={navLinks}
      unauthenticatedProfileItems={unauthenticatedProfileItems}
      userStatus={userStatus}
    />
  ) : (
    <DDSMastheadContainer brandName={brandName} l1Data={l1Data} userStatus={userStatus} />
  );
};

export default {
  title: 'Components/Masthead',
  parameters: {
    // ...readme.parameters,
    'carbon-theme': { disabled: true },
    decorators: [story => <Provider store={store}>{story()}</Provider>],
    knobs: {
      MastheadComposite: ({ groupId }) => ({
        brandName: textNullable('Brand name (brand-name)', '', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, null, groupId),
        logoHref: textNullable('Logo href (logo-href)', 'https://www.ibm.com', groupId),
      }),
    },
    props: (() => {
      // Lets `<dds-masthead-container>` load the nav links
      const useMock = inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        MastheadComposite: {
          navLinks: !useMock ? undefined : links,
        },
        Other: {
          useMock,
        },
      };
    })(),
  },
};
