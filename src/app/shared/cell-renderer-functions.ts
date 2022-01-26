import { stringifyDate } from './app-functions';

export function dateCellRenderer(dt: Date) {
    return stringifyDate(dt);
}
