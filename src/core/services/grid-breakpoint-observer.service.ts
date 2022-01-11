import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SingletonServiceBase } from './singleton-service-base';

interface GridBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

// Note: Extracted $grid-breakpoints value from node_modules/bootstrap/scss/_variables.scss
const GRID_BREAKPOINTS: GridBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const gbSorted = Object.entries(GRID_BREAKPOINTS).map(entry => ({name: entry[0], value: entry[1]}));
gbSorted.sort((a, b) => a.value - b.value);

const gbPairsSorted = gbSorted.reduce((acc, cur, index, array) => {
  const next = array[index + 1];
  acc.push({from: cur, to: next});
  return acc;
}, []);

const gbPairsMap = gbPairsSorted.reduce((acc, item) => {
  acc[item.from.name] = item;
  return acc;
}, {});


/**
 * Use:
 * <pre>
 *   this.gbMdOnly$ = this.gridBreakpointObserverService.only('md').pipe(takeUntil(this.destroy$));
 *   ...
 *   (gbMdOnly$ | async)
 * </pre>
 */
@Injectable({
  providedIn: 'root'
})
export class GridBreakpointObserverService extends SingletonServiceBase {

  constructor(private breakpointObserver: BreakpointObserver) {
    super(GridBreakpointObserverService);
  }

  /**
   * Media of at least the minimum breakpoint width. No query for the smallest breakpoint.
   * Makes the @content apply to the given breakpoint and wider.
   *
   * Note: Works like bootstrap SCSS @mixin media-breakpoint-up($name, $breakpoints: $grid-breakpoints)
   */
  up(name: keyof GridBreakpoints): Observable<boolean> {
    const mediaQueryArray = [
      `(min-width: ${GRID_BREAKPOINTS[name]}px)`,
    ];

    const mediaQuery = mediaQueryArray.join(' and ');
    return this.breakpointObserver
      .observe(mediaQuery)
      .pipe(map(state => state.matches));
  }


  /**
   * Media of at most the maximum breakpoint width. No query for the largest breakpoint.
   * Makes the @content apply to the given breakpoint and narrower.
   *
   * Note: Works like bootstrap SCSS @mixin media-breakpoint-down($name, $breakpoints: $grid-breakpoints)
   */
  down(name: keyof GridBreakpoints): Observable<boolean> {
    const item = gbPairsMap[name];
    if (item.to) {
      const mediaQueryArray = [
        `(max-width: ${item.to.value - .02}px)`,
      ];

      const mediaQuery = mediaQueryArray.join(' and ');
      return this.breakpointObserver
        .observe(mediaQuery)
        .pipe(map(state => state.matches));
    } else {
      // if no max-width value - infinity
      return of(true);
    }

  }

  /**
   * Media between the breakpoint's minimum and maximum widths.
   * No minimum for the smallest breakpoint, and no maximum for the largest one.
   * Makes the @content apply only to the given breakpoint, not viewports any wider or narrower.
   *
   * Note: Works like bootstrap SCSS @mixin media-breakpoint-only($name, $breakpoints: $grid-breakpoints)
   */
  only(name: keyof GridBreakpoints): Observable<boolean> {
    const item = gbPairsMap[name];

    const mediaQueryArray = [
      `(min-width: ${item.from.value}px)`,
    ];

    if (item.to) {
      mediaQueryArray.push(`(max-width: ${item.to.value - .02}px)`);
    }

    const mediaQuery = mediaQueryArray.join(' and ');
    return this.breakpointObserver
      .observe(mediaQuery)
      .pipe(map(state => state.matches));

  }

  between(from: keyof GridBreakpoints, to: keyof GridBreakpoints): Observable<boolean> {
    const itemFrom = gbPairsMap[from];
    const itemTo = gbPairsMap[to];

    const mediaQueryArray = [
      `(min-width: ${itemFrom.from.value}px)`,
    ];

    if (itemTo.from) {
      mediaQueryArray.push(`(max-width: ${itemTo.from.value - .02}px)`);
    }

    const mediaQuery = mediaQueryArray.join(' and ');
    return this.breakpointObserver
      .observe(mediaQuery)
      .pipe(map(state => state.matches));
  }
}
