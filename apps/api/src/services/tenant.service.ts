import { prisma } from '../lib/prisma';
import { ResponseError } from '../error/response.error';

export class TenantService {
  public async getPropertiesByTenant(userId: string) {
    const tenant = await prisma.tenant.findUnique({
      where: { user_id: userId },
    });

    if (!tenant) {
      throw new ResponseError(404, 'Profil tenant tidak ditemukan.');
    }

    const properties = await prisma.property.findMany({
      where: {
        tenant_id: tenant.id,
      },
      include: {
        images: {
          take: 1,
        },
        _count: {
          select: {
            rooms: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return properties;
  }
}
