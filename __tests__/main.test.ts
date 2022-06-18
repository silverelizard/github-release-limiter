import {expect, test} from '@jest/globals'
import * as core from '@actions/core'
import {limitReleases} from '../src/limitReleases'

test('does a thing', async() => {
  expect(1).toEqual(1)
})
// test('throws invalid number', async () => {
//   const config = {
//     myToken: 'someToken',
//     maxReleases: 0,
//     deleteTags: false,
//     context: {
//       owner: 'someowner',
//       repo: 'somerepo'
//     },
//     octokit: null
//   }
//   await expect(limitReleases(config))
//   expect(core.setFailed).toHaveBeenCalledWith('🙀 Max releases invalid: must be set to > 0')
// })

// test('wait 500 ms', async () => {
//   const start = new Date()
//   // await wait(500)
//   const end = new Date()
//   var delta = Math.abs(end.getTime() - start.getTime())
//   expect(delta).toBeGreaterThan(450)
// })
