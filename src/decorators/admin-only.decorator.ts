import { SetMetadata } from '@nestjs/common';

export const AdminOnly = (role: string) => SetMetadata('role', role);
