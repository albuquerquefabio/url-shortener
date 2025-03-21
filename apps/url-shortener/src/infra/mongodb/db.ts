import { Url, UrlSchema } from '../../api/url/entities/url.entity';
import { User, UserSchema } from '../../api/users/entities/user.entity';

export default [
  { name: Url.name, schema: UrlSchema },
  { name: User.name, schema: UserSchema },
];
