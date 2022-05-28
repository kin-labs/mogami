import { Module } from '@nestjs/common'
import { ApiTransactionFeatureController } from './api-transaction-feature.controller'
import { ApiTransactionDataAccessModule } from '@mogami/api/transaction/data-access'

@Module({
  controllers: [ApiTransactionFeatureController],
  imports: [ApiTransactionDataAccessModule],
})
export class ApiTransactionFeatureModule {}
