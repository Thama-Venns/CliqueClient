import { Profile } from './Profile';
import { Group } from './Group';

export class GroupMember {
    id: number;
    isAdmin: boolean;
    profile: Profile = new Profile();
    group: Group;
}
