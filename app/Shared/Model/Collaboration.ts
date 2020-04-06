import { Post } from './Post';
import { Profile } from './Profile';
import { Group } from './Group';

export class Collaboration {
    id: number;
    approved: boolean;
    post: Post;
    profile: Profile = new Profile();
    group: Group = new Group();
    consent: Profile[];
}
