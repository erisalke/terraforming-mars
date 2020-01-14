import { expect } from "chai";
import { AtalantaPlanitiaLab } from "../../../src/cards/venusNext/AtalantaPlanitiaLab";
import { Color } from "../../../src/Color";
import { Player } from "../../../src/Player";
import { Game } from "../../../src/Game";

describe("AtalantaPlanitiaLab", function () {
    it("Should play", function () {
        const card = new AtalantaPlanitiaLab();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        expect(card.canPlay(player)).to.eq(false);
        const action = card.play(player,game);
        expect(action).to.eq(undefined);
        expect(player.cardsInHand.length).to.eq(2);
        expect(card.getVictoryPoints()).to.eq(2);
    });
});