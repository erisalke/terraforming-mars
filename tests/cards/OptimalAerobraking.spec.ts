
import { expect } from "chai";
import { OptimalAerobraking } from "../../src/cards/OptimalAerobraking";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { BigAsteroid } from "../../src/cards/Cards";

describe("OptimalAerobraking", function () {
    it("Should play", function () {
        const card = new OptimalAerobraking();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        const action = card.play();
        expect(action).to.eq(undefined);
        expect(card.onCardPlayed(player, game, card)).to.eq(undefined);
        expect(card.onCardPlayed(player, game, new BigAsteroid())).to.eq(undefined);
        expect(player.megaCredits).to.eq(3);
        expect(player.heat).to.eq(3);
    });
});
