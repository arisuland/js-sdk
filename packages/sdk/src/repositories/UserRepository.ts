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

import type { User } from '@arisu/typings';
import { Client } from '../Client';

/**
 * Represents methods to get and update user information.
 */
export class UserRepository {
  #client: Client;

  /**
   * @param client The current {@link Client} to use.
   */
  constructor(client: Client) {
    this.#client = client;
  }

  /**
   * Retrieve a {@link User} from its {@link id}.
   * @param id The ID to use when retrieving the user.
   * @returns The {@link User} object if found, otherwise `null`.
   */
  get(id: string): Promise<User | null>;

  /**
   * Retrieve a {@link User} from its {@link id}, but you can
   * pick keys to form a new {@link User} object.
   *
   * @param id The ID to use when retrieving the user.
   * @param pickFrom The keys to pick from to retrieve a user.
   * @returns The {@link User} object if found, otherwise `null`.
   */
  get<K extends keyof User>(id: string, pickFrom?: K[]): Promise<Pick<User, K> | null> {
    return this.#client.graphql(
      `
      {
        query getUser($userId: String!) {
          user {
            ${
              pickFrom !== undefined
                ? pickFrom.map((s) => s).join('\n')
                : `
              createdAt
              description
              flags
              id
              name
              updatedAt
              username
            `.trim()
            }
          }
        }
      }
    `,
      { userId: id }
    );
  }
}
