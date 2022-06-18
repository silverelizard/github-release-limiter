import * as core from '@actions/core'
import * as github from '@actions/github'
import { limitReleases } from './limitReleases'

async function run(): Promise<void> {
  try {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    const myToken = core.getInput('myToken', {required: true})
    const maxReleases = Number(
      core.getInput('maxReleases', {required: true})
    )
    const deleteTags: boolean = core.getBooleanInput('deleteTags')
    const context = github.context

    const octokit = github.getOctokit(myToken)

    await limitReleases({
      myToken,
      maxReleases,
      deleteTags,
      context,
      octokit
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
