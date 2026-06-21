/**
 * MIT License
 *
 * Copyright (c) 2020 Victor Ling <victorling@ionshard.com>
 * Copyright (c) 2021-2022 Sven "DrMcCoy" Hesse <drmccoy@drmccoy.de>
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

import { BullseyeReborn } from './app/bullseye-reborn.js'

Hooks.once('ready', () => {
    game.modules.get('bullseye-reborn').app = new BullseyeReborn();
})

Hooks.on('targetToken', (user, token, targeted) => {
    game.modules.get('bullseye-reborn')?.app?.render()
})

Hooks.on('controlToken', (token, controlled) => {
    game.modules.get('bullseye-reborn')?.app?.render()
})

Hooks.on('renderPlayerList', (app, html, data) => {
    game.modules.get('bullseye-reborn')?.app?.render()
})

Hooks.on('getSceneControlButtons', controls => {
  const tokenButton = controls.tokens;
  if (tokenButton) {
	if (!tokenButton.tools.showBullseyeReborn) {
	  tokenButton.tools.showBullseyeReborn = {
		button: true,
		icon: 'fas fa-list-ul',
		title: 'bullseyeng.open',
		name: 'showBullseyeReborn',
		visible: game.user.isGM,
		onChange: () =>
            game.modules.get('bullseye-reborn')?.app?.render(true)
	  };
	}
  }
});
