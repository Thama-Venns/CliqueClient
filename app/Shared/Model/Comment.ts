import { Profile } from './Profile';
import { Post } from './Post';

export class Comment {
    id: number;
    comment: string;
    likes: number;
    created: Date;
    profile: Profile = new Profile();
    post: Post = new Post();
}
