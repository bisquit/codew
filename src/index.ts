#!/usr/bin/env node

import { log } from '@clack/prompts';
import { cli } from 'cleye';

import * as pkg from '../package.json';
import { checkDir } from './operations/check-dir';
import { createWorkspace } from './operations/create-workspace';
import { getWorkspace } from './operations/get-workspace';
import { openWorkspace } from './operations/open-workspace';

const argv = cli({
  name: 'codew',

  version: pkg.version,

  parameters: ['<path>'],

  flags: {},

  help: {
    description: pkg.description,
    examples: ['codew .'],
  },
});

const path = argv._.path;

try {
  await checkDir(path);

  const workspace = await getWorkspace(path);
  if (workspace) {
    await openWorkspace(workspace);
  } else {
    const workspace = await createWorkspace(path);
    await openWorkspace(workspace);
  }
} catch (e) {
  log.error(`${e}`);
}
