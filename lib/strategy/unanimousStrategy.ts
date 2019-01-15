import { StrategyType } from './Strategy'

const unanimousStrategy: StrategyType = votes => votes.every(Boolean)

export default unanimousStrategy
