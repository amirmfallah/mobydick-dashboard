import { inject, InjectFlags, Type } from '@angular/core';

// noinspection JSUnusedGlobalSymbols
/**
 * Use it as a base class for all singleton services to ensure that only one instance of that service exists.
 */
export abstract class SingletonServiceBase {
  protected constructor(derivedType: Type<any>) {
    const parent = inject(derivedType, InjectFlags.SkipSelf + InjectFlags.Optional);

    if (parent) {
      throw new Error(`Attempting to create multiple instances of a singleton service: ${derivedType}`);
    }
  }
}
