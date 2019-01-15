import { StrategyType } from './Strategy'

const affirmativeStrategy: StrategyType = votes => votes.some(Boolean)

export default affirmativeStrategy
