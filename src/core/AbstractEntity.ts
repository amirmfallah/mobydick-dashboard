import { Serializable } from './core.interface';

export abstract class AbstractEntity implements Serializable {
  getShortId(uri: string): string {
    return uri.substring(uri.lastIndexOf('/') + 1);
  }

  abstract toDTO(): object;

  toJSON(): string {
    const dto = this.toDTO();
    return JSON.stringify(dto);
  }
}
