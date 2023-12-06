import React from 'react';

// This variable will be true once the server-side hydration is completed.
let hydrationCompleted = false;

type Hook = (queryInput?: string, options?: any) => any;

const useResponsive: Hook = (queryInput, options = {}) => {
  let query = '';
  if (queryInput) {
    query = queryInput.replace('@media ', '');
  }

  const {
    defaultMatches = false,
    noSsr = false,
    ssrMatchMedia = null,
  } = options;

  const [matches, setMatches] = React.useState(() => {
    let customBreakpoint = false;
    if (hydrationCompleted || noSsr) {
      customBreakpoint = window.matchMedia(query).matches;
    }

    if (ssrMatchMedia) {
      customBreakpoint = ssrMatchMedia(query).matches;
    }

    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return {
      isMobileXS: window.matchMedia('(max-width:374px)').matches,
      isMobileSM: window.matchMedia('(max-width:413px)').matches,
      isMobile: window.matchMedia('(max-width:767px)').matches,
      isTabletSM: window.matchMedia('(max-width:980px)').matches,
      isTablet: window.matchMedia('(max-width:1024px)').matches,
      isDesktopMM: window.matchMedia('(max-width:1280px)').matches,
      isDesktopGG: window.matchMedia('(max-width:1366px)').matches,
      isDesktopLG: window.matchMedia('(max-width:1440px)').matches,
      isDesktopXL: window.matchMedia('(max-width:1920px)').matches,
      customBreakpoint,
    };
  });

  React.useEffect(() => {
    hydrationCompleted = true;

    const queryList = [
      {
        name: 'isMobileXS',
        query: window.matchMedia('(max-width:374px)'),
      },
      {
        name: 'isMobileSM',
        query: window.matchMedia('(max-width:413px)'),
      },
      {
        name: 'isMobile',
        query: window.matchMedia('(max-width:767px)'),
      },
      {
        name: 'isTabletSM',
        query: window.matchMedia('(max-width:980px)'),
      },
      {
        name: 'isTablet',
        query: window.matchMedia('(max-width:1024px)'),
      },
      {
        name: 'isDesktopMM',
        query: window.matchMedia('(max-width:1280px)'),
      },
      {
        name: 'isDesktopGG',
        query: window.matchMedia('(max-width:1366px)'),
      },
      {
        name: 'isDesktopLG',
        query: window.matchMedia('(max-width:1440px)'),
      },
      {
        name: 'isDesktopXL',
        query: window.matchMedia('(max-width:1920px)'),
      },
      {
        name: 'customBreakpoint',
        query: window.matchMedia(query),
      },
    ];

    function handleMatchesChange(event: { matches: boolean; }) {
      setMatches({
        isMobileXS: event.matches,
        isMobileSM: window.matchMedia('(max-width:413px)').matches,
        isMobile: window.matchMedia('(max-width:767px)').matches,
        isTabletSM: window.matchMedia('(max-width:980px)').matches,
        isTablet: window.matchMedia('(max-width:1024px)').matches,
        isDesktopMM: window.matchMedia('(max-width:1280px)').matches,
        isDesktopGG: window.matchMedia('(max-width:1366px)').matches,
        isDesktopLG: window.matchMedia('(max-width:1440px)').matches,
        isDesktopXL: window.matchMedia('(max-width:1920px)').matches,
        customBreakpoint: window.matchMedia(query).matches,
      });
    }

    queryList.map(queryItem => {
      // Listen to changes on the breakpoints to provide updates to the state
      queryItem.query.addListener(handleMatchesChange);
    });

    return () => {
      queryList.map(queryItem => {
        queryItem.query.removeListener(handleMatchesChange);
      });
    };
  }, [query]);

  return matches;
};

export function testReset() {
  hydrationCompleted = false;
}

export default useResponsive;
