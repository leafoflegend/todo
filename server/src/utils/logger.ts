import chalk from 'chalk';

class Logger {
  name: string;
  count: number;
  constructor(name) {
    this.name = name;
    this.count = 0;
  }

  private printLine(): void {
    console.log(chalk.cyan('--------------------'));
  }

  private printPrefix(type: string, color: string): void {
    ++this.count;
    const pre = `${chalk[color](type.toUpperCase())} - ${chalk.magentaBright(
      `${this.name} #${this.count}: `,
    )}`;
    if (pre) console.log(pre);
  }

  private createPrint(thing: any): { message: string; error?: Error } {
    if (typeof thing === 'object' && thing) {
      if (thing instanceof Error) {
        return { message: thing.message, error: thing };
      }

      return { message: thing };
    }

    return { message: thing };
  }

  private print(type: string, color: string, ...logs: any): void {
    this.printPrefix(type, color);
    const logMessage = (s: string | Error['stack'], i: number) =>
      console.log(chalk.yellow(`Log ${i + 1}: `), chalk[color](`${s}`));

    logs.forEach((log, i) => {
      const logPrint = this.createPrint(log);

      if (logPrint.error) {
        logMessage(logPrint.message, i);
        logMessage(logPrint.error.stack, i);
      } else {
        logMessage(logPrint.message, i);
      }
    });
    this.printLine();
  }

  public suc(...logs: any): void {
    this.print('success', 'green', ...logs);
  }

  public err(...logs: any): void {
    this.print('error', 'red', ...logs);
  }

  public info(...logs: any): void {
    this.print('info', 'grey', ...logs);
  }
}

export default Logger;
