import chalk from "chalk";

const logger = {
  'info' : (args) => {
    console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO] `), typeof args === 'string' ? chalk.blueBright(args) : args)
  },
  'debug' : (args) => {
    console.log(chalk.yellow(`[${new Date().toLocaleString()}] [DEBUG] `), typeof args === 'string' ? chalk.bgYellow(args) : args);
  },
  'error' : (args) => {
    console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR] `), typeof args === 'string' ? chalk.bgRed(args) : args);
  }
}

export default logger;