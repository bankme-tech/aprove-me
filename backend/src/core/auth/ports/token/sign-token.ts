export type Payload = {
  sub: string;
};

export abstract class SignToken {
  public abstract signAsync: (payload: Payload) => Promise<string>;
}
