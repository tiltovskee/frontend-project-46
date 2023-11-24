#!/usr/bin/env node
import { program } from 'commander';
import parseFile from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((path1, path2) => {
    const paths = [path1, path2];
    paths.forEach(parseFile);
  });
program.parse();
