/**
 * MIT License
 *
 * Copyright (c) 2020 Victor Ling <victorling@ionshard.com>
 * Copyright (c) 2021 Sven "DrMcCoy" Hesse <drmccoy@drmccoy.de>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { i18n } from '../utils.js'

export class BullseyeReborn extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {

  static get PARTS() {
    return {
      content: { template: `modules/bullseye-reborn/templates/bullseye-reborn.hbs` },
    };
  }

  static get DEFAULT_OPTIONS() {
    return {
      id: `bullseye-reborn`,
      position: {width: 200, height: 300, top: 70, left: 115 },
      classes: ['bullseye-reborn'],
      window: { icon: 'fa-solid fa-skull', title: i18n('bullseyeng.title'), resizable: true, contentClasses: ['standard-form'] },
      actions: {
        targetToken: BullseyeReborn.#targetToken,
      },
    };
  }

  static async #targetToken(event) {
    event.preventDefault();
    const finalTarget = event.target.closest("[data-token-id]");
    canvas.tokens.get(finalTarget.dataset.tokenId)?.control({releaseOthers: true});
  }

  async _prepareContext(options) {
    const base = await super._prepareContext(options);
    const players = game.users.players.filter(p => p.active);

    return {
      ...base,
      players: players,
      empty: players.length === 0,
    };
  }
}
