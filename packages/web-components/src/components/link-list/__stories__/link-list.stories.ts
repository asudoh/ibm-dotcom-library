/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_TYPE } from '../../cta/shared-enums';
import '../link-list';
import '../link-list-item';
import '../link-list-item-card';
import readme from './README.stories.mdx';

const hrefsForType = {
  [CTA_TYPE.REGULAR]: 'https://www.example.com',
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.JUMP]: '#example',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]: 'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '0_uka1msg4',
};

const knobNamesForType = {
  [CTA_TYPE.REGULAR]: 'Content link href (href)',
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.JUMP]: 'Anchor href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
};

const footerKnobNamesForType = {
  [CTA_TYPE.REGULAR]: 'Content link href (href)',
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.JUMP]: 'Anchor href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
};

const types = {
  'Regular type': null,
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
  [`Download (${CTA_TYPE.DOWNLOAD})`]: CTA_TYPE.DOWNLOAD,
  [`Video (${CTA_TYPE.VIDEO})`]: CTA_TYPE.VIDEO,
};

function getLinkListItemKnobs({ groupId }) {
  const ctaType = select('CTA type (cta-type)', types, null, groupId);
  const download =
    ctaType !== CTA_TYPE.DOWNLOAD ? undefined : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
  return {
    ctaType,
    download,
    href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
  };
}

export const Default = ({ parameters }) => {
  const { ctaType, download, href } = parameters?.props?.LinkListItemCard ?? {};
  const { download: footerDownload, href: footerHref } = parameters?.props?.CardCTAFooter ?? {};
  return html`
    <dds-link-list type="default">
      <span slot="heading">Tutorial</span>
      <dds-link-list-item-card cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
        ${ctaType === CTA_TYPE.VIDEO ? undefined : 'Learn more'}
        <dds-card-cta-footer
          cta-type="${ifNonNull(ctaType)}"
          download="${ifNonNull(footerDownload)}"
          href="${ifNonNull(footerHref)}"
        >
        </dds-card-cta-footer>
      </dds-link-list-item-card>
      <dds-link-list-item-card cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
        ${ctaType === CTA_TYPE.VIDEO ? undefined : 'Containerization A Complete Guide'}
        <dds-card-cta-footer
          cta-type="${ifNonNull(ctaType)}"
          download="${ifNonNull(footerDownload)}"
          href="${ifNonNull(footerHref)}"
        >
        </dds-card-cta-footer>
      </dds-link-list-item-card>
    </dds-link-list>
  `;
};

Default.story = {
  parameters: {
    colLgClass: 'bx--col-lg-3',
    knobs: {
      LinkListItemCard: getLinkListItemKnobs,
      CardCTAFooter: ({ groupId }) => {
        const { ctaType } = getLinkListItemKnobs({ groupId });
        return {
          href: textNullable(
            footerKnobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR],
            groupId
          ),
          download:
            ctaType !== CTA_TYPE.DOWNLOAD
              ? undefined
              : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId),
        };
      },
    },
  },
};

export const Horizontal = ({ parameters }) => {
  const { ctaType, download, href } = parameters?.props?.LinkListItem ?? {};
  return html`
    <dds-link-list type="horizontal">
      <span slot="heading">Tutorial</span>
      <dds-link-list-item cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
        ${ctaType === CTA_TYPE.VIDEO ? undefined : 'Learn more'}
      </dds-link-list-item>
      <dds-link-list-item cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
        ${ctaType === CTA_TYPE.VIDEO ? undefined : 'Containerization A Complete Guide'}
      </dds-link-list-item>
    </dds-link-list>
  `;
};

Horizontal.story = {
  parameters: {
    colLgClass: 'bx--col-lg-10',
    knobs: {
      LinkListItem: getLinkListItemKnobs,
    },
  },
};

export const Vertical = ({ parameters }) => {
  const { ctaType, download, href } = parameters?.props?.LinkListItem ?? {};
  return html`
    <dds-link-list type="vertical">
      <span slot="heading">Tutorial</span>
      <dds-link-list-item cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
        ${ctaType === CTA_TYPE.VIDEO ? undefined : 'Learn more'}
      </dds-link-list-item>
      <dds-link-list-item cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
        ${ctaType === CTA_TYPE.VIDEO ? undefined : 'Containerization A Complete Guide'}
      </dds-link-list-item>
    </dds-link-list>
  `;
};

Vertical.story = {
  parameters: {
    colLgClass: 'bx--col-lg-4',
    knobs: {
      LinkListItem: getLinkListItemKnobs,
    },
  },
};

export const VerticalWithCards = ({ parameters }) => {
  const { ctaType, download, href } = parameters?.props?.LinkListItem ?? {};
  const { download: footerDownload, href: footerHref } = parameters?.props?.CardCTAFooter ?? {};
  return html`
    <dds-link-list type="vertical">
      <span slot="heading">Tutorial</span>
      <dds-link-list-item cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
        ${ctaType === CTA_TYPE.VIDEO ? undefined : 'Learn more'}
      </dds-link-list-item>
      <dds-link-list-item cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
        ${ctaType === CTA_TYPE.VIDEO ? undefined : 'Containerization A Complete Guide'}
      </dds-link-list-item>
    </dds-link-list>
    <dds-link-list type="default">
      <span slot="heading">Tutorial</span>
      <dds-link-list-item-card cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
        ${ctaType === CTA_TYPE.VIDEO ? undefined : 'Learn more'}
        <dds-card-cta-footer
          cta-type="${ifNonNull(ctaType)}"
          download="${ifNonNull(footerDownload)}"
          href="${ifNonNull(footerHref)}"
        >
        </dds-card-cta-footer>
      </dds-link-list-item-card>
      <dds-link-list-item-card cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
        ${ctaType === CTA_TYPE.VIDEO ? undefined : 'Containerization A Complete Guide'}
        <dds-card-cta-footer
          cta-type="${ifNonNull(ctaType)}"
          download="${ifNonNull(footerDownload)}"
          href="${ifNonNull(footerHref)}"
        >
        </dds-card-cta-footer>
      </dds-link-list-item-card>
    </dds-link-list>
  `;
};

VerticalWithCards.story = {
  parameters: {
    colLgClass: 'bx--col-lg-4',
    knobs: {
      LinkListItem: getLinkListItemKnobs,
      CardCTAFooter: Default.story.parameters.knobs.CardCTAFooter,
    },
  },
};

export const EndOfSection = () => html`
  <dds-link-list type="end">
    <span slot="heading">Tutorial</span>
    <dds-link-list-item>
      Learn more ${ArrowRight20({ slot: 'icon' })}
    </dds-link-list-item>
    <dds-link-list-item>
      Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
    </dds-link-list-item>
    <dds-link-list-item>
      Microservices and containers ${ArrowRight20({ slot: 'icon' })}
    </dds-link-list-item>
  </dds-link-list>
`;

EndOfSection.story = {
  parameters: {
    colLgClass: 'bx--col-lg-6',
    knobs: {
      LinkListItem: getLinkListItemKnobs,
    },
  },
};

export default {
  title: 'Components/Link List',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
  },
  decorators: [
    (story, { parameters }) => {
      const { colLgClass } = parameters;
      return html`
        <div class="bx--grid dds-ce-demo-devenv--grid--card">
          <div class="bx--row">
            <div class="bx--col-sm-4 ${colLgClass} bx--offset-lg-4">
              ${story()}
            </div>
          </div>
        </div>
      `;
    },
  ],
};
