import { Profile } from './Profile';

export class Connection {
    id: number;
    accepted: boolean;
    requester: Profile = new Profile();
    receiver: Profile = new Profile();
}
