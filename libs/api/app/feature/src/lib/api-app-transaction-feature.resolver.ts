import { ApiAppDataAccessService, AppTransaction } from '@mogami/api/app/data-access'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppTransaction)
export class ApiAppTransactionFeatureResolver {
  constructor(private readonly service: ApiAppDataAccessService) {}

  @ResolveField(() => Int, { nullable: true })
  processingDuration(@Parent() tx: AppTransaction) {
    if (!tx.createdAt || !tx.solanaStart) return null
    return tx?.solanaStart?.getTime() - tx?.createdAt?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  solanaCommittedDuration(@Parent() tx: AppTransaction) {
    if (!tx.solanaCommitted || !tx.solanaStart) return null
    return tx?.solanaCommitted?.getTime() - tx?.solanaStart?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  solanaFinalizedDuration(@Parent() tx: AppTransaction) {
    if (!tx.solanaFinalized || !tx.solanaStart) return null
    return tx?.solanaFinalized?.getTime() - tx?.solanaStart?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  totalDuration(@Parent() tx: AppTransaction) {
    if (!tx.solanaFinalized) return null
    return tx?.solanaFinalized?.getTime() - tx?.createdAt?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  webhookEventDuration(@Parent() tx: AppTransaction) {
    if (!tx.webhookEventEnd || !tx.webhookEventStart) return null
    return tx?.webhookEventEnd?.getTime() - tx?.webhookEventStart?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  webhookVerifyDuration(@Parent() tx: AppTransaction) {
    if (!tx.webhookVerifyEnd || !tx.webhookVerifyStart) return null
    return tx?.webhookVerifyEnd?.getTime() - tx?.webhookVerifyStart?.getTime()
  }
}
