/**
 * ☔🕊️ @arisu/sdk - JavaScript client library for accessing Arisu's API, made in TypeScript
 * Copyright (c) 2021 Noelware
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export type { ClientOptions } from './Client';
export { UserRepository } from './repositories/UserRepository';
export { Client } from './Client';

/**
 * Returns the version for **`@arisu/sdk`**.
 */
export const version: string = require('../package.json').version;
