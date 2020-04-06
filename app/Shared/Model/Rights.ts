import { Permission } from './Permission';

export class Rights {
    id: number;
    collaborate: number;
    share: number;
    tag: number;
    mention: number;
    permission: Permission;
}
