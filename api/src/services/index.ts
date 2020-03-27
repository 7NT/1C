import { Application } from '../declarations';
import users from './users/users.service';
import chats from './chats/chats.service';
import players from './players/players.service';
import tables from './tables/tables.service';
import played from './played/played.service';
import bids from './bids/bids.service';
import boards from './boards/boards.service';
import plays from './plays/plays.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(chats);
  app.configure(players);
  app.configure(tables);
  app.configure(played);
  app.configure(bids);
  app.configure(boards);
  app.configure(plays);
}
