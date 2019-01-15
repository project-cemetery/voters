import VoterException from './VoterException'

export default class VotingFailedException<
  Subject = any,
  TokenPayload = any
> extends VoterException {
  public readonly attribute: string
  public readonly subject: Subject

  public constructor(attribute: string, subject: Subject, token: TokenPayload) {
    super(token, 'Permission denied')

    this.attribute = attribute
    this.subject = subject
  }
}
