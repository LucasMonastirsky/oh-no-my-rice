export type Timer = {
  name: string,
  duration: number,
  next_timer?: Timer,
}
