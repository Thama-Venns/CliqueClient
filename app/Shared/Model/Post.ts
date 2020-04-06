import { Profile } from './Profile';
import { Image } from './Image';
import { Collaboration } from './Collaboration';
import { Group } from './Group';
import { Share } from './Share';
import { Comment } from './Comment';

export class Post {
    id: number;
    postText: string;
    creation: Date;
    likes: number;
    profile: Profile = new Profile();
    images: Image[];
    group: Group = new Group();
    collaborations: Collaboration[] = new Array<Collaboration>();
    shares: Share[];
    comments: Comment[];
}
