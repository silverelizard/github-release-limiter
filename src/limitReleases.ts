import * as core from '@actions/core'
import { context } from '@actions/github'
import { Context } from '@actions/github/lib/context'

interface LimitReleaseConfig {
    myToken: string
    maxReleases: number
    deleteTags: boolean
    context: object
    octokit: any
}

export async function limitReleases(config: LimitReleaseConfig) {
    if (config.maxReleases < 1) {
      core.setFailed('🙀 Max releases invalid: must be set to > 0')
      return
    }

    core.info(`😸 Only ${config.maxReleases} will be retained`)
    core.info(`😸 Tags will ${config.deleteTags ? '' : 'not'} be deleted`)

    const iterator = config.octokit.paginate.iterator(
      config.octokit.rest.repos.listReleases,
      {
        ...context.repo,
        per_page: 100
      }
    )

    for await (const {data: releases} of iterator) {
      for (const release of releases) {
        core.info(`Release ${release.name}: ${release.tag_name}`)
      }
    }
}
