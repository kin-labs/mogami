import { Cluster } from '@mogami/api/cluster/data-access'
import { Field, ObjectType } from '@nestjs/graphql'
import { AppMint } from './app-mint.entity'
import { App } from './app.entity'

@ObjectType()
export class AppEnv {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field({ nullable: true })
  name: string
  @Field({ nullable: true })
  webhookAcceptIncoming?: boolean
  @Field({ nullable: true })
  webhookEventEnabled?: boolean
  @Field({ nullable: true })
  webhookEventUrl?: string
  @Field({ nullable: true })
  webhookSecret?: string
  @Field({ nullable: true })
  webhookVerifyEnabled?: boolean
  @Field({ nullable: true })
  webhookVerifyUrl?: string
  @Field(() => Cluster, { nullable: true })
  cluster?: Cluster
  @Field(() => [AppMint], { nullable: true })
  mints: AppMint[]
  @Field(() => App, { nullable: true })
  app: App
}
