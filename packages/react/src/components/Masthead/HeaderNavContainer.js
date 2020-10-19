/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import CaretLeft20 from '@carbon/icons-react/es/caret--left/20';
import CaretRight20 from '@carbon/icons-react/es/caret--right/20';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * Header nav container component.
 */
const HeaderNavContainer = ({ children }) => {
  // const headerNavContainerRef = useRef(null);
  // const [resizeObserver, setResizeObserver] = useState(null);
  // const [showLeftCaret, setShowLeftCaret] = useState(false);
  // const [showRightCaret, setShowRightCaret] = useState(false);
  // const [containerWidth, setContainerWidth] = useState(0);
  // const [totalNavWidth, setTotalNavWidth] = useState(0);
  //
  // const paginateLeft = useCallback(() => {
  //   headerNavContainerRef.current.scrollLeft -= containerWidth;
  //   setShowRightCaret(true);
  //   // 40 accounts for caret size
  //   if (headerNavContainerRef.current.scrollLeft <= 40) {
  //     setShowLeftCaret(false);
  //     headerNavContainerRef.current.scrollLeft = 0;
  //   }
  // }, [containerWidth]);
  //
  // const paginateRight = useCallback(() => {
  //   headerNavContainerRef.current.scrollLeft += containerWidth;
  //   setShowLeftCaret(true);
  //   // 80 accounts for caret sizes
  //   if (
  //     headerNavContainerRef.current.scrollLeft + containerWidth >=
  //     totalNavWidth - 80
  //   ) {
  //     setShowRightCaret(false);
  //     headerNavContainerRef.current.scrollLeft += 80;
  //   }
  // }, [containerWidth, totalNavWidth]);
  //
  // useEffect(() => {
  //   if (window.ResizeObserver) {
  //     setResizeObserver(
  //       new ResizeObserver(() => {
  //         setContainerWidth(calculateTotalWidth(['bx--header__nav-container']));
  //         setTotalNavWidth(calculateTotalWidth(['bx--header__nav']));
  //       })
  //     );
  //   }
  // }, []);
  //
  // useEffect(() => {
  //   if (totalNavWidth > containerWidth) {
  //     // 80 accounts for caret sizes
  //     if (
  //       headerNavContainerRef.current.scrollLeft === 0 ||
  //       headerNavContainerRef.current.scrollLeft + containerWidth <
  //         totalNavWidth - 80
  //     ) {
  //       setShowRightCaret(true);
  //     }
  //     if (headerNavContainerRef.current.scrollLeft > 0) {
  //       setShowLeftCaret(true);
  //     }
  //   } else {
  //     setShowLeftCaret(false);
  //     setShowRightCaret(false);
  //   }
  // }, [containerWidth, totalNavWidth]);
  //
  // useEffect(() => {
  //   const { current: headerNavContainerNode } = headerNavContainerRef;
  //   if (resizeObserver) {
  //     resizeObserver.observe(headerNavContainerNode);
  //   }
  //
  //   return () => {
  //     if (resizeObserver) {
  //       resizeObserver.disconnect();
  //     }
  //   };
  // }, [resizeObserver]);

  const headerNavContainerRef = useRef(null);
  const [io, setIO] = useState(null);
  const [showLeftCaret, setShowLeftCaret] = useState(false);
  const [showRightCaret, setShowRightCaret] = useState(false);

  const paginateLeft = useCallback(() => {
    headerNavContainerRef.current.scrollLeft = Math.max(
      headerNavContainerRef.current.scrollLeft -
        headerNavContainerRef.current.offsetWidth,
      0
    );
  }, []);

  const paginateRight = useCallback(() => {
    headerNavContainerRef.current.scrollLeft = Math.min(
      headerNavContainerRef.current.scrollLeft +
        headerNavContainerRef.current.offsetWidth,
      document.querySelector('.content').offsetWidth -
        headerNavContainerRef.current.offsetWidth
    );
  }, []);

  useEffect(() => {
    if (io) {
      io.observe(document.querySelector('.sub-content-left'));
      io.observe(document.querySelector('.sub-content-right'));
    }

    return () => {
      if (io) {
        io.disconnect();
      }
    };
  }, [io]);

  useEffect(() => {
    const { current: headerNavContainerNode } = headerNavContainerRef;
    setIO(
      new IntersectionObserver(
        records => {
          records.forEach(record => {
            console.log('Record:', record.target.className, record.isIntersecting);
            if (record.target.classList.contains('sub-content-left')) {
              setShowLeftCaret(!record.isIntersecting);
              // document.querySelector('.bx--header__nav-caret-left').disabled = record.isIntersecting;
            }
            if (record.target.classList.contains('sub-content-right')) {
              // document.querySelector('.bx--header__nav-caret-right').disabled = record.isIntersecting;
              setShowRightCaret(!record.isIntersecting);
            }
          });
        },
        {
          root: headerNavContainerNode,
          threshold: 1,
        }
      )
    );
  }, []);

  return (
    <>
      <div className={'container'} ref={headerNavContainerRef}>
        <button
          className={`${prefix}--header__nav-caret-left`}
          aria-label="Masthead left caret"
          hidden={!showLeftCaret}
          onClick={paginateLeft}>
          <CaretLeft20 />
        </button>
        <div
          // className={`${prefix}--header__nav-container`}
          className="content">
          <div className="sub-content-left"></div>
          <div className="sub-content-right"></div>
          {children}
        </div>
        <button
          className={`${prefix}--header__nav-caret-right`}
          aria-label="Masthead right caret"
          hidden={!showRightCaret}
          onClick={paginateRight}>
          <CaretRight20 />
        </button>
      </div>
    </>
  );
};

HeaderNavContainer.propTypes = {
  /**
   * Container for other components.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default HeaderNavContainer;
