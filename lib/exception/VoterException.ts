export default class VoterException<TokenPayload = any> extends Error {
  public readonly token: TokenPayload

  public constructor(token: TokenPayload, message?: string) {
    super(message)

    this.token = token
  }
}
