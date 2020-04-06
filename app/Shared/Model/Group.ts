import { Profile } from './Profile';
import { Permission } from './Permission';

export class Group {
    id: number;
    groupName: string;
    isPrivate: boolean;
    permission: Permission;
    profile: Profile = new Profile();
    members: Profile[] = new Array<Profile>();
}
