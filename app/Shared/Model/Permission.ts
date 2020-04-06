import { Share } from './Share';
import { Rights } from './Rights';
import { Profile } from './Profile';
import { Permit } from './Permit';

export class Permission {
    id: number;
    allow: number;
    profile: Profile = new Profile();
    collaboaration = new Share();
    rights: Rights = new Rights();
}
