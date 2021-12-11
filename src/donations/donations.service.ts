import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}

  create(createDonationInput: Prisma.DonationCreateInput) {
    return this.prisma.donation.create({ data: createDonationInput });
  }

  findAll(params?: {
    sortBy?: (keyof Prisma.DonationOrderByWithRelationInput)[];
  }) {
    const { sortBy } = params;

    const orderBy =
      sortBy &&
      sortBy.map((value) => {
        const direction = value.startsWith('-') ? 'desc' : 'asc';
        const field = value.substring(direction === 'desc' ? 1 : 0);
        return { [field]: direction };
      });

    return this.prisma.donation.findMany({ orderBy });
  }

  findOne(whereUniqueInput: Prisma.DonationWhereUniqueInput) {
    return this.prisma.donation.findUnique({ where: whereUniqueInput });
  }
}
