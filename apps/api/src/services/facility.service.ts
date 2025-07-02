import { prisma } from '@/lib/prisma';

export class FacilityService {
  public async getAllFacilities() {
    const facilities = await prisma.facility.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return facilities;
  }
}
