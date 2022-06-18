import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    const myToken = core.getInput('myToken', { required: true })
    const maxReleases: number = Number(core.getInput('maxReleases', { required: true }))
    const deleteTags: boolean = core.getBooleanInput('deleteTags')
    const context = github.context;

    const octokit = github.getOctokit(myToken)

    if (maxReleases < 1) {
      core.setFailed("🙀 Max releases invalid: must be set to > 0")
      return
    }

    core.info(`😸 Only ${maxReleases} will be retained`)
    core.info(`😸 Tags will ${deleteTags ? '' : 'not'} be deleted`)

    const iterator = octokit.paginate.iterator(octokit.rest.repos.listReleases, {
      ...context.repo,
      per_page: 100,
    });
    
    for await (const { data: releases } of iterator) {
      for (const release of releases) {
        core.info(`Release ${release.name}: ${release.tag_name}`);
      }
    }

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
