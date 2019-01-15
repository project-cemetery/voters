import VoterException from './VoterException'

export default class NoVotersException<Subject = any, TokenPayload = any> extends VoterException {
  public readonly attribute: string
  public readonly subject: Subject

  public constructor(attribute: string, subject: Subject, token: TokenPayload) {
    super(token, 'Can\'t check permission by voters, all voters abstained')

    this.attribute = attribute
    this.subject = subject
  }
}