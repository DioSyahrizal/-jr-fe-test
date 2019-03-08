const git = require('git-rev-sync');

// We should pass the git revisions as env variables first before running
// the entire build pipeline.
process.env.REACT_APP_GIT_REVISION = git.long();
process.env.REACT_APP_GIT_TAG = git.tag();

require('@rescripts/cli/scripts/build');
