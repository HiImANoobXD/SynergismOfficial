import { calculateAmbrosiaLuckOcteractUpgrade, calculateAmbrosiaLuckShopUpgrade, calculateAmbrosiaLuckSingularityUpgrade, calculateEventBuff, calculateSingularityAmbrosiaLuckMilestoneBonus, numOfTimeThresholds } from '../../../Calculate'
import { player } from '../../../Synergism'
import { Globals } from '../../../Variables'
import { AdditionCache } from './AdditionCache'

type AmbrosialLuck = 'SingPerks' | 'OcteractBerries' | 'ShopUpgrades' | 'BlueberryUpgrade1' | 'Event' |
                     'BlueberryCubeLuck1' | 'BlueberryQuarkLuck1' | 'SingularityBerries' | 'BlueberryUpgrade2' | 'CubeUpgrade' |
                     'Exalt5'

export class AmbrosiaLuckCache extends AdditionCache<AmbrosialLuck> {

  vals: Record<AmbrosialLuck, number>
  public totalVal: number

  constructor() {
    super()
    this.vals = {
      'SingPerks': 0,
      'ShopUpgrades': 0,
      'SingularityBerries': 0,
      'OcteractBerries': 0,
      'BlueberryUpgrade1': 0,
      'BlueberryUpgrade2': 0,
      'BlueberryCubeLuck1': 0,
      'BlueberryQuarkLuck1': 0,
      'CubeUpgrade': 0,
      'Exalt5': 0,
      'Event': 0
    }
    this.totalVal = 0
  }

  updateVal(key: AmbrosialLuck, init = false): void {
    const oldVal = this.vals[key]
    switch (key) {
      case 'SingPerks': {
        this.vals[key] = calculateSingularityAmbrosiaLuckMilestoneBonus()
        break
      }
      case 'ShopUpgrades': {
        this.vals[key] = calculateAmbrosiaLuckShopUpgrade()
        break
      }
      case 'SingularityBerries': {
        this.vals[key] = calculateAmbrosiaLuckSingularityUpgrade()
        break
      }
      case 'OcteractBerries': {
        this.vals[key] = calculateAmbrosiaLuckOcteractUpgrade()
        break
      }
      case 'BlueberryUpgrade1': {
        this.vals[key] = +player.blueberryUpgrades.ambrosiaLuck1.bonus.ambrosiaLuck
        break
      }
      case 'BlueberryUpgrade2': {
        this.vals[key] = +player.blueberryUpgrades.ambrosiaLuck2.bonus.ambrosiaLuck
        break
      }
      case 'BlueberryCubeLuck1': {
        this.vals[key] = +player.blueberryUpgrades.ambrosiaCubeLuck1.bonus.ambrosiaLuck
        break
      }
      case 'BlueberryQuarkLuck1': {
        this.vals[key] = +player.blueberryUpgrades.ambrosiaQuarkLuck1.bonus.ambrosiaLuck
        break
      }
      case 'CubeUpgrade': {
        this.vals[key] = player.cubeUpgrades[77] * numOfTimeThresholds().numThresholds * 35
        break
      }
      case 'Exalt5': {
        this.vals[key] = +player.singularityChallenges.staggeredCubes.rewards.ambrosiaLuck
        break
      }
      case 'Event': {
        this.vals[key] = (Globals.isEvent) ? 100 * calculateEventBuff('Ambrosia Luck') : 0
        break
      }
    }
    const newVal = this.vals[key]
    this.updateTotal(oldVal, newVal, init)
  }
}
