#!/usr/bin/env node

import { Argument, program } from 'commander';
import { add } from './tasks/add';
import { init } from './tasks/init';
import { rm } from './tasks/rm';

program
  .command('init')
  .description(
    'creates the required files in assets and environments if they do not exist'
  )
  .action(init);

program
  .command('add')
  .description('add a new environment variable')
  .addArgument(new Argument('variable', 'name of the variable'))
  .addArgument(new Argument('default', 'default value of the variable'))
  .action(add);

program
  .command('rm')
  .description('remove an environment variable')
  .addArgument(new Argument('variable', 'name of the variable'))
  .action(rm);

program.parse();
