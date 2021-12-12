import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DonationsService } from './donations.service';
import { DonationCreateInput } from '../generated/prisma-nestjs-graphql/donation/donation-create.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation('createDonation')
  async create(
    @Args('createDonationInput')
    createDonationInput: DonationCreateInput,
  ) {
    const created = await this.donationsService.create(createDonationInput);

    const total = await this.donationsService.getTotal();
    pubSub.publish('totalDonations', { totalDonations: total });

    return created;
  }

  @Subscription()
  totalDonations() {
    return pubSub.asyncIterator('totalDonations');
  }

  @Query('donations')
  findAll(
    @Args('sortBy')
    sortBy?: (keyof Prisma.DonationOrderByWithRelationInput)[],
  ) {
    return this.donationsService.findAll({ sortBy });
  }

  @Query('donation')
  findOne(@Args('id') id: number) {
    return this.donationsService.findOne({ id });
  }

  @Query('totalDonations')
  getTotal() {
    return this.donationsService.getTotal();
  }
}
