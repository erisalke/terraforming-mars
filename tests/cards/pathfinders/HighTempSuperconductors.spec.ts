import {expect} from 'chai';
import {HighTempSuperconductors} from '../../../src/cards/pathfinders/HighTempSuperconductors';
import {Thorgate} from '../../../src/cards/corporation/Thorgate';
import {Game} from '../../../src/Game';
import {TestPlayer} from '../../TestPlayer';
import {getTestPlayer, newTestGame} from '../../TestGame';
import {Reds} from '../../../src/turmoil/parties/Reds';
import {Kelvinists} from '../../../src/turmoil/parties/Kelvinists';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestingUtils} from '../../TestingUtils';
import {Units} from '../../../src/Units';
import {Tags} from '../../../src/cards/Tags';
import {PowerPlantStandardProject} from '../../../src/cards/base/standardProjects/PowerPlantStandardProject';

describe('HighTempSuperconductors', function() {
  let card: HighTempSuperconductors;
  let player: TestPlayer;
  let game: Game;
  let turmoil: Turmoil;

  beforeEach(function() {
    card = new HighTempSuperconductors();
    game = newTestGame(1, {turmoilExtension: true});
    player = getTestPlayer(game, 0);
    turmoil = Turmoil.getTurmoil(game);
  });

  it('canPlay', function() {
    player.megaCredits = card.cost;
    turmoil.rulingParty = new Reds();
    expect(player.canPlay(card)).is.false;
    turmoil.rulingParty = new Kelvinists();
    expect(player.canPlay(card)).is.true;
  });

  it('play', function() {
    card.play(player);
    expect(player.getProductionForTest()).deep.eq(Units.of({energy: 2}));
  });

  it('discount power tag', function() {
    player.playedCards.push(card);

    // Not power tag
    const cost10 = TestingUtils.fakeCard({cost: 10, tags: [Tags.CITY]});
    player.megaCredits = 9;
    expect(player.canPlay(cost10)).is.false;
    player.megaCredits = 10;
    expect(player.canPlay(cost10)).is.true;

    const cost10WithTag = TestingUtils.fakeCard({cost: 10, tags: [Tags.ENERGY]});
    player.megaCredits = 6;
    expect(player.canPlay(cost10WithTag)).is.false;
    player.megaCredits = 7;
    expect(player.canPlay(cost10WithTag)).is.true;
  });

  it('discount standard project', function() {
    player.playedCards.push(card);

    const powerPlant = new PowerPlantStandardProject();
    player.megaCredits = powerPlant.cost - 4;
    expect(powerPlant.canAct(player)).is.false;
    player.megaCredits++;
    expect(powerPlant.canAct(player)).is.true;
  });


  it('double-discount with Thorgate', function() {
    player.playedCards.push(card);
    player.corporationCard = new Thorgate();

    const powerPlant = new PowerPlantStandardProject();
    player.megaCredits = powerPlant.cost - 7;
    expect(powerPlant.canAct(player)).is.false;
    player.megaCredits++;
    expect(powerPlant.canAct(player)).is.true;
  });

  it('discount kelvinists card', function() {
    player.playedCards.push(card);
    // If the card has a Kevlinist's requirement, then canPlay won't pass unless Kevlinists
    // are in power.
    turmoil.rulingParty = new Kelvinists();

    // Itself is a kelvinst's card
    player.megaCredits = card.cost - 4;
    expect(player.canPlay(card)).is.false;
    player.megaCredits++;
    expect(player.canPlay(card)).is.true;
  });
});
