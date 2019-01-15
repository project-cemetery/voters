import Strategy from './Strategy'
import affirmativeStrategy from './affirmativeStrategy'
import consensusStrategy from './consensusStrategy'
import unanimousStrategy from './unanimousStrategy'

export default {
  [Strategy.Affirmative]: affirmativeStrategy,
  [Strategy.Consensus]: consensusStrategy,
  [Strategy.Unanimous]: unanimousStrategy,
}
