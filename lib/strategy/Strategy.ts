type StrategyType = (votes: boolean[]) => boolean

enum Strategy {
  Affirmative = 'affirmative',
  Consensus = 'consensus',
  Unanimous = 'unanimous',
}

export { StrategyType }

export default Strategy
