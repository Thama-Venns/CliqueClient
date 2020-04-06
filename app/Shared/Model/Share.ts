import { Post } from './Post';
import { Profile } from './Profile';
import { Group } from './Group';

export class Share {
    id: number;
    accepted: boolean;
    post: Post = new Post();
    group: Group = new Group();
    profile: Profile = new Profile();
    consent: Profile[] = new Array<Profile>();
}
