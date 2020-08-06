/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useEffect, ReactNode, FunctionComponent, Validator } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import {
  MastheadLink,
  MastheadMenuItem,
  MastheadL1,
  MastheadL1Link,
  MastheadProfileItem,
  Translation,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import { USER_AUTHENTICATION_STATUS } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSMasthead from './masthead';
// @ts-ignore
import DDSMastheadLogo from './masthead-logo';
// @ts-ignore
import DDSMastheadL1 from './masthead-l1';
// @ts-ignore
import DDSMastheadL1Name from './masthead-l1-name';
// @ts-ignore
import DDSMastheadMenuButton from './masthead-menu-button';
// @ts-ignore
import DDSMastheadGlobalBar from './masthead-global-bar';
// @ts-ignore
import DDSMastheadProfile from './masthead-profile';
// @ts-ignore
import DDSMastheadProfileItem from './masthead-profile-item';
// @ts-ignore
import DDSMegaMenu from './megamenu';
// @ts-ignore
import DDSMegaMenuTopNavMenu from './megamenu-top-nav-menu';
// @ts-ignore
import DDSMegaMenuLeftNavigation from './megamenu-left-navigation';
// @ts-ignore
import DDSMegaMenuRightNavigation, { MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME } from './megamenu-right-navigation';
// @ts-ignore
import DDSMegaMenuCategoryLink from './megamenu-category-link';
// @ts-ignore
import DDSMegaMenuCategoryGroup from './megamenu-category-group';
// @ts-ignore
import DDSMegaMenuOverlay from './megamenu-overlay';
// @ts-ignore
import DDSTopNav from './top-nav';
// @ts-ignore
import DDSTopNavName from './top-nav-name';
// @ts-ignore
import DDSTopNavItem from './top-nav-item';
// @ts-ignore
import DDSTopNavMenu from './top-nav-menu';
// @ts-ignore
import DDSTopNavMenuItem from './top-nav-menu-item';
// @ts-ignore
import DDSLeftNav from './left-nav';
// @ts-ignore
import DDSLeftNavName from './left-nav-name';
// @ts-ignore
import DDSLeftNavItem from './left-nav-item';
// @ts-ignore
import DDSLeftNavMenu from './left-nav-menu';
// @ts-ignore
import DDSLeftNavMenuItem from './left-nav-menu-item';
// @ts-ignore
import DDSLeftNavOverlay from './left-nav-overlay';
// @ts-ignore
import DDSMastheadSearchComposite from './masthead-search-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Rendering target for masthead navigation items.
 */
enum NAV_ITEMS_RENDER_TARGET {
  /**
   * For top navigation.
   */
  TOP_NAV = 'top-nav',

  /**
   * For left navigation.
   */
  LEFT_NAV = 'left-nav',
}

/**
 * A workaround for TS2322 seen when `PropTypes.shape()` contains an optional property
 * that corresponds an optional property in a TS interface.
 *
 * TODO: See if there is a better solution.
 *
 * @param propType A React prop type.
 * @returns The given prop type.
 */
function PropTypesOptional<T>(propType: Validator<T>) {
  return propType as Validator<Exclude<T, null>>;
}

const TopNavMenuAbstracted = ({
  title,
  'data-autoid': autoid,
  children,
}: {
  title?: string;
  'data-autoid'?: string;
  children: ReactNode;
}) => (
  <DDSTopNavMenu menuLabel={title} triggerContent={title} data-autoid={autoid}>
    {children}
  </DDSTopNavMenu>
);

const MegaMenuCategoryGroups = ({ navLinks, startIndex = 0 }: { navLinks: MastheadMenuItem[]; startIndex?: number }) => {
  return (
    <>
      {navLinks.map(({ megapanelContent, title, url }, i) => {
        const autoid = `${ddsPrefix}--masthead__l0-nav-list${i + startIndex}`;
        return (
          <DDSMegaMenuCategoryGroup key={i} data-autoid={autoid} href={url} title={title}>
            {megapanelContent?.quickLinks?.links.map(({ title: categoryGroupItemTitle, url: categoryGroupItemUrl }, j) => (
              <DDSMegaMenuCategoryLink
                key={j}
                data-autoid={`${autoid}-item${j}`}
                title={categoryGroupItemTitle}
                href={categoryGroupItemUrl}
              />
            ))}
          </DDSMegaMenuCategoryGroup>
        );
      })}
    </>
  );
};

const MegaMenu = ({ navLinks }: { navLinks: MastheadMenuItem[] }) => {
  const regularNavLinks = navLinks.filter(({ highlighted, megaPanelViewAll }) => !highlighted && !megaPanelViewAll);
  const highlightedNavLinks = navLinks.filter(({ highlighted }) => highlighted);
  const viewAllNavLink = navLinks.find(({ megaPanelViewAll }) => megaPanelViewAll);
  return (
    <DDSMegaMenu>
      {highlightedNavLinks.length === 0 ? (
        undefined
      ) : (
        <DDSMegaMenuLeftNavigation>
          <MegaMenuCategoryGroups navLinks={highlightedNavLinks} />
        </DDSMegaMenuLeftNavigation>
      )}
      <DDSMegaMenuRightNavigation
        styleScheme={
          highlightedNavLinks.length === 0
            ? MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME.REGULAR
            : MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME.LEFT_SECTION
        }
        viewAllHref={viewAllNavLink?.url}
        viewAllTitle={viewAllNavLink?.title}>
        <MegaMenuCategoryGroups navLinks={regularNavLinks} startIndex={highlightedNavLinks.length} />
      </DDSMegaMenuRightNavigation>
    </DDSMegaMenu>
  );
};

const MobileMegaMenuNavItems = ({ navLinks }: { navLinks: MastheadMenuItem[] }) => {
  return (
    <>
      {navLinks.map(({ megapanelContent, title, url }, i) => {
        const { links: categoryLinks } = megapanelContent?.quickLinks ?? {};
        return categoryLinks ? (
          <DDSLeftNavMenu key={i} title={title} data-autoid={`${ddsPrefix}--masthead__l0-sidenav--nav-${i}`}>
            {categoryLinks.map(({ title: menuItemTitle, url: menuItemUrl }, j) => (
              <DDSLeftNavMenuItem
                key={j}
                href={menuItemUrl}
                title={menuItemTitle}
                data-autoid={`${ddsPrefix}--masthead__l0-sidenav--subnav-col${j}-item${j}`}
              />
            ))}
          </DDSLeftNavMenu>
        ) : (
          <DDSLeftNavMenuItem
            key={i}
            href={url}
            title={title}
            data-autoid={`${ddsPrefix}--masthead__l0-sidenav--subnav-col${i}-item${i}`}
          />
        );
      })}
    </>
  );
};

const NavItems = ({
  navLinks,
  target,
  autoidPrefix = 'l0',
}: {
  navLinks?: MastheadLink[] | MastheadL1Link[];
  target: NAV_ITEMS_RENDER_TARGET;
  autoidPrefix?: string;
}) => {
  if (!navLinks) {
    return undefined;
  }

  const NavItem = target === NAV_ITEMS_RENDER_TARGET.TOP_NAV ? DDSTopNavItem : DDSLeftNavItem;
  const NavMenu = target === NAV_ITEMS_RENDER_TARGET.TOP_NAV ? TopNavMenuAbstracted : DDSLeftNavMenu;
  const NavMenuItem = target === NAV_ITEMS_RENDER_TARGET.TOP_NAV ? DDSTopNavMenuItem : DDSLeftNavMenuItem;
  const autoIdPrefixForTarget = target === NAV_ITEMS_RENDER_TARGET.TOP_NAV ? `${autoidPrefix}-nav` : `${autoidPrefix}-sidenav`;

  return (
    <>
      {(navLinks as (MastheadLink | MastheadL1Link)[])?.map((item, i) => {
        const { menuSections = [], hasMegapanel, title, url } = item as MastheadLink;
        const { menuItems } = item as MastheadL1Link;
        const normalizedMenuItems =
          menuItems ??
          menuSections.reduce(
            (acc, { menuItems: menuItemsInSection }) => acc.concat(menuItemsInSection),
            [] as MastheadMenuItem[]
          );

        if (hasMegapanel && normalizedMenuItems.length > 0) {
          return target === NAV_ITEMS_RENDER_TARGET.TOP_NAV ? (
            <DDSMegaMenuTopNavMenu
              key={i}
              menuLabel={title}
              triggerContent={title}
              data-autoid={`${ddsPrefix}--masthead__${autoIdPrefixForTarget}--nav-${i}`}>
              <MegaMenu navLinks={normalizedMenuItems} />
            </DDSMegaMenuTopNavMenu>
          ) : (
            <DDSLeftNavMenu key={i} title={title} data-autoid={`${ddsPrefix}--masthead__${autoIdPrefixForTarget}--nav-${i}`}>
              <MobileMegaMenuNavItems navLinks={normalizedMenuItems} />
            </DDSLeftNavMenu>
          );
        }

        return normalizedMenuItems.length === 0 ? (
          <NavItem key={i} href={url} title={title} data-autoid={`${ddsPrefix}--masthead__${autoIdPrefixForTarget}--nav-${i}`} />
        ) : (
          <NavMenu key={i} title={title} data-autoid={`${ddsPrefix}--masthead__${autoIdPrefixForTarget}--nav-${i}`}>
            {normalizedMenuItems.map(({ title: menuItemTitle, url: menuItemUrl }, j) => (
              <NavMenuItem
                key={j}
                href={menuItemUrl}
                title={menuItemTitle}
                data-autoid={`${ddsPrefix}--masthead__${autoIdPrefixForTarget}--subnav-col${i}-item${j}`}
              />
            ))}
          </NavMenu>
        );
      })}
    </>
  );
};

export interface DDSMastheadCompositeProps {
  /**
   * `true` to activate the search box.
   */
  activateSearch?: boolean;

  /**
   * The profile items for authenticated state.
   */
  authenticatedProfileItems?: MastheadProfileItem[];

  /**
   * The brand name.
   */
  brandName?: string;

  /**
   * The search results to show in the UI.
   */
  currentSearchResults?: string[];

  /**
   * The `aria-label` attribute for the top-level container.
   */
  mastheadAssistiveText?: string;

  /**
   * The `aria-label` attribute for the menu bar UI.
   */
  menuBarAssistiveText?: string;

  /**
   * The `aria-label` attribute for the header menu button in its active state.
   */
  menuButtonAssistiveTextActive?: string;

  /**
   * The `aria-label` attribute for the header menu button in its active state.
   */
  menuButtonAssistiveTextInactive?: string;

  /**
   * The profile items for unauthenticated state.
   */
  unauthenticatedProfileItems?: MastheadProfileItem[];

  /**
   * The throttle timeout to run query upon user input.
   */
  inputTimeout?: number;

  /**
   * The language used for query.
   */
  language?: string;

  /**
   * The navigation links.
   */
  navLinks?: MastheadLink[];

  /**
   * Data for l1.
   */
  l1Data?: MastheadL1;

  /**
   * `true` to open the search dropdown.
   */
  openSearchDropdown?: boolean;

  /**
   * Value to display when the input has an empty `value`.
   */
  searchPlaceholder?: string;

  /**
   * The user authentication status.
   */
  userStatus?: USER_AUTHENTICATION_STATUS;

  /**
   * The placeholder for `loadSearchResults()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadSearchResults?: (searchQueryString: string) => Promise<string[]>;

  /**
   * The placeholder for `loadTranslation()` Redux action that will be mixed in.
   *
   * @internal
   */
  _loadTranslation?: (language?: string) => Promise<Translation>;

  /**
   * The placeholder for `monitorUserStatus()` Redux action that will be mixed in.
   *
   * @internal
   */
  _monitorUserStatus?: () => void;

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage?: (language: string) => void;
}

/**
 * Component that rendres masthead from links, etc. data.
 */
const DDSMastheadComposite: FunctionComponent<DDSMastheadCompositeProps> = ({
  activateSearch,
  authenticatedProfileItems,
  brandName,
  currentSearchResults,
  mastheadAssistiveText,
  menuBarAssistiveText,
  menuButtonAssistiveTextActive,
  menuButtonAssistiveTextInactive,
  unauthenticatedProfileItems,
  inputTimeout,
  language,
  navLinks,
  l1Data,
  openSearchDropdown,
  searchPlaceholder,
  userStatus,
  _loadSearchResults: loadSearchResults,
  _loadTranslation: loadTranslation,
  _monitorUserStatus: monitorUserStatus,
  _setLanguage: setLanguage,
}) => {
  const authenticated = userStatus === USER_AUTHENTICATION_STATUS.AUTHENTICATED;
  const profileItems = authenticated ? authenticatedProfileItems : unauthenticatedProfileItems;
  const { menuItems: l1MenuItems, title: l1Title, url: l1Url } = l1Data ?? {};

  useEffect(() => {
    monitorUserStatus?.();
  }, [monitorUserStatus]);

  useEffect(() => {
    if (language) {
      setLanguage?.(language);
    }
  }, [language, setLanguage]);

  useEffect(() => {
    loadTranslation?.(language).catch(() => {}); // The error is logged in the Redux store
  }, [language, loadTranslation]);

  return (
    <>
      <DDSLeftNavOverlay />
      <DDSLeftNav>
        {!brandName ? undefined : <DDSLeftNavName>{brandName}</DDSLeftNavName>}
        {NavItems({ navLinks, target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV })}
        {NavItems({ navLinks: l1MenuItems, target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV, autoidPrefix: 'l1' })}
      </DDSLeftNav>
      <DDSMasthead aria-label={mastheadAssistiveText}>
        <DDSMastheadMenuButton
          buttonLabelActive={menuButtonAssistiveTextActive}
          buttonLabelInactive={menuButtonAssistiveTextInactive}
        />
        <DDSMastheadLogo />
        {!brandName ? undefined : <DDSTopNavName>{brandName}</DDSTopNavName>}
        <DDSTopNav hideDivider={Boolean(l1MenuItems)} menuBarLabel={menuBarAssistiveText}>
          {NavItems({ navLinks, target: NAV_ITEMS_RENDER_TARGET.TOP_NAV })}
        </DDSTopNav>
        <DDSMastheadSearchComposite
          active={activateSearch}
          inputTimeout={inputTimeout}
          language={language}
          open={openSearchDropdown}
          placeholder={searchPlaceholder}
          currentSearchResults={currentSearchResults}
          _loadSearchResults={loadSearchResults}
        />
        <DDSMastheadGlobalBar>
          <DDSMastheadProfile authenticated={authenticated}>
            {profileItems?.map(({ title, url }, i) => (
              <DDSMastheadProfileItem key={i} href={url}>
                {title}
              </DDSMastheadProfileItem>
            ))}
          </DDSMastheadProfile>
        </DDSMastheadGlobalBar>
        {!l1MenuItems ? (
          undefined
        ) : (
          <DDSMastheadL1 slot="masthead-l1">
            {!l1Title ? undefined : <DDSMastheadL1Name title={l1Title} url={l1Url} />}
            <DDSTopNav hideDivider>
              {NavItems({ navLinks: l1MenuItems, target: NAV_ITEMS_RENDER_TARGET.TOP_NAV, autoidPrefix: 'l1' })}
            </DDSTopNav>
          </DDSMastheadL1>
        )}
        <DDSMegaMenuOverlay />
      </DDSMasthead>
    </>
  );
};

DDSMastheadComposite.propTypes = {
  /**
   * `true` to activate the search box.
   */
  activateSearch: PropTypes.bool,

  /**
   * The profile items for authenticated state.
   */
  authenticatedProfileItems: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The title text.
       */
      title: PropTypes.string.isRequired,

      /**
       * The link URL.
       */
      url: PropTypes.string.isRequired,
    }).isRequired
  ),

  /**
   * The brand name.
   */
  brandName: PropTypes.string,

  /**
   * The search results to show in the UI.
   */
  currentSearchResults: PropTypes.arrayOf(PropTypes.string.isRequired),

  /**
   * The `aria-label` attribute for the top-level container.
   */
  mastheadAssistiveText: PropTypes.string,

  /**
   * The `aria-label` attribute for the menu bar UI.
   */
  menuBarAssistiveText: PropTypes.string,

  /**
   * The `aria-label` attribute for the header menu button in its active state.
   */
  menuButtonAssistiveTextActive: PropTypes.string,

  /**
   * The `aria-label` attribute for the header menu button in its active state.
   */
  menuButtonAssistiveTextInactive: PropTypes.string,

  /**
   * The profile items for unauthenticated state.
   */
  unauthenticatedProfileItems: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The title text.
       */
      title: PropTypes.string.isRequired,

      /**
       * The link URL.
       */
      url: PropTypes.string.isRequired,
    }).isRequired
  ),

  /**
   * The throttle timeout to run query upon user input.
   */
  inputTimeout: PropTypes.number,

  /**
   * The language used for query.
   */
  language: PropTypes.string,

  /**
   * The navigation links.
   */
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      titleEnglish: PropTypesOptional(PropTypes.string),
      url: PropTypesOptional(PropTypes.string),
      hasMenu: PropTypesOptional(PropTypes.bool),
      hasMegapanel: PropTypesOptional(PropTypes.bool),
      menuSections: PropTypesOptional(
        PropTypes.arrayOf(
          PropTypes.shape({
            heading: PropTypesOptional(PropTypes.string),
            menuItems: PropTypes.arrayOf(
              PropTypes.shape({
                title: PropTypes.string.isRequired,
                titleEnglish: PropTypesOptional(PropTypes.string),
                url: PropTypesOptional(PropTypes.string),
                highlighted: PropTypesOptional(PropTypes.bool),
                megaPanelViewAll: PropTypesOptional(PropTypes.bool),
                megapanelContent: PropTypesOptional(
                  PropTypes.shape({
                    headingTitle: PropTypesOptional(PropTypes.string),
                    headingUrl: PropTypesOptional(PropTypes.string),
                    description: PropTypesOptional(PropTypes.string),
                    quickLinks: PropTypes.shape({
                      title: PropTypes.string.isRequired,
                      links: PropTypesOptional(
                        PropTypes.arrayOf(
                          PropTypes.shape({
                            title: PropTypes.string.isRequired,
                            titleEnglish: PropTypesOptional(PropTypes.string),
                            url: PropTypesOptional(PropTypes.string),
                          }).isRequired
                        )
                      ),
                    }).isRequired,
                    feature: PropTypes.shape({
                      heading: PropTypesOptional(PropTypes.string),
                      imageUrl: PropTypesOptional(PropTypes.string),
                      linkTitle: PropTypesOptional(PropTypes.string),
                      linkUrl: PropTypesOptional(PropTypes.string),
                    }).isRequired,
                  })
                ),
              }).isRequired
            ).isRequired,
          }).isRequired
        )
      ),
    }).isRequired
  ),

  /**
   * Data for l1.
   */
  l1Data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypesOptional(PropTypes.string),
    menuItems: PropTypesOptional(
      PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          url: PropTypesOptional(PropTypes.string),
          menuItems: PropTypesOptional(
            PropTypes.arrayOf(
              PropTypes.shape({
                title: PropTypes.string.isRequired,
                url: PropTypesOptional(PropTypes.string),
              }).isRequired
            )
          ),
        }).isRequired
      )
    ),
  }),

  /**
   * `true` to open the search dropdown.
   */
  openSearchDropdown: PropTypes.bool,

  /**
   * Value to display when the input has an empty `value`.
   */
  searchPlaceholder: PropTypes.string,

  /**
   * The user authentication status.
   */
  userStatus: PropTypes.oneOf([USER_AUTHENTICATION_STATUS.AUTHENTICATED, USER_AUTHENTICATION_STATUS.UNAUTHENTICATED]),

  /**
   * The placeholder for `loadSearchResults()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadSearchResults: PropTypes.func,

  /**
   * The placeholder for `loadTranslation()` Redux action that will be mixed in.
   *
   * @internal
   */
  _loadTranslation: PropTypes.func,

  /**
   * The placeholder for `monitorUserStatus()` Redux action that will be mixed in.
   *
   * @internal
   */
  _monitorUserStatus: PropTypes.func,

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage: PropTypes.func,
};

DDSMastheadComposite.defaultProps = {
  currentSearchResults: [] as string[],
  inputTimeout: 200,
};

export default DDSMastheadComposite;
