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

import { HttpClient } from '@augu/orchid';
import UserRepository from './repositories/UserRepository';

const { version }: { version: string } = require('../package.json');

/**
 * {@link Client} options.
 */
export interface ClientOptions {
  /**
   * Returns the user agent to use, it'll default to the default user agent.
   */
  userAgent?: string;

  /**
   * Returns the API url to use when requesting
   * @default 'api.arisu.land'
   */
  apiUrl?: string;

  /**
   * Returns the access token to use when requesting.
   */
  token?: string;
}

const kClientOptions: ClientOptions = {
  apiUrl: 'https://api.arisu.land',
  userAgent: `Arisu/JS-SDK (+https://github.com/arisuland/js-sdk; v${version})`,
};

/**
 * Represents the Arisu client, where you can call methods to
 * retrieve information from our API.
 */
export default class Client {
  readonly options: Required<Omit<ClientOptions, 'token'>> & { token?: string };
  private http: HttpClient;

  /**
   * Repository for the User model.
   */
  readonly users: UserRepository = new UserRepository(this);

  constructor(options: ClientOptions = kClientOptions) {
    // @ts-expect-error
    this.options = defu(options, kClientOptions);
    this.http = new HttpClient({
      baseUrl: this.options.apiUrl,
      userAgent: this.options.userAgent,
      defaults: {
        followRedirects: true,
        headers:
          this.options.token !== undefined
            ? {
                Authorization: `Bearer ${this.options.token}`,
              }
            : {},
      },
    });
  }

  graphql<T, Vars = Record<string, unknown>>(query: string, variables: Vars = {} as Vars): Promise<T | null> {
    return this.http
      .request({
        url: '/graphql',
        method: 'POST',
        data: {
          query,
          variables,
        },
      })
      .then((r) => {
        const data = r.json<{ data: T | null; errors?: any[] }>();

        // TODO: add a graphql error class
        if (data.errors !== undefined) throw new Error('Exception has occured.');
        return data.data;
      });
  }
}
