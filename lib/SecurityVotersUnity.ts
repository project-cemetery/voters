import SecurityVoter from './SecutiryVoter'
import { StrategyMap, Strategy } from './strategy'
import { NoVotersException, VotingFailedException } from './exception'

export default class SecurityVotersUnity {
  public constructor(
    private readonly voters: SecurityVoter[],
    private readonly strategy: Strategy,
    private readonly allowIfAllAbstain: boolean,
  ) {}

  public denyAccessUnlessGranted = async <Subject = any, TokenPayload = any>(
    attribute: string,
    subject: Subject,
    token: TokenPayload,
  ): Promise<void> => {
    const votes = await Promise.all(
      this.voters
        .filter(voter => voter.supports(attribute, subject))
        .map(voter => voter.voteOnAttribute(attribute, subject, token)),
    )

    if (!this.legitimacy(votes)) {
      throw new NoVotersException(attribute, subject, token)
    }

    if (!this.votesResult(votes)) {
      throw new VotingFailedException(attribute, subject, token)
    }
  }

  private legitimacy = (votes: boolean[]): boolean =>
    votes.length !== 0 || this.allowIfAllAbstain

  private votesResult = (votes: boolean[]): boolean =>
    StrategyMap[this.strategy](votes)
}
