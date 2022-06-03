import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Solana } from '@mogami/solana'
import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class ApiClusterStatDataAccessService {
  solana = new Map<string, Solana>()
  constructor(readonly data: ApiCoreDataAccessService) {}

  @Cron('55 * * * * *')
  async handleCron() {
    const activeClusters = await this.data.getActiveClusters()
    for (const { id, endpoint } of activeClusters) {
      if (!this.solana.has(id)) {
        this.solana.set(id, new Solana(endpoint, { logger: new Logger(`@mogami/solana:cluster-${id}`) }))
      }
      const performanceSamples = await this.solana.get(id).getRecentPerformanceSamples(10)
      if (performanceSamples?.length) {
        console.log(JSON.stringify(performanceSamples))
        const created = await this.data.clusterStat.createMany({
          data: [...performanceSamples.map((sample) => ({ ...sample, clusterId: id }))],
          skipDuplicates: true,
        })
        console.log(JSON.stringify(created))
      }
    }
  }

  clusterStat(clusterStatId: string) {
    return this.data.clusterStat.findUnique({ where: { id: clusterStatId } })
  }

  clusterStats() {
    return this.data.clusterStat.findMany()
  }
}
